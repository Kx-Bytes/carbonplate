import { useNavigate } from 'react-router-dom';
import { useMemo, useState } from 'react';
import WeeklyCalendar from '../components/WeeklyCalendar.jsx';
import CustomMealBuilder from '../components/CustomMealBuilder.jsx';
import { calcWeeklyEmissions } from '../utils/calculations.js';
import { fmtCO2 } from '../utils/formatters.js';

const STARTER_PLAN = [
  { id: 'default-1', day: 'Monday', mealType: 'breakfast', mealId: 'bacon_and_eggs', servings: 1 },
  { id: 'default-2', day: 'Monday', mealType: 'lunch', mealId: 'beef_burger_meal', servings: 1 },
  { id: 'default-3', day: 'Monday', mealType: 'dinner', mealId: 'steak_dinner', servings: 1 },
  { id: 'default-4', day: 'Tuesday', mealType: 'breakfast', mealId: 'cereal_with_milk', servings: 1 },
  { id: 'default-5', day: 'Tuesday', mealType: 'lunch', mealId: 'caesar_salad_chicken', servings: 1 },
  { id: 'default-6', day: 'Tuesday', mealType: 'dinner', mealId: 'spaghetti_bolognese_meal', servings: 1 },
  { id: 'default-7', day: 'Wednesday', mealType: 'breakfast', mealId: 'yogurt_parfait', servings: 1 },
  { id: 'default-8', day: 'Wednesday', mealType: 'lunch', mealId: 'chicken_sandwich', servings: 1 },
  { id: 'default-9', day: 'Wednesday', mealType: 'dinner', mealId: 'salmon_dinner', servings: 1 },
  { id: 'default-10', day: 'Thursday', mealType: 'breakfast', mealId: 'avocado_toast_egg', servings: 1 },
  { id: 'default-11', day: 'Thursday', mealType: 'lunch', mealId: 'tuna_pasta_salad', servings: 1 },
  { id: 'default-12', day: 'Thursday', mealType: 'dinner', mealId: 'chicken_stir_fry', servings: 1 },
  { id: 'default-13', day: 'Friday', mealType: 'breakfast', mealId: 'full_english', servings: 1 },
  { id: 'default-14', day: 'Friday', mealType: 'lunch', mealId: 'blt_sandwich', servings: 1 },
  { id: 'default-15', day: 'Friday', mealType: 'dinner', mealId: 'lamb_chop_dinner', servings: 1 },
  { id: 'default-16', day: 'Saturday', mealType: 'lunch', mealId: 'beef_tacos', servings: 1 },
  { id: 'default-17', day: 'Saturday', mealType: 'dinner', mealId: 'roast_chicken_dinner', servings: 1 },
  { id: 'default-18', day: 'Sunday', mealType: 'breakfast', mealId: 'bacon_and_eggs', servings: 1 },
  { id: 'default-19', day: 'Sunday', mealType: 'dinner', mealId: 'steak_dinner', servings: 1 },
  { id: 'default-20', day: 'Monday', mealType: 'snack', mealId: 'cheese_crackers', servings: 1 },
  { id: 'default-21', day: 'Wednesday', mealType: 'snack', mealId: 'yogurt_snack', servings: 1 },
];

export default function MealPlanBuilder({ plan, setPlan, customMeals, setCustomMeals }) {
  const navigate = useNavigate();
  const [showCustomBuilder, setShowCustomBuilder] = useState(false);

  const mealRegistry = useMemo(() => ({ ...customMeals }), [customMeals]);

  const weekStats = useMemo(
    () => calcWeeklyEmissions(plan, { ...mealRegistry }),
    [plan, mealRegistry]
  );

  const handleAddMeal = ({ day, mealType, mealId }) => {
    const id = `entry-${Date.now()}-${Math.random().toString(36).slice(2)}`;
    setPlan(prev => [...prev, { id, day, mealType, mealId, servings: 1 }]);
  };

  const handleRemoveMeal = (entryId) => {
    setPlan(prev => prev.filter(e => e.id !== entryId));
  };

  const handleUpdateServings = (entryId, newServings) => {
    setPlan(prev => prev.map(e => e.id === entryId ? { ...e, servings: newServings } : e));
  };

  const handleSaveCustomMeal = (meal) => {
    setCustomMeals(prev => ({ ...prev, [meal.id]: meal }));
    setShowCustomBuilder(false);
    // Immediately add to plan — user triggered this from the builder
  };

  const handleLoadStarter = () => setPlan(STARTER_PLAN);
  const handleClear = () => {
    if (window.confirm('Clear the entire meal plan?')) setPlan([]);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
      {/* Hero */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          🌍 Build Your Weekly Meal Plan
        </h1>
        <p className="text-gray-600 max-w-2xl">
          Add your typical weekly meals. We&apos;ll calculate the carbon footprint of each
          ingredient using data from{' '}
          <a
            href="https://doi.org/10.1126/science.aao0216"
            target="_blank"
            rel="noreferrer"
            className="text-green-600 underline"
          >
            Poore &amp; Nemecek (2018)
          </a>{' '}
          and compare it to a plant-based equivalent — meal by meal.
        </p>
      </div>

      {/* Top bar: stats + actions */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        {/* Live footprint ticker */}
        <div className="flex items-center gap-4">
          {plan.length > 0 ? (
            <>
              <div className="card !p-3 flex items-center gap-3">
                <span className="text-2xl">📊</span>
                <div>
                  <p className="text-xs text-gray-500 font-medium">Weekly footprint</p>
                  <p className="text-xl font-bold text-orange-500">
                    {fmtCO2(weekStats.totalKgCO2)}
                  </p>
                  <p className="text-xs text-gray-400">CO₂eq · {plan.length} meals</p>
                </div>
              </div>
              <div className="text-xs text-gray-400 max-w-xs hidden sm:block">
                Uncertainty range:{' '}
                <span className="font-medium text-gray-600">
                  {fmtCO2(weekStats.totalLow)} – {fmtCO2(weekStats.totalHigh)}
                </span>
              </div>
            </>
          ) : (
            <p className="text-sm text-gray-400 italic">Add meals to see your footprint</p>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 flex-wrap">
          <button onClick={handleLoadStarter} className="btn-secondary text-sm">
            📋 Load Example Plan
          </button>
          <button
            onClick={() => setShowCustomBuilder(true)}
            className="btn-secondary text-sm"
          >
            ✏️ Build Custom Meal
          </button>
          {plan.length > 0 && (
            <>
              <button
                onClick={handleClear}
                className="text-sm text-red-500 hover:text-red-700 px-3 py-2 rounded-lg hover:bg-red-50 transition-colors"
              >
                Clear all
              </button>
              <button onClick={() => navigate('/results')} className="btn-primary text-sm">
                See Full Analysis →
              </button>
            </>
          )}
        </div>
      </div>

      {/* How it works callout */}
      {plan.length === 0 && (
        <div className="card bg-green-50 border-green-200 mb-6">
          <div className="flex gap-4">
            <span className="text-3xl">💡</span>
            <div>
              <h3 className="font-semibold text-green-900 mb-1">How it works</h3>
              <ol className="text-sm text-green-800 space-y-1 list-decimal list-inside">
                <li>Add meals to each day using the grid below</li>
                <li>Each meal is broken down by ingredient with its CO₂eq value</li>
                <li>Click <strong>See Full Analysis</strong> to compare with plant-based equivalents</li>
                <li>Export results as an image or citation-ready report</li>
              </ol>
              <button onClick={handleLoadStarter} className="mt-3 text-sm font-medium text-green-700 underline">
                Or load a pre-filled example plan →
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Calendar */}
      <div className="card">
        <WeeklyCalendar
          plan={plan}
          onAddMeal={handleAddMeal}
          onRemoveMeal={handleRemoveMeal}
          onUpdateServings={handleUpdateServings}
          customMeals={customMeals}
        />
      </div>

      {/* Custom meals list */}
      {Object.keys(customMeals).length > 0 && (
        <div className="mt-4 p-4 bg-purple-50 border border-purple-200 rounded-xl">
          <p className="text-xs font-semibold text-purple-700 mb-2">
            ✏️ Your custom meals — add them to any slot in the calendar
          </p>
          <div className="flex flex-wrap gap-2">
            {Object.values(customMeals).map(m => (
              <span key={m.id} className="text-xs bg-white border border-purple-200 rounded-full px-3 py-1 text-purple-700">
                {m.emoji} {m.name}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Methodology note */}
      <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-xl text-sm text-blue-800">
        <strong>Data transparency:</strong> Emission factors from Clark et al. (2022) via Our World in Data,
        underpinned by Poore &amp; Nemecek (2018). Farm-to-retail scope.{' '}
        Use the <strong>×</strong> stepper on each meal to adjust portion size.{' '}
        <a href="/methodology" className="underline font-medium">See full methodology →</a>
      </div>

      {/* Custom meal builder modal */}
      {showCustomBuilder && (
        <CustomMealBuilder
          onSave={handleSaveCustomMeal}
          onClose={() => setShowCustomBuilder(false)}
        />
      )}
    </div>
  );
}
