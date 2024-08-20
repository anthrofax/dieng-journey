"use client";

import Image from "next/image";
import React, { useEffect } from "react";
import { IoIosArrowForward } from "react-icons/io";
import Link from "next/link";
import { gsap } from "gsap";

function TelagaWarnaSection() {
  useEffect(() => {
    // Set initial state
    gsap.set(
      ".telaga-warna-image, .telaga-warna-title, .telaga-warna-description, .telaga-warna-link",
      { autoAlpha: 0, x: 100 }
    );

    const elementsToAnimate = [
      ".telaga-warna-image",
      ".telaga-warna-title",
      ".telaga-warna-description",
      ".telaga-warna-link",
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
      <section className="flex flex-col lg:flex-row-reverse w-5/6 gap-10 mx-auto justify-center items-center relative">
        <section className="min-w-[18rem] min-h-[12rem] relative telaga-warna-image">
          <Image
            src="/img/telaga_warna.webp"
            alt="Telaga Warna"
            width={500}
            height={500}
            className="rounded-2xl object-cover"
          />
        </section>
        <section className="w-[80%] flex flex-col justify-center items-center lg:items-end gap-3 text-center lg:text-right">
          <h1 className="sm:text-2xl text-4xl w-[80%] text-slate-800 font-bold mb-4 telaga-warna-title">
            Telaga Warna
          </h1>
          <p className="text-slate-500 text-justify leading-8 telaga-warna-description">
            Telaga Warna adalah keajaiban alam yang menarik dengan air danau
            yang dapat berubah warna karena refleksi mineral belerang di dasar
            danau. Dikelilingi oleh hutan pinus dan udara yang sejuk, Telaga
            Warna adalah destinasi yang sempurna untuk piknik, trekking ringan,
            dan fotografi.
          </p>
          <Link className="mt-3 telaga-warna-link" href="/destinations/66af7a20c4f78db57ce01332">
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

export default TelagaWarnaSection;
