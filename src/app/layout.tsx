import "./globals.css";
import { Inter } from "next/font/google";
import LayoutProvider from "@/components/layout-provider/layout-provider";
import Toast from "@/utils/toast";
import Provider from "@/utils/session-provider";
import "react-loading-skeleton/dist/skeleton.css";
import "react-confirm-alert/src/react-confirm-alert.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next"

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Fierto Travel Agency | Dieng Journey",
  description: "Dieng Journey",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0"
      ></meta>
      <body className={`${inter.className} margin-0 overflow-x-hidden`}>
        <Provider>
          <Toast />
          <LayoutProvider>{children}</LayoutProvider>
        </Provider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
