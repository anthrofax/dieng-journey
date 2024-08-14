import {
  Footer as FlowbiteFooter,
  FooterCopyright,
  FooterDivider,
  FooterLink,
  FooterLinkGroup,
} from "flowbite-react";
import Link from "next/link";
import { FaMountain } from "react-icons/fa";
import { MdOutlineTravelExplore } from "react-icons/md";

function Footer() {
  return (
    <FlowbiteFooter container >
      <div className="w-full text-center max-h-fit">
        <div className="w-full justify-between sm:flex sm:items-center sm:justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 transition-all hover:text-primary"
          >
            <h1 className={` text-lg lg:text-2xl font-bold`}>Fierto Agency</h1>
            <MdOutlineTravelExplore size={25} />
          </Link>
          <FooterLinkGroup>
            <FooterLink href="#">About</FooterLink>
            <FooterLink href="#">Privacy Policy</FooterLink>
            <FooterLink href="#">Licensing</FooterLink>
            <FooterLink href="#">Contact</FooterLink>
          </FooterLinkGroup>
        </div>
        <FooterDivider />
        <FooterCopyright href="#" by="Dieng Journey™" year={2024} />
      </div>
    </FlowbiteFooter>
  );
}

export default Footer;
