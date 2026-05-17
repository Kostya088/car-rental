import { Car } from "@/types/car";
import Image from "next/image";
import Link from "next/link";

type CarCardProps = {
  car: Car;
};

export default function CarCard({ car }: CarCardProps) {
  const mileage = car.mileage.toLocaleString("uk-UA");
  return (
    <li className="relative h-116 w-69 rounded-2xl bg-white p-4">
      <Image
        src={car.img}
        alt={`${car.brand} ${car.model} image`}
        width={244}
        height={268}
        className="h-67 w-61 rounded-[14px] object-cover"
      />
      <div className="mt-4 mb-2 flex items-baseline justify-between leading-tight">
        <p className="font-medium">
          {car.brand} <span className="text-dark-blue">{car.model}</span>,{" "}
          {car.year}
        </p>
        <p>${car.rentalPrice}</p>
      </div>

      <div className="bg-bg w-61 rounded-lg p-2">
        <ul className="text-dark-grey flex items-center text-xs leading-[1.33] font-normal">
          <li className="border-light-grey mr-1.5 border-r pr-1.5">
            {car.location.city}
          </li>
          <li className="border-light-grey mr-1.5 border-r pr-1.5">
            {car.location.country}
          </li>
          <li className="border-light-grey mr-1.5 border-r pr-1.5">
            {car.rentalCompany}
          </li>
        </ul>

        <ul className="text-dark-grey flex items-center text-xs leading-[1.33] font-normal">
          <li className="border-light-grey mr-1.5 border-r pr-1.5">
            {car.type}
          </li>
          <li>{`${mileage} km`}</li>
        </ul>
      </div>

      <Link
        href={`/catalog/${car.id}`}
        className="bg-light-blue hover:bg-dark-blue focus:bg-dark-blue active:bg-light-blue absolute bottom-4 block h-11 w-61 rounded-xl py-3 text-center text-base leading-tight font-semibold text-white transition-colors duration-250 ease-in-out"
      >
        Read more
      </Link>
    </li>
  );
}
