import Image from "next/image";
import React from "react";
import { IoIosArrowForward, IoMdPricetags, IoIosPeople } from "react-icons/io";
import CountUpNumber from "../count-up-number/count-up-number";
import Link from "next/link";

function KawahSikidangSection() {
  return (
    <section className="relative w-full my-36  ">
      <section className="flex flex-col lg:flex-row w-5/6 gap-10 mx-auto justify-center items-center relative  ">
        <section className="min-w-[18rem] min-h-[12rem] relative">
          <Image
            src="/img/kawah_sikidang_2.webp"
            alt="Golden Sunrise Sikunir"
            width={500}
            height={500}
            className=" rounded-2xl object-cover"
          />
        </section>
        <section className="w-[80%] flex flex-col justify-center items-center lg:items-start gap-3 text-center lg:text-left  ">
          <h1 className="sm:text-2xl text-4xl w-[80%] text-slate-800 font-bold mb-4  ">
            Kawah Sikidang
          </h1>
          <p className="text-slate-500 text-justify leading-8">
            Kawah Sikidang, salah satu kawah vulkanik aktif di Dieng, menawarkan
            pengalaman yang tidak terlupakan dengan fenomena alam berupa asap
            belerang yang mengepul dan tanah yang mendesis. Area ini menawarkan
            pandangan dekat pada kekuatan alam bumi serta kesempatan untuk
            belajar tentang geologi vulkanik.
          </p>
          <Link className="mt-3" href="/destinations/66af7a20c4f78db57ce01331">
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

export default KawahSikidangSection;
