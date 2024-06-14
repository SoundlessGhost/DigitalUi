"use client";
import { ReloadIcon } from "@radix-ui/react-icons";

export default function Loading() {
  return (
    <div className="flex items-center justify-center h-[100vh] w-[100vw]">
      <p disabled className="flex items-center">
        <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
      </p>
    </div>
  );
}
