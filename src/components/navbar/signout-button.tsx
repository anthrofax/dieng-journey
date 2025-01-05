"use client";

import { Dropdown } from "flowbite-react";
import ConfirmationBox from "../confirmation-box/confirmation-box";
import { GoInfo } from "react-icons/go";
import { signOut } from "next-auth/react";
import { confirmAlert } from "react-confirm-alert";
import { IoMdLogOut } from "react-icons/io";

function SignoutButton() {
  return (
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
                onClickIya={() => signOut({ callbackUrl: "/login" })}
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
  );
}

export default SignoutButton;