"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();
  return (
    <header className="border-b-heder flex items-center justify-center bg-white">
      <div className="page-container">
        <div className="flex w-full items-center justify-between px-[120] py-[24]">
          <Link href="/" aria-label="Main page link">
            <Image
              src="/rentalCar.svg"
              width="104"
              height="16"
              alt="Rental Car logo"
            />
          </Link>
          <nav className="flex gap-[32]">
            <Link
              href="/"
              aria-label="Hom page link"
              className={`hover:text-dark-blue focus:text-dark-blue text-base leading-tight transition-colors duration-250 ${pathname === "/" ? "text-light-blue" : ""}`}
            >
              Home
            </Link>
            <Link
              href="/catalog"
              aria-label="Catalog page link"
              className={`hover:text-dark-blue focus:text-dark-blue leading-tight transition-colors duration-250 ${pathname === "/catalog" ? "text-light-blue" : ""}`}
            >
              Catalog
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
