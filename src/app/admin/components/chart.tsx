"use client";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import Skeleton from "react-loading-skeleton";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

type ChartData = {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    borderColor: string;
    backgroundColor: string;
  }[];
};

const Chart = ({
  revenueDataProps,
}: {
  revenueDataProps: {
    revenueData: { revenue: number; day: number }[];
    totalRevenue: number;
  };
}) => {
  const [chartData, setChartData] = useState<ChartData>({
    labels: ["Mon", "Tues", "Wed", "Thurs", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Penjualan",
        data: [0, 0, 0, 0, 0, 0, 0],
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.4)",
      },
    ],
  });
  const [chartOptions, setChartOptions] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const monRev = revenueDataProps?.revenueData
    .filter((data) => data.day === 1)
    .reduce((a, b) => a + b.revenue, 0);
  const tuesRev = revenueDataProps?.revenueData
    .filter((data) => data.day === 2)
    .reduce((a, b) => a + b.revenue, 0);
  const wedRev = revenueDataProps?.revenueData
    .filter((data) => data.day === 3)
    .reduce((a, b) => a + b.revenue, 0);
  const thursRev = revenueDataProps?.revenueData
    .filter((data) => data.day === 4)
    .reduce((a, b) => a + b.revenue, 0);
  const friRev = revenueDataProps?.revenueData
    .filter((data) => data.day === 5)
    .reduce((a, b) => a + b.revenue, 0);
  const satRev = revenueDataProps?.revenueData
    .filter((data) => data.day === 6)
    .reduce((a, b) => a + b.revenue, 0);
  const sunRev = revenueDataProps?.revenueData
    .filter((data) => data.day === 7)
    .reduce((a, b) => a + b.revenue, 0);

  useEffect(() => {
    setChartData((e) => {
      return {
        ...e,
        datasets: e.datasets.map((dataset) => {
          return {
            ...dataset,
            data: [monRev, tuesRev, wedRev, thursRev, friRev, satRev, sunRev],
          };
        }),
      };
    });

    setChartOptions({
      plugins: {
        legend: {
          position: "top",
        },
        title: {
          display: true,
          text: "Statistik Penghasilan",
        },
      },
      maintainAspectRatio: false,
      responsive: true,
    });

    setIsLoading(false);
  }, [monRev, tuesRev, wedRev, thursRev, friRev, satRev, sunRev]);

  return (
    <div className="h-[525px] col-span-5 w-[90%]">
      {isLoading ? (
        <Skeleton className="h-full w-full" />
      ) : (
        <Bar data={chartData} options={chartOptions} />
      )}
    </div>
  );
};

export default Chart;
