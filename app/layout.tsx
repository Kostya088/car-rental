import type { Metadata } from "next";
import { Manrope, Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header/Header";
import TanStackProvider from "@/components/TanStackProvider/TanStackProvider";
import { Toaster } from "react-hot-toast";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Rental Car",
  description: "Find your perfect rental car",
  openGraph: {
    title: "Rental Car",
    type: "website",
  },
};

// export const metadata: Metadata = {
//   title: "Note Hub",
//   description: "Create and save your notes",
//   openGraph: {
//     title: "Note Hub",
//     description: "Create and save your notes",
//     url: "https://09-auth-delta-gold.vercel.app/",
//     images: [
//       {
//         url: `https://ac.goit.global/fullstack/react/notehub-og-meta.jpg`,
//         width: 1200,
//         height: 630,
//         alt: "Note Hub",
//       },
//     ],
//     type: "website",
//   },
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${manrope.variable} ${inter.variable}`}>
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
