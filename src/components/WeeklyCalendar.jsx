import { useState } from 'react';
import { DAYS, MEAL_TYPES, MEALS } from '../data/meals.js';
import { calcMealEmissions } from '../utils/calculations.js';
import { fmtCO2Short } from '../utils/formatters.js';
import EmissionBadge from './EmissionBadge.jsx';
import MealSelectorModal from './MealSelectorModal.jsx';

export default function WeeklyCalendar({ plan, onAddMeal, onRemoveMeal, onUpdateServings, customMeals }) {
  const [modal, setModal] = useState(null); // { day, mealType }

  // Merge built-in + custom meals for lookup
  const allMeals = { ...MEALS, ...customMeals };

  // Build a lookup: plan[day][mealType] = [entries]
  const planLookup = {};
  DAYS.forEach(day => {
    planLookup[day] = {};
    MEAL_TYPES.forEach(mt => {
      planLookup[day][mt] = plan.filter(e => e.day === day && e.mealType === mt);
    });
  });

  const handleSelect = (mealId) => {
    onAddMeal({ day: modal.day, mealType: modal.mealType, mealId });
    setModal(null);
  };

  return (
    <div>
      {/* Mobile: stacked days */}
      <div className="block lg:hidden space-y-4">
        {DAYS.map(day => (
          <div key={day} className="card">
            <h3 className="font-semibold text-gray-800 mb-3">{day}</h3>
            <div className="space-y-3">
              {MEAL_TYPES.map(mt => (
                <MealSlot
                  key={mt}
                  day={day}
                  mealType={mt}
                  entries={planLookup[day][mt]}
                  onAdd={() => setModal({ day, mealType: mt })}
                  onRemove={onRemoveMeal}
                  onUpdateServings={onUpdateServings}
                  allMeals={allMeals}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Desktop: grid */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full border-separate border-spacing-1">
          <thead>
            <tr>
              <th className="w-24 text-xs font-semibold text-gray-500 uppercase tracking-wider text-left pb-2 pl-1">
                Meal
              </th>
              {DAYS.map(day => (
                <th key={day} className="text-xs font-semibold text-gray-700 pb-2 text-center">
                  {day.slice(0, 3)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {MEAL_TYPES.map(mt => (
              <tr key={mt}>
                <td className="text-xs font-semibold text-gray-500 uppercase tracking-wider pr-2 py-1 align-top pt-2">
                  {mt}
                </td>
                {DAYS.map(day => (
                  <td key={day} className="align-top py-1">
                    <div className="min-h-[64px] bg-gray-50 rounded-lg p-1.5 border border-dashed border-gray-200 space-y-1">
                      {planLookup[day][mt].map(entry => {
                        const meal = allMeals[entry.mealId];
                        const servings = entry.servings || 1;
                        const result = calcMealEmissions(entry.mealId, servings, allMeals);
                        if (!meal) return null;
                        return (
                          <div
                            key={entry.id}
                            className="group relative bg-white rounded-md border border-gray-200 px-2 py-1 text-xs"
                          >
                            <div className="flex items-start justify-between gap-1">
                              <span className="font-medium text-gray-800 leading-tight">
                                {meal.emoji} {meal.name}
                                {meal.isCustom && <span className="ml-1 text-gray-400">(custom)</span>}
                              </span>
                              <button
                                onClick={() => onRemoveMeal(entry.id)}
                                className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-500 transition-opacity ml-1 shrink-0"
                              >
                                ×
                              </button>
                            </div>
                            <div className="flex items-center gap-2 mt-1">
                              {result && <EmissionBadge kgCO2={result.totalKgCO2} />}
                              <ServingsControl
                                servings={servings}
                                onChange={v => onUpdateServings(entry.id, v)}
                              />
                            </div>
                          </div>
                        );
                      })}
                      <button
                        onClick={() => setModal({ day, mealType: mt })}
                        className="w-full text-center text-xs text-gray-400 hover:text-green-600 hover:bg-green-50 rounded py-1 transition-colors"
                      >
                        + add
                      </button>
                    </div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {modal && (
        <MealSelectorModal
          day={modal.day}
          mealType={modal.mealType}
          onSelect={handleSelect}
          onClose={() => setModal(null)}
          customMeals={customMeals}
        />
      )}
    </div>
  );
}

function MealSlot({ day, mealType, entries, onAdd, onRemove, onUpdateServings, allMeals }) {
  return (
    <div>
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
          {mealType}
        </span>
      </div>
      <div className="space-y-1">
        {entries.map(entry => {
          const meal = allMeals[entry.mealId];
          const servings = entry.servings || 1;
          const result = calcMealEmissions(entry.mealId, servings, allMeals);
          if (!meal) return null;
          return (
            <div key={entry.id} className="bg-gray-50 rounded-lg px-3 py-2 text-sm">
              <div className="flex items-center justify-between gap-2">
                <span className="font-medium text-gray-800">
                  {meal.emoji} {meal.name}
                  {meal.isCustom && <span className="ml-1 text-gray-400 text-xs">(custom)</span>}
                </span>
                <button onClick={() => onRemove(entry.id)} className="text-gray-400 hover:text-red-500 shrink-0">×</button>
              </div>
              <div className="flex items-center gap-2 mt-1">
                {result && <EmissionBadge kgCO2={result.totalKgCO2} />}
                <ServingsControl servings={servings} onChange={v => onUpdateServings(entry.id, v)} />
              </div>
            </div>
          );
        })}
        <button
          onClick={onAdd}
          className="w-full text-sm text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg px-3 py-2 border border-dashed border-gray-200 transition-colors"
        >
          + Add {mealType}
        </button>
      </div>
    </div>
  );
}

function ServingsControl({ servings, onChange }) {
  return (
    <div className="flex items-center gap-1 text-xs">
      <button
        onClick={() => onChange(Math.max(0.5, servings - 0.5))}
        className="w-5 h-5 flex items-center justify-center rounded bg-gray-200 hover:bg-gray-300 font-bold leading-none"
      >−</button>
      <span className="w-8 text-center font-medium text-gray-700">×{servings}</span>
      <button
        onClick={() => onChange(servings + 0.5)}
        className="w-5 h-5 flex items-center justify-center rounded bg-gray-200 hover:bg-gray-300 font-bold leading-none"
      >+</button>
    </div>
  );
}
