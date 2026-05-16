import { getCarById } from "@/lib/api";
import Image from "next/image";

interface CarDetailsProps {
  params: Promise<{ carId: string }>;
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

          <div className="flex flex-col gap-4 rounded-2xl bg-white p-8">
            <h2 className="text-base font-semibold">Book your car now</h2>
            <p className="text-dark-grey text-xs">
              Stay connected! We are always ready to help you.
            </p>

            <form action="" className="flex flex-col gap-3">
              <label htmlFor="name" className="text-xs font-medium">
                Name*
              </label>
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Your name"
                className="bg-selectors-grey placeholder-dark-grey rounded-lg px-4 py-3 text-xs outline-none"
              />
              <label htmlFor="email" className="text-xs font-medium">
                Email*
              </label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="example@email.com"
                className="bg-selectors-grey placeholder-dark-grey rounded-lg px-4 py-3 text-xs outline-none"
              />
              <label htmlFor="comment" className="text-xs font-medium">
                Comment
              </label>
              <textarea
                name="comment"
                id="comment"
                placeholder="Add your comment"
                className="bg-selectors-grey placeholder-dark-grey rounded-lg px-4 py-3 text-xs outline-none"
                rows={3}
              />
              <button
                type="submit"
                className="bg-light-blue hover:bg-dark-blue mt-2 rounded-lg py-3 font-semibold text-white transition-colors duration-250 ease-in-out"
              >
                Send
              </button>
            </form>
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

            <p className="text-[16px] leading-tight">{car.description}</p>
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
                    className="flex items-center gap-2 text-base leading-tight"
                  >
                    <span className="border-light-blue flex h-4 w-4 items-center justify-center rounded-full border">
                      ✓
                    </span>
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
                <li className="flex items-center gap-2 text-base leading-tight">
                  <span className="border-light-blue flex h-4 w-4 items-center justify-center rounded-full border">
                    ✓
                  </span>
                  Year: {car.year}
                </li>
                <li className="flex items-center gap-2 text-base leading-tight">
                  <span className="border-light-blue flex h-4 w-4 items-center justify-center rounded-full border">
                    ✓
                  </span>
                  Type: {car.type}
                </li>
                <li className="flex items-center gap-2 text-base leading-tight">
                  <span className="border-light-blue flex h-4 w-4 items-center justify-center rounded-full border">
                    ✓
                  </span>
                  Fuel consumption: {car.fuelConsumption}
                </li>
                <li className="flex items-center gap-2 text-base leading-tight">
                  <span className="border-light-blue flex h-4 w-4 items-center justify-center rounded-full border">
                    ✓
                  </span>
                  Engine: {car.engine}
                </li>
                <li className="flex items-center gap-2 text-base leading-tight">
                  <span className="border-light-blue flex h-4 w-4 items-center justify-center rounded-full border">
                    ✓
                  </span>
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
                    className="flex items-center gap-2 text-base leading-tight"
                  >
                    <span className="border-light-blue flex h-4 w-4 items-center justify-center rounded-full border">
                      ✓
                    </span>
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
