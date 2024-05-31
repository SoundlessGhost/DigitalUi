"use client";
import React from "react";
import MaxWidthWrapper from "./MaxWidthWrapper";
import Link from "next/link";
import Image from "next/image";
import Cart from "./Cart";
import NavItems from "./NavItems";
import MobileNav from "./MobileNav";
import useUser from "@/hooks/useUser";
import { DropdownMenuDemo } from "./DropdownMenuDemo";

const Navbar = () => {
  const [user] = useUser();

  return (
    <div className="bg-white sticky z-50  font-semibold top-0 inset-x-0  border-b ">
      <MaxWidthWrapper>
        <div className="flex items-center h-16  justify-between">
          <div className="flex items-center">
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
          </div>

          <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
            {user ? (
              <DropdownMenuDemo />
            ) : (
              <div className="flex items-center">
                <div>
                  <Link
                    className=" py-3 px-4 hover:bg-gray-100  font-semibold border-0 border-r border-gray-300 text-sm font"
                    href="/sign-in"
                  >
                    Log In
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

          <Cart />
        </div>
      </MaxWidthWrapper>
    </div>
  );
};

export default Navbar;
