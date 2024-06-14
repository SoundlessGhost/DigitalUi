"use client";
import { useState, useEffect } from "react";
import useProduct from "@/hooks/useProduct";
import MaxWidthWrapper from "./MaxWidthWrapper";
import Link from "next/link";
import Image from "next/image";
import { ShieldCheck, Tags } from "lucide-react";
import { motion } from "framer-motion";
import { SkeletonCard } from "./SkeletonCard";
import dynamic from "next/dynamic";

const ProductList = () => {
  const {
    products = [],
    refetch,
    isLoading: dataLoading,
    isError,
    error,
  } = useProduct();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, [dataLoading]);

  // Zoomed Image Function

  const handleMouseEnter = (productId) => {
    const image = document.getElementById(`image-${productId}`);
    if (image) {
      image.classList.add("zoomed");
    }
  };

  const handleMouseLeave = (productId) => {
    const image = document.getElementById(`image-${productId}`);
    if (image) {
      image.classList.remove("zoomed");
    }
  };

  // Product Motion

  const iconVariants = (duration) => ({
    initial: {
      y: -10,
    },
    animate: {
      x: [10, -10],
      transition: {
        duration: duration,
        ease: "linear",
        repeat: Infinity,
        repeatType: "reverse",
      },
    },
  });

  return (
    <div className="bg-white border-0 border-t py-10 overflow-hidden">
      <MaxWidthWrapper>
        <motion.div
          whileInView={{ x: 0, opacity: 1 }}
          initial={{ x: -100, opacity: 0 }}
          transition={{ duration: 2 }}
          className="lg:flex justify-between grid grid-cols-2 gap-3"
        >
          {isLoading || dataLoading ? (
            [...Array(6)].map((_, index) => <SkeletonCard key={index} />)
          ) : (
            <>
              {products.map((product) => (
                <motion.div
                  variants={iconVariants(1.5)}
                  initial="initial"
                  animate="animate"
                  className="border border-gray-100 rounded-lg p-4"
                  key={product._id}
                >
                  <div
                    className="image-container relative"
                    onMouseEnter={() => handleMouseEnter(product._id)}
                    onMouseLeave={() => handleMouseLeave(product._id)}
                  >
                    <Image
                      id={`image-${product._id}`}
                      src={product.images[0]}
                      width={150}
                      height={150}
                      className="w-[150px] h-[150px]"
                      alt="Picture of the Products"
                      placeholder="blur"
                      blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA"
                    />
                  </div>

                  <div className="flex flex-col w-full font1">
                    <Link href={`/products/${product._id}`}>
                      <h3 className="mt-2 font-medium text-sm text-gray-700 hover:text-gray-400">
                        {product.name.slice(0, 15)} ...
                      </h3>
                    </Link>
                    <div className="my-1 font-medium text-[14px] flex items-center">
                      <div className="flex items-center italic text-gray-400 text-[10px] ">
                        <del className="">{product.price}</del>
                        <div className="ml-1"> -35%</div>
                      </div>

                      <div className="flex items-center ml-4 text-orange-500">
                        <Image
                          src={"/taka.png"}
                          width={200}
                          height={200}
                          className="w-[14px] h-[14px]"
                          alt="taka"
                          placeholder="blur"
                          blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA"
                        />{" "}
                        {product.price - product.price * 0.35}
                      </div>
                    </div>

                    <div className="flex items-center">
                      <p className="text-[7px] mt-1 text-gray-600 border px-0.5 border-blue-300 rounded flex items-center">
                        <ShieldCheck size={8} className="mr-0.5" /> Verified
                        Product
                      </p>
                      <p className="text-[7px] ml-2 mt-1 text-gray-600 border px-0.5 border-blue-300 rounded flex items-center">
                        <Tags size={8} className="mr-0.5" /> Best Price
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </>
          )}
        </motion.div>
      </MaxWidthWrapper>
    </div>
  );
};

export default dynamic(() => Promise.resolve(ProductList), { ssr: false });
