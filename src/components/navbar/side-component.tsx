import { getCurrentUser } from "@/lib/currentUser";
import {
  Dropdown,
  DropdownHeader,
  DropdownItem,
  DropdownDivider,
  Avatar,
  NavbarToggle,
} from "flowbite-react";
import Link from "next/link";
import { MdLogin } from "react-icons/md";
import SignoutButton from "./signout-button";

async function SideComponent() {
  const user = await getCurrentUser();

  if (!user)
    return (
      <Link href="/login">
        <MdLogin size={30} color="#FFFFFF" />
      </Link>
    );

  return (
    <>
      <Dropdown
        arrowIcon={false}
        inline
        label={
          <Avatar
            alt="User settings"
            img={user.profileImage}
            rounded
            bordered
          />
        }
      >
        <DropdownHeader>
          <span className="block text-sm">{`@${user?.username}`}</span>
          <span className="block truncate text-sm font-medium">
            {user?.email}
          </span>
        </DropdownHeader>
        <DropdownItem
          href={`/user/${user.id}`}
          className={`${!user.id ? "pointer-events-none" : ""}`}
        >
          Pengaturan Pengguna
        </DropdownItem>
        <DropdownItem href="/orders">Transaksi</DropdownItem>
        {user.isAdmin && (
          <DropdownItem href="/admin/dashboard">Admin Dashboard</DropdownItem>
        )}
        <DropdownDivider />
        <SignoutButton />
      </Dropdown>
      <NavbarToggle />
    </>
  );
}

export default SideComponent;
