import Image from "next/image";
import React from "react";
import { IoIosArrowForward, IoMdPricetags, IoIosPeople } from "react-icons/io";
import CountUpNumber from "../count-up-number/count-up-number";
import Link from "next/link";

function CandiArjunaSection() {
  return (
    <section className="relative w-full my-36  ">
      <section className="flex flex-col lg:flex-row w-5/6 gap-10 mx-auto justify-center items-center relative  ">
        <section className="min-w-[18rem] min-h-[12rem] relative">
          <Image
            src="/img/candi_arjuna.webp"
            alt="Golden Sunrise Sikunir"
            width={500}
            height={500}
            className=" rounded-2xl object-cover"
          />
        </section>
        <section className="w-[80%] flex flex-col justify-center items-center lg:items-start gap-3 text-center lg:text-left  ">
          <h1 className="sm:text-2xl text-4xl w-[80%] text-slate-800 font-bold mb-4  ">
            Candi Arjuna
          </h1>
          <p className="text-slate-500 text-justify leading-8">
            Kompleks Candi Arjuna, yang berusia lebih dari seribu tahun,
            merupakan saksi bisu peradaban Hindu kuno di Dataran Tinggi Dieng.
            Candi ini menampilkan arsitektur batu kuno yang megah dan merupakan
            situs sejarah yang penting untuk dipelajari. Pengunjung dapat
            menyelami sejarah dan arsitektur Hindu kuno, serta menikmati
            pemandangan alam yang mempesona sekitarnya.
          </p>
          <Link className="mt-3" href="/destinations/66af7a20c4f78db57ce01333">
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

export default CandiArjunaSection;
