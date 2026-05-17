import CarList from "@/components/CarList/CarList";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Rental Car: Catalog",
  description: "Check out all our cars and book one for yourself",
  openGraph: {
    title: "Rental Car: Catalog",
    type: "website",
  },
};

export default function Catalog() {
  return (
    <div className="page-container mt-21 flex flex-col">
      <CarList />
    </div>
  );
}
