import React from "react";
import Slider from "react-slick";
import Image from "next/image";

const ImageSlider = ({ images }: { images: string[] }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div className="w-full h-screen">
      <Slider {...settings}>
        {images.map((image, index) => (
          <div key={index} className="relative h-screen">
            <Image
              src={image}
              alt={`Slide ${index + 1}`}
              layout="fill"
              objectFit="cover"
              className="w-full h-full brightness-50 object-cover"
            />
            <h3 className="absolute text-6xl capitalize font-semibold flex items-center justify-center bottom-0 left-0 right-0 top-0 text-white text-center">
              Dieng Journey
            </h3>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ImageSlider;
