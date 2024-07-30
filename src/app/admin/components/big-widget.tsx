import Image from "next/image";
import React from "react";
import Skeleton from "react-loading-skeleton";
import { ClipLoader } from "react-spinners";

const BigWidget = ({ listing }: { listing: any }) => {
  return (
    <div className="h-[525px] mt-auto col-span-2 rounded-xl transition-all shadow-lg hover:shadow-xl w-[90%] max-w-96 lg:w-full ">
      {!listing ? (
        <Skeleton className="h-full"/>
      ) : (
        <div className="flex flex-col gap-4">
          <h3 className="p-6 text-slate-700 text-center font-bold text-2xl">
            #1 Reserved Listing
          </h3>
          <div>
            <Image
              src={listing?.imageUrls[0]}
              className="object-cover"
              width="420"
              height="300"
              blurDataURL={listing?.blurredImage}
              placeholder="blur"
              alt="#1 Reserved Listing"
            />
            <div className="p-6 flex flex-col gap-8">
              <h3 className="mt-4 font-bold text-slate-700 text-2xl">
                {listing?.name}
              </h3>
              <span className="flex items-center font-semibold gap-2">
                <h3 className="text-slate-500">Total reservations:</h3>
                <span className="text-slate-500">
                  {listing?.reservations?.length} reservations
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
