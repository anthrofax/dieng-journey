"use client";

import { usePathname } from "next/navigation";
import { Navbar } from "flowbite-react";

interface LinkData {
  id: string;
  text: string;
  href: string;
}

const linkData: LinkData[] = [
  { id: "home", text: "Beranda", href: "/" },
  { id: "order", text: "Pilihan Paket", href: "/order-package" },
  { id: "destinasi", text: "Destinasi", href: "/destinations" },
  { id: "kontak", text: "Kontak", href: "/kontak" },
];

const NavbarLinks = () => {
  const pathname = usePathname(); // Mendapatkan pathname saat ini

  return (
    <Navbar.Collapse>
      {linkData.map((link) => {
        console.log(pathname);
        console.log(link.href);
        const isActive = pathname === link.href;
        console.log(isActive);
        return (
          <Navbar.Link
            href={link.href}
            key={link.id}
            active={isActive}
            className="group flex flex-col items-center"
          >
            {link.text}
            <div
              className={`transition-all group-hover:w-full h-0.5 rounded-full ${
                isActive ? "w-full" : "w-0"
              } bg-primaryWhite`}
            />
          </Navbar.Link>
        );
      })}
    </Navbar.Collapse>
  );
};

export default NavbarLinks;
