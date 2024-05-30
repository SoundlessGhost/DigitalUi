"use client";
/* eslint-disable react/no-unescaped-entities */
import Link from "next/link";
import MaxWidthWrapper from "./MaxWidthWrapper";
import { usePathname } from "next/navigation";
import Image from "next/image";
import useUser from "@/hooks/useUser";

const Footer = () => {
  const pathname = usePathname();
  const [user] = useUser();
  return (
    <footer className="bg-white font flex-grow-0">
      {pathname == "/sign-in" ||
      pathname == "/sign-up" ||
      pathname == "/add-product" ? null : (
        <MaxWidthWrapper>
          <div className="border-t border-gray-200">
            <div className="pb-8 pt-16">
              <div className="flex justify-center">
                <Image
                  src="/eagle.png"
                  width={40}
                  height={40}
                  alt="Picture of the eagle"
                />
              </div>
            </div>

            <div className="relative bg-zinc-100  flex items-center px-6 py-6 sm:py-8 lg:mt-0">
              <div className="text-center relative mx-auto max-w-sm">
                <h3 className="font-semibold text-gray-900">Become a seller</h3>
                <div className="mt-2 text-sm text-muted-foreground">
                  If you'd like to sell high-quality digital products, you can
                  do so in minutes.{" "}
                  {user ? (
                    <span className="whitespace-nowrap font-medium text-black hover:text-zinc-900">
                      Enjoy Our Site.
                    </span>
                  ) : (
                    <Link
                      href="/sign-in"
                      className="whitespace-nowrap font-medium text-black hover:text-zinc-900"
                    >
                      Get started &rarr;
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="py-10 md:flex md:items-center md:justify-between">
            <div className="text-center md:text-left">
              <p className="text-sm text-muted-foreground">
                &copy; {new Date().getFullYear()} All Rights Reserved
              </p>
            </div>

            <div className="mt-4 flex items-center justify-center md:mt-0">
              <div className="flex space-x-8">
                <Link
                  href="#"
                  className="text-sm text-muted-foreground hover:text-gray-800"
                >
                  Terms
                </Link>
                <Link
                  href="#"
                  className="text-sm text-muted-foreground hover:text-gray-800"
                >
                  Privacy Policy
                </Link>
                <Link
                  href="#"
                  className="text-sm text-muted-foreground hover:text-gray-800"
                >
                  Cookie Policy
                </Link>
              </div>
            </div>
          </div>
        </MaxWidthWrapper>
      )}
    </footer>
  );
};

export default Footer;
