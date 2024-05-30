"use client";
import { Minus, Plus } from "lucide-react";
import React, { useState } from "react";

const PlusMinusBtn = () => {
  const [increase, setIncrease] = useState(0);

  return (
    <div className="flex items-center ml-4">
      <Minus
        onClick={() => setIncrease(increase - 1)}
        size={32}
        className={`bg-gray-100 cursor-pointer rounded-md p-2 ${
          increase === 0 ? "hidden" : null
        }`}
      />
      <p className="mx-4">{increase}</p>
      <Plus
        onClick={() => setIncrease(increase + 1)}
        size={32}
        className="bg-gray-100 cursor-pointer rounded-md p-2"
      />
    </div>
  );
};

export default PlusMinusBtn;
