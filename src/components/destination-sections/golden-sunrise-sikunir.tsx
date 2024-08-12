import Image from "next/image";
import React from "react";
import { IoIosArrowForward, IoMdPricetags, IoIosPeople } from "react-icons/io";
import CountUpNumber from "../count-up-number/count-up-number";
import Link from "next/link";

function GoldenSunriseSikunirSection() {
  return (
    <section className="relative w-full my-36  ">
      <section className="flex flex-col lg:flex-row w-5/6 gap-10 mx-auto justify-center items-center relative  ">
        <section className="min-w-[18rem] min-h-[12rem] relative">
          <Image
            src="/img/golden_sunrise_sikunir_2.webp"
            alt="Golden Sunrise Sikunir"
            width={500}
            height={500}
            className=" rounded-2xl object-cover"
          />
        </section>
        <section className="w-[80%] flex flex-col justify-center items-center lg:items-start gap-3 text-center lg:text-left  ">
          <h1 className="sm:text-2xl text-4xl w-[80%] text-slate-800 font-bold mb-4  ">
            Golden Sunrise Sikunir
          </h1>
          <p className="text-slate-500 text-justify leading-8">
            Nikmati keajaiban alam dari Golden Sunrise Sikunir yang terkenal
            dengan pemandangan matahari terbitnya yang memukau. Terletak di
            ketinggian Dieng, Bukit Sikunir menawarkan panorama langit yang
            berubah warna menjadi emas saat fajar menyingsing, menjadikannya
            tempat yang sempurna bagi pecinta alam dan fotografi.
          </p>
          <Link className="mt-3" href="/destinations/66af7a1fc4f78db57ce0132f">
            <div className="bg-primary hover:bg-secondary flex gap-2 items-center rounded-lg w-max p-3 text-white hover:text-black">
              <h1>Lihat Selengkapnya</h1>
              <IoIosArrowForward size={20} />
            </div>
          </Link>
        </section>
      </section>
    </section>
  );
}

export default GoldenSunriseSikunirSection;
