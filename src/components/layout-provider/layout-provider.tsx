"use client";
import { usePathname } from "next/navigation";
import React from "react";
import Navbar from "../navbar/navbar";
import Footer from "../footer/footer";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const LayoutProvider = ({ children }: { children: React.ReactNode }) => {
  const queryClient = new QueryClient();
  const pathname = usePathname();

  return (
    <>
      <QueryClientProvider client={queryClient}>
        {pathname !== "/login" &&
          pathname !== "/signup" &&
          !pathname.includes("/admin") && <Navbar />}
        <div className="min-h-screen">{children}</div>
        {pathname !== "/login" &&
          pathname !== "/signup" &&
          !pathname.includes("/admin") && <Footer />}
      </QueryClientProvider>
    </>
  );
};

export default LayoutProvider;
