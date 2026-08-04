import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Doughnut } from "react-chartjs-2";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);

export default function PaymentStatusChart() {
  const data = {
    labels: ["Paid", "Pending", "Overdue"],
    datasets: [
      {
        data: [70, 20, 10],
        backgroundColor: [
          "#22C55E",
          "#F59E0B",
          "#EF4444",
        ],
      },
    ],
  };

  return <Doughnut data={data} />;
}