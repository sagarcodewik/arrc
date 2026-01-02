"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { TrendingUp, TrendingDown } from "lucide-react";

interface Props {
  assets: any[];
}

const HoldingsPerformanceChart = ({ assets }: Props) => {
  if (!assets || assets.length === 0) {
    return (
      <p className="text-slate-600 font-medium">
        No performance data available
      </p>
    );
  }

  const chartData = assets.map((item, index) => ({
    label: item.assetName || `Asset ${index + 1}`,
    value: Number(item.currentValue.toFixed(2)),
  }));

  const totalProfit =
    assets.reduce(
      (s, a) => s + (a.currentValue - a.investedAmount),
      0
    ) || 0;

  const isProfit = totalProfit >= 0;

  return (
    <div className="w-full">
      <div className="flex items-center justify-center gap-2 mb-2">
        {isProfit ? (
          <TrendingUp className="text-emerald-500 w-5 h-5" />
        ) : (
          <TrendingDown className="text-red-500 w-5 h-5" />
        )}
        <span
          className={`text-sm font-semibold ${
            isProfit ? "text-emerald-600" : "text-red-600"
          }`}
        >
          Holdings Performance
        </span>
      </div>
      <div className="h-56">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <CartesianGrid stroke="#e5e7eb" strokeDasharray="4 4" />
            <XAxis
              dataKey="label"
              tick={{ fontSize: 12 }}
              axisLine={{ stroke: "#374151" }}
            />
            <YAxis
              tick={{ fontSize: 12 }}
              axisLine={{ stroke: "#374151" }}
            />
            <Tooltip />

            <Line
              type="monotone"
              dataKey="value"
              stroke="#2CB1BC"
              strokeWidth={3}
              dot={{ r: 5, fill: "#2CB1BC" }}
              activeDot={{ r: 7 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default HoldingsPerformanceChart;
