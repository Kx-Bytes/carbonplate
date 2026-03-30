import { useState, useMemo } from 'react';
import { INGREDIENTS, CATEGORIES } from '../data/emissions.js';
import { RAW_INGREDIENT_IDS } from '../data/emissions.js';
import { fmtCO2 } from '../utils/formatters.js';

const EMOJI_BY_CATEGORY = {
  meat: '🥩', seafood: '🐟', dairy: '🥛', dairy_alternative: '🌿',
  plant_protein: '🫘', grain: '🌾', vegetable: '🥦', fruit: '🍎',
  nuts_seeds: '🥜', oil: '🫙', beverage: '☕', confectionery: '🍫',
  baked_goods: '🍰', condiment: '🧂', other: '🍬',
};

export default function CustomMealBuilder({ onSave, onClose }) {
  const [mealName, setMealName] = useState('');
  const [mealType, setMealType] = useState('dinner');
  const [rows, setRows] = useState([{ ingredientId: '', grams: 100 }]);
  const [search, setSearch] = useState('');
  const [activeRow, setActiveRow] = useState(null); // index of row being edited

  // All raw ingredients sorted by name
  const allIngredients = useMemo(() => {
    return RAW_INGREDIENT_IDS
      .map(id => INGREDIENTS[id])
      .filter(Boolean)
      .sort((a, b) => a.name.localeCompare(b.name));
  }, []);

  // Filtered list for the dropdown
  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return q
      ? allIngredients.filter(i =>
          i.name.toLowerCase().includes(q) ||
          (CATEGORIES[i.category]?.label || '').toLowerCase().includes(q)
        )
      : allIngredients;
  }, [allIngredients, search]);

  // Live total emissions
  const totalKgCO2 = useMemo(() => {
    return rows.reduce((sum, row) => {
      const ing = INGREDIENTS[row.ingredientId];
      if (!ing || !row.grams) return sum;
      return sum + (row.grams / 1000) * ing.emissionsPerKg;
    }, 0);
  }, [rows]);

  const validRows = rows.filter(r => r.ingredientId && r.grams > 0);

  const handleSave = () => {
    if (!mealName.trim() || validRows.length === 0) return;
    onSave({
      id: `custom_${Date.now()}`,
      name: mealName.trim(),
      mealType,
      emoji: '✏️',
      description: `Custom meal: ${validRows.map(r => INGREDIENTS[r.ingredientId]?.name).join(', ')}`,
      ingredients: validRows.map(r => ({
        ingredientId: r.ingredientId,
        grams: Number(r.grams),
        description: INGREDIENTS[r.ingredientId]?.name || r.ingredientId,
      })),
      plantBasedMealId: null,
      isCustom: true,
    });
  };

  const addRow = () => setRows(prev => [...prev, { ingredientId: '', grams: 100 }]);
  const removeRow = (i) => setRows(prev => prev.filter((_, idx) => idx !== i));
  const updateRow = (i, field, value) => {
    setRows(prev => prev.map((r, idx) => idx === i ? { ...r, [field]: value } : r));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-5 pt-5 pb-3 border-b border-gray-100">
          <div>
            <h3 className="font-semibold text-gray-900 text-lg">Build Custom Meal</h3>
            <p className="text-xs text-gray-500 mt-0.5">Pick any ingredients and set your exact portion weights</p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-xl font-light">✕</button>
        </div>

        <div className="overflow-y-auto flex-1 px-5 py-4 space-y-4">
          {/* Name + type */}
          <div className="flex gap-3">
            <div className="flex-1">
              <label className="block text-xs font-semibold text-gray-600 mb-1">Meal name</label>
              <input
                type="text"
                placeholder="e.g. My pasta dish"
                value={mealName}
                onChange={e => setMealName(e.target.value)}
                className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">Type</label>
              <select
                value={mealType}
                onChange={e => setMealType(e.target.value)}
                className="text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                {['breakfast', 'lunch', 'dinner', 'snack'].map(t => (
                  <option key={t} value={t}>{t.charAt(0).toUpperCase() + t.slice(1)}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Ingredient rows */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-semibold text-gray-600">Ingredients</label>
              <span className="text-xs text-gray-400">{validRows.length} ingredient{validRows.length !== 1 ? 's' : ''}</span>
            </div>
            <div className="space-y-2">
              {rows.map((row, i) => {
                const ing = INGREDIENTS[row.ingredientId];
                const rowCO2 = ing && row.grams ? (row.grams / 1000) * ing.emissionsPerKg : 0;
                return (
                  <div key={i} className="flex items-center gap-2">
                    {/* Ingredient picker */}
                    <div className="flex-1 relative">
                      {activeRow === i ? (
                        <div>
                          <input
                            autoFocus
                            type="text"
                            placeholder="Search ingredient..."
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            className="w-full text-sm border-2 border-green-400 rounded-lg px-3 py-2 focus:outline-none"
                          />
                          <div className="absolute z-20 mt-1 w-full bg-white border border-gray-200 rounded-xl shadow-lg max-h-48 overflow-y-auto">
                            {filtered.slice(0, 40).map(opt => (
                              <button
                                key={opt.id}
                                onClick={() => {
                                  updateRow(i, 'ingredientId', opt.id);
                                  setActiveRow(null);
                                  setSearch('');
                                }}
                                className="w-full text-left flex items-center justify-between px-3 py-2 hover:bg-green-50 text-sm"
                              >
                                <span>
                                  <span className="mr-1">{EMOJI_BY_CATEGORY[opt.category] || '🍴'}</span>
                                  <span className="font-medium">{opt.name}</span>
                                  <span className="text-gray-400 text-xs ml-1">({CATEGORIES[opt.category]?.label})</span>
                                </span>
                                <span className="text-xs text-gray-500 shrink-0">{opt.emissionsPerKg} kg CO₂/kg</span>
                              </button>
                            ))}
                            {filtered.length === 0 && (
                              <p className="text-xs text-gray-400 text-center py-4">No ingredients found</p>
                            )}
                          </div>
                        </div>
                      ) : (
                        <button
                          onClick={() => { setActiveRow(i); setSearch(''); }}
                          className={`w-full text-left text-sm px-3 py-2 rounded-lg border transition-colors ${
                            ing
                              ? 'border-gray-200 bg-gray-50 text-gray-800 hover:border-green-300'
                              : 'border-dashed border-gray-300 text-gray-400 hover:border-green-400 hover:text-green-600'
                          }`}
                        >
                          {ing ? (
                            <span className="flex items-center justify-between">
                              <span>
                                {EMOJI_BY_CATEGORY[ing.category] || '🍴'} <strong>{ing.name}</strong>
                                <span className="text-gray-400 ml-1 text-xs">({CATEGORIES[ing.category]?.label})</span>
                              </span>
                              <span className="text-xs text-gray-400">{ing.emissionsPerKg} kg CO₂/kg</span>
                            </span>
                          ) : (
                            '+ select ingredient'
                          )}
                        </button>
                      )}
                    </div>

                    {/* Grams input */}
                    <div className="flex items-center gap-1 shrink-0">
                      <input
                        type="number"
                        min="1"
                        max="2000"
                        value={row.grams}
                        onChange={e => updateRow(i, 'grams', e.target.value)}
                        className="w-20 text-sm border border-gray-200 rounded-lg px-2 py-2 text-center focus:outline-none focus:ring-2 focus:ring-green-500"
                      />
                      <span className="text-xs text-gray-400">g</span>
                    </div>

                    {/* Row CO2 */}
                    {rowCO2 > 0 && (
                      <span className="text-xs font-semibold text-orange-500 shrink-0 w-16 text-right">
                        {fmtCO2(rowCO2)}
                      </span>
                    )}

                    {/* Remove */}
                    {rows.length > 1 && (
                      <button
                        onClick={() => removeRow(i)}
                        className="text-gray-300 hover:text-red-400 shrink-0"
                      >
                        ✕
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
            <button
              onClick={addRow}
              className="mt-2 text-sm text-green-600 hover:text-green-700 font-medium"
            >
              + Add ingredient
            </button>
          </div>

          {/* Live total */}
          {totalKgCO2 > 0 && (
            <div className="p-3 bg-orange-50 border border-orange-200 rounded-lg flex items-center justify-between">
              <span className="text-sm text-orange-700 font-medium">Estimated footprint (1 serving)</span>
              <span className="text-lg font-bold text-orange-600">{fmtCO2(totalKgCO2)} CO₂eq</span>
            </div>
          )}

          {/* Data source note */}
          <p className="text-xs text-gray-400">
            Emission factors: Clark et al. (2022) via Our World in Data, underpinned by Poore &amp; Nemecek (2018).
            Values are per kg of food, farm-to-retail.
          </p>
        </div>

        {/* Footer */}
        <div className="px-5 pb-5 pt-3 border-t border-gray-100 flex gap-3 justify-end">
          <button onClick={onClose} className="btn-secondary text-sm">Cancel</button>
          <button
            onClick={handleSave}
            disabled={!mealName.trim() || validRows.length === 0}
            className="btn-primary text-sm disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Add to Plan
          </button>
        </div>
      </div>
    </div>
  );
}
