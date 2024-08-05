"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { AiOutlineUser } from "react-icons/ai";
import { MdDashboard, MdHotel, MdCardTravel } from "react-icons/md";
import { FaMapMarkedAlt } from "react-icons/fa";
import { IoTicket } from "react-icons/io5";
import { MdNightsStay } from "react-icons/md";

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
      text: "Penginapan",
      icon: MdNightsStay,
      href: "/admin/lodging",
      isCurrentPage: currentPage === "lodging",
    },
    {
      text: "Pengguna",
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
  ];

  return (
    <div className="w-full hidden lg:flex flex-col justify-between col-span-2 px-3">
      <div className="h-full w-full flex flex-col gap-10">
        {sidebarData.map((data) => (
          <Link
            href={data.href}
            key={data.text}
            className={`flex items-center gap-2 p-3 w-fit rounded-xl transition-all cursor-pointer text-[#cec7c7] ${
              data.isCurrentPage && "bg-blue-600 text-white"
            } hover:bg-blue-300 transition-all hover:text-white`}
          >
            <span>{<data.icon />}</span>
            <span>{data.text}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
