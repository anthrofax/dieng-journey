import fiertoLogo from "@/app/favicon.ico";
import {
  Navbar as FlowbiteNavbar,
  NavbarBrand,
} from "flowbite-react";
import Image from "next/image";
import { customTheme } from "./custom-theme";
import SideComponent from "./side-component";
import { Skeleton } from "../ui/skeleton";
import NavbarLinks from "./navbar-links";
import { Suspense } from "react";

const Navbar = async () => {
  return (
    <FlowbiteNavbar
      fluid
      rounded
      theme={customTheme}
    >
      <NavbarBrand href="/">
        <Image
          src={fiertoLogo}
          className="mr-3 w-10 aspect-square rounded-full border-2 border-primaryWhite"
          alt="Flowbite React Logo"
          quality={30}
        />
        <span className="self-center whitespace-nowrap text-xl font-semibold ">
          Fierto Agency
        </span>
      </NavbarBrand>

      <div className="flex md:order-2">
        <Suspense
          fallback={<Skeleton className="rounded-full w-10 aspect-square" />}
        >
          <SideComponent />
        </Suspense>
      </div>

      <NavbarLinks />
    </FlowbiteNavbar>
  );
};

export default Navbar;
