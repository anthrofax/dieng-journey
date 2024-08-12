import HeroSlider from "@/components/hero/hero";
import About from "@/components/about/about";
import Comments from "@/components/comments/comments";
import GoldenSunriseSikunirSection from "@/components/destination-sections/golden-sunrise-sikunir";
import BatuRatapanAnginSection from "@/components/destination-sections/batu-ratapan-angin";
import KawahSikidangSection from "@/components/destination-sections/kawah-sikidang";
import TelagaWarnaSection from "@/components/destination-sections/telaga-warna";
import CandiArjunaSection from "@/components/destination-sections/candi-arjuna";
import Contact from "@/components/contact/contact";
import Paket from "@/components/paket/paket";

export default function Home() {
  return (
    <>
      <HeroSlider />
      <About />
      <GoldenSunriseSikunirSection />
      <BatuRatapanAnginSection />
      <KawahSikidangSection />
      <TelagaWarnaSection />
      <CandiArjunaSection />
      <Paket />
      <Comments />
      <Contact />
    </>
  );
}
