import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex justify-center h-[100vh] items-center">
        <div>
          <p className="text-gray-600 mb-4">
            <span className=" text-black text-4xl font">Opps!</span> This page are
            can’t be found. <span className="text-black text-[14px] font">404</span> error.
          </p>
          <Link
            className={buttonVariants({
              variant: "link",
            })}
            href="/"
          >
            &larr; Return Home
          </Link>
        </div>
      </div>
  );
}
