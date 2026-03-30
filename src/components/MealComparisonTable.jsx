import { MEALS } from '../data/meals.js';
import { fmtCO2 } from '../utils/formatters.js';
import EmissionBadge from './EmissionBadge.jsx';

export default function MealComparisonTable({ mealComparisons }) {
  if (!mealComparisons?.length) return null;

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-gray-200">
            <th className="text-left py-3 px-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">Day</th>
            <th className="text-left py-3 px-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">Your Meal</th>
            <th className="text-right py-3 px-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">CO₂eq</th>
            <th className="text-left py-3 px-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">Plant-Based Alternative</th>
            <th className="text-right py-3 px-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">CO₂eq</th>
            <th className="text-right py-3 px-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">Saving</th>
          </tr>
        </thead>
        <tbody>
          {mealComparisons.map((row, i) => {
            const pbMeal = row.plantBased ? MEALS[row.plantBased.mealId] : null;
            const saving = row.saving;
            return (
              <tr
                key={i}
                className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
              >
                <td className="py-3 px-2 text-gray-500 text-xs whitespace-nowrap">
                  {row.day?.slice(0, 3)}
                  <br />
                  <span className="text-gray-400">{row.mealType}</span>
                </td>
                <td className="py-3 px-2">
                  <span className="font-medium text-gray-800">
                    {row.current.emoji} {row.current.mealName}
                  </span>
                </td>
                <td className="py-3 px-2 text-right">
                  <EmissionBadge kgCO2={row.current.totalKgCO2} />
                </td>
                <td className="py-3 px-2">
                  {row.plantBased ? (
                    <span className="text-green-700 font-medium">
                      {row.plantBased.emoji} {row.plantBased.mealName}
                    </span>
                  ) : (
                    <span className="text-gray-400 text-xs italic">Already plant-based</span>
                  )}
                </td>
                <td className="py-3 px-2 text-right">
                  {row.plantBased ? (
                    <EmissionBadge kgCO2={row.plantBased.totalKgCO2} />
                  ) : '—'}
                </td>
                <td className="py-3 px-2 text-right">
                  {saving > 0 ? (
                    <span className="text-green-600 font-semibold text-xs">
                      −{fmtCO2(saving)}
                    </span>
                  ) : saving < 0 ? (
                    <span className="text-orange-500 text-xs">
                      +{fmtCO2(Math.abs(saving))}
                    </span>
                  ) : (
                    <span className="text-gray-400 text-xs">—</span>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
