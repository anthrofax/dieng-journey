import Footer from "@/components/footer/footer";
import Navbar from "@/components/navbar/navbar";

function layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {<Navbar />}
      {children}
      {<Footer />}
    </>
  );
}

export default layout;
