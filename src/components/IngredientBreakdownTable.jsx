import { CATEGORIES } from '../data/emissions.js';
import { fmtCO2 } from '../utils/formatters.js';

export default function IngredientBreakdownTable({ ingredients }) {
  if (!ingredients?.length) return null;
  const total = ingredients.reduce((s, i) => s + i.totalKgCO2, 0);

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-gray-200">
            <th className="text-left py-2 px-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">Ingredient</th>
            <th className="text-left py-2 px-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">Category</th>
            <th className="text-right py-2 px-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">Total g used</th>
            <th className="text-right py-2 px-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">kg CO₂eq</th>
            <th className="text-right py-2 px-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">% of total</th>
          </tr>
        </thead>
        <tbody>
          {ingredients.map(ing => {
            const cat = CATEGORIES[ing.category];
            const pct = total > 0 ? ((ing.totalKgCO2 / total) * 100).toFixed(1) : 0;
            return (
              <tr key={ing.ingredientId} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="py-2 px-2 font-medium text-gray-800">
                  <div className="flex items-center gap-2">
                    <span
                      className="w-2.5 h-2.5 rounded-full shrink-0"
                      style={{ background: ing.color || '#94a3b8' }}
                    />
                    {ing.ingredientName}
                  </div>
                </td>
                <td className="py-2 px-2 text-gray-500 text-xs">
                  {cat?.icon} {cat?.label || ing.category}
                </td>
                <td className="py-2 px-2 text-right text-gray-600">
                  {ing.totalGrams.toFixed(0)}g
                </td>
                <td className="py-2 px-2 text-right font-semibold text-gray-800">
                  {fmtCO2(ing.totalKgCO2)}
                </td>
                <td className="py-2 px-2 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <div className="w-16 bg-gray-100 rounded-full h-1.5">
                      <div
                        className="h-1.5 rounded-full"
                        style={{ width: `${pct}%`, background: ing.color || '#94a3b8' }}
                      />
                    </div>
                    <span className="text-xs text-gray-500 w-10 text-right">{pct}%</span>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
        <tfoot>
          <tr className="border-t-2 border-gray-300">
            <td colSpan={3} className="py-2 px-2 font-semibold text-gray-700">Total</td>
            <td className="py-2 px-2 text-right font-bold text-gray-900">{fmtCO2(total)}</td>
            <td className="py-2 px-2 text-right text-xs text-gray-500">100%</td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}
