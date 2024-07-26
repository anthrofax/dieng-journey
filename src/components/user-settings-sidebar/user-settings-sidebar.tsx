"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { AiOutlineHome, AiOutlineUser } from "react-icons/ai";
import { MdDashboard, MdHotel } from "react-icons/md";
import { IoTicket } from "react-icons/io5";
import { IoMdLogOut } from "react-icons/io";
import { signOut, useSession } from "next-auth/react";

const Sidebar = () => {
  const currentPage = usePathname().split("/")[2];
  const { data: session } = useSession();
  const pathname = usePathname();

  const sidebarData = [
    {
      text: "Users",
      icon: AiOutlineUser,
      href: `/user/${session?.user.id}`,
    },
    {
      text: "Transaction",
      icon: IoTicket,
      href: "/reservations",
    },
  ];

  return (
    <div className="w-full flex flex-col justify-between pl-[15%] ">
      <div className="h-full w-full flex flex-col gap-10">
        {sidebarData.map((data) => (
          <Link
            href={data.href}
            key={data.text}
            className={`flex items-center gap-2 p-3 rounded-xl transition-all cursor-pointer group text-[#cec7c7] ${
              pathname.includes(data.href) &&
              "pointer-events-none cursor-default text-primary"
            }`}
          >
            <span>{<data.icon className="group-hover:text-primary" />}</span>
            <span className="group-hover:text-primary">{data.text}</span>
          </Link>
        ))}
        {session?.user.isAdmin && (
          <Link
            href="/admin/dashboard"
            className={`flex items-center gap-2 p-3 rounded-xl transition-all cursor-pointer group text-[#cec7c7]`}
          >
            <span>{<MdDashboard className="group-hover:text-primary" />}</span>
            <span className="group-hover:text-primary">Dashboard Admin</span>
          </Link>
        )}
        <button
          className={`flex items-center gap-2 p-3 rounded-xl transition-all cursor-pointer group text-[#cec7c7]`}
        >
          <span>{<IoMdLogOut className=" group-hover:text-primary" />}</span>
          <span className="group-hover:text-primary" onClick={() => signOut()}>
            Logout
          </span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
