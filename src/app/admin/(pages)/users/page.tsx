"use client";

import { useQuery } from "@tanstack/react-query";
import { columns } from "./table/column";
import { getAllUsers } from "../../services/service";
import { DataTable } from "../../components/data-table";
import Skeleton from "react-loading-skeleton";

function Users() {
  const { data: allUsers, isLoading } = useQuery({
    queryFn: getAllUsers,
    queryKey: ["admin", "users"],
  });

  console.log(allUsers);

  return (
    <div className="py-10 col-span-12 lg:col-span-10 lg:w-full grid grid-rows-12">
      <h2 className="text-3xl text-slate-800 font-semibold mb-3 text-center lg:text-left">
        All Users
      </h2>
      <div className="mt-2 h-2/3 w-[80vw] max-lg:mx-auto row-span-11">
        {isLoading ? (
          <Skeleton className="w-full h-full" />
        ) : (
          <DataTable columns={columns} data={allUsers} />
        )}
      </div>
    </div>
  );
}

export default Users;
