/**
 * Greenhouse gas emission factors for food products.
 *
 * PRIMARY SOURCE:
 *   Poore, J. & Nemecek, T. (2018). "Reducing food's environmental impacts
 *   through producers and consumers." Science, 360(6392), 987–992.
 *   https://doi.org/10.1126/science.aao0216
 *   Supplementary materials: https://science.sciencemag.org/content/360/6392/987/tab-figures-data
 *
 * SECONDARY SOURCES (for items not in Poore & Nemecek):
 *   - Our World in Data food emissions dataset (Ritchie, H., 2020)
 *     https://ourworldindata.org/food-choice-vs-eating-local
 *   - FAO (2013). "Tackling Climate Change Through Livestock."
 *   - Clark, M.A. et al. (2022). Nature Food, foods-03-00056
 *
 * Units: kg CO₂-equivalent per kg of food (farm-to-retail scope,
 *        including land use change, farming, processing, transport, packaging)
 *
 * Each ingredient includes:
 *   - mean: best-estimate mean from Poore & Nemecek Table S2 / Fig 1
 *   - low / high: 5th–95th percentile range across production systems
 *   - source: specific citation key
 *   - productionNote: explains the main emission drivers
 */

export const INGREDIENTS = {
  // ─── RUMINANT MEAT ───────────────────────────────────────────────────────
  beef_beef_herd: {
    id: 'beef_beef_herd',
    name: 'Beef (beef herd)',
    category: 'meat',
    subcategory: 'ruminant',
    emissionsPerKg: 59.6,
    low: 9.0,
    high: 105.0,
    unit: 'kg CO₂eq / kg',
    source: 'Poore & Nemecek 2018, Table S2',
    productionNote:
      'Dominated by enteric fermentation (methane from digestion) and land-use change for pasture/feed crops. Beef from dedicated beef herds has a higher footprint than dairy-herd beef because the GHG burden is not shared with milk production.',
    plantBasedAlternativeId: 'legumes',
    color: '#dc2626',
  },
  beef_dairy_herd: {
    id: 'beef_dairy_herd',
    name: 'Beef (dairy herd)',
    category: 'meat',
    subcategory: 'ruminant',
    emissionsPerKg: 21.3,
    low: 5.5,
    high: 46.0,
    unit: 'kg CO₂eq / kg',
    source: 'Poore & Nemecek 2018, Table S2',
    productionNote:
      'Lower than beef-herd beef because emissions are co-allocated with dairy milk. Still among the highest-footprint foods.',
    plantBasedAlternativeId: 'legumes',
    color: '#ef4444',
  },
  lamb_mutton: {
    id: 'lamb_mutton',
    name: 'Lamb & Mutton',
    category: 'meat',
    subcategory: 'ruminant',
    emissionsPerKg: 24.0,
    low: 9.0,
    high: 65.0,
    unit: 'kg CO₂eq / kg',
    source: 'Poore & Nemecek 2018, Table S2',
    productionNote:
      'High methane emissions from ruminant digestion, combined with land use for grazing. New Zealand grass-fed lamb has lower emissions but faces shipping costs.',
    plantBasedAlternativeId: 'legumes',
    color: '#f87171',
  },

  // ─── PORK / POULTRY ──────────────────────────────────────────────────────
  pork: {
    id: 'pork',
    name: 'Pork',
    category: 'meat',
    subcategory: 'monogastric',
    emissionsPerKg: 7.6,
    low: 4.0,
    high: 15.0,
    unit: 'kg CO₂eq / kg',
    source: 'Poore & Nemecek 2018, Table S2',
    productionNote:
      'Lower than ruminants due to more efficient feed conversion. Main drivers: feed production (often soy) and manure management.',
    plantBasedAlternativeId: 'tofu',
    color: '#f97316',
  },
  chicken: {
    id: 'chicken',
    name: 'Chicken',
    category: 'meat',
    subcategory: 'monogastric',
    emissionsPerKg: 5.7,
    low: 3.0,
    high: 11.0,
    unit: 'kg CO₂eq / kg',
    source: 'Poore & Nemecek 2018, Table S2',
    productionNote:
      'Most efficient land animal for protein per kg GHG. Feed (maize/soy) dominates the footprint.',
    plantBasedAlternativeId: 'tofu',
    color: '#fb923c',
  },
  turkey: {
    id: 'turkey',
    name: 'Turkey',
    category: 'meat',
    subcategory: 'monogastric',
    emissionsPerKg: 10.9,
    low: 5.0,
    high: 20.0,
    unit: 'kg CO₂eq / kg',
    source: 'Our World in Data / Clark et al. 2022',
    productionNote:
      'Similar drivers to chicken; higher per-kg figure reflects lower feed efficiency and different breeds.',
    plantBasedAlternativeId: 'tempeh',
    color: '#fdba74',
  },

  // ─── SEAFOOD ─────────────────────────────────────────────────────────────
  fish_farmed: {
    id: 'fish_farmed',
    name: 'Fish (farmed, avg)',
    category: 'seafood',
    subcategory: 'farmed',
    emissionsPerKg: 13.6,
    low: 3.0,
    high: 60.0,
    unit: 'kg CO₂eq / kg',
    source: 'Poore & Nemecek 2018, Table S2',
    productionNote:
      'Highly variable depending on species and system. Salmon and shrimp are at the high end; tilapia and carp at the low end. Feed (fishmeal/soy) is the primary driver.',
    plantBasedAlternativeId: 'tofu',
    color: '#0ea5e9',
  },
  salmon: {
    id: 'salmon',
    name: 'Salmon (farmed)',
    category: 'seafood',
    subcategory: 'farmed',
    emissionsPerKg: 11.9,
    low: 6.0,
    high: 25.0,
    unit: 'kg CO₂eq / kg',
    source: 'Poore & Nemecek 2018; Pelletier et al. 2009',
    productionNote:
      'Feed production (fishmeal and fish oil) is the dominant emission source for Atlantic salmon.',
    plantBasedAlternativeId: 'tofu',
    color: '#38bdf8',
  },
  shrimp_farmed: {
    id: 'shrimp_farmed',
    name: 'Shrimp (farmed)',
    category: 'seafood',
    subcategory: 'farmed',
    emissionsPerKg: 26.9,
    low: 10.0,
    high: 70.0,
    unit: 'kg CO₂eq / kg',
    source: 'Poore & Nemecek 2018, Table S2',
    productionNote:
      'Among the highest-footprint seafoods. Land use change (mangrove clearing) and energy-intensive pond operations are key drivers.',
    plantBasedAlternativeId: 'tofu',
    color: '#7dd3fc',
  },
  tuna_canned: {
    id: 'tuna_canned',
    name: 'Tuna (canned)',
    category: 'seafood',
    subcategory: 'wild-caught',
    emissionsPerKg: 6.1,
    low: 3.5,
    high: 12.0,
    unit: 'kg CO₂eq / kg',
    source: 'Our World in Data / Farmery et al. 2015',
    productionNote:
      'Fuel use for fishing vessels is the primary driver. Canning and cold-chain add processing emissions.',
    plantBasedAlternativeId: 'chickpeas',
    color: '#bae6fd',
  },

  // ─── DAIRY & EGGS ────────────────────────────────────────────────────────
  milk_dairy: {
    id: 'milk_dairy',
    name: 'Dairy Milk',
    category: 'dairy',
    subcategory: 'liquid',
    emissionsPerKg: 3.2,
    low: 1.2,
    high: 7.5,
    unit: 'kg CO₂eq / kg',
    source: 'Poore & Nemecek 2018, Table S2',
    productionNote:
      'Methane from cows, feed production, and manure management. Intensity varies widely by production system — European intensive vs. developing-world extensive.',
    plantBasedAlternativeId: 'oat_milk',
    color: '#e0f2fe',
  },
  cheese: {
    id: 'cheese',
    name: 'Cheese',
    category: 'dairy',
    subcategory: 'processed',
    emissionsPerKg: 21.2,
    low: 8.5,
    high: 45.0,
    unit: 'kg CO₂eq / kg',
    source: 'Poore & Nemecek 2018, Table S2',
    productionNote:
      'High figure reflects the ~10 kg of milk required to produce 1 kg of cheese, concentrating all dairy emissions.',
    plantBasedAlternativeId: 'nuts',
    color: '#fef9c3',
  },
  butter: {
    id: 'butter',
    name: 'Butter',
    category: 'dairy',
    subcategory: 'processed',
    emissionsPerKg: 11.5,
    low: 4.5,
    high: 22.0,
    unit: 'kg CO₂eq / kg',
    source: 'Poore & Nemecek 2018, Table S2',
    productionNote:
      'Requires ~20 kg of milk per kg of butter. The remaining skim milk offsets some of the burden through co-product allocation.',
    plantBasedAlternativeId: 'olive_oil',
    color: '#fef08a',
  },
  yogurt: {
    id: 'yogurt',
    name: 'Yogurt',
    category: 'dairy',
    subcategory: 'processed',
    emissionsPerKg: 3.3,
    low: 1.5,
    high: 7.0,
    unit: 'kg CO₂eq / kg',
    source: 'Poore & Nemecek 2018',
    productionNote:
      'Similar to milk but includes fermentation and packaging. Greek-style yogurt is higher due to more milk per kg.',
    plantBasedAlternativeId: 'oat_milk',
    color: '#fde68a',
  },
  eggs: {
    id: 'eggs',
    name: 'Eggs',
    category: 'dairy',
    subcategory: 'eggs',
    emissionsPerKg: 4.5,
    low: 2.5,
    high: 7.5,
    unit: 'kg CO₂eq / kg',
    source: 'Poore & Nemecek 2018, Table S2',
    productionNote:
      'Feed production (grain/soy) is the dominant factor. Free-range and organic systems tend to be slightly higher per egg due to lower laying rates.',
    plantBasedAlternativeId: 'tofu',
    color: '#fcd34d',
  },

  // ─── PLANT-BASED PROTEINS ────────────────────────────────────────────────
  tofu: {
    id: 'tofu',
    name: 'Tofu (soy)',
    category: 'plant_protein',
    subcategory: 'legume_derived',
    emissionsPerKg: 3.0,
    low: 1.8,
    high: 5.0,
    unit: 'kg CO₂eq / kg',
    source: 'Poore & Nemecek 2018 (soybean ~1.0 kg CO₂eq/kg × ~2.5 kg soy/kg tofu + processing)',
    productionNote:
      'Derived from soybeans. Note: the vast majority of global soy is grown for animal feed, not tofu/soy milk. Soy expansion linked to deforestation drives beef\'s high footprint, not direct soy-food consumption.',
    plantBasedAlternativeId: null,
    color: '#86efac',
  },
  tempeh: {
    id: 'tempeh',
    name: 'Tempeh',
    category: 'plant_protein',
    subcategory: 'legume_derived',
    emissionsPerKg: 2.2,
    low: 1.4,
    high: 4.0,
    unit: 'kg CO₂eq / kg',
    source: 'Smetana et al. 2015; estimated from soybean data',
    productionNote:
      'Whole soy fermentation with minimal processing. Lower than tofu because less liquid is removed and there\'s no whey waste stream.',
    plantBasedAlternativeId: null,
    color: '#4ade80',
  },
  seitan: {
    id: 'seitan',
    name: 'Seitan (wheat gluten)',
    category: 'plant_protein',
    subcategory: 'grain_derived',
    emissionsPerKg: 3.5,
    low: 2.0,
    high: 6.0,
    unit: 'kg CO₂eq / kg',
    source: 'Estimated: wheat ~1.4 kg CO₂eq/kg × ~4 kg wheat/kg seitan + processing',
    productionNote:
      'Wheat-based protein requiring significant water washing. Footprint estimate based on wheat emission factor extrapolated to processing yield.',
    plantBasedAlternativeId: null,
    color: '#22c55e',
  },
  legumes: {
    id: 'legumes',
    name: 'Legumes (lentils/beans)',
    category: 'plant_protein',
    subcategory: 'legume',
    emissionsPerKg: 0.9,
    low: 0.4,
    high: 2.0,
    unit: 'kg CO₂eq / kg',
    source: 'Poore & Nemecek 2018, Table S2',
    productionNote:
      'Nitrogen-fixing crops that reduce synthetic fertilizer need. Among the lowest-footprint protein sources. Includes lentils, chickpeas, black beans, kidney beans.',
    plantBasedAlternativeId: null,
    color: '#16a34a',
  },
  chickpeas: {
    id: 'chickpeas',
    name: 'Chickpeas',
    category: 'plant_protein',
    subcategory: 'legume',
    emissionsPerKg: 0.9,
    low: 0.4,
    high: 1.8,
    unit: 'kg CO₂eq / kg',
    source: 'Poore & Nemecek 2018 (legumes category)',
    productionNote:
      'Nitrogen-fixing. Very low water and land footprint relative to protein content.',
    plantBasedAlternativeId: null,
    color: '#15803d',
  },

  // ─── GRAINS ──────────────────────────────────────────────────────────────
  wheat_bread: {
    id: 'wheat_bread',
    name: 'Wheat / Bread',
    category: 'grain',
    emissionsPerKg: 1.4,
    low: 0.5,
    high: 2.5,
    unit: 'kg CO₂eq / kg',
    source: 'Poore & Nemecek 2018, Table S2',
    productionNote:
      'Synthetic nitrogen fertilizer production is the biggest contributor. Tillage and fuel use also significant.',
    plantBasedAlternativeId: null,
    color: '#a3e635',
  },
  rice: {
    id: 'rice',
    name: 'Rice',
    category: 'grain',
    emissionsPerKg: 4.0,
    low: 1.0,
    high: 9.0,
    unit: 'kg CO₂eq / kg',
    source: 'Poore & Nemecek 2018, Table S2',
    productionNote:
      'Paddy rice produces methane from anaerobic decomposition in flooded fields. Highest-GHG staple grain, but provides enormous caloric value globally.',
    plantBasedAlternativeId: null,
    color: '#bef264',
  },
  pasta: {
    id: 'pasta',
    name: 'Pasta',
    category: 'grain',
    emissionsPerKg: 1.7,
    low: 0.8,
    high: 3.0,
    unit: 'kg CO₂eq / kg',
    source: 'Based on wheat factor + processing (Poore & Nemecek 2018)',
    productionNote:
      'Durum wheat plus drying/processing. Higher than raw wheat due to extrusion energy.',
    plantBasedAlternativeId: null,
    color: '#d9f99d',
  },
  oats: {
    id: 'oats',
    name: 'Oats',
    category: 'grain',
    emissionsPerKg: 1.5,
    low: 0.7,
    high: 2.8,
    unit: 'kg CO₂eq / kg',
    source: 'Poore & Nemecek 2018',
    productionNote:
      'Low-input crop with good nitrogen efficiency. Rolled oats have minimal additional processing footprint.',
    plantBasedAlternativeId: null,
    color: '#ecfccb',
  },

  // ─── VEGETABLES & FRUIT ──────────────────────────────────────────────────
  tomatoes: {
    id: 'tomatoes',
    name: 'Tomatoes',
    category: 'vegetable',
    emissionsPerKg: 1.4,
    low: 0.3,
    high: 6.0,
    unit: 'kg CO₂eq / kg',
    source: 'Poore & Nemecek 2018, Table S2',
    productionNote:
      'Field-grown tomatoes are very low-footprint. Heated-greenhouse tomatoes (common in northern Europe) can be 6× higher due to energy use.',
    plantBasedAlternativeId: null,
    color: '#fca5a5',
  },
  root_vegetables: {
    id: 'root_vegetables',
    name: 'Root Vegetables',
    category: 'vegetable',
    emissionsPerKg: 0.4,
    low: 0.2,
    high: 0.8,
    unit: 'kg CO₂eq / kg',
    source: 'Poore & Nemecek 2018, Table S2',
    productionNote:
      'Includes carrots, beets, parsnips. Minimal fertilizer needs, no refrigeration required.',
    plantBasedAlternativeId: null,
    color: '#fde68a',
  },
  potatoes: {
    id: 'potatoes',
    name: 'Potatoes',
    category: 'vegetable',
    emissionsPerKg: 0.5,
    low: 0.2,
    high: 1.0,
    unit: 'kg CO₂eq / kg',
    source: 'Poore & Nemecek 2018, Table S2',
    productionNote:
      'Efficient starch crop with low GHG per calorie. Storage and processing add to the footprint if frying or boiling.',
    plantBasedAlternativeId: null,
    color: '#fed7aa',
  },
  leafy_greens: {
    id: 'leafy_greens',
    name: 'Leafy Greens',
    category: 'vegetable',
    emissionsPerKg: 0.4,
    low: 0.1,
    high: 1.2,
    unit: 'kg CO₂eq / kg',
    source: 'Poore & Nemecek 2018',
    productionNote:
      'Very low footprint per kg. High water content means the footprint per calorie is relatively higher than calorie-dense foods.',
    plantBasedAlternativeId: null,
    color: '#6ee7b7',
  },
  other_vegetables: {
    id: 'other_vegetables',
    name: 'Other Vegetables',
    category: 'vegetable',
    emissionsPerKg: 0.5,
    low: 0.2,
    high: 1.5,
    unit: 'kg CO₂eq / kg',
    source: 'Poore & Nemecek 2018',
    productionNote:
      'Includes broccoli, peppers, onions, squash, mushrooms. Footprint depends heavily on whether grown locally or in heated greenhouses.',
    plantBasedAlternativeId: null,
    color: '#a7f3d0',
  },
  fruit_tropical: {
    id: 'fruit_tropical',
    name: 'Tropical Fruit',
    category: 'fruit',
    emissionsPerKg: 1.1,
    low: 0.5,
    high: 3.0,
    unit: 'kg CO₂eq / kg',
    source: 'Our World in Data; Clune et al. 2017',
    productionNote:
      'Includes bananas, mangoes, pineapples. Long-distance air freight of very perishable fruit (e.g., berries by air) can spike this to 10+ kg CO₂eq/kg.',
    plantBasedAlternativeId: null,
    color: '#fde68a',
  },
  berries: {
    id: 'berries',
    name: 'Berries',
    category: 'fruit',
    emissionsPerKg: 1.5,
    low: 0.5,
    high: 15.0,
    unit: 'kg CO₂eq / kg',
    source: 'Our World in Data; Clune et al. 2017',
    productionNote:
      'Highly variable. In-season local berries are very low. Air-freighted or out-of-season berries from heated greenhouses can exceed beef on a per-kg basis.',
    plantBasedAlternativeId: null,
    color: '#c4b5fd',
  },

  // ─── OILS & CONDIMENTS ───────────────────────────────────────────────────
  olive_oil: {
    id: 'olive_oil',
    name: 'Olive Oil',
    category: 'oil',
    emissionsPerKg: 6.1,
    low: 3.0,
    high: 10.0,
    unit: 'kg CO₂eq / kg',
    source: 'Poore & Nemecek 2018, Table S2',
    productionNote:
      'High-value crop requiring ~5 kg olives per kg oil. Traditional groves have moderate footprints; intensive irrigated production is higher.',
    plantBasedAlternativeId: null,
    color: '#ecfccb',
  },
  sunflower_oil: {
    id: 'sunflower_oil',
    name: 'Sunflower Oil',
    category: 'oil',
    emissionsPerKg: 3.6,
    low: 2.0,
    high: 6.0,
    unit: 'kg CO₂eq / kg',
    source: 'Poore & Nemecek 2018, Table S2',
    productionNote: 'Lower than olive oil due to higher oil yield and lower-intensity production.',
    plantBasedAlternativeId: null,
    color: '#fef9c3',
  },

  // ─── BEVERAGES & OTHER ───────────────────────────────────────────────────
  oat_milk: {
    id: 'oat_milk',
    name: 'Oat Milk',
    category: 'dairy_alternative',
    emissionsPerKg: 0.9,
    low: 0.5,
    high: 1.5,
    unit: 'kg CO₂eq / kg',
    source: 'Oatly Environmental Impact Report 2019; Poore & Nemecek 2018',
    productionNote:
      'Lowest GHG among common dairy alternatives. ~70% less emissions than dairy milk per litre.',
    plantBasedAlternativeId: null,
    color: '#d1fae5',
  },
  soy_milk: {
    id: 'soy_milk',
    name: 'Soy Milk',
    category: 'dairy_alternative',
    emissionsPerKg: 0.9,
    low: 0.5,
    high: 1.8,
    unit: 'kg CO₂eq / kg',
    source: 'Poore & Nemecek 2018 (soy data)',
    productionNote:
      'Similar to oat milk. Requires ~0.7 kg dry soybeans per litre; soy processing is relatively efficient.',
    plantBasedAlternativeId: null,
    color: '#ccfbf1',
  },
  almond_milk: {
    id: 'almond_milk',
    name: 'Almond Milk',
    category: 'dairy_alternative',
    emissionsPerKg: 0.7,
    low: 0.4,
    high: 1.2,
    unit: 'kg CO₂eq / kg',
    source: 'Poore & Nemecek 2018 (nut data)',
    productionNote:
      'Low GHG but high water use (California drought concerns). Only ~2% almonds in most commercial products.',
    plantBasedAlternativeId: null,
    color: '#fef3c7',
  },
  coffee: {
    id: 'coffee',
    name: 'Coffee (roasted)',
    category: 'beverage',
    emissionsPerKg: 17.0,
    low: 7.0,
    high: 40.0,
    unit: 'kg CO₂eq / kg',
    source: 'Poore & Nemecek 2018, Table S2',
    productionNote:
      'Land use in tropical forests is the main driver. ~7 kg green beans yield 1 kg roasted coffee. Shade-grown certified coffees have substantially lower footprints.',
    plantBasedAlternativeId: null,
    color: '#92400e',
  },
  dark_chocolate: {
    id: 'dark_chocolate',
    name: 'Dark Chocolate',
    category: 'other',
    emissionsPerKg: 18.7,
    low: 8.0,
    high: 35.0,
    unit: 'kg CO₂eq / kg',
    source: 'Poore & Nemecek 2018, Table S2',
    productionNote:
      'Cocoa cultivation in West Africa involves significant deforestation. ~5 kg cocoa pods yield 1 kg beans.',
    plantBasedAlternativeId: null,
    color: '#78350f',
  },
  nuts: {
    id: 'nuts',
    name: 'Nuts (mixed)',
    category: 'plant_protein',
    subcategory: 'nut',
    emissionsPerKg: 2.5,
    low: 1.0,
    high: 5.0,
    unit: 'kg CO₂eq / kg',
    source: 'Poore & Nemecek 2018, Table S2',
    productionNote:
      'Perennial trees store carbon and require minimal tillage. Footprint mainly from orchard management and transport. Walnuts ~2.3, almonds ~3.5, cashews ~4.0.',
    plantBasedAlternativeId: null,
    color: '#a16207',
  },
  avocado: {
    id: 'avocado',
    name: 'Avocado',
    category: 'fruit',
    emissionsPerKg: 2.5,
    low: 1.5,
    high: 6.0,
    unit: 'kg CO₂eq / kg',
    source: 'Clune et al. 2017; Heller & Keoleian 2014',
    productionNote:
      'Moderate GHG footprint but high water and land use. Air-freighted avocados can triple this figure. Deforestation in Mexico is an emerging concern.',
    plantBasedAlternativeId: null,
    color: '#4d7c0f',
  },
};

// Category display metadata
export const CATEGORIES = {
  meat: { label: 'Meat', color: '#dc2626', icon: '🥩' },
  seafood: { label: 'Seafood', color: '#0284c7', icon: '🐟' },
  dairy: { label: 'Dairy & Eggs', color: '#d97706', icon: '🥛' },
  plant_protein: { label: 'Plant Protein', color: '#16a34a', icon: '🫘' },
  grain: { label: 'Grains', color: '#65a30d', icon: '🌾' },
  vegetable: { label: 'Vegetables', color: '#059669', icon: '🥦' },
  fruit: { label: 'Fruit', color: '#d97706', icon: '🍎' },
  oil: { label: 'Oils', color: '#ca8a04', icon: '🫙' },
  dairy_alternative: { label: 'Dairy Alternatives', color: '#0891b2', icon: '🌿' },
  beverage: { label: 'Beverages', color: '#6b7280', icon: '☕' },
  other: { label: 'Other', color: '#7c3aed', icon: '🍫' },
};

// For ranking context
export const CONTEXT_COMPARISONS = [
  { label: 'Driving 1 km (avg car)', kgCO2eq: 0.21 },
  { label: 'One transatlantic flight (per passenger)', kgCO2eq: 500 },
  { label: 'Average weekly food footprint (UK)', kgCO2eq: 25 },
  { label: 'Average weekly food footprint (USA)', kgCO2eq: 32 },
  { label: 'Average weekly food footprint (plant-rich diet)', kgCO2eq: 8 },
];
