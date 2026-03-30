import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { CATEGORIES } from '../data/emissions.js';
import { fmtCO2 } from '../utils/formatters.js';

const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null;
  const d = payload[0];
  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow p-3 text-sm">
      <p className="font-semibold text-gray-800">{d.name}</p>
      <p className="text-xs text-gray-600">{fmtCO2(d.value)} CO₂eq</p>
      <p className="text-xs text-gray-500">{d.payload.pct}% of total</p>
    </div>
  );
};

export default function CategoryPieChart({ byCategory }) {
  const total = Object.values(byCategory).reduce((s, v) => s + v.kgCO2, 0);
  const data = Object.entries(byCategory)
    .map(([cat, { kgCO2 }]) => ({
      name: CATEGORIES[cat]?.label || cat,
      value: +kgCO2.toFixed(3),
      pct: total > 0 ? ((kgCO2 / total) * 100).toFixed(1) : '0',
      fill: CATEGORIES[cat]?.color || '#94a3b8',
    }))
    .filter(d => d.value > 0)
    .sort((a, b) => b.value - a.value);

  return (
    <ResponsiveContainer width="100%" height={280}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="45%"
          innerRadius={60}
          outerRadius={100}
          paddingAngle={2}
          dataKey="value"
        >
          {data.map((d, i) => (
            <Cell key={i} fill={d.fill} />
          ))}
        </Pie>
        <Tooltip content={<CustomTooltip />} />
        <Legend
          wrapperStyle={{ fontSize: 11 }}
          formatter={(value, entry) => `${value} (${entry.payload.pct}%)`}
        />
      </PieChart>
    </ResponsiveContainer>
  );
}
