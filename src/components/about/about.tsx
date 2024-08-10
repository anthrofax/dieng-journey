import Image from "next/image";
import React from "react";
import { IoIosArrowForward, IoMdPricetags, IoIosPeople } from "react-icons/io";
import CountUpNumber from "../count-up-number/count-up-number";

function About() {
  return (
    <section className="relative w-full my-36  ">
      <section className="flex flex-col w-5/6 gap-10 mx-auto justify-center items-center relative">
        <section className="min-w-[18rem] min-h-[12rem] relative">
          <Image
            src="/img/fiero_agency.webp"
            alt="Dieng"
            width={800}
            height={600}
            className=" rounded-2xl object-cover mx-auto"
          />
          <div className="absolute -right-24 top-10 w-[180px] bg-white flex justify-center items-center gap-2 shadow-xl rounded-2xl py-2 px-4">
            <div className="bg-blue-300 rounded-2xl flex justify-center items-center py-2 px-4">
              <IoMdPricetags color="blue" size={30} />
            </div>
            <div>
              <h3 className="text-slate-500">Start From</h3>
              <CountUpNumber
                duration={2000}
                endValue={499}
                className="text-slate-800 text-xl font-bold"
                suffix="k"
              />
            </div>
          </div>
          <div className="absolute -left-24 bottom-10 w-[200px] bg-white flex justify-center items-center gap-2 shadow-xl rounded-2xl py-2 px-4">
            <div className="bg-blue-300 rounded-2xl flex justify-center items-center py-2 px-4">
              <IoIosPeople color="blue" size={30} />
            </div>
            <div>
              <CountUpNumber
                duration={2000}
                endValue={500}
                className="text-slate-800 text-xl font-bold"
                suffix="+"
              />
              <h3 className="text-slate-500">Kepuasan Pelanggan</h3>
            </div>
          </div>
        </section>
        <section className="w-[80%] flex flex-col justify-center items-center gap-3 text-center">
          <h1 className="sm:text-2xl text-4xl w-[80%] text-slate-800 font-bold mb-4  ">
            Fierto Travel Agency
          </h1>
          <p className="text-slate-500 text-justify leading-8">
            Dapatkan pengalaman eksplorasi berharga melalui perjalanan di
            kawasan indah Dieng. Dengan berbagai paket yang kami tawarkan dapat
            menjadi solusi untuk mu, agar bisa menjelahi berbagai tempat wisata
            menakjubkan, dan tentunya kamu akan didampingi oleh seorang Tour
            Guide.
          </p>
          <button className="mt-3">
            <div className="bg-primary hover:bg-secondary flex gap-2 items-center rounded-lg w-max p-3">
              <h1 className="text-white">Read More</h1>
              <IoIosArrowForward color="white" size={20} />
            </div>
          </button>
        </section>
      </section>
    </section>
  );
}

export default About;
