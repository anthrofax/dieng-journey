import Footer from "@/components/footer/footer";
import Navbar from "@/components/navbar/navbar";

function layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {<Navbar />}
      <div className="min-h-screen">{children}</div>
      {<Footer />}
    </>
  );
}

export default layout;
