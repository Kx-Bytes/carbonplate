/**
 * Pre-built meal templates with ingredient weights.
 * Weights are approximate typical serving sizes in grams.
 * Each meal has a plant-based equivalent that mirrors it as closely as possible.
 *
 * Portion sizes based on:
 *   - USDA food pattern equivalents
 *   - NHS Eatwell Guide portion sizes
 *   - Standard UK/US recipe databases
 */

export const MEAL_TYPES = ['breakfast', 'lunch', 'dinner', 'snack'];

export const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

// Meals: each ingredient entry is { ingredientId, grams, description }
export const MEALS = {
  // ─── BREAKFAST ───────────────────────────────────────────────────────────
  bacon_and_eggs: {
    id: 'bacon_and_eggs',
    name: 'Bacon & Eggs',
    mealType: 'breakfast',
    emoji: '🍳',
    description: '2 rashers of back bacon, 2 fried eggs, slice of toast with butter',
    ingredients: [
      { ingredientId: 'pork', grams: 60, description: '2 rashers back bacon' },
      { ingredientId: 'eggs', grams: 110, description: '2 large eggs' },
      { ingredientId: 'wheat_bread', grams: 40, description: '1 slice toast' },
      { ingredientId: 'butter', grams: 10, description: 'Spread butter' },
      { ingredientId: 'milk_dairy', grams: 30, description: 'Splash of milk in tea/coffee' },
    ],
    plantBasedMealId: 'tofu_scramble',
  },
  tofu_scramble: {
    id: 'tofu_scramble',
    name: 'Tofu Scramble',
    mealType: 'breakfast',
    emoji: '🌿',
    description: 'Scrambled silken tofu with turmeric, spinach, toast with olive oil spread',
    ingredients: [
      { ingredientId: 'tofu', grams: 150, description: 'Silken tofu (scrambled)' },
      { ingredientId: 'leafy_greens', grams: 50, description: 'Spinach' },
      { ingredientId: 'wheat_bread', grams: 40, description: '1 slice toast' },
      { ingredientId: 'olive_oil', grams: 8, description: 'Olive oil spread' },
      { ingredientId: 'oat_milk', grams: 30, description: 'Oat milk latte' },
    ],
    plantBasedMealId: null,
    isPlantBased: true,
  },

  cereal_with_milk: {
    id: 'cereal_with_milk',
    name: 'Cereal with Dairy Milk',
    mealType: 'breakfast',
    emoji: '🥣',
    description: 'Bowl of breakfast cereal with full-fat dairy milk',
    ingredients: [
      { ingredientId: 'wheat_bread', grams: 45, description: 'Breakfast cereal (wheat-based)' },
      { ingredientId: 'milk_dairy', grams: 200, description: 'Full-fat dairy milk' },
    ],
    plantBasedMealId: 'oat_porridge',
  },
  oat_porridge: {
    id: 'oat_porridge',
    name: 'Oat Porridge (oat milk)',
    mealType: 'breakfast',
    emoji: '🌾',
    description: 'Porridge oats cooked with oat milk, topped with berries and banana',
    ingredients: [
      { ingredientId: 'oats', grams: 80, description: 'Rolled oats' },
      { ingredientId: 'oat_milk', grams: 200, description: 'Oat milk' },
      { ingredientId: 'berries', grams: 50, description: 'Mixed berries' },
      { ingredientId: 'fruit_tropical', grams: 60, description: 'Half banana' },
    ],
    plantBasedMealId: null,
    isPlantBased: true,
  },

  full_english: {
    id: 'full_english',
    name: 'Full English Breakfast',
    mealType: 'breakfast',
    emoji: '🍽️',
    description: 'Bacon, sausage, eggs, baked beans, toast, butter',
    ingredients: [
      { ingredientId: 'pork', grams: 80, description: '2 rashers bacon + 1 sausage' },
      { ingredientId: 'eggs', grams: 110, description: '2 eggs' },
      { ingredientId: 'legumes', grams: 120, description: 'Baked beans' },
      { ingredientId: 'wheat_bread', grams: 80, description: '2 slices toast' },
      { ingredientId: 'butter', grams: 15, description: 'Butter' },
      { ingredientId: 'tomatoes', grams: 80, description: '2 grilled tomatoes' },
    ],
    plantBasedMealId: 'vegan_fry_up',
  },
  vegan_fry_up: {
    id: 'vegan_fry_up',
    name: 'Vegan Fry-Up',
    mealType: 'breakfast',
    emoji: '🌱',
    description: 'Tofu scramble, tempeh rashers, baked beans, grilled tomatoes, toast',
    ingredients: [
      { ingredientId: 'tempeh', grams: 80, description: 'Tempeh rashers' },
      { ingredientId: 'tofu', grams: 100, description: 'Tofu scramble' },
      { ingredientId: 'legumes', grams: 120, description: 'Baked beans' },
      { ingredientId: 'wheat_bread', grams: 80, description: '2 slices toast' },
      { ingredientId: 'olive_oil', grams: 10, description: 'Olive oil' },
      { ingredientId: 'tomatoes', grams: 80, description: '2 grilled tomatoes' },
    ],
    plantBasedMealId: null,
    isPlantBased: true,
  },

  yogurt_parfait: {
    id: 'yogurt_parfait',
    name: 'Yogurt Parfait',
    mealType: 'breakfast',
    emoji: '🫙',
    description: 'Greek yogurt, granola, honey, mixed berries',
    ingredients: [
      { ingredientId: 'yogurt', grams: 200, description: 'Greek yogurt' },
      { ingredientId: 'oats', grams: 40, description: 'Granola (oat-based)' },
      { ingredientId: 'berries', grams: 80, description: 'Mixed berries' },
    ],
    plantBasedMealId: 'soy_yogurt_parfait',
  },
  soy_yogurt_parfait: {
    id: 'soy_yogurt_parfait',
    name: 'Soy Yogurt Parfait',
    mealType: 'breakfast',
    emoji: '🌿',
    description: 'Soy yogurt, granola, maple syrup, mixed berries',
    ingredients: [
      { ingredientId: 'soy_milk', grams: 200, description: 'Soy yogurt (from soy milk base)' },
      { ingredientId: 'oats', grams: 40, description: 'Granola (oat-based)' },
      { ingredientId: 'berries', grams: 80, description: 'Mixed berries' },
    ],
    plantBasedMealId: null,
    isPlantBased: true,
  },

  avocado_toast: {
    id: 'avocado_toast',
    name: 'Avocado Toast',
    mealType: 'breakfast',
    emoji: '🥑',
    description: 'Sourdough toast with smashed avocado, poached egg, chilli flakes',
    ingredients: [
      { ingredientId: 'wheat_bread', grams: 80, description: '2 slices sourdough' },
      { ingredientId: 'avocado', grams: 100, description: '½ avocado' },
      { ingredientId: 'eggs', grams: 55, description: '1 poached egg' },
      { ingredientId: 'olive_oil', grams: 5, description: 'Drizzle olive oil' },
    ],
    plantBasedMealId: 'avocado_toast_vegan',
  },
  avocado_toast_vegan: {
    id: 'avocado_toast_vegan',
    name: 'Avocado Toast (vegan)',
    mealType: 'breakfast',
    emoji: '🥑',
    description: 'Sourdough toast with smashed avocado, cherry tomatoes, pumpkin seeds',
    ingredients: [
      { ingredientId: 'wheat_bread', grams: 80, description: '2 slices sourdough' },
      { ingredientId: 'avocado', grams: 100, description: '½ avocado' },
      { ingredientId: 'tomatoes', grams: 60, description: 'Cherry tomatoes' },
      { ingredientId: 'olive_oil', grams: 5, description: 'Drizzle olive oil' },
      { ingredientId: 'nuts', grams: 15, description: 'Pumpkin seeds' },
    ],
    plantBasedMealId: null,
    isPlantBased: true,
  },

  // ─── LUNCH ───────────────────────────────────────────────────────────────
  beef_burger: {
    id: 'beef_burger',
    name: 'Beef Burger',
    mealType: 'lunch',
    emoji: '🍔',
    description: 'Quarter-pound beef patty in a bun with cheese, lettuce, tomato, ketchup',
    ingredients: [
      { ingredientId: 'beef_beef_herd', grams: 115, description: 'Quarter-lb beef patty' },
      { ingredientId: 'cheese', grams: 25, description: '1 slice cheddar' },
      { ingredientId: 'wheat_bread', grams: 80, description: 'Burger bun' },
      { ingredientId: 'tomatoes', grams: 40, description: 'Tomato slices' },
      { ingredientId: 'leafy_greens', grams: 20, description: 'Lettuce' },
    ],
    plantBasedMealId: 'black_bean_burger',
  },
  black_bean_burger: {
    id: 'black_bean_burger',
    name: 'Black Bean Burger',
    mealType: 'lunch',
    emoji: '🫘',
    description: 'Black bean and oat patty in a bun with avocado, lettuce, tomato, hot sauce',
    ingredients: [
      { ingredientId: 'legumes', grams: 120, description: 'Black bean patty' },
      { ingredientId: 'oats', grams: 20, description: 'Oat binder in patty' },
      { ingredientId: 'wheat_bread', grams: 80, description: 'Burger bun' },
      { ingredientId: 'avocado', grams: 40, description: 'Avocado' },
      { ingredientId: 'tomatoes', grams: 40, description: 'Tomato slices' },
      { ingredientId: 'leafy_greens', grams: 20, description: 'Lettuce' },
    ],
    plantBasedMealId: null,
    isPlantBased: true,
  },

  chicken_sandwich: {
    id: 'chicken_sandwich',
    name: 'Chicken & Cheese Sandwich',
    mealType: 'lunch',
    emoji: '🥪',
    description: 'Grilled chicken breast, cheddar, mayo, lettuce, tomato on white bread',
    ingredients: [
      { ingredientId: 'chicken', grams: 130, description: 'Grilled chicken breast' },
      { ingredientId: 'cheese', grams: 30, description: 'Cheddar slice' },
      { ingredientId: 'wheat_bread', grams: 80, description: '2 slices white bread' },
      { ingredientId: 'milk_dairy', grams: 15, description: 'Mayonnaise (egg/dairy base)' },
      { ingredientId: 'tomatoes', grams: 40, description: 'Tomato' },
      { ingredientId: 'leafy_greens', grams: 20, description: 'Lettuce' },
    ],
    plantBasedMealId: 'tempeh_sandwich',
  },
  tempeh_sandwich: {
    id: 'tempeh_sandwich',
    name: 'Tempeh & Avocado Sandwich',
    mealType: 'lunch',
    emoji: '🥙',
    description: 'Marinated tempeh, avocado, sundried tomatoes, rocket on sourdough',
    ingredients: [
      { ingredientId: 'tempeh', grams: 120, description: 'Marinated tempeh slices' },
      { ingredientId: 'avocado', grams: 50, description: 'Avocado' },
      { ingredientId: 'wheat_bread', grams: 80, description: '2 slices sourdough' },
      { ingredientId: 'tomatoes', grams: 40, description: 'Sundried / fresh tomatoes' },
      { ingredientId: 'leafy_greens', grams: 20, description: 'Rocket' },
    ],
    plantBasedMealId: null,
    isPlantBased: true,
  },

  tuna_pasta_salad: {
    id: 'tuna_pasta_salad',
    name: 'Tuna Pasta Salad',
    mealType: 'lunch',
    emoji: '🐟',
    description: 'Canned tuna, pasta, sweetcorn, red onion, mayo dressing',
    ingredients: [
      { ingredientId: 'tuna_canned', grams: 120, description: 'Canned tuna (drained)' },
      { ingredientId: 'pasta', grams: 100, description: 'Cooked pasta (dry weight ~60g)' },
      { ingredientId: 'other_vegetables', grams: 80, description: 'Sweetcorn, red onion' },
      { ingredientId: 'milk_dairy', grams: 30, description: 'Mayo (egg/dairy base)' },
    ],
    plantBasedMealId: 'chickpea_pasta_salad',
  },
  chickpea_pasta_salad: {
    id: 'chickpea_pasta_salad',
    name: 'Chickpea Pasta Salad',
    mealType: 'lunch',
    emoji: '🫘',
    description: 'Chickpeas, pasta, roasted peppers, spinach, lemon-tahini dressing',
    ingredients: [
      { ingredientId: 'chickpeas', grams: 120, description: 'Cooked chickpeas' },
      { ingredientId: 'pasta', grams: 100, description: 'Cooked pasta' },
      { ingredientId: 'other_vegetables', grams: 80, description: 'Roasted peppers, onion' },
      { ingredientId: 'leafy_greens', grams: 30, description: 'Spinach' },
      { ingredientId: 'nuts', grams: 15, description: 'Tahini (sesame paste)' },
    ],
    plantBasedMealId: null,
    isPlantBased: true,
  },

  caesar_salad_chicken: {
    id: 'caesar_salad_chicken',
    name: 'Caesar Salad with Chicken',
    mealType: 'lunch',
    emoji: '🥗',
    description: 'Romaine, grilled chicken, parmesan, Caesar dressing, croutons',
    ingredients: [
      { ingredientId: 'chicken', grams: 120, description: 'Grilled chicken breast' },
      { ingredientId: 'leafy_greens', grams: 120, description: 'Romaine lettuce' },
      { ingredientId: 'cheese', grams: 20, description: 'Parmesan' },
      { ingredientId: 'wheat_bread', grams: 30, description: 'Croutons' },
      { ingredientId: 'eggs', grams: 20, description: 'Caesar dressing (egg-based)' },
    ],
    plantBasedMealId: 'caesar_salad_tofu',
  },
  caesar_salad_tofu: {
    id: 'caesar_salad_tofu',
    name: 'Caesar Salad with Tofu',
    mealType: 'lunch',
    emoji: '🥗',
    description: 'Romaine, crispy tofu, nutritional yeast, cashew Caesar dressing, croutons',
    ingredients: [
      { ingredientId: 'tofu', grams: 120, description: 'Crispy baked tofu' },
      { ingredientId: 'leafy_greens', grams: 120, description: 'Romaine lettuce' },
      { ingredientId: 'nuts', grams: 20, description: 'Cashew Caesar dressing' },
      { ingredientId: 'wheat_bread', grams: 30, description: 'Croutons' },
    ],
    plantBasedMealId: null,
    isPlantBased: true,
  },

  blt_sandwich: {
    id: 'blt_sandwich',
    name: 'BLT Sandwich',
    mealType: 'lunch',
    emoji: '🥓',
    description: 'Bacon, lettuce, tomato on toasted bread with mayo',
    ingredients: [
      { ingredientId: 'pork', grams: 80, description: '3 rashers bacon' },
      { ingredientId: 'leafy_greens', grams: 30, description: 'Lettuce' },
      { ingredientId: 'tomatoes', grams: 80, description: 'Tomato' },
      { ingredientId: 'wheat_bread', grams: 80, description: '2 slices toast' },
      { ingredientId: 'eggs', grams: 20, description: 'Mayo (egg-based)' },
    ],
    plantBasedMealId: 'tempeh_blt',
  },
  tempeh_blt: {
    id: 'tempeh_blt',
    name: 'Smoky Tempeh BLT',
    mealType: 'lunch',
    emoji: '🌿',
    description: 'Smoky tempeh rashers, lettuce, tomato on toast with vegan mayo',
    ingredients: [
      { ingredientId: 'tempeh', grams: 80, description: 'Tempeh rashers (smoked/marinated)' },
      { ingredientId: 'leafy_greens', grams: 30, description: 'Lettuce' },
      { ingredientId: 'tomatoes', grams: 80, description: 'Tomato' },
      { ingredientId: 'wheat_bread', grams: 80, description: '2 slices toast' },
      { ingredientId: 'nuts', grams: 15, description: 'Cashew mayo' },
    ],
    plantBasedMealId: null,
    isPlantBased: true,
  },

  // ─── DINNER ──────────────────────────────────────────────────────────────
  steak_dinner: {
    id: 'steak_dinner',
    name: 'Steak Dinner',
    mealType: 'dinner',
    emoji: '🥩',
    description: '8oz sirloin steak, roasted potatoes, buttered green beans',
    ingredients: [
      { ingredientId: 'beef_beef_herd', grams: 225, description: '8oz sirloin steak' },
      { ingredientId: 'potatoes', grams: 200, description: 'Roast potatoes' },
      { ingredientId: 'other_vegetables', grams: 120, description: 'Green beans' },
      { ingredientId: 'butter', grams: 20, description: 'Butter for veg' },
    ],
    plantBasedMealId: 'mushroom_steak_dinner',
  },
  mushroom_steak_dinner: {
    id: 'mushroom_steak_dinner',
    name: 'Portobello "Steak" Dinner',
    mealType: 'dinner',
    emoji: '🍄',
    description: 'Marinated portobello mushrooms, roasted potatoes, green beans, herb oil',
    ingredients: [
      { ingredientId: 'other_vegetables', grams: 250, description: 'Portobello mushrooms (2 large)' },
      { ingredientId: 'potatoes', grams: 200, description: 'Roast potatoes' },
      { ingredientId: 'other_vegetables', grams: 120, description: 'Green beans' },
      { ingredientId: 'olive_oil', grams: 15, description: 'Herb olive oil' },
    ],
    plantBasedMealId: null,
    isPlantBased: true,
  },

  spaghetti_bolognese: {
    id: 'spaghetti_bolognese',
    name: 'Spaghetti Bolognese',
    mealType: 'dinner',
    emoji: '🍝',
    description: 'Beef mince ragu, spaghetti, parmesan, served with garlic bread',
    ingredients: [
      { ingredientId: 'beef_beef_herd', grams: 150, description: 'Beef mince' },
      { ingredientId: 'pasta', grams: 100, description: 'Spaghetti (dry weight)' },
      { ingredientId: 'tomatoes', grams: 150, description: 'Tomato sauce' },
      { ingredientId: 'cheese', grams: 20, description: 'Parmesan' },
      { ingredientId: 'wheat_bread', grams: 50, description: 'Garlic bread' },
      { ingredientId: 'butter', grams: 10, description: 'Garlic butter' },
    ],
    plantBasedMealId: 'lentil_bolognese',
  },
  lentil_bolognese: {
    id: 'lentil_bolognese',
    name: 'Lentil Bolognese',
    mealType: 'dinner',
    emoji: '🌿',
    description: 'Puy lentil ragu with herbs, spaghetti, nutritional yeast, garlic bread',
    ingredients: [
      { ingredientId: 'legumes', grams: 150, description: 'Puy lentils' },
      { ingredientId: 'pasta', grams: 100, description: 'Spaghetti (dry weight)' },
      { ingredientId: 'tomatoes', grams: 150, description: 'Tomato sauce' },
      { ingredientId: 'other_vegetables', grams: 80, description: 'Carrot, celery, onion (sofrito)' },
      { ingredientId: 'wheat_bread', grams: 50, description: 'Garlic bread' },
      { ingredientId: 'olive_oil', grams: 10, description: 'Olive oil' },
    ],
    plantBasedMealId: null,
    isPlantBased: true,
  },

  chicken_stir_fry: {
    id: 'chicken_stir_fry',
    name: 'Chicken Stir-Fry',
    mealType: 'dinner',
    emoji: '🍜',
    description: 'Chicken breast stir-fried with mixed veg, soy sauce, served with jasmine rice',
    ingredients: [
      { ingredientId: 'chicken', grams: 160, description: 'Chicken breast' },
      { ingredientId: 'other_vegetables', grams: 150, description: 'Mixed veg (peppers, broccoli, snap peas)' },
      { ingredientId: 'rice', grams: 85, description: 'Jasmine rice (dry weight)' },
      { ingredientId: 'sunflower_oil', grams: 10, description: 'Stir-fry oil' },
    ],
    plantBasedMealId: 'tofu_stir_fry',
  },
  tofu_stir_fry: {
    id: 'tofu_stir_fry',
    name: 'Tofu Stir-Fry',
    mealType: 'dinner',
    emoji: '🥢',
    description: 'Crispy tofu with mixed veg, ginger-garlic-soy sauce, jasmine rice, sesame',
    ingredients: [
      { ingredientId: 'tofu', grams: 160, description: 'Firm tofu (crispy-fried)' },
      { ingredientId: 'other_vegetables', grams: 150, description: 'Mixed veg (peppers, broccoli, snap peas)' },
      { ingredientId: 'rice', grams: 85, description: 'Jasmine rice (dry weight)' },
      { ingredientId: 'sunflower_oil', grams: 10, description: 'Stir-fry oil' },
      { ingredientId: 'nuts', grams: 10, description: 'Sesame seeds' },
    ],
    plantBasedMealId: null,
    isPlantBased: true,
  },

  salmon_fillet: {
    id: 'salmon_fillet',
    name: 'Salmon Fillet with Rice',
    mealType: 'dinner',
    emoji: '🐟',
    description: 'Pan-seared Atlantic salmon, steamed broccoli, basmati rice, lemon butter',
    ingredients: [
      { ingredientId: 'salmon', grams: 180, description: 'Salmon fillet (farmed Atlantic)' },
      { ingredientId: 'rice', grams: 85, description: 'Basmati rice (dry weight)' },
      { ingredientId: 'other_vegetables', grams: 150, description: 'Steamed broccoli' },
      { ingredientId: 'butter', grams: 15, description: 'Lemon butter' },
    ],
    plantBasedMealId: 'tofu_nori_rice',
  },
  tofu_nori_rice: {
    id: 'tofu_nori_rice',
    name: 'Sesame Tofu with Rice & Greens',
    mealType: 'dinner',
    emoji: '🌿',
    description: 'Sesame-crusted tofu, steamed broccoli, basmati rice, miso dressing',
    ingredients: [
      { ingredientId: 'tofu', grams: 180, description: 'Firm tofu (sesame-crusted)' },
      { ingredientId: 'rice', grams: 85, description: 'Basmati rice (dry weight)' },
      { ingredientId: 'other_vegetables', grams: 150, description: 'Steamed broccoli' },
      { ingredientId: 'nuts', grams: 10, description: 'Sesame seeds' },
      { ingredientId: 'sunflower_oil', grams: 8, description: 'Sesame/sunflower oil blend' },
    ],
    plantBasedMealId: null,
    isPlantBased: true,
  },

  lamb_curry: {
    id: 'lamb_curry',
    name: 'Lamb Curry',
    mealType: 'dinner',
    emoji: '🍛',
    description: 'Slow-cooked lamb shoulder curry, basmati rice, naan bread, yogurt raita',
    ingredients: [
      { ingredientId: 'lamb_mutton', grams: 200, description: 'Lamb shoulder' },
      { ingredientId: 'rice', grams: 85, description: 'Basmati rice (dry weight)' },
      { ingredientId: 'wheat_bread', grams: 80, description: 'Naan bread' },
      { ingredientId: 'yogurt', grams: 60, description: 'Raita yogurt' },
      { ingredientId: 'tomatoes', grams: 100, description: 'Tomato base' },
      { ingredientId: 'other_vegetables', grams: 80, description: 'Onion, spinach' },
    ],
    plantBasedMealId: 'chickpea_curry',
  },
  chickpea_curry: {
    id: 'chickpea_curry',
    name: 'Chickpea Dhal Curry',
    mealType: 'dinner',
    emoji: '🍛',
    description: 'Chickpea and lentil dhal, basmati rice, chapati, mango chutney',
    ingredients: [
      { ingredientId: 'chickpeas', grams: 120, description: 'Chickpeas' },
      { ingredientId: 'legumes', grams: 80, description: 'Red lentils' },
      { ingredientId: 'rice', grams: 85, description: 'Basmati rice (dry weight)' },
      { ingredientId: 'wheat_bread', grams: 60, description: 'Chapati' },
      { ingredientId: 'tomatoes', grams: 100, description: 'Tomato base' },
      { ingredientId: 'other_vegetables', grams: 80, description: 'Onion, spinach' },
      { ingredientId: 'sunflower_oil', grams: 10, description: 'Cooking oil' },
    ],
    plantBasedMealId: null,
    isPlantBased: true,
  },

  pork_chops: {
    id: 'pork_chops',
    name: 'Pork Chops & Mash',
    mealType: 'dinner',
    emoji: '🐷',
    description: 'Grilled pork loin chops, buttery mashed potato, steamed veg, gravy',
    ingredients: [
      { ingredientId: 'pork', grams: 200, description: 'Pork loin chops' },
      { ingredientId: 'potatoes', grams: 250, description: 'Mashed potato' },
      { ingredientId: 'butter', grams: 20, description: 'Butter in mash' },
      { ingredientId: 'milk_dairy', grams: 50, description: 'Milk in mash' },
      { ingredientId: 'other_vegetables', grams: 120, description: 'Steamed veg' },
    ],
    plantBasedMealId: 'seitan_mash',
  },
  seitan_mash: {
    id: 'seitan_mash',
    name: 'Seitan Chops & Mash',
    mealType: 'dinner',
    emoji: '🌿',
    description: 'Grilled seitan steaks, vegan mash (oat milk, olive oil), steamed veg, onion gravy',
    ingredients: [
      { ingredientId: 'seitan', grams: 200, description: 'Seitan steaks' },
      { ingredientId: 'potatoes', grams: 250, description: 'Mashed potato' },
      { ingredientId: 'olive_oil', grams: 15, description: 'Olive oil in mash' },
      { ingredientId: 'oat_milk', grams: 60, description: 'Oat milk in mash' },
      { ingredientId: 'other_vegetables', grams: 120, description: 'Steamed veg' },
    ],
    plantBasedMealId: null,
    isPlantBased: true,
  },

  beef_tacos: {
    id: 'beef_tacos',
    name: 'Beef Tacos (3)',
    mealType: 'dinner',
    emoji: '🌮',
    description: '3 corn tortillas, seasoned beef mince, sour cream, cheese, salsa',
    ingredients: [
      { ingredientId: 'beef_beef_herd', grams: 180, description: 'Seasoned beef mince' },
      { ingredientId: 'wheat_bread', grams: 80, description: '3 corn tortillas' },
      { ingredientId: 'milk_dairy', grams: 40, description: 'Sour cream' },
      { ingredientId: 'cheese', grams: 30, description: 'Grated cheddar' },
      { ingredientId: 'tomatoes', grams: 60, description: 'Salsa' },
      { ingredientId: 'leafy_greens', grams: 30, description: 'Lettuce/cabbage' },
    ],
    plantBasedMealId: 'bean_tacos',
  },
  bean_tacos: {
    id: 'bean_tacos',
    name: 'Bean Tacos (3)',
    mealType: 'dinner',
    emoji: '🌮',
    description: '3 corn tortillas, spiced black beans, guacamole, salsa, shredded cabbage',
    ingredients: [
      { ingredientId: 'legumes', grams: 180, description: 'Spiced black beans' },
      { ingredientId: 'wheat_bread', grams: 80, description: '3 corn tortillas' },
      { ingredientId: 'avocado', grams: 60, description: 'Guacamole' },
      { ingredientId: 'tomatoes', grams: 60, description: 'Salsa' },
      { ingredientId: 'leafy_greens', grams: 30, description: 'Shredded cabbage' },
    ],
    plantBasedMealId: null,
    isPlantBased: true,
  },

  roast_chicken_dinner: {
    id: 'roast_chicken_dinner',
    name: 'Roast Chicken Dinner',
    mealType: 'dinner',
    emoji: '🍗',
    description: 'Roast chicken thigh, roast potatoes, carrots, peas, gravy, Yorkshire pudding',
    ingredients: [
      { ingredientId: 'chicken', grams: 220, description: 'Chicken thigh (bone-in, skin-on)' },
      { ingredientId: 'potatoes', grams: 200, description: 'Roast potatoes' },
      { ingredientId: 'root_vegetables', grams: 100, description: 'Carrots & parsnips' },
      { ingredientId: 'other_vegetables', grams: 80, description: 'Peas' },
      { ingredientId: 'eggs', grams: 30, description: 'Yorkshire pudding (egg-based)' },
      { ingredientId: 'wheat_bread', grams: 20, description: 'Gravy (flour thickener)' },
    ],
    plantBasedMealId: 'nut_roast_dinner',
  },
  nut_roast_dinner: {
    id: 'nut_roast_dinner',
    name: 'Nut Roast Dinner',
    mealType: 'dinner',
    emoji: '🌰',
    description: 'Walnut and lentil roast, roast potatoes, carrots, peas, mushroom gravy',
    ingredients: [
      { ingredientId: 'nuts', grams: 100, description: 'Mixed nuts (walnut/cashew roast)' },
      { ingredientId: 'legumes', grams: 100, description: 'Lentils in roast' },
      { ingredientId: 'potatoes', grams: 200, description: 'Roast potatoes' },
      { ingredientId: 'root_vegetables', grams: 100, description: 'Carrots & parsnips' },
      { ingredientId: 'other_vegetables', grams: 80, description: 'Peas & mushrooms' },
      { ingredientId: 'olive_oil', grams: 15, description: 'Olive oil' },
    ],
    plantBasedMealId: null,
    isPlantBased: true,
  },

  shrimp_pasta: {
    id: 'shrimp_pasta',
    name: 'Garlic Shrimp Pasta',
    mealType: 'dinner',
    emoji: '🦐',
    description: 'Farmed shrimp, linguine, garlic, white wine, butter, parsley',
    ingredients: [
      { ingredientId: 'shrimp_farmed', grams: 180, description: 'Farmed shrimp' },
      { ingredientId: 'pasta', grams: 100, description: 'Linguine (dry weight)' },
      { ingredientId: 'butter', grams: 20, description: 'Butter sauce' },
      { ingredientId: 'other_vegetables', grams: 30, description: 'Garlic' },
      { ingredientId: 'leafy_greens', grams: 10, description: 'Parsley' },
    ],
    plantBasedMealId: 'mushroom_pasta',
  },
  mushroom_pasta: {
    id: 'mushroom_pasta',
    name: 'Creamy Mushroom Pasta',
    mealType: 'dinner',
    emoji: '🍄',
    description: 'Linguine, mixed mushrooms, garlic, cashew cream sauce, parsley',
    ingredients: [
      { ingredientId: 'other_vegetables', grams: 200, description: 'Mixed mushrooms' },
      { ingredientId: 'pasta', grams: 100, description: 'Linguine (dry weight)' },
      { ingredientId: 'nuts', grams: 30, description: 'Cashew cream' },
      { ingredientId: 'other_vegetables', grams: 20, description: 'Garlic' },
      { ingredientId: 'leafy_greens', grams: 10, description: 'Parsley' },
      { ingredientId: 'olive_oil', grams: 10, description: 'Olive oil' },
    ],
    plantBasedMealId: null,
    isPlantBased: true,
  },

  // ─── SNACKS ──────────────────────────────────────────────────────────────
  cheese_crackers: {
    id: 'cheese_crackers',
    name: 'Cheese & Crackers',
    mealType: 'snack',
    emoji: '🧀',
    description: 'Mature cheddar with oat crackers',
    ingredients: [
      { ingredientId: 'cheese', grams: 50, description: 'Mature cheddar' },
      { ingredientId: 'oats', grams: 30, description: 'Oat crackers' },
    ],
    plantBasedMealId: 'hummus_crackers',
  },
  hummus_crackers: {
    id: 'hummus_crackers',
    name: 'Hummus & Crackers',
    mealType: 'snack',
    emoji: '🫘',
    description: 'Homemade hummus (chickpeas, tahini) with oat crackers and veggie sticks',
    ingredients: [
      { ingredientId: 'chickpeas', grams: 60, description: 'Chickpea hummus base' },
      { ingredientId: 'nuts', grams: 15, description: 'Tahini (sesame)' },
      { ingredientId: 'oats', grams: 30, description: 'Oat crackers' },
      { ingredientId: 'root_vegetables', grams: 50, description: 'Carrot & celery sticks' },
    ],
    plantBasedMealId: null,
    isPlantBased: true,
  },

  mixed_nuts_snack: {
    id: 'mixed_nuts_snack',
    name: 'Mixed Nuts',
    mealType: 'snack',
    emoji: '🥜',
    description: 'Handful of mixed nuts (walnuts, almonds, cashews)',
    ingredients: [
      { ingredientId: 'nuts', grams: 40, description: 'Mixed nuts' },
    ],
    plantBasedMealId: null,
    isPlantBased: true,
  },

  yogurt_snack: {
    id: 'yogurt_snack',
    name: 'Greek Yogurt & Honey',
    mealType: 'snack',
    emoji: '🍯',
    description: 'Small pot of Greek yogurt with honey',
    ingredients: [
      { ingredientId: 'yogurt', grams: 150, description: 'Greek yogurt' },
    ],
    plantBasedMealId: 'soy_yogurt_snack',
  },
  soy_yogurt_snack: {
    id: 'soy_yogurt_snack',
    name: 'Soy Yogurt & Fruit',
    mealType: 'snack',
    emoji: '🌱',
    description: 'Soy-based yogurt with mixed berries',
    ingredients: [
      { ingredientId: 'soy_milk', grams: 150, description: 'Soy yogurt' },
      { ingredientId: 'berries', grams: 60, description: 'Mixed berries' },
    ],
    plantBasedMealId: null,
    isPlantBased: true,
  },

  chocolate_snack: {
    id: 'chocolate_snack',
    name: 'Dark Chocolate',
    mealType: 'snack',
    emoji: '🍫',
    description: '2 squares of dark chocolate',
    ingredients: [
      { ingredientId: 'dark_chocolate', grams: 25, description: '2 squares dark chocolate (70%+)' },
    ],
    plantBasedMealId: null,
    isPlantBased: true,
  },

  fruit_snack: {
    id: 'fruit_snack',
    name: 'Fresh Fruit',
    mealType: 'snack',
    emoji: '🍎',
    description: 'An apple and a banana',
    ingredients: [
      { ingredientId: 'fruit_tropical', grams: 120, description: 'Banana + apple' },
    ],
    plantBasedMealId: null,
    isPlantBased: true,
  },
};

// Group meals by type for the UI selector
export const MEALS_BY_TYPE = MEAL_TYPES.reduce((acc, type) => {
  acc[type] = Object.values(MEALS).filter(m => m.mealType === type);
  return acc;
}, {});

// Separate non-plant-based meals (these are the ones to show in the "add meal" selector)
export const USER_SELECTABLE_MEALS = Object.values(MEALS).filter(m => !m.isPlantBased);
export const PLANT_BASED_MEALS = Object.values(MEALS).filter(m => m.isPlantBased);
