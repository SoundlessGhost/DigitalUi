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
import { motion } from "framer-motion";
import dynamic from "next/dynamic";

const Navbar = () => {
  const [user] = useUser();

  return (
    <div className="bg-orange-600 text-white sticky z-50 py-4 font-semibold top-0 inset-x-0">
      <MaxWidthWrapper>
        <div className="flex items-center h-16  justify-between">
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 2, delay: 1 }}
            className="flex items-center"
          >
            <MobileNav />
            <div className="flex ml-4 lg:ml-0 ">
              <div className="ml-4 flex lg:ml-0">
                <Link href="/">
                  <Image
                    src="/eagle.png"
                    width={40}
                    height={40}
                    alt="Picture of the eagle"
                    placeholder="blur"
                    blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA"
                  />
                </Link>
              </div>

              <div className="hidden z-50 lg:ml-8 lg:block lg:self-stretch">
                <NavItems />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 2, delay: 1 }}
            className="flex items-center"
          >
            <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
              {user ? (
                <DropdownMenuDemo />
              ) : (
                <div className="flex items-center">
                  <div className="border-0 border-r border-gray-300">
                    <Link
                      className="mx-2 py-3 px-2 hover:bg-white hover:text-black rounded-lg  font-semibold  text-sm font"
                      href="/sign-in"
                    >
                      Login
                    </Link>
                  </div>

                  <div className="border-0 border-r border-gray-300">
                    <Link
                      className="mx-2 py-3 px-2 hover:bg-white hover:text-black rounded-lg  font-semibold  text-sm font"
                      href="/sign-up"
                    >
                      Create account
                    </Link>
                  </div>
                </div>
              )}
            </div>

            <Cart />
          </motion.div>
        </div>
      </MaxWidthWrapper>
    </div>
  );
};

export default dynamic(() => Promise.resolve(Navbar), { ssr: false });
