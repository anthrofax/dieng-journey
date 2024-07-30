import React from "react";
import Footer from "@/components/footer/footer";
import Navbar from "../components/navbar";
import Sidebar from "../components/sidebar";

const AdminLayoutComponent = ({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string;
}) => {
  return (
    <div className="min-h-screen grid grid-rows-12  bg-slate-100">
      <div className="h-full pb-6 relative row-span-12">
        <Navbar />
        <div className="h-full w-full pt-16 mx-auto grid grid-cols-12 gap-12">
          <Sidebar />
          <div className="py-10 col-span-12 lg:col-span-10 lg:w-full grid grid-rows-12">
            <h2 className="text-3xl text-slate-800 font-semibold mb-3 text-center lg:text-left">
              {title}
            </h2>
            <div className="mt-2 h-2/3 w-[80vw] max-lg:mx-auto row-span-11">
              {children}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AdminLayoutComponent;
