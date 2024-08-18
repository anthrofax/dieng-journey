"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import Spinner from "../spinner/spinner";
import { Destination } from "@prisma/client";
import { MdExplore } from "react-icons/md";
import { Button } from "flowbite-react";
import Link from "next/link";
import { useDestinationHook } from "@/hooks/destination-hooks";
import Card from "../destination-card/card";
import Skeleton from "react-loading-skeleton";

const PopularDestinations = () => {
  const { allDestinations, isLoading } = useDestinationHook();
  const DISPLAYED_DESTINATIONS = 5;

  return (
    <div className="h-full w-full my-16">
      <div className="h-full w-5/6 mx-auto flex flex-col justify-start">
        <h5 className="text-[20px] bg-blue-500 text-white rounded-full p-4 w-max">
          Eksplor Wisata
        </h5>
        <h2 className="text-4xl text-slate-800 font-bold mt-6 mb-12">
          Destinasi Terpopuler
        </h2>
        <div className="flex flex-wrap items-center gap-10 relative min-h-16 justify-center lg:justify-start">
          {isLoading
            ? Array.from({ length: DISPLAYED_DESTINATIONS }).map((_, idx) => (
                <Skeleton
                  key={idx}
                  className="rounded-xl shadow-md "
                  height={350}
                  width={250}
                />
              ))
            : allDestinations
                ?.slice(0, DISPLAYED_DESTINATIONS)
                .map((destination: Destination, idx: number) => (
                  <Card key={idx} destination={destination} />
                ))}
        </div>

        {!isLoading && (
          <Button className="rounded-lg mt-12 container mx-auto text-3xl w-fit px-3">
            <Link href="/destinations">Yuk, Eksplor Destinasi Lainnya!</Link>
            <MdExplore className="ml-2 h-5 w-5" />
          </Button>
        )}
      </div>
    </div>
  );
};

export default PopularDestinations;
