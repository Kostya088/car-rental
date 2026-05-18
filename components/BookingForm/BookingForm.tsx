"use client";
import { bookCar } from "@/lib/api";
import { useRef } from "react";
import toast from "react-hot-toast";

interface BookingFormProps {
  carId: string;
}

export default function BookingForm({ carId }: BookingFormProps) {
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const body = {
      name: String(formData.get("name")),
      email: String(formData.get("email")),
      comment: String(formData.get("comment") || ""),
    };

    if (!body.name.trim() || !body.email.trim()) {
      toast.error("Name and email are required.");
      return;
    }

    try {
      const { data } = await bookCar(carId, body);
      toast.success(`${data.message}`, {
        duration: 2000,
        style: {
          width: "500px",
        },
      });
      formRef.current?.reset();
    } catch {
      toast.error(`Unable to book a car, please try again later`);
    }
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-4">
      <label htmlFor="name" className="sr-only">
        Name*
      </label>
      <input
        type="text"
        name="name"
        id="name"
        required
        placeholder="Name*"
        className="bg-selectors-grey placeholder-dark-grey rounded-lg px-5 py-3.5 text-base leading-tight font-medium outline-none"
      />
      <label htmlFor="email" className="sr-only">
        Email*
      </label>
      <input
        type="email"
        name="email"
        id="email"
        required
        placeholder="Email*"
        className="bg-selectors-grey placeholder-dark-grey rounded-lg px-5 py-3.5 text-base leading-tight font-medium outline-none"
      />
      <label htmlFor="comment" className="sr-only">
        Comment
      </label>
      <textarea
        name="comment"
        id="comment"
        required
        placeholder="Comment*"
        className="bg-selectors-grey placeholder-dark-grey h-22 resize-none rounded-lg px-5 py-3.5 text-base leading-tight font-medium outline-none"
        maxLength={250}
      />
      <button
        type="submit"
        className="bg-light-blue hover:bg-dark-blue focus:bg-dark-blue active:bg-light-blue mt-2 cursor-pointer rounded-lg py-3 font-semibold text-white transition-colors duration-250 ease-in-out"
      >
        Send
      </button>
    </form>
  );
}
