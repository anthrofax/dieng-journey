"use client";

import Image from "next/image";
import React, { useEffect } from "react";
import { IoIosArrowForward } from "react-icons/io";
import Link from "next/link";
import { gsap } from "gsap";

function GoldenSunriseSikunirSection() {
  useEffect(() => {
    // Set initial state
    gsap.set(
      ".golden-sunrise-image, .golden-sunrise-title, .golden-sunrise-description, .golden-sunrise-link",
      { autoAlpha: 0, x: -100 }
    );

    const elementsToAnimate = [
      ".golden-sunrise-image",
      ".golden-sunrise-title",
      ".golden-sunrise-description",
      ".golden-sunrise-link",
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
        <section className="min-w-[18rem] min-h-[12rem] relative golden-sunrise-image">
          <Image
            src="/img/golden_sunrise_sikunir_2.webp"
            alt="Golden Sunrise Sikunir"
            width={500}
            height={500}
            className="rounded-2xl object-cover"
          />
        </section>
        <section className="w-[80%] flex flex-col justify-center items-center lg:items-start gap-3 text-center lg:text-left">
          <h1 className="sm:text-2xl text-4xl w-[80%] text-slate-800 font-bold mb-4 golden-sunrise-title">
            Golden Sunrise Sikunir
          </h1>
          <p className="text-slate-500 text-justify leading-8 golden-sunrise-description">
            Nikmati keajaiban alam dari Golden Sunrise Sikunir yang terkenal
            dengan pemandangan matahari terbitnya yang memukau. Terletak di
            ketinggian Dieng, Bukit Sikunir menawarkan panorama langit yang
            berubah warna menjadi emas saat fajar menyingsing, menjadikannya
            tempat yang sempurna bagi pecinta alam dan fotografi.
          </p>
          <Link
            className="mt-3 golden-sunrise-link"
            href="/destinations/66af7a1fc4f78db57ce0132f"
          >
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

export default GoldenSunriseSikunirSection;
