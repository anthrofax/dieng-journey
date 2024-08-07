import { directions } from "./type";
import { useHeroSliderContext } from "./hero";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

export default function SliderButton({
  direction,
  showed,
}: {
  direction: directions;
  showed: boolean;
}) {
  const { handleNextImage, handlePrevImage, isAnimating } =
    useHeroSliderContext();

  return (
    <button
      className={`h-28 w-14 absolute z-20 ${
        direction === "right" ? "right-0 rounded-l-lg" : "left-0 rounded-r-lg"
      }  top-1/2 -translate-y-1/2 bg-black hover:opacity-100 hover:h-36 transition-all ${
        !showed ? "opacity-0" : "opacity-40"
      }`}
      onClick={() => {
        if (!isAnimating) {
          if (direction === "right") {
            handleNextImage();
          } else handlePrevImage();
        }
      }}
    >
      {direction === "left" && <IoIosArrowBack size={50} color="white" />}
      {direction === "right" && <IoIosArrowForward size={50} color="white" />}
    </button>
  );
}
