import React, { useState } from "react";
import { Line } from "react-chartjs-2";
import { chart as ChartJS } from "chart.js/auto";
import { UserData } from "./Data";

export default function LineChart() {
  const [userData, setUserData] = useState({
    labels: UserData.map((data) => data.month),
    datasets: [
      {
        label: "Total transactions",
        data: UserData.map((data) => data.transaction),
        backgroundColor: ["rgba(43, 136, 157, 0.09)"],
        borderColor: "#008AA8",
        borderWidth: 6,
        pointBackgroundColor: "white",
        pointBorderColor: "#008AA8",
        pointBorderWidth: 2,
        pointRadius: 10,
        tension: 0.4,
        fill: true,
      },
    ],
  });

  function kFormatter(num) {
    return Math.abs(num) > 999
      ? "$" + Math.sign(num) * (Math.abs(num) / 1000).toFixed(1) + "k"
      : Math.sign(num) * Math.abs(num);
  }
  const options = {
    plugins: { legend: { display: false } },
    scales: {
      y: {
        beginAtZero: false,
        ticks: {
          callback: function (value, index) {
            return kFormatter(value);
          },
        },
      },
    },
  };
  return <Line data={userData} options={options} />;
}
