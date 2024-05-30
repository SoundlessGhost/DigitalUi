"use client";
import useProduct from "@/hooks/useProduct";
import MaxWidthWrapper from "./MaxWidthWrapper";
import Link from "next/link";
import Image from "next/image";

const ProductList = () => {
  const [productData] = useProduct();

  return (
    <div className="bg-white border-0 border-t py-10">
      <MaxWidthWrapper>
        <div className="lg:flex justify-between grid grid-cols-2 gap-3">
          {productData.map((product) => (
            <div
              className=" border border-gray-100 rounded-lg p-4"
              key={product._id}
            >
              <Image
                src={product.images[0]}
                width={150}
                height={150}
                className="w-[150px] h-[150px] rounded-lg"
                alt="Picture of the Products"
              />
              <Link href={`/products/${product._id}`}>
                <div className="flex flex-col w-full font1">
                  <h3 className="mt-2 font-medium text-sm text-gray-700 hover:text-gray-400">
                    {product.product.slice(0, 12)} ...
                  </h3>
                  <p className="my-1 font-medium text-[14px] text-blue-600">
                    {product.price} $
                  </p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </MaxWidthWrapper>
    </div>
  );
};

export default ProductList;
