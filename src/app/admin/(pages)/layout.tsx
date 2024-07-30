import React from "react";
import Footer from "@/components/footer/footer";
import Navbar from "../components/navbar";
import Sidebar from "../components/sidebar";
import "react-confirm-alert/src/react-confirm-alert.css";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen w-full overflow-hidden bg-slate-100 grid grid-rows-5">
      <div className="h-full w-full pb-6 relative row-span-5">
        <Navbar />
        <div className="h-full w-full pt-24 mx-auto grid grid-cols-12">
          <Sidebar />
          {children}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AdminLayout;
