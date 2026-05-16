"use client";

import { getFilters } from "@/lib/api";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";

type FilterValues = {
  brand?: string;
  price?: number;
  minMileage?: number;
  maxMileage?: number;
};

type FilterBarProps = {
  onSubmitFilters?: (values: FilterValues) => void;
};

export default function FilterBar({ onSubmitFilters }: FilterBarProps) {
  const [loading, setIsLoading] = useState(true);
  const [brands, setBrands] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState({ min: 0, max: 80 });
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const fetchFilters = async () => {
      try {
        const data = await getFilters();
        setBrands(data.brands);
        setPriceRange(data.price);
      } catch {
        toast.error("Couldn't get the filers, try again later");
      } finally {
        setIsLoading(false);
      }
    };

    fetchFilters();
  }, []);

  const prices: number[] = [];
  for (let p = priceRange.min; p <= priceRange.max; p += 1) {
    prices.push(p);
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const brand = String(formData.get("brand") || "");
    const priceRaw = String(formData.get("price") || "");
    const minMileageRaw = String(formData.get("minMileage") || "");
    const maxMileageRaw = String(formData.get("maxMileage") || "");

    const price = Number(priceRaw);
    const minMileage = Number(minMileageRaw);
    const maxMileage = Number(maxMileageRaw);

    const filters: FilterValues = {
      ...(brand && { brand }),
      ...(priceRaw && Number.isFinite(price) && { price }),
      ...(minMileageRaw && Number.isFinite(minMileage) && { minMileage }),
      ...(maxMileageRaw && Number.isFinite(maxMileage) && { maxMileage }),
    };

    onSubmitFilters?.(filters);
  };

  const handleClear = () => {
    formRef.current?.reset();
    onSubmitFilters?.({});
  };

  if (loading) return <p>Loading filters...</p>;

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      className="mb-15 flex items-center justify-center gap-4"
    >
      <label
        htmlFor="brand"
        className="text-dark-grey flex flex-col gap-2 text-xs font-medium"
      >
        Choose a brand
        <select
          name="brand"
          id="brand"
          defaultValue=""
          className="rounded-xl bg-white px-4 py-3 text-black"
        >
          <option value="">Choose a brand</option>
          {brands.map((brand) => (
            <option key={brand} value={brand}>
              {brand}
            </option>
          ))}
        </select>
      </label>

      <label
        htmlFor="price"
        className="text-dark-grey flex flex-col gap-2 text-xs"
      >
        Price / 1 hour
        <select
          name="price"
          id="price"
          className="rounded-xl bg-white px-4 py-3 font-medium text-black"
        >
          <option value="">Choose a price</option>
          {prices.map((price) => (
            <option key={price} value={price}>
              {price}
            </option>
          ))}
        </select>
      </label>

      <label
        htmlFor="minMileage"
        className="text-dark-grey flex flex-col gap-2 text-xs"
      >
        <span>Car mileage / km</span>
        <input
          id="minMileage"
          name="minMileage"
          type="number"
          min={0}
          placeholder="From"
          defaultValue={0}
          className="rounded-xl bg-white px-4 py-3 font-medium text-black"
        />
      </label>

      <label
        htmlFor="maxMileage"
        className="text-dark-grey flex flex-col gap-1 text-xs"
      >
        <span className="opacity-0">Car mileage / km</span>

        <input
          id="maxMileage"
          name="maxMileage"
          type="number"
          min={0}
          placeholder="To"
          className="rounded-xl bg-white px-4 py-3 font-medium text-black"
        />
      </label>

      <div className="flex flex-col gap-2">
        <button
          type="submit"
          className="bg-light-blue hover:bg-dark-blue rounded-xl px-12.75 py-3 text-center text-base leading-tight font-semibold text-white transition-colors duration-250 ease-in-out"
        >
          Search
        </button>
        <button
          type="button"
          className="text-dark-grey font-normal"
          onClick={handleClear}
        >
          Clear filters
        </button>
      </div>
    </form>
  );
}
