import React, { useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export function LineChart({ values }) {
  const [largestNum, setLargestNum] = useState(0);
  const dates = Object.keys(values) || [];
  const counts = Object.values(values) || [];

  const options = {
    plugins: {
      legend: {
        display: false
      }
    },
    responsive: true,
    maintainAspectRatio: true,
    scales: {
      y: {
        min: 0,
        max: largestNum + 1
      }
    }
  };

  const labels = [...dates];

  const data = {
    labels,
    datasets: [
      {
        data: [...counts],
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)'
      }
    ]
  };

  useEffect(() => {
    const largest = Math.max.apply(Math, counts);
    setLargestNum(largest);
  }, [counts]);

  return <Line options={options} data={data} />;
}
