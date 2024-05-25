"use client";
import React from "react";
import MaxWidthWrapper from "./MaxWidthWrapper";
import Link from "next/link";
import Image from "next/image";
import Cart from "./Cart";
import NavItems from "./NavItems";
import MobileNav from "./MobileNav";
import useUser from "@/hooks/useUser";
import toast from "react-hot-toast";
import { LogOutIcon, Plus } from "lucide-react";
import { Button } from "./ui/button";
import { getAuth, signOut } from "firebase/auth";
import { app } from "../../firebase.config";

const Navbar = () => {
  const auth = getAuth(app);
  const [user] = useUser();
  console.log(user);

  const handleLogOut = () => {
    signOut(auth)
      .then(() => {
        toast.success("user logOut successfully");
      })
      .catch((e) => {
        toast.error(e.message);
      });
  };
  return (
    <div className="bg-white sticky z-50  font-semibold top-0 inset-x-0  border-b ">
      <MaxWidthWrapper>
        <div className="flex items-center h-16 ">
          <MobileNav />
          <div className="flex ml-4 lg:ml-0 ">
            <Link href="/">
              <Image
                src="/eagle.png"
                width={40}
                height={40}
                alt="Picture of the eagle"
              />
            </Link>

            <div className="hidden font z-50 lg:ml-8 lg:block">
              <NavItems />
            </div>
          </div>

          <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
            {user ? (
              <>
                <Button
                  onClick={handleLogOut}
                  variant="ghost"
                  className="font -m-2 flex items-center p-2 font-medium text-gray-900"
                >
                  Log out <LogOutIcon size={15} className="ml-1" />
                </Button>
                <Cart />
                <Link href="/addProduct">
                  <Plus size={20} />
                </Link>
              </>
            ) : (
              <div className="flex items-center">
                <div>
                  <Link
                    className=" py-3 px-4 hover:bg-gray-100  font-semibold border-0 border-r border-gray-300 text-sm font"
                    href="/sign-in"
                  >
                    Sign In
                  </Link>
                </div>

                <div>
                  <Link
                    className=" py-3 px-4 hover:bg-gray-100  font-semibold border-0 border-r border-gray-300 text-sm font"
                    href="/sign-up"
                  >
                    Create account
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </MaxWidthWrapper>
    </div>
  );
};

export default Navbar;
