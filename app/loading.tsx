import { ClockLoader } from "react-spinners";

export default function Loading() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center">
      <ClockLoader color="#00aad4" size={100} />
    </div>
  );
}
