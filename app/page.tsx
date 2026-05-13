// import Image from "next/image";

import Link from "next/link";

export default function Home() {
  return (
    <div className="relative h-[calc(100dvh-68px)] w-full overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/hero.jpg')" }}
      />
      <div className="absolute top-1/2 left-1/2 z-10 -translate-x-1/2 translate-y-[35%] text-center">
        <h1 className="pb-4 text-[60px] leading-[1.2] font-bold text-white">
          Find your perfect rental car
        </h1>
        <p className="pb-10 text-[24px] font-semibold text-white">
          Reliable and budget-friendly rentals for any journey
        </p>
        <Link href="/catalog" aria-label="Catalog link" className="btn-blue">
          View catalog
        </Link>
      </div>
    </div>
  );
}
