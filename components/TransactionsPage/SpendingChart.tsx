"use client";

import {
  Chart as ChartJS,
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  ChartOptions,
} from "chart.js";
import { Pie, Bar } from "react-chartjs-2";

ChartJS.register(
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);

type Props = {
  chartType: "pie" | "bar";
  dataMap: Record<string, number>;
};

export default function SpendingChart({ chartType, dataMap }: Props) {
  const labels = Object.keys(dataMap);
  const values = Object.values(dataMap);

  const data = {
    labels,
    datasets: [
      {
        label: "Spending",
        data: values,
        backgroundColor: [
          "#2563eb",
          "#22c55e",
          "#f97316",
          "#a855f7",
          "#ef4444",
        ],
        borderRadius: chartType === "bar" ? 6 : 0,
      },
    ],
  };

  const pieOptions: ChartOptions<"pie"> = {
    responsive: true,
    plugins: {
      legend: {
        position: "right",
      },
    },
  };

  const barOptions: ChartOptions<"bar"> = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
    },
  };

  return chartType === "pie" ? (
    <Pie data={data} options={pieOptions} />
  ) : (
    <Bar data={data} options={barOptions} />
  );
}
