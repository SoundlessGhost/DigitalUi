"use client";
import React from "react";
import PlusMinusBtn from "./PlusMinusBtn";
import HandleAddToCartBtn from "./HandleAddToCartBtn";
import { useState } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";

const ParentComponentBuyAndQuantity = ({ products }) => {
  const [quantity, setQuantity] = useState(0);

  return (
    <div className="mt-4">
      <div className="text-2xl text-orange-500 flex items-center">
        <Image
          src={"/taka.png"}
          width={200}
          height={200}
          className="w-[22px] h-[22px]"
          alt="taka"
          placeholder="blur"
          blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA"
        />{" "}
        {products.price - (products.price * 35) / 100}
      </div>
      <div className="mt-2 flex items-center">
        <PlusMinusBtn quantity={quantity} setQuantity={setQuantity} />
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mt-6">
        <HandleAddToCartBtn products={products} quantity={quantity} />
      </div>
    </div>
  );
};

export default dynamic(() => Promise.resolve(ParentComponentBuyAndQuantity), {
  ssr: false,
});
