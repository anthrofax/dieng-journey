"use client";
import Link from "next/link";
import { AiOutlineUser } from "react-icons/ai";
import { MdLogin, MdDashboard } from "react-icons/md";
import { signOut, useSession } from "next-auth/react";
import { IoMdLogOut } from "react-icons/io";
import React, { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { confirmAlert } from "react-confirm-alert";
import { GoInfo } from "react-icons/go";
import { RxHamburgerMenu } from "react-icons/rx";
import ConfirmationBox from "../confirmation-box/confirmation-box";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { IoTicket } from "react-icons/io5";
import { Avatar, Dropdown, Navbar as FlowbiteNavbar } from "flowbite-react";
import Image from "next/image";
import { customTheme } from "./custom-theme";

const Navbar = () => {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const { data: session } = useSession();
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const toggleSheet = () => setIsSheetOpen(!isSheetOpen);

  const sidebarData = [
    {
      text: "Users",
      icon: AiOutlineUser,
      href: `/user/${session?.user.id}`,
    },
    {
      text: "Transaksi",
      icon: IoTicket,
      href: "/orders",
    },
  ];

  const linkData = [
    {
      id: "order",
      text: "Pilihan Paket",
      href: "order-package",
    },
    {
      id: "destinasi",
      text: "Destinasi",
      href: "destinations",
    },
  ];

  useEffect(() => {
    window.onscroll = () => {
      setIsScrolled(
        pathname === "/" || pathname === "/destinations"
          ? window.scrollY >= screen.height
          : true
      );
      return () => (window.onscroll = null);
    };
  }, []);

  return (
    <FlowbiteNavbar
      fluid
      rounded
      className={`${
        pathname === "/" || pathname === "/destinations"
          ? isScrolled
            ? "backdrop-blur bg-white/50"
            : "bg-white/0"
          : "bg-white/50 shadow-md"
      }`}
      theme={customTheme}
    >
      <FlowbiteNavbar.Brand href="/" className="space-x-2 nav__logo">
        <div
          className={`relative rounded-full w-[3.5rem] aspect-square overflow-hidden ${
            pathname === "/" || pathname === "/destinations"
              ? `border-4 ${isScrolled ? "border-primary" : "border-white"}`
              : "border-black/30 border-4"
          }`}
        >
          <Image
            src="/favicon.ico"
            className="scale-110"
            alt="Fierto Logo"
            fill
          />
        </div>
        <span
          className={`self-center tracker-widest text-xl font-semibold ${
            pathname === "/" || pathname === "/destinations"
              ? `${isScrolled ? "text-primary" : "text-white"}`
              : "text-black"
          }`}
        >
          Fierto Agency
        </span>
      </FlowbiteNavbar.Brand>

      {!pathname.includes("user") && !pathname.includes("orders") ? (
        <>
          <div className="flex md:order-2">
            {session ? (
              <>
                <Dropdown
                  arrowIcon={false}
                  inline
                  className="z-[51]"
                  label={
                    <Avatar
                      alt="User settings"
                      img={session?.user.profileImage}
                      rounded
                      className={`border-4 rounded-full ${
                        pathname === "/" || pathname === "/destinations"
                          ? `${isScrolled ? "border-primary" : "border-white"}`
                          : "border-black"
                      }`}
                    />
                  }
                >
                  <Dropdown.Header>
                    <span className="block text-sm">{`@${session?.user.username}`}</span>
                    <span className="block truncate text-sm font-medium">
                      {session?.user.email}
                    </span>
                  </Dropdown.Header>
                  <Dropdown.Item
                    href={`/user/${session?.user.id}`}
                    className={`${
                      !session?.user.id ? "pointer-events-none" : ""
                    }`}
                  >
                    Pengaturan Pengguna
                  </Dropdown.Item>
                  <Dropdown.Item href="/orders">Transaksi</Dropdown.Item>
                  {session?.user?.isAdmin && (
                    <Dropdown.Item href="/admin/dashboard">
                      Admin Dashboard
                    </Dropdown.Item>
                  )}
                  <Dropdown.Divider />
                  <Dropdown.Item
                    onClick={() =>
                      confirmAlert({
                        customUI: ({ onClose }: { onClose: () => void }) => {
                          return (
                            <ConfirmationBox
                              icon={<GoInfo />}
                              judul="Konfirmasi Logout"
                              pesan="Apakah anda yakin ingin melakukan logout?"
                              onClose={onClose}
                              onClickIya={() => signOut({callbackUrl: '/login'})}
                              labelIya="Iya"
                              labelTidak="Ohh, sebentar"
                            />
                          );
                        },
                      })
                    }
                    className="flex gap-2"
                  >
                    Sign out <IoMdLogOut />
                  </Dropdown.Item>
                </Dropdown>
                <FlowbiteNavbar.Toggle
                  className={`${
                    pathname === "/" || pathname === "/destinations"
                      ? `${isScrolled ? "text-primary" : "text-white"}`
                      : "text-black"
                  }`}
                />
              </>
            ) : (
              <Link href="/login">
                <MdLogin
                  size={30}
                  color={`${isScrolled ? "rgb(37 99 235)" : "#cec7c7"}`}
                />
              </Link>
            )}
          </div>
          <FlowbiteNavbar.Collapse className="w-full lg:w-fit text-nowrap">
            <FlowbiteNavbar.Link
              href={pathname === "/" ? "#" : "/"}
              active={pathname === "/"}
              className={`transition-all text-base ${
                pathname === "/" || pathname === "/destinations"
                  ? `${
                      isScrolled
                        ? "text-primary border-primary"
                        : "text-black lg:text-white lg:border-white"
                    }`
                  : "text-black"
              } flex flex-col items-center group`}
            >
              Home
              <div
                className={`transition-all group-hover:w-full h-0.5 rounded-full ${
                  pathname === "/" ? "w-full" : "w-0"
                } ${
                  pathname === "/" || pathname === "/destinations"
                    ? `${isScrolled ? "bg-primary" : "bg-black lg:bg-white"}`
                    : "bg-black"
                }`}
              />
            </FlowbiteNavbar.Link>
            {linkData.map((link) => (
              <FlowbiteNavbar.Link
                key={link.id}
                href={`/${link.href}`}
                active={pathname.split("/").includes(link.href)}
                className={`transition-all text-base ${
                  pathname === "/" || pathname === "/destinations"
                    ? `${
                        isScrolled
                          ? "text-primary border-primary"
                          : "text-black lg:text-white lg:border-white"
                      }`
                    : "text-black"
                } flex flex-col items-center group`}
              >
                {link.text}
                <div
                  className={`transition-all group-hover:w-full h-0.5 rounded-full ${
                    pathname === `/${link.href}` ? "w-full" : "w-0"
                  } ${
                    pathname === "/" || pathname === "/destinations"
                      ? `${isScrolled ? "bg-primary" : "bg-black lg:bg-white"}`
                      : "bg-black"
                  }`}
                />
              </FlowbiteNavbar.Link>
            ))}
            
            <div className="w-full flex flex-col items-center">
              <Link
                href={
                  pathname === "/" ? "#contact-section" : "/#contact-section"
                }
                className={`transition-all text-base ${
                  pathname === "/" || pathname === "/destinations"
                    ? `${
                        isScrolled
                          ? "text-primary border-primary"
                          : "text-black lg:text-white lg:border-white"
                      }`
                    : "text-black"
                } peer`}
                scroll
              >
                Kontak
              </Link>
              <div
                className={`transition-all w-0 peer-hover:w-full h-0.5 rounded-full ${
                  pathname === "/" || pathname === "/destinations"
                    ? `${isScrolled ? "bg-primary" : "bg-black lg:bg-white"}`
                    : "bg-black"
                }`}
              />
            </div>
          </FlowbiteNavbar.Collapse>
        </>
      ) : (
        <Sheet open={isSheetOpen} onOpenChange={toggleSheet}>
          <SheetTrigger asChild className="lg:hidden">
            <div className="cursor-pointer group">
              <RxHamburgerMenu
                size={30}
                color={`#cec7c7`}
                className="group-hover:text-primary"
              />{" "}
            </div>
          </SheetTrigger>
          <SheetContent>
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
                  <span>
                    {<data.icon className="group-hover:text-primary" />}
                  </span>
                  <span className="group-hover:text-primary">{data.text}</span>
                </Link>
              ))}
              {session?.user.isAdmin && (
                <Link
                  href="/admin/dashboard"
                  className={`flex items-center gap-2 p-3 rounded-xl transition-all cursor-pointer group text-[#cec7c7]`}
                >
                  <span>
                    {<MdDashboard className="group-hover:text-primary" />}
                  </span>
                  <span className="group-hover:text-primary">
                    Dashboard Admin
                  </span>
                </Link>
              )}
              <button
                className={`flex items-center gap-2 p-3 rounded-xl transition-all cursor-pointer group text-[#cec7c7]`}
              >
                <span>
                  {<IoMdLogOut className=" group-hover:text-primary" />}
                </span>
                <span
                  className="group-hover:text-primary"
                  onClick={() => {
                    setIsSheetOpen(false);

                    confirmAlert({
                      customUI: ({ onClose }: { onClose: () => void }) => {
                        return (
                          <ConfirmationBox
                            icon={<GoInfo />}
                            judul="Konfirmasi Logout"
                            pesan="Apakah anda yakin ingin melakukan logout?"
                            onClose={onClose}
                            onClickIya={() => signOut({callbackUrl:'/login'})}
                            labelIya="Iya"
                            labelTidak="Ohh, sebentar"
                          />
                        );
                      },
                    });
                  }}
                >
                  Logout
                </span>
              </button>
            </div>
          </SheetContent>
        </Sheet>
      )}
    </FlowbiteNavbar>
  );
};

export default Navbar;
