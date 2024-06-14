import { Minus, Plus } from "lucide-react";
import dynamic from "next/dynamic";
import React from "react";

const PlusMinusBtn = ({ quantity, setQuantity }) => {
  return (
    <div className="flex items-center">
      Quantity
      <Minus
        onClick={() => setQuantity(quantity > 0 ? quantity - 1 : 0)}
        size={32}
        className={`bg-gray-100 cursor-pointer rounded-md p-2 ml-4`}
      />
      <p className="mx-4">{quantity}</p>
      <Plus
        onClick={() => setQuantity(quantity + 1)}
        size={32}
        className="bg-gray-100 cursor-pointer rounded-md p-2"
      />
    </div>
  );
};

export default dynamic(() => Promise.resolve(PlusMinusBtn), { ssr: false });
