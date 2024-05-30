import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import PlusMinusBtn from "@/components/PlusMinusBtn";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  ChevronRight,
  Coins,
  PackageCheck,
  RefreshCcw,
  ShieldOff,
  SignalHigh,
  Star,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const SingleProductPage = async ({ params }) => {
  const res = await fetch(`http://localhost:3000/api/products/${params.id}`, {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Fetching error: " + res.statusText);
  }
  const product = await res.json();

  return (
    <div className="font1 bg-white overflow-hidden">
      {/* Links One */}

      <div className="flex items-center mx-10 border-0 border-b w-96 ">
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
          {product.product}
        </Link>
      </div>

      <MaxWidthWrapper>
        <div className="my-10 lg:flex block lg:border-0 lg:border-b lg:pb-10">
          {/* First One */}

          <div>
            <Image
              src={product.images[1]}
              width={200}
              height={200}
              className="w-[330px] h-[330px] rounded-lg border border-gray-200"
              alt="Picture of the product"
            />
          </div>

          {/* Middle One */}

          <div className="lg:ml-10 lg:mt-0 mt-10 w-[330px] ">
            <div>
              <p className="text-2xl">{product.product}</p>
              <p className="flex items-center">
                <span className="mr-1 text-[12px] my-1 text-gray-500">
                  Ratting:{" "}
                </span>
                <Star size={12} />
              </p>
            </div>

            <div className="flex items-center text-[12px] -mt-2 border-0 border-b">
              <p className=" text-gray-500">Brand: </p>
              <Link
                href={"/"}
                className={`${buttonVariants({
                  variant: "link",
                })} -ml-2 font-size text-[#47bba6]`}
              >
                {product.Brand}
                {/* | TODO - Brand product eikhane asbe  */}
              </Link>
            </div>

            <div className="mt-4">
              <p className="text-2xl text-blue-500">{product.price} $</p>
              <div className="mt-2 flex items-center ">
                Quantity
                <PlusMinusBtn />
              </div>
              <div className="flex flex-col sm:flex-row gap-4 mt-6">
                <Link href={"/checkout"} className={`${buttonVariants()}`}>
                  Buy Now
                </Link>
                <Button variant="ghost">Add to Cart</Button>
              </div>
            </div>
          </div>

          {/* Last One */}

          <div className="lg:ml-10 lg:mt-0 mt-10 w-[330px] ">
            <div className="">
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

export default SingleProductPage;
