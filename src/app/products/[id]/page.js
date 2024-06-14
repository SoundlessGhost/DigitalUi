import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import ParentComponentBuyAndQuantity from "@/components/ParentComponentBuyAndQuantity";
import { buttonVariants } from "@/components/ui/button";
import {
  BadgeCheck,
  ChevronRight,
  Coins,
  PackageCheck,
  RefreshCcw,
  ShieldCheck,
  ShieldOff,
  SignalHigh,
  Star,
} from "lucide-react";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";

const SingleProductPage = async ({ params }) => {
  const res = await fetch(`https://digital-ui-nu.vercel.app/api/products/${params?.id}`, {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Fetching error: " + res.statusText);
  }
  const product = await res.json();

  return (
    <div className="font1 bg-white overflow-hidden">
      {/* Links One */}

      <div className="flex items-center px-10 py-2 border-0 border-b bg-gray-100 rounded-md">
        <Link
          href={"/"}
          className={`${buttonVariants({
            variant: "link",
          })} `}
        >
          Home
        </Link>{" "}
        <ChevronRight size={16} />
        <Link
          href={"/"}
          className={buttonVariants({
            variant: "link",
          })}
        >
          {product.name}
        </Link>
      </div>

      <MaxWidthWrapper>
        <div className="my-10 lg:flex block lg:border-0 lg:border-b lg:pb-10">
          {/* First One */}

          <div className="bg-gray-50 p-4 rounded-md">
            <Image
              src={product.images[1]}
              width={200}
              height={200}
              className="w-[330px] h-[330px] rounded-lg border border-gray-200"
              alt="Picture of the product"
              placeholder="blur"
              blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA"
            />
          </div>

          {/* Middle One */}

          <div className="lg:ml-4 lg:mt-0 mt-10 w-[350px] bg-gray-50 p-4 rounded-md">
            <div>
              <p className="text-2xl">{product.name}</p>
              <p className="flex items-center">
                <span className="mr-1 text-[12px] my-1 text-gray-500">
                  Ratting:{" "}
                </span>
                <Star size={12} />
              </p>
              <p className="text-[12px] my-1 text-gray-500">
                Size: {product.Size}
              </p>
            </div>

            <div className="flex items-center text-[12px] -mt-2 border-0 border-b">
              <p className=" text-gray-500">Brand: </p>
              <div>
                {product.Brand === "No Brand" ? (
                  <Link
                    href={"/"}
                    className={`${buttonVariants({
                      variant: "link",
                    })} -ml-3 text-[10px]`}
                  >
                    No Brand | More products from No Brand
                  </Link>
                ) : (
                  <Link
                    href={"/"}
                    className={`${buttonVariants({
                      variant: "link",
                    })} -ml-3 text-[10px]`}
                  >
                    {product.Brand}
                  </Link>
                )}

                {/* | TODO - Brand product eikhane asbe  */}
              </div>
            </div>

            {/* Quantity and Buy Button */}

            <ParentComponentBuyAndQuantity products={product} />
          </div>

          {/* Last One */}

          <div className="lg:ml-4 lg:mt-0 mt-10 w-[350px] bg-gray-50 p-4 rounded-md">
            <div>
              <p className="text-sm">Delivery</p>
              <div className="flex  my-2 items-center pl-4">
                <PackageCheck size={15} />
                <p className="text-[12px] ml-2 text-gray-500">
                  Standard Delivery 5 - 6 day (s){" "}
                </p>
              </div>
              <div className="flex items-center pl-4 border-0 border-b pb-4">
                <Coins size={15} />
                <p className="text-[12px] ml-2 text-gray-500">
                  Cash on Delivery Available
                </p>
              </div>
            </div>

            <div className="mt-4">
              <p className="text-sm">Services</p>
              <div className="flex  my-2 items-center pl-4">
                <RefreshCcw size={15} />
                <p className="text-[12px] ml-2 text-gray-500">
                  1 Week Returns Policy
                </p>
              </div>
              <div className="flex items-center pl-4">
                <ShieldOff size={15} />
                <p className="text-[12px] ml-2 text-gray-500">
                  Warranty not available
                </p>
              </div>
              <div className="flex  my-2 items-center pl-4  border-0 border-b pb-4">
                <SignalHigh size={15} />
                <p className="text-[12px] ml-2 text-gray-500">
                  We provide verified and high quality products{" "}
                </p>
              </div>
            </div>

            <div className="mt-4">
              <p className="text-sm">Sold by</p>
              <div className="flex  my-2 items-center pl-4">
                {product?.sellerName}
              </div>
              <div className="flex items-center pl-4 text-orange-500">
                <ShieldCheck size={25} />
                <p className="text-[18px] ml-1 font-bold">Verified Seller</p>
              </div>
            </div>
          </div>
        </div>

        {/* Down One */}

        <div className="pb-10">
          <p>Related Product </p>
          {/* TODO Related product  */}
        </div>
      </MaxWidthWrapper>
    </div>
  );
};

export default dynamic(() => Promise.resolve(SingleProductPage), {
  ssr: false,
});
