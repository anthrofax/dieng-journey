"use client";

import Image from "next/image";
import React, { useState, useEffect } from "react";
import { IoIosArrowForward } from "react-icons/io";
import Link from "next/link";
import { gsap } from "gsap";

function CandiArjunaSection() {
  const [signHovered, setSignHovered] = useState(false);

  function animateBush() {
    gsap.to("#bush", {
      x: () => Math.random() * 10 - 10,
      rotation: () => Math.random() * 10 - 3,
      duration: 0.3,
      ease: "power1.inOut",
      repeat: 8,
      onComplete: () => {
        // Memberikan jeda 3 detik sebelum mengulangi animasi
        setTimeout(animateBush, 3000);
      },
    });
  }

  function animateSign() {
    const tl = gsap.timeline({ repeat: -1, repeatDelay: 3, yoyo: true });

    tl.to("#warn", {
      rotate: 10, // Rotasi ke kanan
      duration: 0.3,
      ease: "power1.inOut",
    }).to("#warn", {
      rotate: -10, // Rotasi ke kiri
      duration: 0.3,
      ease: "power1.inOut",
    });
  }

  useEffect(() => {
    const tl = gsap.timeline({ repeat: -1, yoyo: true });

    animateBush();

    animateSign();
  }, []);

  const handleMouseEnter = () => {
    setSignHovered(true);
    document
      .querySelector("#sign")
      ?.classList.replace("-bottom-80", "bottom-24");
    document
      .querySelector("#sign")
      ?.classList.replace("rotate-[0deg]", "rotate-[20deg]");
    document.querySelector("#warn")?.classList.add("opacity-0");
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    const parrentElement = e.currentTarget;
    const bush = parrentElement.closest("#bush");
    const sign = parrentElement.closest("#sign");

    console.log(bush)
    console.log(sign)

    // Cek apakah kursor benar-benar keluar dari #bush atau #sign
    if (!bush && !sign) {
      setSignHovered(false);
      document
        .querySelector("#sign")
        ?.classList.replace("bottom-24", "-bottom-80");
      document
        .querySelector("#sign")
        ?.classList.replace("rotate-[20deg]", "rotate-[0deg]");
      document.querySelector("#warn")?.classList.remove("opacity-0");
    }
  };

  return (
    <section
      className="relative w-full my-36 pb-80 overflow-hidden"
      onMouseLeave={handleMouseLeave}
    >
      <section className="flex flex-col lg:flex-row w-5/6 gap-10 mx-auto justify-center items-center relative">
        <section className="min-w-[18rem] min-h-[12rem] relative">
          <Image
            src="/img/candi_arjuna.webp"
            alt="Golden Sunrise Sikunir"
            width={500}
            height={500}
            className="rounded-2xl object-cover"
          />
        </section>
        <section className="w-[80%] flex flex-col justify-center items-center lg:items-start gap-3 text-center lg:text-left">
          <h1 className="sm:text-2xl text-4xl w-[80%] text-slate-800 font-bold mb-4">
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
            <div className="bg-primary hover:bg-secondary flex gap-2 items-center rounded-lg w-max p-3 text-white hover:text-black">
              <h1>Lihat Selengkapnya</h1>
              <IoIosArrowForward size={20} />
            </div>
          </Link>
        </section>
      </section>

      <Link href="/destinations">
        <Image
          id="sign"
          src="/asset/sign.svg"
          alt="Sign Icon"
          width={210}
          height={210}
          className="absolute -bottom-80 rotate-[0deg] left-[55%] -translate-x-1/2 duration-1000"
        />
      </Link>
      <Image
        id="bush"
        src="/asset/bush.svg"
        alt="Bush"
        width={300}
        height={300}
        className="absolute bottom-0 left-1/2 -translate-x-1/2"
        onMouseEnter={handleMouseEnter}
      />
      <Image
        id="warn"
        src="/asset/warn.svg"
        alt="Warn Icon"
        width={150}
        height={150}
        className="absolute bottom-40 left-[63%] -translate-x-1/2 duration-1000"
      />

      <hr className="h-1 rounded-full bg-black w-full absolute bottom-0" />
    </section>
  );
}

export default CandiArjunaSection;
