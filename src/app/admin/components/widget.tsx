import { Rupiah } from "@/utils/format-currency";
import Link from "next/link";
import React from "react";
import Skeleton from "react-loading-skeleton";

const Widget = ({
  page,
  data,
  label,
  icon,
}: {
  page?: string;
  data: any;
  label: string;
  icon: JSX.Element;
}) => {
  return (
    <div className="w-[80%] h-48 p-4 transition-all shadow-md hover:shadow-lg rounded-xl cursor-pointer">
      {!data ? (
        <Skeleton className="h-full" />
      ) : (
        <>
          <div className="w-full h-full flex flex-col justify-between">
            <div
              className={`flex justify-between gap-3 w-full ${
                label === "Pendapatan" ? "flex-col" : "flex-row"
              }`}
            >
              <h2 className="font-bold text-[18px] uppercase text-[#b6b0b0]">
                {label}
              </h2>
              <div className="grow w-10 text-end ">
                {label !== "Pendapatan"
                  ? data?.length
                  : `${Rupiah.format(data?.totalPendapatan?.toFixed(2))}`}
              </div>
            </div>
            <div className="flex justify-between">
              <Link
                className="border-b transition hover:border-slate-500"
                href={`/admin/${page}`}
              >
                See all
              </Link>
              <span className="h-8 w-8 flex justify-center items-center rounded-full bg-blue-400">
                {icon}
              </span>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Widget;
