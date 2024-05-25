"use client";
import useProduct from "@/hooks/useProduct";
import useUser from "@/hooks/useUser";
import { useEffect, useState } from "react";
import MaxWidthWrapper from "./MaxWidthWrapper";
import ImageSlider from "./ImageSilder";
import Link from "next/link";

const ProductList = () => {
  const [user] = useUser();
  const [productData] = useProduct();
  const [userProducts, setUserProducts] = useState([]);

  useEffect(() => {
    const filteredProducts = productData.filter(
      (product) => product?.email === user?.email
    );
    setUserProducts(filteredProducts);
  }, [productData, user?.email]);

  return (
    <div>
      <MaxWidthWrapper>
        {userProducts.map((product) => (
          <>
            <Link href={`/product/${product.id}`}>
              <div className="flex flex-col w-full">
                <ImageSlider />

                <h3 className="mt-4 font-medium text-sm text-gray-700">
                  {product.product}
                </h3>
                <p className="mt-1 text-sm text-gray-500">{product.category}</p>
                <p className="mt-1 font-medium text-sm text-gray-900">
                  ${product.price}
                </p>
              </div>
            </Link>
          </>
        ))}
      </MaxWidthWrapper>
    </div>
  );
};

export default ProductList;
