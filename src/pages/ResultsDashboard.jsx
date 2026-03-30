import { useRef, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  calcWeeklyEmissions,
  calcPlantBasedEquivalent,
  buildComparison,
  rankMealsByEmissions,
  rankIngredientsByEmissions,
} from '../utils/calculations.js';
import { fmtCO2 } from '../utils/formatters.js';
import { DailyComparisonChart, TotalComparisonBar } from '../components/EmissionsBarChart.jsx';
import CategoryPieChart from '../components/CategoryPieChart.jsx';
import MealComparisonTable from '../components/MealComparisonTable.jsx';
import IngredientBreakdownTable from '../components/IngredientBreakdownTable.jsx';
import ExportPanel from '../components/ExportPanel.jsx';
import { MEALS } from '../data/meals.js';

export default function ResultsDashboard({ plan, customMeals = {} }) {
  const navigate = useNavigate();
  const reportRef = useRef(null);

  const mealRegistry = useMemo(() => ({ ...MEALS, ...customMeals }), [customMeals]);

  const { weekStats, pbStats, comparison, topMeals, topIngredients } = useMemo(() => {
    if (!plan.length) return {};
    const ws = calcWeeklyEmissions(plan, mealRegistry);
    const pb = calcPlantBasedEquivalent(plan, mealRegistry);
    // Attach registry for per-meal comparison lookup
    ws.mealRegistry = mealRegistry;
    return {
      weekStats: ws,
      pbStats: pb,
      comparison: buildComparison(ws, pb),
      topMeals: rankMealsByEmissions(ws),
      topIngredients: rankIngredientsByEmissions(ws),
    };
  }, [plan, mealRegistry]);

  if (!plan.length) {
    return (
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 text-center">
        <p className="text-5xl mb-4">📋</p>
        <h2 className="text-xl font-semibold text-gray-700 mb-2">No meal plan yet</h2>
        <p className="text-gray-500 mb-6">Add some meals to your weekly plan to see the analysis.</p>
        <button onClick={() => navigate('/')} className="btn-primary">
          ← Build My Meal Plan
        </button>
      </div>
    );
  }

  const reductionPct = comparison?.reductionPct || 0;
  const reductionKg = comparison?.reductionKg || 0;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-6" ref={reportRef}>
      {/* Page title */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Weekly Carbon Analysis</h1>
          <p className="text-gray-500 text-sm mt-1">
            {plan.length} meals · Data: Poore &amp; Nemecek (2018)
          </p>
        </div>
        <button onClick={() => navigate('/')} className="btn-secondary text-sm no-print">
          ← Edit Plan
        </button>
      </div>

      {/* ── Hero stats ── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <StatCard
          emoji="🍽️"
          label="Weekly footprint"
          value={fmtCO2(weekStats.totalKgCO2)}
          sub="CO₂eq total"
          color="orange"
        />
        <StatCard
          emoji="🌿"
          label="Plant-based equiv."
          value={fmtCO2(pbStats.totalKgCO2)}
          sub="CO₂eq if switched"
          color="green"
        />
        <StatCard
          emoji="📉"
          label="Potential saving"
          value={reductionKg > 0 ? `−${fmtCO2(reductionKg)}` : '—'}
          sub={reductionPct > 0 ? `${reductionPct}% reduction` : 'per week'}
          color="blue"
        />
        <StatCard
          emoji="📅"
          label="Annual saving"
          value={fmtCO2(comparison?.annualSavingKg || 0)}
          sub={`≈ ${(comparison?.carKmEquivalent || 0).toLocaleString()} km not driven`}
          color="purple"
        />
      </div>

      {/* Uncertainty note */}
      <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg text-xs text-yellow-800">
        <strong>Uncertainty:</strong> Current diet range:{' '}
        <strong>{fmtCO2(weekStats.totalLow)} – {fmtCO2(weekStats.totalHigh)}</strong>.
        Plant-based range:{' '}
        <strong>{fmtCO2(pbStats.totalLow)} – {fmtCO2(pbStats.totalHigh)}</strong>.
        Ranges represent the 5th–95th percentile across global production systems (Poore &amp; Nemecek 2018, Fig. 1).
      </div>

      {/* ── Section 1: Total comparison ── */}
      <section className="card">
        <h2 className="font-semibold text-gray-800 mb-4 text-lg">
          Total Comparison: Your Diet vs. Plant-Based Equivalent
        </h2>
        <TotalComparisonBar
          currentKg={weekStats.totalKgCO2}
          pbKg={pbStats.totalKgCO2}
        />
        {reductionPct > 0 && (
          <div className="mt-4 p-3 bg-green-50 rounded-lg">
            <p className="text-sm text-green-800">
              🌱 Switching to the plant-based equivalent of your current meals would reduce your
              weekly food carbon footprint by{' '}
              <strong>{reductionPct}%</strong> — saving{' '}
              <strong>{fmtCO2(comparison.annualSavingKg)}</strong> of CO₂eq per year.
              That&apos;s equivalent to not driving{' '}
              <strong>{comparison.carKmEquivalent.toLocaleString()} km</strong> or avoiding{' '}
              <strong>{comparison.flightsEquivalent.toFixed(1)}</strong> transatlantic flights.
            </p>
          </div>
        )}
      </section>

      {/* ── Section 2: Daily chart ── */}
      <section className="card">
        <h2 className="font-semibold text-gray-800 mb-4 text-lg">
          Carbon Footprint by Day
        </h2>
        <DailyComparisonChart
          currentByDay={weekStats.byDay}
          pbByDay={pbStats.byDay}
        />
        <p className="text-xs text-gray-400 mt-2 text-right">
          kg CO₂eq per day · Green bars show plant-based equivalent
        </p>
      </section>

      {/* ── Section 3: Category breakdown ── */}
      <div className="grid sm:grid-cols-2 gap-6">
        <section className="card">
          <h2 className="font-semibold text-gray-800 mb-4 text-lg">
            Emissions by Food Category
          </h2>
          <CategoryPieChart byCategory={weekStats.byCategory} />
        </section>

        <section className="card">
          <h2 className="font-semibold text-gray-800 mb-3 text-lg">
            Top Emitting Ingredients
          </h2>
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {topIngredients.slice(0, 8).map((ing, i) => {
              const total = weekStats.totalKgCO2;
              const pct = total > 0 ? (ing.totalKgCO2 / total) * 100 : 0;
              return (
                <div key={ing.ingredientId} className="flex items-center gap-3">
                  <span className="text-xs text-gray-400 w-4 text-right">{i + 1}</span>
                  <div className="flex-1">
                    <div className="flex justify-between text-xs mb-0.5">
                      <span className="font-medium text-gray-700">{ing.ingredientName}</span>
                      <span className="text-gray-500">{fmtCO2(ing.totalKgCO2)}</span>
                    </div>
                    <div className="h-1.5 bg-gray-100 rounded-full">
                      <div
                        className="h-1.5 rounded-full"
                        style={{ width: `${Math.min(pct, 100)}%`, background: ing.color || '#94a3b8' }}
                      />
                    </div>
                  </div>
                  <span className="text-xs text-gray-400 w-8 text-right">{pct.toFixed(0)}%</span>
                </div>
              );
            })}
          </div>
        </section>
      </div>

      {/* ── Section 4: Meal-by-meal comparison ── */}
      <section className="card">
        <h2 className="font-semibold text-gray-800 mb-4 text-lg">
          Meal-by-Meal: Your Diet vs. Plant-Based Equivalent
        </h2>
        <p className="text-xs text-gray-500 mb-4">
          Each row shows your chosen meal alongside its closest plant-based equivalent.
          Emission values include all supply-chain stages (farm to retail).
        </p>
        <MealComparisonTable mealComparisons={comparison?.mealComparisons} />
      </section>

      {/* ── Section 5: Full ingredient breakdown ── */}
      <section className="card">
        <h2 className="font-semibold text-gray-800 mb-4 text-lg">
          Full Ingredient Breakdown
        </h2>
        <p className="text-xs text-gray-500 mb-4">
          Aggregated across the whole week. Each value is calculated as:{' '}
          <code className="bg-gray-100 px-1 rounded">grams ÷ 1000 × emission factor (kg CO₂eq/kg)</code>
        </p>
        <IngredientBreakdownTable ingredients={topIngredients} />
      </section>

      {/* ── Export panel ── */}
      <ExportPanel comparison={comparison} targetRef={reportRef} />

      {/* Source note */}
      <div className="p-4 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-600">
        <strong>Primary data source:</strong> Poore, J. &amp; Nemecek, T. (2018).{' '}
        <em>Reducing food&apos;s environmental impacts through producers and consumers.</em>{' '}
        Science, 360(6392), 987–992.{' '}
        <a href="https://ourworldindata.org/environmental-impacts-of-food" target="_blank" rel="noreferrer" className="underline text-blue-600">
          Via Our World in Data
        </a>{' '}(doi:10.1126/science.aao0216)
        . Analysis covers 40 food products, &gt;38,000 farms, 119 countries.{' '}
        <a href="/methodology" className="underline text-blue-600">Full methodology →</a>
      </div>
    </div>
  );
}

function StatCard({ emoji, label, value, sub, color }) {
  const colorMap = {
    orange: 'text-orange-500',
    green: 'text-green-600',
    blue: 'text-blue-600',
    purple: 'text-purple-600',
  };
  return (
    <div className="card !p-4">
      <p className="text-2xl mb-1">{emoji}</p>
      <p className="text-xs text-gray-500 font-medium mb-1">{label}</p>
      <p className={`text-xl font-bold ${colorMap[color] || 'text-gray-800'}`}>{value}</p>
      <p className="text-xs text-gray-400 mt-0.5">{sub}</p>
    </div>
  );
}
