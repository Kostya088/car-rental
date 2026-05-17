import { Booking } from "@/types/booking";
import { Car } from "@/types/car";
import { Cars } from "@/types/cars";
import { Filters } from "@/types/filters";
import axios from "axios";

const baseURL = `${process.env.API_URL}/cars`;

export const api = axios.create({
  baseURL,
});

export async function getFilters() {
  const { data } = await api.get<Filters>("/filters");
  return data;
}

export interface CarsQuery {
  brand?: string;
  price?: number;
  minMileage?: number;
  maxMileage?: number;
  page?: number;
  perPage?: number;
}

export async function getCars(query: CarsQuery = {}) {
  const params = {
    page: query.page ?? 1,
    perPage: query.perPage ?? 12,
    ...(query.brand && { brand: query.brand }),
    ...(query.price !== undefined && { price: query.price }),
    ...(query.minMileage !== undefined && { minMileage: query.minMileage }),
    ...(query.maxMileage !== undefined && { maxMileage: query.maxMileage }),
  };

  const { data } = await api.get<Cars>("", { params });
  return data;
}

export async function getCarById(id: string) {
  const { data } = await api.get<Car>(`/${id}`);
  return data;
}

export async function bookCar(id: string, body: Booking) {
  const data = api.post(`/${id}/booking-requests`, body);
  return data;
}
