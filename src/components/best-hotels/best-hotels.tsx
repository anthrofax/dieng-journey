"use client";

import Card from "./card";
import { useQuery } from "@tanstack/react-query";
import { getBestHotels } from "./service";
import Spinner from "../spinner/spinner";

const BestHotels = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["listings"],
    queryFn: getBestHotels,
  });

  return (
    <div className="h-full w-full my-36">
      <div className="h-full w-5/6 mx-auto flex flex-col justify-start">
        <h5 className="text-[20px] bg-blue-500 text-white rounded-full p-4 w-max">
          Explore Top
        </h5>
        <h2 className="text-4xl text-slate-800 font-bold mt-6 mb-12">
          Best Hotels
        </h2>
        <div className="flex flex-wrap items-center gap-14 relative min-h-20">
          {isLoading ? (
            <Spinner />
          ) : (
            data?.map((place) => <Card key={place.name} place={place} />)
          )}
        </div>
      </div>
    </div>
  );
};

export default BestHotels;
