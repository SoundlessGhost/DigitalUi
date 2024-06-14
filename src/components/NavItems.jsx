"use client";
import { PRODUCT_CATEGORIES } from "@/config";
import React, { useEffect, useRef, useState } from "react";
import NavItem from "./NavItem";
import useOnClickOutside from "@/hooks/use-on-click-outside";
import dynamic from "next/dynamic";

const NavItems = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  useEffect(() => {
    const handler = (e) => {
      if (e.key === "Escape") {
        setActiveIndex(null);
      }
    };

    document.addEventListener("keydown", handler);

    return () => {
      document.removeEventListener("keydown", handler);
    };
  }, []);

  const isAnyOpen = activeIndex !== null;

  const navRef = useRef(null);

  useOnClickOutside(navRef, () => setActiveIndex(null));

  return (
    <div className="flex gap-4 h-full" ref={navRef}>
      {PRODUCT_CATEGORIES.map((category, i) => {
        const handleOpen = () => {
          if (activeIndex === i) {
            setActiveIndex(null);
          } else {
            setActiveIndex(i);
          }
        };

        const close = () => setActiveIndex(null);

        const isOpen = i === activeIndex;

        return (
          <NavItem
            category={category}
            close={close}
            handleOpen={handleOpen}
            isOpen={isOpen}
            key={category.value}
            isAnyOpen={isAnyOpen}
          />
        );
      })}
    </div>
  );
};

export default dynamic(() => Promise.resolve(NavItems), { ssr: false });
