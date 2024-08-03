import PopularDestinations from "@/components/popular-destinations/popular-destinations";
import HeroSlider from "@/components/hero/hero";
import About from "@/components/about/about";

export default function Home() {
  return (
    <>
      <HeroSlider />
      <PopularDestinations />
      {/* <BestHotels /> */}
      <About />
    </>
  );
}
