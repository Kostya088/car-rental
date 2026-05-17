"use client";

import CarCard from "../CarCard/CarCard";
import FilterBar from "../FilterBar/FilterBar";
import { getCars } from "@/lib/api";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useRef, useState } from "react";

type FilterValues = {
  brand?: string;
  price?: number;
  minMileage?: number;
  maxMileage?: number;
};

export default function CarList() {
  const [filters, setFilters] = useState<FilterValues>({});
  const listRef = useRef<HTMLUListElement>(null);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useInfiniteQuery({
      queryKey: ["cars", filters],
      initialPageParam: 1,
      queryFn: async ({ pageParam }) => {
        return getCars({
          brand: filters.brand,
          price: filters.price,
          minMileage: filters.minMileage,
          maxMileage: filters.maxMileage,
          page: pageParam,
          perPage: 12,
        });
      },
      getNextPageParam: (lastPage) => {
        return lastPage.page < lastPage.totalPages
          ? lastPage.page + 1
          : undefined;
      },
    });

  const cars = data?.pages.flatMap((page) => page.cars) ?? [];

  const handleLoadMore = async () => {
    const previousCount = cars.length;
    const result = await fetchNextPage();

    if (result.isError) return;

    requestAnimationFrame(() => {
      const firstNewCard = listRef.current?.children.item(
        previousCount,
      ) as HTMLElement | null;

      firstNewCard?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  };

  return (
    <div className="flex flex-col">
      <FilterBar onSubmitFilters={setFilters} />

      {cars.length ? (
        <>
          <ul
            ref={listRef}
            className="mx-auto mb-16 grid w-300 grid-cols-[repeat(4,276px)] gap-x-8 gap-y-12"
          >
            {cars.map((car) => (
              <CarCard key={car.id} car={car} />
            ))}
          </ul>

          {hasNextPage ? (
            <button
              type="button"
              onClick={handleLoadMore}
              disabled={isFetchingNextPage}
              className="border-light-blue hover:border-dark-blue focus:border-dark-blue active:border-light-blue mx-auto mb-16 cursor-pointer rounded-xl border px-9.5 py-3 text-base leading-tight font-semibold text-black transition-colors duration-250 ease-in-out disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isFetchingNextPage ? "Loading..." : "Load more"}
            </button>
          ) : null}
        </>
      ) : !isLoading ? (
        <p>No cars found</p>
      ) : null}
    </div>
  );
}
