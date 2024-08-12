"use client";

import Image from "next/image";
import React, { useEffect } from "react";
import { IoMdPricetags, IoIosPeople } from "react-icons/io";
import { gsap } from "gsap";
import CountUpNumber from "../count-up-number/count-up-number";

function About() {
  useEffect(() => {
    const elementsToAnimate = [
      { selector: ".about-image", animation: animateImage },
      { selector: ".about-title", animation: animateTitle },
      { selector: ".about-description", animation: animateDescription },
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

    function animateImage(element: Element) {
      gsap.to(element, {
        opacity: 1,
        duration: 1,
        ease: "power2.out",
      });
    }

    function animateTitle(element: Element) {
      gsap.to(element, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out",
      });
    }

    function animateDescription(element: Element) {
      gsap.to(element, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out",
      });
    }
  }, []);

  return (
    <section className="relative w-full my-36 about-section">
      <section className="flex flex-col w-5/6 gap-36 md:gap-10 mx-auto justify-center items-center relative">
        <section className="min-w-[18rem] min-h-[12rem] relative">
          <Image
            src="/img/fiero_agency.webp"
            alt="Dieng"
            width={800}
            height={600}
            className="rounded-2xl object-cover mx-auto about-image opacity-0"
          />
          <div className="absolute -right-6 max-md:-top-24 lg:-right-24 top-10 w-[100px] md:w-[180px] bg-white flex flex-col-reverse md:flex-row justify-center items-center gap-2 shadow-xl rounded-2xl py-2 px-4 text-center md:text-left">
            <div className="bg-blue-300 rounded-2xl flex justify-center items-center py-2 px-4">
              <IoMdPricetags color="blue" size={30} />
            </div>
            <div>
              <h3 className="text-slate-500">Start From</h3>
              <CountUpNumber
                duration={5000}
                endValue={499}
                className="text-slate-800 text-xl font-bold"
                suffix="k"
                isSectionInterSecting={true} // Count up should always work
              />
            </div>
          </div>
          <div className="absolute -left-6 max-md:-bottom-24 lg:-left-24 bottom-10 w-[100px] md:w-[200px] bg-white flex flex-col md:flex-row justify-center items-center gap-2 shadow-xl rounded-2xl py-2 px-4 text-center md:text-left">
            <div className="bg-blue-300 rounded-2xl flex justify-center items-center py-2 px-4">
              <IoIosPeople color="blue" size={30} />
            </div>
            <div>
              <CountUpNumber
                duration={5000}
                endValue={500}
                className="text-slate-800 text-lg md:text-xl font-bold"
                suffix="+"
                isSectionInterSecting={true} // Count up should always work
              />
              <h3 className="text-slate-500">Kepuasan Pelanggan</h3>
            </div>
          </div>
        </section>
        <section className="w-[90%] flex flex-col justify-center items-center gap-3 text-center">
          <h1 className="sm:text-2xl text-4xl text-slate-800 font-bold mb-4 about-title opacity-0 translate-y-10">
            Fierto Travel Agency
          </h1>
          <p className="text-slate-500 text-justify leading-8 about-description opacity-0 translate-y-10">
            Dapatkan pengalaman eksplorasi berharga melalui perjalanan di
            kawasan indah Dieng. Dengan berbagai paket yang kami tawarkan dapat
            menjadi solusi untuk mu, agar bisa menjelahi berbagai tempat wisata
            menakjubkan, dan tentunya kamu akan didampingi oleh seorang Tour
            Guide.
          </p>
        </section>
      </section>
    </section>
  );
}

export default About;
