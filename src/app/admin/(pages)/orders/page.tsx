"use client";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getAllOrders, getAllReservations } from "../../services/service";
import { ClipLoader } from "react-spinners";
import { DataTable } from "../../components/data-table";
import { columns } from "./table/column";
import Skeleton from "react-loading-skeleton";

const Orders = () => {
  const { data: allOrders, isLoading } = useQuery({
    queryFn: getAllOrders,
    queryKey: ["admin", "orders"],
  });

  console.log(allOrders)

  return (
    <div className="py-10 col-span-12 lg:col-span-10 lg:w-full grid grid-rows-12">
      <h2 className="text-3xl text-slate-800 font-semibold mb-3 text-center lg:text-left">
        Semua Transaksi
      </h2>
      <div className="mt-2 h-2/3 w-[80vw] max-lg:mx-auto row-span-11">
        {isLoading ? (
          <Skeleton className="w-full h-full" />
        ) : (
          <DataTable columns={columns} data={allOrders} filterBy="destinationName" filterByLabel="destinasi" />
        )}
      </div>
    </div>
  );
};

export default Orders;
