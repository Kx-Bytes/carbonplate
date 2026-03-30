import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  Legend, ResponsiveContainer, Cell,
} from 'recharts';
import { DAYS } from '../data/meals.js';
import { fmtCO2 } from '../utils/formatters.js';

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-3 text-sm">
      <p className="font-semibold text-gray-800 mb-1">{label}</p>
      {payload.map(p => (
        <p key={p.name} style={{ color: p.color }} className="text-xs">
          {p.name}: {fmtCO2(p.value)} CO₂eq
        </p>
      ))}
    </div>
  );
};

/** Side-by-side bar chart by day showing current vs plant-based */
export function DailyComparisonChart({ currentByDay, pbByDay }) {
  const data = DAYS.map(day => ({
    day: day.slice(0, 3),
    'Current Diet': +(currentByDay[day]?.kgCO2 || 0).toFixed(3),
    'Plant-Based': +(pbByDay[day]?.kgCO2 || 0).toFixed(3),
  }));

  return (
    <ResponsiveContainer width="100%" height={280}>
      <BarChart data={data} margin={{ top: 8, right: 8, left: -10, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
        <XAxis dataKey="day" tick={{ fontSize: 12 }} />
        <YAxis
          tick={{ fontSize: 11 }}
          tickFormatter={v => `${v}kg`}
          label={{ value: 'kg CO₂eq', angle: -90, position: 'insideLeft', fontSize: 11, dy: 40 }}
        />
        <Tooltip content={<CustomTooltip />} />
        <Legend wrapperStyle={{ fontSize: 12 }} />
        <Bar dataKey="Current Diet" fill="#f97316" radius={[4, 4, 0, 0]} />
        <Bar dataKey="Plant-Based" fill="#22c55e" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}

/** Stacked bar by meal showing ingredient breakdown */
export function MealBreakdownChart({ meals, topN = 10 }) {
  const top = [...meals]
    .sort((a, b) => b.totalKgCO2 - a.totalKgCO2)
    .slice(0, topN);

  const allIngredients = {};
  top.forEach(meal => {
    meal.breakdown.forEach(ing => {
      allIngredients[ing.ingredientId] = { name: ing.ingredientName, color: ing.color };
    });
  });

  const data = top.map(meal => {
    const row = {
      name: `${meal.emoji} ${meal.mealName.length > 16 ? meal.mealName.slice(0, 14) + '…' : meal.mealName}`,
    };
    meal.breakdown.forEach(ing => {
      row[ing.ingredientName] = ing.kgCO2;
    });
    return row;
  });

  return (
    <ResponsiveContainer width="100%" height={320}>
      <BarChart data={data} layout="vertical" margin={{ top: 8, right: 30, left: 10, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
        <XAxis type="number" tick={{ fontSize: 11 }} tickFormatter={v => `${v}kg`} />
        <YAxis type="category" dataKey="name" tick={{ fontSize: 11 }} width={140} />
        <Tooltip content={<CustomTooltip />} />
        {Object.entries(allIngredients).map(([id, { name, color }]) => (
          <Bar key={id} dataKey={name} stackId="a" fill={color || '#94a3b8'} />
        ))}
      </BarChart>
    </ResponsiveContainer>
  );
}

/** Single horizontal bar showing total current vs plant-based */
export function TotalComparisonBar({ currentKg, pbKg }) {
  const data = [
    { name: 'Current Diet', value: currentKg, fill: '#f97316' },
    { name: 'Plant-Based Equivalent', value: pbKg, fill: '#22c55e' },
  ];

  return (
    <ResponsiveContainer width="100%" height={140}>
      <BarChart data={data} layout="vertical" margin={{ top: 8, right: 60, left: 10, bottom: 0 }}>
        <XAxis type="number" tick={{ fontSize: 11 }} tickFormatter={v => `${v}kg`} />
        <YAxis type="category" dataKey="name" tick={{ fontSize: 12 }} width={160} />
        <Tooltip
          formatter={(v) => [`${fmtCO2(v)} CO₂eq`, 'Weekly total']}
        />
        <Bar dataKey="value" radius={[0, 6, 6, 0]} label={{ position: 'right', formatter: v => fmtCO2(v), fontSize: 12, fill: '#374151' }}>
          {data.map((d, i) => <Cell key={i} fill={d.fill} />)}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
