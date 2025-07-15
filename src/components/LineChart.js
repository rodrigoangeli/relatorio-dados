import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function LineChart({ labels, data, title }) {
  const chartData = {
    labels,
    datasets: [
      {
        label: title,
        data,
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "bottom" },
      title: { display: true, text: title },
    },
  };

  return <Line data={chartData} options={options} />;
}
