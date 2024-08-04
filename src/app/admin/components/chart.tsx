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
  propsDataPendapatan,
}: {
  propsDataPendapatan: {
    dataPendapatan: { pendapatan: number; hari: number }[];
    totalPendapatan: number;
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

  const monRev = propsDataPendapatan?.dataPendapatan
    .filter((data) => data.hari === 1)
    .reduce((a, b) => a + b.pendapatan, 0);
  const tuesRev = propsDataPendapatan?.dataPendapatan
    .filter((data) => data.hari === 2)
    .reduce((a, b) => a + b.pendapatan, 0);
  const wedRev = propsDataPendapatan?.dataPendapatan
    .filter((data) => data.hari === 3)
    .reduce((a, b) => a + b.pendapatan, 0);
  const thursRev = propsDataPendapatan?.dataPendapatan
    .filter((data) => data.hari === 4)
    .reduce((a, b) => a + b.pendapatan, 0);
  const friRev = propsDataPendapatan?.dataPendapatan
    .filter((data) => data.hari === 5)
    .reduce((a, b) => a + b.pendapatan, 0);
  const satRev = propsDataPendapatan?.dataPendapatan
    .filter((data) => data.hari === 6)
    .reduce((a, b) => a + b.pendapatan, 0);
  const sunRev = propsDataPendapatan?.dataPendapatan
    .filter((data) => data.hari === 7)
    .reduce((a, b) => a + b.pendapatan, 0);

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
