import { getCarById } from "@/lib/api";
import Image from "next/image";
import BookingForm from "@/components/BookingForm/BookingForm";
import { IoCheckmarkCircleOutline } from "react-icons/io5";
import { BsCalendar4Week } from "react-icons/bs";
import { FaCar } from "react-icons/fa6";
import { BsFuelPump } from "react-icons/bs";
import { IoSettingsOutline } from "react-icons/io5";
import { PiRoadHorizon } from "react-icons/pi";
import { Metadata } from "next";

interface CarDetailsProps {
  params: Promise<{ carId: string }>;
}

export async function generateMetadata({
  params,
}: CarDetailsProps): Promise<Metadata> {
  const { carId } = await params;
  const car = await getCarById(carId);

  return {
    title: `Rental car: ${car.brand} ${car.model}, ${car.year}`,
    description: `${car.description}`,
    openGraph: {
      title: `Rental car: ${car.brand} ${car.model}`,
      description: `${car.description}`,
      url: `https://car-rental-two-gules.vercel.app/${carId}`,
      type: "website",
    },
  };
}

export default async function CarDetails({ params }: CarDetailsProps) {
  const { carId } = await params;
  const car = await getCarById(carId);

  return (
    <div className="page-container px-30 py-20">
      <div className="flex flex-row gap-12">
        {/* left side */}
        <div className="flex w-160 flex-col gap-8">
          <Image
            src={car.img}
            alt={`${car.brand} ${car.model} image`}
            width={640}
            height={512}
            className="h-128 w-160 rounded-2xl object-cover"
          />

          <div className="flex flex-col gap-6 rounded-2xl bg-white p-8">
            <div className="flex flex-col gap-2">
              <h2 className="text-xl leading-[1.2] font-semibold">
                Book your car now
              </h2>
              <p className="text-dark-grey text-base leading-tight font-medium">
                Stay connected! We are always ready to help you.
              </p>
            </div>
            <BookingForm carId={carId} />
          </div>
        </div>

        {/* right side */}
        <div className="flex flex-1 flex-col justify-between rounded-2xl bg-white px-6 py-8">
          {/* description */}
          <div className="flex flex-col gap-4">
            <p className="text-2xl font-semibold">
              {car.brand} {car.model}, {car.year}
            </p>

            <p className="text-base leading-tight">
              {car.location.city}, {car.location.country}
            </p>

            <p className="text-light-blue text-2xl font-semibold">
              ${car.rentalPrice}
            </p>

            <p className="text-[16px] leading-tight font-medium">
              {car.description}
            </p>
          </div>

          {/* info */}
          <div className="flex flex-col gap-12">
            {/*  info 1 */}
            <div className="flex flex-col gap-5">
              <p className="text-xl leading-[1.2] font-semibold">
                Rental Conditions:
              </p>
              <ul className="flex flex-col gap-4">
                {car.rentalConditions.map((condition, index) => (
                  <li
                    key={index}
                    className="flex items-center gap-2 text-base leading-tight font-medium"
                  >
                    <IoCheckmarkCircleOutline />
                    {condition}
                  </li>
                ))}
              </ul>
            </div>

            {/* info 2 */}
            <div className="flex flex-col gap-5">
              <p className="text-xl leading-[1.2] font-semibold">
                Car Specifications:
              </p>
              <ul className="flex flex-col gap-4">
                <li className="flex items-center gap-2 text-base leading-tight font-medium">
                  <BsCalendar4Week />
                  Year: {car.year}
                </li>
                <li className="flex items-center gap-2 text-base leading-tight font-medium">
                  <FaCar />
                  Type: {car.type}
                </li>
                <li className="flex items-center gap-2 text-base leading-tight font-medium">
                  <BsFuelPump />
                  Fuel consumption: {car.fuelConsumption}
                </li>
                <li className="flex items-center gap-2 text-base leading-tight font-medium">
                  <IoSettingsOutline />
                  Engine: {car.engine}
                </li>
                <li className="flex items-center gap-2 text-base leading-tight font-medium">
                  <PiRoadHorizon />
                  Milage: {car.mileage}
                </li>
              </ul>
            </div>

            {/* info 3 */}
            <div className="flex flex-col gap-5">
              <p className="text-xl leading-[1.2] font-semibold">Features:</p>
              <ul className="flex flex-col gap-4">
                {car.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-center gap-2 text-base leading-tight font-medium"
                  >
                    <IoCheckmarkCircleOutline />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
