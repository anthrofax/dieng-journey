"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { HeroContextType, SliderImageType } from "./type";
import LoadingBar from "./loading-bar";
import SliderButton from "./slider-button";
import Image from "next/image";
import { useWindowDimensions } from "@/hooks/use-window-dimention";

const sliderImages: SliderImageType[] = [
  {
    imageUrl: "/img/brand_image_3.jpg",
    title: "Apakah kamu siap dengan petualangan baru?",
    caption: "Eksplor Berbagai Destinasi Menarik!",
  },
  {
    imageUrl: "/img/brand_image_6.jpg",
    title: "Nikmati Keindahan Pegunungan",
    caption: "Temukan ketenangan di puncak gunung yang megah.",
  },
  {
    imageUrl: "/img/brand_image_7.jpg",
    title: "Keindahan Danau yang Tenang",
    caption: "Nikmati keindahan danau yang damai dan menenangkan.",
  },
];

const animationName = [
  {
    title: "firstAnimation",
    caption: "firstAnimation",
  },
  {
    title: "secondTitleAnimation",
    caption: "secondCaptionAnimation",
  },
  {
    title: "thirdTitleAnimation",
    caption: "thirdCaptionAnimation",
  },
];

const HeroSliderContext = createContext<HeroContextType>({
  sliderImages: [],
  currentImageLoadedIndex: 0,
  setCurrentImageLoadedIndex: () => {},
  handleNextImage: () => {},
  handlePrevImage: () => {},
  loadingProgress: 0,
  setLoadingProgress: () => {},
  isAnimating: true,
});

export function useHeroSliderContext() {
  const context = useContext(HeroSliderContext);

  if (!context) alert("Anda menggunakan context di luar jangkauan");

  return context;
}

const HeroSlider = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showText, setShowText] = useState(false);
  const [currentImageLoadedIndex, setCurrentImageLoadedIndex] = useState(0);

  const { height, width } = useWindowDimensions();

  const handleNextImage = function () {
    setShowText(false); // Hide text before changing image
    setLoadingProgress(0);
    setTimeout(() => {
      setIsAnimating(false);
    }, 2500);

    if (!isAnimating) {
      setCurrentImageLoadedIndex((prevImageIndex: number) => {
        if (prevImageIndex === sliderImages.length - 1) return 0;

        return prevImageIndex + 1;
      });

      setIsAnimating(true);
    }
  };

  const handlePrevImage = function () {
    setShowText(false); // Hide text before changing image
    setLoadingProgress(0);

    setTimeout(() => {
      setIsAnimating(false);
    }, 2500);

    if (!isAnimating) {
      setCurrentImageLoadedIndex((prevImageIndex: number) => {
        if (prevImageIndex === 0) return sliderImages.length - 1;

        return prevImageIndex - 1;
      });

      setIsAnimating(true);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowText(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, [currentImageLoadedIndex]);

  return (
    <div
      className={`jumbotron border-0 relative overflow-hidden transition-[background-image] bg-center bg-blend-multiply bg-no-repeat bg-cover cursor-pointer h-screen flex flex-col gap-3 justify-center items-center ${
        currentImageLoadedIndex % 3 === 0 && "lg:items-start"
      } ${currentImageLoadedIndex % 3 === 1 && "lg:items-center"} ${
        currentImageLoadedIndex % 3 === 2 && "lg:items-end"
      } text-white`}
      onMouseEnter={() => {
        setIsHovered(true);
        setIsLoading(false);
      }}
      onMouseLeave={() => {
        setIsHovered(false);
        setIsLoading(true);
      }}
    >
      <Image
        src={sliderImages[currentImageLoadedIndex].imageUrl}
        alt="Fierto Hero Section Image"
        fill
        className={`object-cover scale-125 z-0 transition-opacity duration-[2000ms] ${
          showText ? "opacity-[100]" : "opacity-[50]"
        }]`}
        priority
        quality={100}
      />
      <HeroSliderContext.Provider
        value={{
          sliderImages,
          currentImageLoadedIndex,
          setCurrentImageLoadedIndex,
          handleNextImage,
          handlePrevImage,
          loadingProgress,
          setLoadingProgress,
          isAnimating,
        }}
      >
        <div className="bg-black opacity-50 absolute top-0 left-0 right-0 bottom-0 z-10"></div>
        <LoadingBar isLoading={isLoading} />
        <SliderButton direction="left" showed={isHovered} />
        {showText && (
          <>
            <h2
              className={`hero-title text-2xl w-[70%] lg:w-full lg:text-4xl font-semibold z-10 text-center ${
                currentImageLoadedIndex % 3 === 0 && "lg:text-left"
              } ${currentImageLoadedIndex % 3 === 1 && "lg:text-center"} ${
                currentImageLoadedIndex % 3 === 2 && "lg:text-right"
              }`}
              style={{
                animationName:
                  width >= 1024
                    ? animationName[currentImageLoadedIndex].title
                    : "secondTitleAnimation",
                animationDuration: "1s",
                animationFillMode: "forwards",
              }}
            >
              {sliderImages[currentImageLoadedIndex].title}
            </h2>
            <h3
              className={`hero-caption text-md w-[70%] lg:w-full lg:text-2xl font-medium z-10 text-center ${
                currentImageLoadedIndex % 3 === 0 && "lg:text-left"
              } ${currentImageLoadedIndex % 3 === 1 && "lg:text-center"} ${
                currentImageLoadedIndex % 3 === 2 && "lg:text-right"
              }`}
              style={{
                animationName:
                  width >= 1024
                    ? animationName[currentImageLoadedIndex].caption
                    : "secondCaptionAnimation",
                animationDuration: "2s",
                animationFillMode: "forwards",
              }}
            >
              {sliderImages[currentImageLoadedIndex].caption}
            </h3>
          </>
        )}
        <SliderButton direction="right" showed={isHovered} />
      </HeroSliderContext.Provider>
    </div>
  );
};

export default HeroSlider;
