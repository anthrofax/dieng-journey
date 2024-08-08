"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Navbar as FlowbiteNavbar } from "flowbite-react";
import { MdOutlineTravelExplore } from "react-icons/md";
import { IoMdLogOut } from "react-icons/io";
import { signOut } from "next-auth/react";
import { confirmAlert } from "react-confirm-alert";
import ConfirmationBox from "@/components/confirmation-box/confirmation-box";
import { RiLogoutBoxRFill } from "react-icons/ri";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    window.onscroll = () => {
      setIsScrolled(window.scrollY !== 0);
      return () => (window.onscroll = null);
    };
  }, []);

  return (
    <FlowbiteNavbar
      fluid
      rounded
      className={`fixed z-50 h-16  w-full top-0 ${
        isScrolled ? "shadow-md backdrop-blur" : ""
      }  px-10 lg:px-16 bg-transparent items-center py-5`}
    >
      <Link
        href="/"
        className="flex items-center gap-2 transition-all text-xl lg:2xl"
      >
        <h1 className="text-blue-600 font-bold">Fierto Admin</h1>
        <MdOutlineTravelExplore color="rgb(37 99 235)" />
      </Link>
      <button
        onClick={() =>
          confirmAlert({
            customUI: ({ onClose }: { onClose: () => void }) => {
              return (
                <ConfirmationBox
                  icon={<RiLogoutBoxRFill />}
                  judul="Konfirmasi Logout"
                  pesan="Apakah anda yakin ingin melakukan logout?"
                  onClose={onClose}
                  onClickIya={() => signOut()}
                  labelIya="Iya"
                  labelTidak="Ohh, sebentar"
                />
              );
            },
          })
        }
        className="text-slate-500 text-center gap-2 items-center text-lg hover:text-red-500 hidden lg:flex"
      >
        Logout <IoMdLogOut />
      </button>
      <FlowbiteNavbar.Toggle className="inline-flex lg:hidden" />
      <FlowbiteNavbar.Collapse className="lg:hidden bg-slate-100">
        <FlowbiteNavbar.Link href="/admin/dashboard" active>
          Dashboard
        </FlowbiteNavbar.Link>
        <FlowbiteNavbar.Link as={Link} href="/admin/users">
          Penngguna
        </FlowbiteNavbar.Link>
        <FlowbiteNavbar.Link href="/admin/listings">Hotel</FlowbiteNavbar.Link>
        <FlowbiteNavbar.Link href="/admin/reservations">
          Transaksi
        </FlowbiteNavbar.Link>
        <FlowbiteNavbar.Link href="/admin/reviews">Ulasan</FlowbiteNavbar.Link>
        <button
          onClick={() =>
            confirmAlert({
              customUI: ({ onClose }: { onClose: () => void }) => {
                return (
                  <ConfirmationBox
                    icon={<RiLogoutBoxRFill />}
                    judul="Konfirmasi Logout"
                    pesan="Apakah anda yakin ingin melakukan logout?"
                    onClose={onClose}
                    onClickIya={() => signOut()}
                    labelIya="Iya"
                    labelTidak="Ohh, sebentar"
                  />
                );
              },
            })
          }
          className="text-slate-500 text-center gap-2 items-center text-lg hover:text-red-500 hidden lg:flex"
        >
          Logout <IoMdLogOut />
        </button>
      </FlowbiteNavbar.Collapse>
    </FlowbiteNavbar>
  );
};

export default Navbar;
