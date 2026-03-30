import { useState } from 'react';
import { MEALS_BY_TYPE, MEAL_TYPES } from '../data/meals.js';
import { calcMealEmissions } from '../utils/calculations.js';
import { fmtCO2 } from '../utils/formatters.js';
import EmissionBadge from './EmissionBadge.jsx';

export default function MealSelectorModal({ day, mealType, onSelect, onClose }) {
  const [activeTab, setActiveTab] = useState(mealType || MEAL_TYPES[0]);
  const [search, setSearch] = useState('');

  const meals = (MEALS_BY_TYPE[activeTab] || []).filter(m => {
    if (m.isPlantBased) return false; // only show "original" meals; PB equivalents auto-added
    if (search) return m.name.toLowerCase().includes(search.toLowerCase());
    return true;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg max-h-[85vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-5 pt-5 pb-3 border-b border-gray-100">
          <div>
            <h3 className="font-semibold text-gray-900 text-lg">Add Meal</h3>
            <p className="text-xs text-gray-500 mt-0.5">
              {day} · {mealType ? mealType.charAt(0).toUpperCase() + mealType.slice(1) : ''}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-xl font-light"
          >
            ✕
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 px-5 pt-3">
          {MEAL_TYPES.map(t => (
            <button
              key={t}
              onClick={() => setActiveTab(t)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                activeTab === t
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="px-5 pt-3">
          <input
            type="text"
            placeholder="Search meals..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        {/* Meal list */}
        <div className="overflow-y-auto flex-1 px-5 py-3 space-y-2">
          {meals.length === 0 && (
            <p className="text-sm text-gray-400 text-center py-8">No meals found.</p>
          )}
          {meals.map(meal => {
            const result = calcMealEmissions(meal.id);
            return (
              <button
                key={meal.id}
                onClick={() => onSelect(meal.id)}
                className="w-full text-left flex items-start gap-3 p-3 rounded-xl border border-gray-100 hover:border-green-300 hover:bg-green-50 transition-colors group"
              >
                <span className="text-2xl mt-0.5">{meal.emoji}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-medium text-sm text-gray-900 group-hover:text-green-800">
                      {meal.name}
                    </span>
                    {result && <EmissionBadge kgCO2={result.totalKgCO2} />}
                  </div>
                  <p className="text-xs text-gray-500 mt-0.5 truncate">{meal.description}</p>
                  {meal.plantBasedMealId && (
                    <p className="text-xs text-green-600 mt-1">
                      🌿 Comparison: {MEALS_BY_TYPE[activeTab]?.find(m => m.id === meal.plantBasedMealId)?.name || '—'}
                      {' '}({fmtCO2(calcMealEmissions(meal.plantBasedMealId)?.totalKgCO2 || 0)} CO₂eq)
                    </p>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        <div className="px-5 pb-5 pt-3 border-t border-gray-100">
          <p className="text-xs text-gray-400 text-center">
            Emissions shown per serving · Source: Poore &amp; Nemecek (2018)
          </p>
        </div>
      </div>
    </div>
  );
}
