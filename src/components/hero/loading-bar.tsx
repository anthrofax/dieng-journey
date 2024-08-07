import { MutableRefObject, useEffect, useRef } from "react";
import { useHeroSliderContext } from "./hero";

export default function LoadingBar({ isLoading }: { isLoading: boolean }) {
  const { handleNextImage, setLoadingProgress, loadingProgress } =
    useHeroSliderContext();
  //   const loadingProgressString = loadingProgress.toString();
  const loadingBar = useRef() as MutableRefObject<HTMLDivElement>;

  useEffect(
    function () {
      const interval = setInterval(function () {
        if (loadingProgress === 100) {
          handleNextImage();
        }

        if (isLoading) setLoadingProgress((value: any) => value + 1);

        loadingBar.current.style.width = `${loadingProgress}vw`;
      }, 100);

      return () => clearInterval(interval);
    },
    [loadingProgress, isLoading]
  );

  return (
    <div
      className={`bg-secondary/20 rounded-lg  h-1 transition-all z-50 absolute top-0 left-0`}
      ref={loadingBar}
    ></div>
  );
}
