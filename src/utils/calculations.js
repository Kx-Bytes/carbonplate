import { INGREDIENTS } from '../data/emissions.js';
import { MEALS } from '../data/meals.js';

/**
 * Calculate total kg CO₂eq for a single meal entry (with servings multiplier).
 * Returns per-ingredient breakdown for transparency.
 */
export function calcMealEmissions(mealId, servings = 1) {
  const meal = MEALS[mealId];
  if (!meal) return null;

  const breakdown = meal.ingredients.map(({ ingredientId, grams, description }) => {
    const ingredient = INGREDIENTS[ingredientId];
    if (!ingredient) return null;
    const kgFood = (grams * servings) / 1000;
    const kgCO2 = kgFood * ingredient.emissionsPerKg;
    const kgCO2Low = kgFood * ingredient.low;
    const kgCO2High = kgFood * ingredient.high;
    return {
      ingredientId,
      ingredientName: ingredient.name,
      category: ingredient.category,
      grams: grams * servings,
      kgFood,
      emissionsPerKg: ingredient.emissionsPerKg,
      kgCO2: +kgCO2.toFixed(4),
      kgCO2Low: +kgCO2Low.toFixed(4),
      kgCO2High: +kgCO2High.toFixed(4),
      description,
      source: ingredient.source,
      color: ingredient.color,
    };
  }).filter(Boolean);

  const totalKgCO2 = breakdown.reduce((sum, b) => sum + b.kgCO2, 0);
  const totalLow = breakdown.reduce((sum, b) => sum + b.kgCO2Low, 0);
  const totalHigh = breakdown.reduce((sum, b) => sum + b.kgCO2High, 0);

  return {
    mealId,
    mealName: meal.name,
    emoji: meal.emoji,
    mealType: meal.mealType,
    servings,
    breakdown,
    totalKgCO2: +totalKgCO2.toFixed(4),
    totalLow: +totalLow.toFixed(4),
    totalHigh: +totalHigh.toFixed(4),
    plantBasedMealId: meal.plantBasedMealId,
    isPlantBased: meal.isPlantBased || false,
  };
}

/**
 * Calculate full week emissions from the meal plan.
 * planEntries: Array of { day, mealType, mealId, servings }
 */
export function calcWeeklyEmissions(planEntries) {
  const results = planEntries
    .map(entry => {
      const mealResult = calcMealEmissions(entry.mealId, entry.servings || 1);
      if (!mealResult) return null;
      return {
        ...mealResult,
        day: entry.day,
        entryId: entry.id,
      };
    })
    .filter(Boolean);

  const totalKgCO2 = results.reduce((sum, r) => sum + r.totalKgCO2, 0);
  const totalLow = results.reduce((sum, r) => sum + r.totalLow, 0);
  const totalHigh = results.reduce((sum, r) => sum + r.totalHigh, 0);

  // Breakdown by category
  const byCategory = {};
  results.forEach(meal => {
    meal.breakdown.forEach(ing => {
      if (!byCategory[ing.category]) {
        byCategory[ing.category] = { kgCO2: 0, ingredients: [] };
      }
      byCategory[ing.category].kgCO2 += ing.kgCO2;
    });
  });

  // Breakdown by day
  const byDay = {};
  results.forEach(meal => {
    if (!byDay[meal.day]) byDay[meal.day] = { kgCO2: 0, meals: [] };
    byDay[meal.day].kgCO2 += meal.totalKgCO2;
    byDay[meal.day].meals.push(meal);
  });

  // Breakdown by meal type
  const byMealType = {};
  results.forEach(meal => {
    if (!byMealType[meal.mealType]) byMealType[meal.mealType] = 0;
    byMealType[meal.mealType] += meal.totalKgCO2;
  });

  return {
    meals: results,
    totalKgCO2: +totalKgCO2.toFixed(3),
    totalLow: +totalLow.toFixed(3),
    totalHigh: +totalHigh.toFixed(3),
    byCategory,
    byDay,
    byMealType,
    mealCount: results.length,
  };
}

/**
 * Build the plant-based version of the current meal plan.
 * Replaces each meal with its plantBasedMealId equivalent (if one exists).
 * Returns the same structure as calcWeeklyEmissions.
 */
export function calcPlantBasedEquivalent(planEntries) {
  const pbEntries = planEntries.map(entry => {
    const meal = MEALS[entry.mealId];
    if (!meal) return entry;
    // If already plant-based or has a PB equivalent, use that; otherwise keep original
    const pbId = meal.isPlantBased ? entry.mealId : (meal.plantBasedMealId || entry.mealId);
    return { ...entry, mealId: pbId };
  });
  return calcWeeklyEmissions(pbEntries);
}

/**
 * Returns comparison stats between current and plant-based plans.
 */
export function buildComparison(currentStats, pbStats) {
  const reductionKg = currentStats.totalKgCO2 - pbStats.totalKgCO2;
  const reductionPct = currentStats.totalKgCO2 > 0
    ? (reductionKg / currentStats.totalKgCO2) * 100
    : 0;

  // Annual extrapolation
  const annualCurrentKg = currentStats.totalKgCO2 * 52;
  const annualPbKg = pbStats.totalKgCO2 * 52;
  const annualSavingKg = reductionKg * 52;

  // Context equivalencies (from EPA / IPCC conversion factors)
  const carKmEquivalent = annualSavingKg / 0.21; // 0.21 kg CO2 per km (avg car)
  const flightsEquivalent = annualSavingKg / 500; // ~500 kg CO2 per transatlantic flight

  // Per-meal comparison
  const mealComparisons = currentStats.meals.map(currentMeal => {
    const pbMealId = MEALS[currentMeal.mealId]?.plantBasedMealId;
    const pbMeal = pbMealId ? calcMealEmissions(pbMealId, currentMeal.servings) : null;
    return {
      day: currentMeal.day,
      mealType: currentMeal.mealType,
      current: currentMeal,
      plantBased: pbMeal,
      saving: pbMeal ? +(currentMeal.totalKgCO2 - pbMeal.totalKgCO2).toFixed(4) : 0,
    };
  });

  return {
    current: currentStats,
    plantBased: pbStats,
    reductionKg: +reductionKg.toFixed(3),
    reductionPct: +reductionPct.toFixed(1),
    annualCurrentKg: +annualCurrentKg.toFixed(1),
    annualPbKg: +annualPbKg.toFixed(1),
    annualSavingKg: +annualSavingKg.toFixed(1),
    carKmEquivalent: +carKmEquivalent.toFixed(0),
    flightsEquivalent: +flightsEquivalent.toFixed(2),
    mealComparisons,
  };
}

/**
 * Sort meals by highest emitter.
 */
export function rankMealsByEmissions(weeklyStats) {
  return [...weeklyStats.meals].sort((a, b) => b.totalKgCO2 - a.totalKgCO2);
}

/**
 * Summarise ingredient-level contributions across the whole week.
 */
export function rankIngredientsByEmissions(weeklyStats) {
  const map = {};
  weeklyStats.meals.forEach(meal => {
    meal.breakdown.forEach(ing => {
      if (!map[ing.ingredientId]) {
        map[ing.ingredientId] = {
          ingredientId: ing.ingredientId,
          ingredientName: ing.ingredientName,
          category: ing.category,
          totalKgCO2: 0,
          totalGrams: 0,
          color: ing.color,
        };
      }
      map[ing.ingredientId].totalKgCO2 += ing.kgCO2;
      map[ing.ingredientId].totalGrams += ing.grams;
    });
  });
  return Object.values(map)
    .map(i => ({ ...i, totalKgCO2: +i.totalKgCO2.toFixed(4) }))
    .sort((a, b) => b.totalKgCO2 - a.totalKgCO2);
}
