"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { AiFillStar, AiOutlineHome, AiOutlineUser } from "react-icons/ai";
import { MdDashboard, MdHotel, MdCardTravel } from "react-icons/md";
import { FaMapMarkedAlt } from "react-icons/fa";
import { IoTicket } from "react-icons/io5";
import { LuHotel } from "react-icons/lu";

const Sidebar = () => {
  const currentPage = usePathname().split("/")[2];

  const sidebarData = [
    {
      text: "Dashboard",
      icon: MdDashboard,
      href: "/admin/dashboard",
      isCurrentPage: currentPage === "dashboard",
    },
    {
      text: "Destinasi",
      icon: MdCardTravel,
      href: "/admin/destinations",
      isCurrentPage: currentPage === "destinations",
    },
    {
      text: "Experience",
      icon: FaMapMarkedAlt,
      href: "/admin/experiences",
      isCurrentPage: currentPage === "experiences",
    },
    {
      text: "Users",
      icon: AiOutlineUser,
      href: "/admin/users",
      isCurrentPage: currentPage === "users",
    },
    {
      text: "Penjualan Tiket",
      icon: IoTicket,
      href: "/admin/orders",
      isCurrentPage: currentPage === "orders",
    },
    {
      text: "Reviews",
      icon: AiFillStar,
      href: "/admin/reviews",
      isCurrentPage: currentPage === "reviews",
    },
  ];

  return (
    <div className="w-full hidden lg:flex flex-col justify-between col-span-2 px-3">
      <div className="h-full w-full flex flex-col gap-10">
        {sidebarData.map((data) => (
          <Link
            href={data.href}
            key={data.text}
            className={`flex items-center gap-2 p-3 rounded-xl transition-all cursor-pointer ${
              data.isCurrentPage && "bg-blue-600  w-fit"
            }`}
          >
            <span>
              {<data.icon color={data.isCurrentPage ? "#fff" : "#cec7c7"} />}
            </span>
            <span
              className={`${
                data.isCurrentPage ? "text-white" : "text-[#cec7c7]"
              }`}
            >
              {data.text}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
