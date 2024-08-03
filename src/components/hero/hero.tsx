"use client";
import React, { useState } from "react";
import Image, { StaticImageData } from "next/image";
import Slider from "react-slick";
import { SampleNextArrow, SamplePrevArrow } from "./arrow-components";

const HeroSlider = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    cssEase: "linear",
    adaptiveHeight: true,
    arrows: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  const sliderImages = [
    {
      imageUrl: "/img/sea.jpg",
      title: "Apakah kamu siap dengan petualangan baru?",
      caption: "Eksplor Berbagai Destinasi Menarik!",
    },
    {
      imageUrl: "/img/AbuDhabi.jpg",
      title: "Nikmati Keindahan Pegunungan",
      caption: "Temukan ketenangan di puncak gunung yang megah.",
    },
    {
      imageUrl: "/img/Mumbai.jpg",
      title: "Petualangan di Tengah Hutan",
      caption: "Jelajahi hutan yang misterius dan penuh keajaiban.",
    },
    {
      imageUrl: "/img/paris.jpg",
      title: "Eksplorasi Gurun Pasir",
      caption: "Rasakan panasnya petualangan di padang pasir yang luas.",
    },
    {
      imageUrl: "/img/StTropez.jpg",
      title: "Keindahan Danau yang Tenang",
      caption: "Nikmati keindahan danau yang damai dan menenangkan.",
    }
  ];

  return (
    <div className="relative w-full">
      <Slider {...settings}>
        {sliderImages.map((slide, index) => (
          <div key={index} className="w-full h-screen relative">
            <Image
              src={slide.imageUrl}
              alt="Hero Image"
              layout="fill"
              objectFit="cover"
              className="brightness-50"
            />

            <div className="absolute top-1/2 left-1/2 text-center -translate-x-1/2 -translate-y-1/2 w-2/3 flex flex-col gap-5">
              <h2 className="text-white text-3xl lg:text-6xl font-bold">
                {slide.title}
              </h2>
              <h5 className="text-white text-xl lg:text-4xl font-semibold">
                {slide.caption}
              </h5>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default HeroSlider;
