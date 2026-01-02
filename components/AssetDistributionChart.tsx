"use client";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

type Props = {
  assets: any[];
};

const COLORS = [
  "#2563eb", 
  "#f97316",
  "#9ca3af", 
  "#facc15",
  "#38bdf8", 
  "#22c55e", 
  "#6366f1",
  "#ef4444", 
];

const AssetDistributionChart = ({ assets }: Props) => {
  const data = assets.map((asset) => ({
    name: asset.assetName,
    value: asset.currentValue,
  }));

  return (
    <ResponsiveContainer width="100%" height={260}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          outerRadius={90}
          dataKey="value"
          label={({ name, percent }) =>
            `${name} ${((percent || 0) * 100).toFixed(0)}%`
          }
        >
          {data.map((_, index) => (
            <Cell
              key={index}
              fill={COLORS[index % COLORS.length]}
            />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default AssetDistributionChart;

