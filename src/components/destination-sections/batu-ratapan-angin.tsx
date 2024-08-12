'use client'

import Image from "next/image";
import React, { useEffect } from "react";
import { IoIosArrowForward } from "react-icons/io";
import Link from "next/link";
import { gsap } from "gsap";

function BatuRatapanAnginSection() {
  useEffect(() => {
    const elementsToAnimate = [
      { selector: ".batu-ratapan-image", animation: animateFromRight },
      { selector: ".batu-ratapan-title", animation: animateFromRight },
      { selector: ".batu-ratapan-description", animation: animateFromRight },
      { selector: ".batu-ratapan-link", animation: animateFromRight },
    ];

    elementsToAnimate.forEach(({ selector, animation }) => {
      const element = document.querySelector(selector);
      if (element) {
        const observer = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) {
              animation(entry.target);
              observer.unobserve(entry.target); // Stop observing after animation is triggered
            }
          },
          { threshold: 0.15 }
        );
        observer.observe(element);
      }
    });

    function animateFromRight(element: Element) {
      gsap.fromTo(
        element,
        { opacity: 0, x: 100 },
        { opacity: 1, x: 0, duration: 1, ease: "power2.out" }
      );
    }
  }, []);

  return (
    <section className="relative w-full my-36">
      <section className="flex flex-col lg:flex-row-reverse w-5/6 gap-10 mx-auto justify-center items-center relative">
        <section className="min-w-[18rem] min-h-[12rem] relative batu-ratapan-image">
          <Image
            src="/img/batu_ratapan_angin.webp"
            alt="Batu Ratapan Angin"
            width={500}
            height={500}
            className="rounded-2xl object-cover"
          />
        </section>
        <section className="w-[80%] flex flex-col justify-center items-center lg:items-end gap-3 text-center lg:text-right">
          <h1 className="sm:text-2xl text-4xl w-[80%] text-slate-800 font-bold mb-4 batu-ratapan-title">
            Batu Ratapan Angin
          </h1>
          <p className="text-slate-500 text-justify leading-8 batu-ratapan-description">
            Batu Ratapan Angin menyajikan pemandangan Telaga Warna yang eksotis
            dari ketinggian. Dikenal dengan legenda penuh misteri, tempat ini
            menawarkan sudut pandang unik dimana Anda bisa merenung dan
            menikmati keindahan alam sekitar yang menenangkan. Ideal untuk
            refleksi dan menikmati ketenangan.
          </p>
          <Link
            className="mt-3 batu-ratapan-link"
            href="/destinations/66af7a1fc4f78db57ce01330"
          >
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

export default BatuRatapanAnginSection;
