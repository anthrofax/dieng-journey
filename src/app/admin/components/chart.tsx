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
import { getYear } from "date-fns";
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
  propsDataPendapatan:
    | {
        dataPendapatan: { pendapatan: number; bulan: number }[];
        totalPendapatan: number;
      }
    | undefined;
}) => {
  const [chartData, setChartData] = useState<ChartData>({
    labels: [
      "Januari",
      "Februari",
      "Maret",
      "April",
      "Mei",
      "Juni",
      "Juli",
      "Agustus",
      "September",
      "Oktober",
      "November",
      "Desember",
    ],
    datasets: [
      {
        label: "Pendapatan",
        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.4)",
      },
    ],
  });
  const [chartOptions, setChartOptions] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const janRev = propsDataPendapatan?.dataPendapatan
    .filter((data) => data.bulan === 0)
    .reduce((a, b) => a + b.pendapatan, 0);
  const febRev = propsDataPendapatan?.dataPendapatan
    .filter((data) => data.bulan === 1)
    .reduce((a, b) => a + b.pendapatan, 0);
  const marRev = propsDataPendapatan?.dataPendapatan
    .filter((data) => data.bulan === 2)
    .reduce((a, b) => a + b.pendapatan, 0);
  const aprRev = propsDataPendapatan?.dataPendapatan
    .filter((data) => data.bulan === 3)
    .reduce((a, b) => a + b.pendapatan, 0);
  const meiRev = propsDataPendapatan?.dataPendapatan
    .filter((data) => data.bulan === 4)
    .reduce((a, b) => a + b.pendapatan, 0);
  const junRev = propsDataPendapatan?.dataPendapatan
    .filter((data) => data.bulan === 5)
    .reduce((a, b) => a + b.pendapatan, 0);
  const julRev = propsDataPendapatan?.dataPendapatan
    .filter((data) => data.bulan === 6)
    .reduce((a, b) => a + b.pendapatan, 0);
  const augRev = propsDataPendapatan?.dataPendapatan
    .filter((data) => data.bulan === 7)
    .reduce((a, b) => a + b.pendapatan, 0);
  const sepRev = propsDataPendapatan?.dataPendapatan
    .filter((data) => data.bulan === 8)
    .reduce((a, b) => a + b.pendapatan, 0);
  const oktRev = propsDataPendapatan?.dataPendapatan
    .filter((data) => data.bulan === 9)
    .reduce((a, b) => a + b.pendapatan, 0);
  const novRev = propsDataPendapatan?.dataPendapatan
    .filter((data) => data.bulan === 10)
    .reduce((a, b) => a + b.pendapatan, 0);
  const desRev = propsDataPendapatan?.dataPendapatan
    .filter((data) => data.bulan === 11)
    .reduce((a, b) => a + b.pendapatan, 0);

  useEffect(() => {
    setChartData((e) => {
      return {
        ...e,
        datasets: e.datasets.map((dataset) => {
          return {
            ...dataset,
            data: [
              janRev ?? 0,
              febRev ?? 0,
              marRev ?? 0,
              aprRev ?? 0,
              meiRev ?? 0,
              junRev ?? 0,
              julRev ?? 0,
              augRev ?? 0,
              sepRev ?? 0,
              oktRev ?? 0,
              novRev ?? 0,
              desRev ?? 0,
            ],
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
          text: `Statistik Penjualan Tahun ${getYear(new Date())}`,
        },
      },
      maintainAspectRatio: false,
      responsive: true,
    });

    setIsLoading(false);
  }, [
    janRev,
    febRev,
    marRev,
    aprRev,
    meiRev,
    junRev,
    julRev,
    augRev,
    sepRev,
    oktRev,
    novRev,
    desRev,
  ]);

  return (
    <div className="h-[525px] col-span-5 w-[90%]">
      {isLoading || !propsDataPendapatan ? (
        <Skeleton className="h-full w-full" />
      ) : (
        <Bar data={chartData} options={chartOptions} />
      )}
    </div>
  );
};

export default Chart;
