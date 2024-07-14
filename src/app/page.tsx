import BestHotels from "@/components/best-hotels/best-hotels";
import Hero from "@/components/hero/hero";
import PopularLocations from "@/components/popular-locations/popular-locations";
import sea from '../../public/img/sea.jpg'
import hotel_image from '../../public/img/hr_10.jpg'

export default function Home() {
  return (
    <>
      <Hero
        image={sea}
        mainHeader="Are you ready for an adventure?"
        secondaryHeader="Browse through the popular locations."
      />
      <PopularLocations />
      <Hero
        image={hotel_image}
        mainHeader="Get the best offer for your hotel!"
        secondaryHeader="Pick your desired place."
      />
      <BestHotels />
    </>
  );
}