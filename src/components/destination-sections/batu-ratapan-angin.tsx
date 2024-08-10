import Image from "next/image";
import React from "react";
import { IoIosArrowForward, IoMdPricetags, IoIosPeople } from "react-icons/io";
import CountUpNumber from "../count-up-number/count-up-number";
import Link from "next/link";

function BatuRatapanAnginSection() {
  return (
    <section className="relative w-full my-36  ">
      <section className="flex flex-col lg:flex-row-reverse w-5/6 gap-10 mx-auto justify-center items-center relative  ">
        <section className="min-w-[18rem] min-h-[12rem] relative">
          <Image
            src="/img/batu_ratapan_angin.webp"
            alt="Golden Sunrise Sikunir"
            width={500}
            height={500}
            className=" rounded-2xl object-cover"
          />
        </section>
        <section className="w-[80%] flex flex-col justify-center items-center lg:items-end gap-3 text-center lg:text-right">
          <h1 className="sm:text-2xl text-4xl w-[80%] text-slate-800 font-bold mb-4">
            Batu Ratapan Angin
          </h1>
          <p className="text-slate-500 text-justify leading-8">
            Batu Ratapan Angin menyajikan pemandangan Telaga Warna yang eksotis
            dari ketinggian. Dikenal dengan legenda penuh misteri, tempat ini
            menawarkan sudut pandang unik dimana Anda bisa merenung dan
            menikmati keindahan alam sekitar yang menenangkan. Ideal untuk
            refleksi dan menikmati ketenangan.
          </p>
          <Link className="mt-3" href="/destinations/66af7a1fc4f78db57ce01330">
            <div className="bg-primary hover:bg-secondary flex gap-2 items-center rounded-lg w-max p-3">
              <h1 className="text-white">Read More</h1>
              <IoIosArrowForward color="white" size={20} />
            </div>
          </Link>
        </section>
      </section>
    </section>
  );
}

export default BatuRatapanAnginSection;
