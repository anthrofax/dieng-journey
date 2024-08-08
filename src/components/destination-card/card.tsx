import { Destination } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Card = ({ destination }: { destination: Destination }) => {
  return (
    <Link
      href={`/destinations/${destination.destinationId}`}
      className="cursor-pointer h-[500px] w-[300px] flex flex-wrap rounded-xl shadow-md"
    >
      <div className="relative h-2/3 w-full">
        <Image
          alt="location-image"
          src={destination.imageUrls[0]}
          className="h-full w-full overflow-hidden rounded-tl-xl rounded-tr-xl object-cover"
          fill
        />
        <div className="absolute right-0 bottom-0 capitalize p-4 bg-blue-700 text-white rounded-tl-xl font-semibold">
          {destination.city}
        </div>
      </div>
      <div className="flex flex-col gap-4 p-4">
        <h2 className="text-center text-2xl text-slate-800 font-semibold">
          {destination.destinationName}
        </h2>
        <p className="text-center mt-2 text-lg text-slate-700">
          {`${destination.description.slice(0, 50)}${
            destination.description.length >= 50 && "..."
          }`}
        </p>
      </div>
    </Link>
  );
};

export default Card;
