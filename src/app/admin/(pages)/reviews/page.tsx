"use client";
import React from "react";
import AdminLayout from "../../layout/admin-layout";
import { useQuery } from "@tanstack/react-query";
import { getAllReviews } from "./service";
import { columns } from "./table/column";
import { ClipLoader } from "react-spinners";
import { DataTable } from "../../components/data-table";
import Skeleton from "react-loading-skeleton";

const Reviews = () => {
  const { data: allReviews, isLoading } = useQuery({
    queryFn: getAllReviews,
    queryKey: ["admin", "reviews"],
  });


  return (
    <div className="py-10 col-span-12 lg:col-span-10 lg:w-full grid grid-rows-12">
      <h2 className="text-3xl text-slate-800 font-semibold mb-3 text-center lg:text-left">
        All Reviews
      </h2>
      <div className="mt-2 h-2/3 w-[80vw] max-lg:mx-auto row-span-10">
        {isLoading ? (
          <Skeleton className="w-full h-full" />
        ) : (
          <DataTable columns={columns} data={allReviews} />
        )}{" "}
      </div>
    </div>
  );
};

export default Reviews;
