"use client";

import { Badge, Button } from "flowbite-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FaMapMarkedAlt } from "react-icons/fa";
import { FaSquareParking } from "react-icons/fa6";
import { GiPirateCoat } from "react-icons/gi";
import { IoFastFood, IoTicketOutline } from "react-icons/io5";
import { MdEmojiTransportation, MdNightsStay } from "react-icons/md";
import { RiGuideLine, RiSteering2Line } from "react-icons/ri";
import { gsap } from "gsap";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { healingSchema } from "./healing-schema";
import { travellingSchema } from "./travelling-schema";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";

const paket = [
  {
    nama: "Paket Healing",
    deskripsi:
      "Coba pengalaman baru ke Desa Wisata Indah Dieng dengan harga yang paling terjangkau",
    harga: 500000,
    include: [
      {
        icon: MdEmojiTransportation,
        label: "Transportasi",
      },
      {
        icon: RiSteering2Line,
        label: "Driver",
      },
      {
        icon: FaSquareParking,
        label: "Parkir",
      },
      {
        icon: RiGuideLine,
        label: "Tour Guide",
      },
      {
        icon: IoFastFood,
        label: "Welcome Snack",
      },
      {
        icon: GiPirateCoat,
        label: "Jas Hujan 1x Pakai",
      },
      {
        icon: IoTicketOutline,
        label: "Ticketing (3 Destinasi)",
      },
    ],
  },
  {
    nama: "Paket Travelling",
    deskripsi:
      "Dapatkan pengalaman yang luar biasa dengan pelayanan yang paling memanjakan saat masa perjalanan",
    harga: 1200000,
    include: [
      {
        icon: MdEmojiTransportation,
        label: "Transportasi",
      },
      {
        icon: RiSteering2Line,
        label: "Driver",
      },
      {
        icon: FaSquareParking,
        label: "Parkir",
      },
      {
        icon: RiGuideLine,
        label: "Tour Guide",
      },
      {
        icon: IoFastFood,
        label: "Welcome Snack",
      },
      {
        icon: GiPirateCoat,
        label: "Jas Hujan 1x Pakai",
      },
      {
        icon: FaMapMarkedAlt,
        label: "Experience Tambahan",
      },
      {
        icon: IoTicketOutline,
        label: "Ticketing (5 Destinasi)",
      },
      {
        icon: MdNightsStay,
        label: "Gratis Layanan Penginapan",
      },
    ],
  },
];

function Paket() {
  const { data: session } = useSession();

  useEffect(() => {
    const paketItems = document.querySelectorAll(".paket-item");

    paketItems.forEach((item) => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            gsap.to(entry.target, {
              opacity: 1,
              y: 0,
              duration: 1,
              ease: "power2.out",
            });
            observer.unobserve(entry.target);
          }
        },
        { threshold: 0.1 }
      );
      observer.observe(item);
    });
  }, []);

  const router = useRouter();

  const healingForm = useForm({
    resolver: zodResolver(healingSchema),
  });

  const travellingForm = useForm({
    resolver: zodResolver(travellingSchema),
  });

  return (
    <section id="section-paket" className="bg-white shadow-xl text-black py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative w-fit mx-auto px-12 py-3 shadow-lg rounded-full">
          <Image
            id="package-badge"
            src="/asset/badge.svg"
            alt="Package Order Requirements Badge"
            width={0}
            height={0}
            className="absolute -right-3 lg:-right-10 -top-3 lg:-top-10 rotate-[30deg] duration-1000 w-[85px] aspect-square"
          />

          <h2 className="text-center text-3xl font-medium sm:text-4xl tracking-widest uppercase">
            Paket Hemat!
          </h2>
        </div>
        <p className="mt-4 text-center text-lg leading-6 text-slate-800">
          Kami menawarkan paket perjalanan kelompok wisata mu, memungkinkan kamu
          mendapatkan pengalaman berwisata dengan harga yang terjangkau
        </p>
      </div>

      <div className="mt-8 flex justify-center items-start gap-8 p-5 flex-wrap">
        {paket.map((paketItem) => (
          <div
            className="paket-item w-[350px] rounded-lg flex flex-col items-center px-5 py-8 duration-1000 text-center opacity-0 translate-y-10 hover:translate-y-10 shadow-[0_0px_30px_-5px_rgba(0,0,0,0.3)]"
            id="paket-item"
            style={{
              transition: "transform 0.3s ease",
              transform: "translateY(0)",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.transform = "translateY(-10px)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.transform = "translateY(0)")
            }
            key={paketItem.nama}
          >
            <div className="flex flex-col gap-2">
              <h1 className="text-3xl font-bold">{paketItem.nama}</h1>
              <p>{paketItem.deskripsi}</p>
            </div>

            <div className="text-5xl my-5">
              <h1>
                <sup>Rp</sup>
                <span className="font-medium">{paketItem.harga / 1000}</span>
                <span className="text-3xl">k</span>
                <span className="text-xl">/orang</span>
              </h1>
            </div>

            <ul className="text-left shadow-lg rounded-xl py-3 px-5 max-h-56 overflow-y-scroll flex flex-col items-center">
              {paketItem.include.map((fasilitas, i) => (
                <Badge
                  icon={fasilitas.icon}
                  size={20}
                  key={i}
                  className={`mt-3 flex justify-center w-full bg-primary text-white`}
                >
                  {fasilitas.label}
                </Badge>
              ))}
            </ul>

            <Button
              outline
              fullSized
              pill
              gradientDuoTone="purpleToBlue"
              className="overflow-visible mt-5"
              onClick={() => {
                if (!session)
                  return toast.error(
                    "Anda belum login, silahkan login terlebih dahulu"
                  );

                router.push(
                  `/order-package?selected-package=${
                    paketItem.nama === "Paket Travelling" ? "travelling" : "healing"
                  }`
                );
              }}
            >
              Pesan
            </Button>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Paket;
