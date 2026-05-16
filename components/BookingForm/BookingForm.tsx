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
          width: "300px",
        },
      });
      formRef.current?.reset();
    } catch {
      toast.error(`Unable to book a car, please try again later`);
    }
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-3">
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
        className="bg-selectors-grey placeholder-dark-grey h-22 resize-none rounded-lg px-4 py-3 text-base outline-none"
        maxLength={190}
      />
      <button
        type="submit"
        className="bg-light-blue hover:bg-dark-blue mt-2 rounded-lg py-3 font-semibold text-white transition-colors duration-250 ease-in-out"
      >
        Send
      </button>
    </form>
  );
}
