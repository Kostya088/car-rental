import { Car } from "./car";

export interface Cars {
  cars: Car[];
  totalCars: number;
  totalPages: number;
  page: number;
  perPage: number;
}
