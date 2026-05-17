import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header/Header";
import TanStackProvider from "@/components/TanStackProvider/TanStackProvider";
import { Toaster } from "react-hot-toast";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Rental Car",
  description: "Reliable and budget-friendly rentals for any journey",
  openGraph: {
    title: "Rental Car",
    description: "Reliable and budget-friendly rentals for any journey",
    url: "https://car-rental-two-gules.vercel.app/",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${manrope.variable}`}>
      <body>
        <TanStackProvider>
          <Header />
          <main className="flex items-center justify-center">{children}</main>
        </TanStackProvider>
        <Toaster />
      </body>
    </html>
  );
}
