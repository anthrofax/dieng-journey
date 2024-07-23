import React from "react";
import person_image from "../../../../../public/img/bianco_2.png";
import { AiFillStar } from "react-icons/ai";
import Image from "next/image";
import { format } from "date-fns";
import { Review as ReviewType } from "@prisma/client";

const Review = ({ review }: { review: ReviewType }) => {
  return (
    <div className="w-full flex gap-4">
      <div className="w-14 h-14">
        <Image
          alt="Reviewer Profile Image"
          height="56"
          width="56"
          className="w-full h-full object-cover rounded-full"
          src={person_image}
        />
      </div>
      <div>
        <h3 className="font-semibold text-[20px]">John Doe</h3>
        <span className="text-slate-700">
          {format(review.createdAt, "MMM do yyyy")}
        </span>
        <div className="mt-4 text-slate-800">{review.text}</div>
      </div>
      <span className="ml-auto flex items-center gap-2">
        {review.stars}
        <AiFillStar size={22} color="rgb(59, 130, 246)" />
      </span>
    </div>
  );
};

export default Review;
