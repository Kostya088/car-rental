"use client";
import { getFilters } from "@/lib/api";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import Select, { SingleValue, StylesConfig } from "react-select";
import { ClockLoader } from "react-spinners";

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
  const [selectedBrand, setSelectedBrand] = useState<{
    value: string;
    label: string;
  } | null>(null);
  const [selectedPrice, setSelectedPrice] = useState<{
    value: string;
    label: string;
  } | null>(null);
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

  const brandOptions = brands.map((brand) => ({
    value: brand,
    label: brand,
  }));

  const priceOptions = prices.map((price) => ({
    value: price.toString(),
    label: price.toString(), // Only show number in dropdown
  }));

  const customStyles: StylesConfig<{ value: string; label: string }, false> = {
    control: (provided) => ({
      ...provided,
      height: 44,
      borderRadius: 12,
      border: "none",
      boxShadow: "none",
      "&:hover": {
        border: "none",
      },
      fontSize: 16,
      fontWeight: 500,
      cursor: "pointer",
    }),

    placeholder: (provided) => ({
      ...provided,
      color: "#101828",
    }),

    option: (provided, state) => ({
      ...provided,
      borderRadius: 12,
      color: state.isSelected ? "#ffffff" : "#101828",
      backgroundColor: state.isSelected
        ? "#00aad4"
        : state.isFocused
          ? "#f7f7f7"
          : "transparent",
      cursor: "pointer",

      ":active": {
        backgroundColor: state.isSelected ? "#101828" : "#eef2f6",
      },
    }),

    valueContainer: (provided) => ({
      ...provided,
    }),

    dropdownIndicator: (provided) => ({
      ...provided,
      paddingRight: 16,
      paddingLeft: 16,
    }),

    indicatorSeparator: () => ({ display: "none" }),

    menu: (provided) => ({
      ...provided,
      borderRadius: 12,
      height: 272,
      maxHeight: 272,
      overflow: "hidden",
      boxShadow: "0 4px 16px rgba(16,24,40,0.08)",
    }),

    menuList: (provided) => ({
      ...provided,
      maxHeight: 272,
      padding: "12px 18px",
      overflowY: "auto",
      scrollbarWidth: "thin",
      scrollbarColor: "#dadde1 #f7f7f7",
      fontSize: 16,
      fontWeight: 500,
      lineHeight: 1.25,
    }),
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const brand = selectedBrand?.value || "";
    const priceRaw = selectedPrice?.value || "";
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
    setSelectedBrand(null);
    onSubmitFilters?.({});
  };

  if (loading) return <ClockLoader color="#00aad4" size={100} />;

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      className="mb-15 flex items-end justify-center gap-4"
    >
      <label
        htmlFor="brand"
        className="text-dark-grey mb-7 flex flex-col gap-2 text-xs font-medium"
        style={{ minWidth: 220 }}
      >
        Choose a brand
        <Select
          inputId="brand"
          name="brand"
          options={brandOptions}
          value={selectedBrand}
          onChange={(option: SingleValue<{ value: string; label: string }>) =>
            setSelectedBrand(option)
          }
          styles={customStyles}
          isClearable={false}
          isSearchable={false}
          placeholder="Choose a brand"
        />
      </label>
      <label
        htmlFor="price"
        className="text-dark-grey mb-7 flex flex-col gap-2 text-xs"
        style={{ minWidth: 220 }}
      >
        Price / 1 hour
        <Select
          inputId="price"
          name="price"
          options={priceOptions}
          value={selectedPrice}
          onChange={(option: SingleValue<{ value: string; label: string }>) =>
            setSelectedPrice(option)
          }
          styles={customStyles}
          isClearable={false}
          isSearchable={false}
          placeholder="Choose a price"
          menuPlacement="auto"
          formatOptionLabel={(option, { context }) =>
            context === "menu" ? option.label : `To $${option.value}`
          }
        />
      </label>
      <label className="text-dark-grey mb-7 flex flex-col gap-2 text-xs font-medium">
        Car mileage / km
        <div className="flex w-full max-w-80 overflow-hidden rounded-2xl bg-white">
          <input
            id="minMileage"
            name="minMileage"
            type="number"
            min={0}
            placeholder="From"
            className="border-light-grey h-11 w-40 flex-1 appearance-none border-r bg-transparent px-6 text-[16px] leading-tight font-medium text-black outline-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
          />
          <input
            id="maxMileage"
            name="maxMileage"
            type="number"
            min={0}
            placeholder="To"
            className="h-11 w-40 flex-1 appearance-none border-none bg-transparent px-6 text-[16px] leading-tight font-medium text-black outline-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
          />
        </div>
      </label>

      <div className="flex flex-col gap-2">
        <button
          type="submit"
          className="bg-light-blue hover:bg-dark-blue focus:bg-dark-blue active:bg-light-blue cursor-pointer rounded-xl px-12.75 py-3 text-center text-base leading-tight font-semibold text-white transition-colors duration-250 ease-in-out"
        >
          Search
        </button>
        <button
          type="button"
          className="text-dark-grey hover:text-dark-blue focus:text-dark-blue relative cursor-pointer text-[16px] leading-tight font-normal transition-colors duration-250"
          onClick={handleClear}
        >
          Clear filters
        </button>
      </div>
    </form>
  );
}
