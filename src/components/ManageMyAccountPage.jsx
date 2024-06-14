"use client";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import useUser from "@/hooks/useUser";
import { getAuth, signOut } from "firebase/auth";
import { BookCopy, CreditCard, LogOut, Plus, User } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { app } from "../../firebase.config";
import dynamic from "next/dynamic";

const ManageMyAccount = () => {
  const auth = getAuth(app);
  const [user] = useUser();
  const router = useRouter();

  const handleLogOut = () => {
    signOut(auth).then(() => {
      router.push("/sign-up");
    });
  };
  return (
    <div className="mb-10 pb-10 pt-4 font">
      <MaxWidthWrapper>
        <p className="text-[12px]">
          Assalamualaikum, {user?.displayName ? user.displayName : "Unknown"}
        </p>
        <h1 className="mt-2 text-orange-600 font-semibold">
          <Link href={"/user-dashboard"}>MANAGE MY ACCOUNT</Link>
        </h1>
        <div className="ml-6">
          <div className="flex items-center my-4 cursor-pointer hover:text-[#00abf0]">
            <Link
              href={"/user-dashboard/manage-my-account/my-profile"}
              className="flex items-center"
            >
              <User className="mr-2 h-4 w-4" />
              <span className="text-[12px] font-semibold">My Profile</span>
            </Link>
          </div>
          <div className="flex items-center my-4 cursor-pointer hover:text-[#00abf0]">
            <Link
              href={"/user-dashboard/manage-my-account/my-address"}
              className="flex items-center"
            >
              <BookCopy className="mr-2 h-4 w-4" />
              <span className="text-[12px] font-semibold">My Address</span>
            </Link>
          </div>
          <div className="flex items-center my-4 cursor-pointer hover:text-[#00acf0]">
            <Link
              href={"/user-dashboard/manage-my-account/my-payments-options"}
              className="flex items-center"
            >
              <CreditCard className="mr-2 h-4 w-4" />
              <span className="text-[12px] font-semibold">
                My Payments Options
              </span>
            </Link>
          </div>
          <div className="flex items-center my-4 cursor-pointer hover:text-[#00abf0]">
            <Link
              href={"/user-dashboard/manage-my-account/new-team"}
              className="flex items-center"
            >
              <Plus className="mr-2 h-4 w-4" />
              <span className="text-[12px] font-semibold">New Team</span>
            </Link>
          </div>
          <div
            onClick={handleLogOut}
            className="flex items-center my-4 cursor-pointer hover:text-[#00abf0]"
          >
            <LogOut className="mr-2 h-4 w-4" />
            <span className="text-[12px] font-semibold">Log out</span>
          </div>
        </div>
      </MaxWidthWrapper>
    </div>
  );
};

export default dynamic(() => Promise.resolve(ManageMyAccount), { ssr: false });
