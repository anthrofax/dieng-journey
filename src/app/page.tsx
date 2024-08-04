import PopularDestinations from "@/components/popular-destinations/popular-destinations";
import HeroSlider from "@/components/hero/hero";
import About from "@/components/about/about";
import Comments from "@/components/comments/comments";

export default function Home() {
  return (
    <>
      <HeroSlider />
      <PopularDestinations />
      {/* <BestHotels /> */}
      <About />
      <Comments />
    </>
  );
}
