import { Destination, Order } from "@prisma/client";
import Image from "next/image";
import React from "react";
import Skeleton from "react-loading-skeleton";

const BigWidget = ({
  destination,
}: {
  destination: Destination & {
    orders: Order[];
  };
}) => {
  return (
    <div className="h-[525px] mt-auto col-span-2 rounded-xl transition-all shadow-lg hover:shadow-xl w-[90%] max-w-96 lg:w-full ">
      {!destination ? (
        <Skeleton className="h-full" />
      ) : (
        <div className="flex flex-col gap-4">
          <h3 className="p-6 text-slate-700 text-center font-bold text-2xl">
            #1 Destinasi Terpopuler
          </h3>
          <div>
            <Image
              src={destination?.imageUrls[0]}
              className="object-cover"
              width="420"
              height="300"
              // blurDataURL={destination?.blurredImage}
              // placeholder="blur"
              alt="#1 Reserved destination"
            />
            <div className="p-6 flex flex-col gap-8">
              <h3 className="mt-4 font-bold text-slate-700 text-2xl">
                {destination?.destinationName}
              </h3>
              <span className="flex items-center font-semibold gap-2">
                <h3 className="text-slate-500">Total Transaksi:</h3>
                <span className="text-slate-500">
                  {destination.orders.length} transaksi
                </span>
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BigWidget;
