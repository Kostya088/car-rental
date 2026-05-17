import { Metadata } from "next";

export const metadata: Metadata = {
  title: "404 - Page Not Found",
  description: "This page does not exist",
  openGraph: {
    title: "404 - Page Not Found",
    description: "This page does not exist",
  },
};

export default function NotFound() {
  return (
    <div className="align-center align-center flex h-[50vh] flex-col justify-center gap-5 text-center">
      <h1 className="text-7xl font-bold">
        <span className="text-light-blue">404</span> - Page not found
      </h1>
      <p className="text-2xl">
        Sorry, the page you are looking for does not exist.
      </p>
    </div>
  );
}
