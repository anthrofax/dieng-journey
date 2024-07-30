"use client";
import Link from "next/link";
import { AiOutlineUser } from "react-icons/ai";
import { MdOutlineTravelExplore, MdLogin } from "react-icons/md";
import { signOut, useSession } from "next-auth/react";
import { IoMdLogOut } from "react-icons/io";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { confirmAlert } from "react-confirm-alert";
import { GoInfo } from "react-icons/go";
import ConfirmationBox from "../confirmation-box/confirmation-box";

const Navbar = () => {
  const [showModal, setShowModal] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname().split("/");
  const { data: session } = useSession();

  const toggleModal = () => setShowModal((prev) => !prev);

  useEffect(() => {
    window.onscroll = () => {
      setIsScrolled(window.scrollY !== 0);
      return () => (window.onscroll = null);
    };
  }, []);

  return (
    <div
      className={`fixed z-50 h-16 w-full top-0 left-0 ${
        isScrolled ? "shadow-md backdrop-blur" : ""
      } `}
    >
      <div className="h-full w-full px-5 lg:px-10 mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 transition-all">
          <h1
            className={`${
              isScrolled ? "text-blue-600" : "text-[#cec7c7]"
            } text-lg lg:text-2xl font-bold`}
          >
            Dieng Journey
          </h1>
          <MdOutlineTravelExplore
            size={25}
            color={`${isScrolled ? "rgb(37 99 235)" : "#cec7c7"}`}
          />
        </Link>
        {!pathname.includes("user") && (
          <div>
            {session ? (
              <div className="cursor-pointer" onClick={toggleModal}>
                <AiOutlineUser
                  size={30}
                  color={`${isScrolled ? "rgb(37 99 235)" : "#cec7c7"}`}
                />{" "}
              </div>
            ) : (
              <Link href="/login">
                <MdLogin
                  size={30}
                  color={`${isScrolled ? "rgb(37 99 235)" : "#cec7c7"}`}
                />
              </Link>
            )}
            {showModal && (
              <>
                <div
                  onClick={toggleModal}
                  className="absolute top-16 right-[2rem] shadow-md flex flex-col items-center gap-4 p-4 bg-white rounded-xl "
                >
                  {session?.user?.isAdmin && (
                    <Link
                      className="bg-red-500 text-white px-1 py-2 rounded-xl"
                      href="/admin/dashboard"
                    >
                      Admin Dashboard
                    </Link>
                  )}
                  <Link href="/reservations">Reservations</Link>
                  <Link
                    href={`/user/${session?.user.id}`}
                    className={`${
                      !session?.user.id ? "pointer-events-none" : ""
                    }`}
                  >
                    User Settings
                  </Link>
                  <button
                    onClick={() =>
                      confirmAlert({
                        customUI: ({ onClose }: { onClose: () => void }) => {
                          return (
                            <ConfirmationBox
                              icon={<GoInfo />}
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
                    className="text-slate-500 text-center flex gap-2 items-center"
                  >
                    Logout <IoMdLogOut />
                  </button>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
