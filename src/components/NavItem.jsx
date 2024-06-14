import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { ChevronDown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";

const NavItem = ({ isAnyOpen, category, handleOpen, close, isOpen }) => {
  return (
    <div className="flex">
      <div className="relative flex items-center">
        <Button
          className="gap-1.5 font-[20px] font-size bg-orange-600 hover:bg-orange-600"
          onClick={handleOpen}
        >
          {category.label}
          <ChevronDown
            className={cn("h-4 w-4 transition-all text-white", {
              "-rotate-180": isOpen,
            })}
          />
        </Button>
      </div>

      {isOpen ? (
        <div
          onClick={close}
          className={cn(
            "absolute inset-x-0 top-full text-sm text-muted-foreground",
            {
              "animate-in fade-in-10 slide-in-from-top-5": !isAnyOpen,
            }
          )}
        >
          <div
            className="absolute inset-0 top-1/2 bg-white shadow"
            aria-hidden="true"
          />

          <motion.div
            whileInView={{ y: 0, opacity: 1 }}
            initial={{ y: -100, opacity: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="relative bg-white"
          >
            <div className="mx-auto max-w-7xl px-8">
              <div className="grid grid-cols-4 gap-x-8 gap-y-10 py-16">
                <div className="col-span-4 col-start-1 grid grid-cols-3 gap-x-8">
                  {category.featured.map((item) => (
                    <div
                      onClick={close}
                      key={item.name}
                      className="group relative text-base sm:text-sm"
                    >
                      <div className="relative aspect-video overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75">
                        <Image
                          src={item.imageSrc}
                          alt="product category image"
                          fill
                         
                        />
                      </div>

                      <Link
                        href={item.href}
                        className="mt-6 block font-medium text-gray-900"
                      >
                        {item.name}
                      </Link>
                      <p className="mt-1" aria-hidden="true">
                        &uarr; Shop now &rarr;
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      ) : null}
    </div>
  );
};

export default dynamic(() => Promise.resolve(NavItem), { ssr: false });
