"use client";

import Image from "next/image";
import React, { useEffect } from "react";
import { IoIosArrowForward } from "react-icons/io";
import Link from "next/link";
import { gsap } from "gsap";

function CandiArjunaSection() {
  useEffect(() => {
    // Set initial state for main content animation
    gsap.set(
      ".candi-arjuna-image, .candi-arjuna-title, .candi-arjuna-description, .candi-arjuna-link",
      { autoAlpha: 0, x: -100 }
    );
    gsap.set("#sign", { bottom: "-250px" });

    const elementsToAnimate = [
      ".candi-arjuna-image",
      ".candi-arjuna-title",
      ".candi-arjuna-description",
      ".candi-arjuna-link",
    ];

    elementsToAnimate.forEach((selector) => {
      const element = document.querySelector(selector);
      if (element) {
        const observer = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) {
              gsap.to(element, {
                autoAlpha: 1,
                x: 0,
                duration: 1,
                ease: "power2.out",
              });
              observer.unobserve(entry.target);
            }
          },
          { threshold: 0.15 }
        );
        observer.observe(element);
      }
    });

    // Additional animations for #bush and #sign
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

    animateBush();
    animateSign();
  }, []);

  const handleMouseEnter = () => {
    gsap.to("#sign", {
      bottom: "100px",
      rotate: 20,
      duration: 0.3,
      ease: "elastic",
    });
    gsap.to("#warn", { opacity: 0, duration: 0.3, ease: "elastic" });
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    const parrentElement = e.currentTarget;
    const bush = parrentElement.closest("#bush");
    const sign = parrentElement.closest("#sign");

    if (!bush && !sign) {
      gsap.to("#sign", {
        bottom: "-250px",
        rotate: 0,
        duration: 0.3,
        ease: "elastic",
      });
      gsap.to("#warn", { opacity: 1, duration: 0.3, ease: "elastic" });
    }
  };

  return (
    <section
      className="relative w-full mt-36 mb-24 pb-80 overflow-hidden"
      onMouseLeave={handleMouseLeave}
    >
      <section className="flex flex-col lg:flex-row w-5/6 gap-10 mx-auto justify-center items-center relative">
        <section className="min-w-[18rem] min-h-[12rem] relative candi-arjuna-image">
          <Image
            src="/img/candi_arjuna.webp"
            alt="Candi Arjuna"
            width={500}
            height={500}
            className="rounded-2xl object-cover"
          />
        </section>
        <section className="w-[80%] flex flex-col justify-center items-center lg:items-start gap-3 text-center lg:text-left">
          <h1 className="sm:text-2xl text-4xl w-[80%] text-slate-800 font-bold mb-4 candi-arjuna-title">
            Candi Arjuna
          </h1>
          <p className="text-slate-500 text-justify leading-8 candi-arjuna-description">
            Kompleks Candi Arjuna, yang berusia lebih dari seribu tahun,
            merupakan saksi bisu peradaban Hindu kuno di Dataran Tinggi Dieng.
            Candi ini menampilkan arsitektur batu kuno yang megah dan merupakan
            situs sejarah yang penting untuk dipelajari. Pengunjung dapat
            menyelami sejarah dan arsitektur Hindu kuno, serta menikmati
            pemandangan alam yang mempesona sekitarnya.
          </p>
          <Link
            className="mt-3 candi-arjuna-link"
            href="/destinations/66af7a20c4f78db57ce01333"
          >
            <div className="bg-primary flex gap-2 items-center rounded-lg w-max p-3 text-white hover:bg-black duration-500">
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
          className="absolute rotate-[0deg] left-[55%] -translate-x-1/2 duration-1000 z-20"
        />
      </Link>
      <Image
        id="bush"
        src="/asset/bush.svg"
        alt="Bush"
        width={300}
        height={300}
        className="absolute bottom-0 left-1/2 -translate-x-1/2 z-30"
        onMouseEnter={handleMouseEnter}
      />
      <Image
        id="warn"
        src="/asset/warn.svg"
        alt="Warn Icon"
        width={150}
        height={150}
        className="absolute bottom-40 left-[63%] -translate-x-1/2 duration-1000 z-10"
      />

      <Image
        src="/asset/land.svg"
        alt="Land"
        width={0}
        height={0}
        className="absolute bottom-0 left-0 w-full scale-x-110 border border-white/0"
      />
    </section>
  );
}

export default CandiArjunaSection;
