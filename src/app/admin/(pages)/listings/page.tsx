"use client";

import { ClipLoader } from "react-spinners";
import { getAllListings } from "../../services/service";
import { useQuery } from "@tanstack/react-query";
import { columns } from "./table/column";
import { DataTable } from "../../components/data-table";
import Skeleton from "react-loading-skeleton";

function Listings() {
  const { data: allListings, isLoading } = useQuery({
    queryFn: getAllListings,
    queryKey: ["admin", "listings"],
  });


  return (
    <div className="py-10 col-span-12 lg:col-span-10 lg:w-full grid grid-rows-12">
      <h2 className="text-3xl text-slate-800 font-semibold mb-3 text-center lg:text-left">
      Pengelolaan Data Hotel
      </h2>
      <div className="mt-2 h-2/3 w-[80vw] max-lg:mx-auto row-span-10">
        {isLoading ? (
          <Skeleton className="w-full h-full" />
        ) : (
          <DataTable columns={columns} data={allListings} />
        )}
      </div>
    </div>
  );
}

export default Listings;
