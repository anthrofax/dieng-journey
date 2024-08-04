import Image from "next/image";
import { useState } from "react";
import { FaArrowLeft, FaArrowRight, FaTimes } from "react-icons/fa";

interface ImageGalleryProps {
  photos: string[];
  className?: string
}

export default function ImageGallery({ photos, className = "" }: ImageGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const handlePrev = () => {
    setSelectedImage((prev) => (prev - 1 + photos.length) % photos.length);
  };

  const handleNext = () => {
    setSelectedImage((prev) => (prev + 1) % photos.length);
  };

  const closeLightbox = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      setLightboxOpen(false);
    }
  };

  const maxVisibleImages = 4;

  return (
    <div className={className}>
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75"
          onClick={closeLightbox}
        >
          <button
            className="absolute top-5 right-5 text-white text-3xl"
            onClick={() => setLightboxOpen(false)}
          >
            <FaTimes />
          </button>
          <button
            className="absolute left-5 text-white text-3xl"
            onClick={handlePrev}
          >
            <FaArrowLeft />
          </button>
          <div className="relative w-full max-w-4xl h-auto flex justify-center items-center">
            <div
              className="relative w-full"
              style={{ paddingBottom: "56.25%" }}
            >
              <Image
                src={photos[selectedImage]}
                alt={`Image ${selectedImage + 1}`}
                layout="fill"
                objectFit="contain"
                className="absolute top-0 left-0 w-full h-full"
              />
            </div>
          </div>
          <button
            className="absolute right-5 text-white text-3xl"
            onClick={handleNext}
          >
            <FaArrowRight />
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="relative w-full h-96 col-span-1 md:col-span-2 row-span-2 cursor-pointer">
          <Image
            src={photos[0]}
            alt={`Main Image`}
            layout="fill"
            objectFit="cover"
            onClick={() => {
              setSelectedImage(0);
              setLightboxOpen(true);
            }}
          />
        </div>
        {photos.slice(1, maxVisibleImages).map((photo, index) => (
          <div
            key={index + 1}
            className="relative w-full h-48 cursor-pointer"
            onClick={() => {
              setSelectedImage(index + 1);
              setLightboxOpen(true);
            }}
          >
            <Image
              src={photo}
              alt={`Thumbnail ${index + 1}`}
              layout="fill"
              objectFit="cover"
            />
            {index === maxVisibleImages - 2 &&
              photos.length > maxVisibleImages && (
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center text-white text-2xl">
                  +{photos.length - maxVisibleImages}
                </div>
              )}
          </div>
        ))}
      </div>
    </div>
  );
}
