import "./globals.css";
import { Inter } from "next/font/google";
import LayoutProvider from "@/components/layout-provider/layout-provider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Toast from "@/utils/toast";
import Provider from "@/utils/session-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {

  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider>
          <Toast />
          <LayoutProvider>
            {children}
          </LayoutProvider>
        </Provider>
      </body>
    </html>
  );
}