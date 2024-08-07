export type SliderImageType = {
  imageUrl: string;
  title: string;
  caption: string;
};

export type HeroContextType = {
  sliderImages: SliderImageType[];
  currentImageLoadedIndex: number;
  setCurrentImageLoadedIndex: React.Dispatch<React.SetStateAction<number>>;
  handleNextImage: () => void;
  handlePrevImage: () => void;
  loadingProgress: number;
  setLoadingProgress: React.Dispatch<React.SetStateAction<number>>;
  isAnimating: boolean;
};

export type directions = "left" | "right";
