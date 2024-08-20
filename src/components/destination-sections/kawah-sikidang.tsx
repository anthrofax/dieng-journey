"use client";

import Image from "next/image";
import React, { useEffect } from "react";
import { IoIosArrowForward } from "react-icons/io";
import { gsap } from "gsap";
import Link from "next/link";

function KawahSikidangSection() {
  useEffect(() => {
    // Set initial state
    gsap.set(
      ".kawah-sikidang-image, .kawah-sikidang-title, .kawah-sikidang-description, .kawah-sikidang-link",
      { autoAlpha: 0, x: -100 }
    );

    const elementsToAnimate = [
      ".kawah-sikidang-image",
      ".kawah-sikidang-title",
      ".kawah-sikidang-description",
      ".kawah-sikidang-link",
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
          { threshold: 0.1 } // Lower threshold if needed
        );
        observer.observe(element);
      }
    });
  }, []);

  return (
    <section className="relative w-full my-36">
      <section className="flex flex-col lg:flex-row w-5/6 gap-10 mx-auto justify-center items-center relative">
        <section className="min-w-[18rem] min-h-[12rem] relative kawah-sikidang-image">
          <Image
            src="/img/kawah_sikidang_2.webp"
            alt="Kawah Sikidang"
            width={500}
            height={500}
            className="rounded-2xl object-cover"
          />
        </section>
        <section className="w-[80%] flex flex-col justify-center items-center lg:items-start gap-3 text-center lg:text-left">
          <h1 className="sm:text-2xl text-4xl w-[80%] text-slate-800 font-bold mb-4 kawah-sikidang-title">
            Kawah Sikidang
          </h1>
          <p className="text-slate-500 text-justify leading-8 kawah-sikidang-description">
            Kawah Sikidang, salah satu kawah vulkanik aktif di Dieng, menawarkan
            pengalaman yang tidak terlupakan dengan fenomena alam berupa asap
            belerang yang mengepul dan tanah yang mendesis. Area ini menawarkan
            pandangan dekat pada kekuatan alam bumi serta kesempatan untuk
            belajar tentang geologi vulkanik.
          </p>
          <Link className="mt-3 kawah-sikidang-link" href="/destinations/66af7a20c4f78db57ce01331">
            <div className="bg-primary flex gap-2 items-center rounded-lg w-max p-3 text-white hover:bg-black duration-500">
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
