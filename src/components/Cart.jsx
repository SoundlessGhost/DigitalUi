"use client";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Heart, ShieldCheck, Tags, X } from "lucide-react";
import { buttonVariants } from "./ui/button";
import Link from "next/link";
import Image from "next/image";
import { FaOpencart } from "react-icons/fa6";
import Swal from "sweetalert2";
import useCart from "@/hooks/useCart";
import { motion } from "framer-motion";
import useUser from "@/hooks/useUser";
import dynamic from "next/dynamic";

const Cart = () => {
  const { cart = [], refetch, isLoading, isError, error } = useCart();
  const [user] = useUser();

  if (isLoading)
    return (
      <div>
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  if (isError) return <div>Error: {error.message}</div>;
  if (!Array.isArray(cart)) {
    return <div>Invalid cart</div>;
  }

  const shippingFee = 120 * cart.length;
  const itemCount = cart.length;
  const items = cart.reduce((sum, item) => sum + +item.quantity, 0);
  const totalItemsPrice = cart.reduce(
    (sum, item) => sum + +(item.quantity * item.price),
    0
  );
  const discount = totalItemsPrice - totalItemsPrice * 0.35;
  const totalPrice = shippingFee + discount;

  // Handle Delete

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`/api/carts?id=${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deleteCount > 0) {
              Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success",
              });
            }
            refetch();
          });
      }
    });
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <FaOpencart size={20} className="ml-4 cursor-pointer " />
      </SheetTrigger>
      <SheetContent className="overflow-y-scroll overscroll-y-none">
        <SheetTitle className="text-sm text-center font">
          <motion.p
            whileInView={{ x: 0, opacity: 1 }}
            initial={{ x: 100, opacity: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            Cart ({cart.length})
          </motion.p>
        </SheetTitle>
        {itemCount > 0 ? (
          <>
            <motion.div
              whileInView={{ x: 0, opacity: 1 }}
              initial={{ x: -100, opacity: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              {cart.map((product) => (
                <div
                  className=" border border-gray-100 rounded-lg p-2 my-4 flex items-center justify-between"
                  key={product._id}
                >
                  <div className="flex items-center">
                    <Image
                      src={product.ProductSecondImage}
                      width={150}
                      height={150}
                      className="lg:w-[75px] w-[50px] lg:h-[75px] h-[50px] rounded-md"
                      alt="Picture of the Products"
                      placeholder="blur"
                      blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA"
                    />

                    {/* product details */}

                    <div className="flex flex-col w-full font1 ml-2">
                      <h3 className="font-medium lg:text-sm text-[10px] text-gray-600">
                        {product.name}
                      </h3>

                      <div className="flex items-center my-1 text-orange-500">
                        <Image
                          src={"/taka.png"}
                          width={200}
                          height={200}
                          className="lg:w-[12px] lg:h-[12px] w-[9px] h-[9px]"
                          alt="taka"
                          placeholder="blur"
                          blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA"
                        />{" "}
                        <p className="lg:text-[12px] text-[9px]">
                          {product.price - product.price * 0.35}
                        </p>
                      </div>

                      <p className="font-medium lg:text-[10px] text-[8px]">
                        Quantity: {product.quantity} Piece
                      </p>

                      <div className="flex items-center">
                        <p className="lg:text-[7px] text-[6px] mt-1 text-gray-600 flex items-center">
                          <ShieldCheck size={8} className="mr-0.5" /> Verified
                          Product
                        </p>
                        <p className="lg:text-[7px] text-[6px] ml-2 mt-1 text-gray-600 flex items-center">
                          <Tags size={8} className="mr-0.5" /> Best Price
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col">
                    <Heart className="mb-3 opacity-50 bg-slate-100 cursor-pointer p-1 rounded-md" />
                    <X
                      onClick={() => handleDelete(product._id)}
                      className="opacity-50 bg-slate-100 cursor-pointer p-1 rounded-md"
                    />
                  </div>
                </div>
              ))}
            </motion.div>

            <motion.div
              whileInView={{ y: 0, opacity: 1 }}
              initial={{ y: 100, opacity: 0 }}
              transition={{ duration: 2, delay: 1 }}
            >
              <p className=" mt-8 pb-2 font1">Order Items</p>
              <div className="flex mt-2 font1 lg:text-sm text-[12px]">
                <span className="flex-1">Shipping Fee</span>
                <span>{shippingFee}</span>
              </div>

              <div className="flex mt-2 font1 lg:text-sm text-[12px]">
                <span className="flex-1">
                  Items Total{" "}
                  <span className="text-[12px]">( {items} items )</span>
                </span>
                <span>{discount.toFixed(2)}</span>
              </div>

              <p className="border-0 border-b border-blue-500 my-2"></p>

              <div className="flex font1 lg:text-sm text-[12px]">
                <span className="flex-1">Total</span>
                <span>{totalPrice.toFixed(2)}</span>
              </div>

              <Link
                className={`${buttonVariants()} w-full mt-6`}
                href="/checkout"
              >
                Continue to checkout
              </Link>
            </motion.div>
          </>
        ) : (
          <>
            <div className="h-full flex flex-col items-center justify-center">
              <div className="mb-4 relative w-60 h-60 text-muted-foreground">
                <Image
                  src="/hippo-empty-cart.png"
                  width={200}
                  height={200}
                  alt="empty shopping cart ui"
                  placeholder="blur"
                  blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA"
                />
              </div>

              <div className="text-lg font font-semibold -mt-10">
                Your cart is empty
              </div>

              <SheetTrigger asChild>
                <Link
                  href="/products"
                  className={`${buttonVariants({
                    variant: "link",
                    size: "sm",
                  })} font`}
                >
                  Add items to your cart to checkout &rarr;
                </Link>
              </SheetTrigger>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default dynamic(() => Promise.resolve(Cart), { ssr: false });
