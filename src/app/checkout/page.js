"use client";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { Plus, ShieldCheck, Tags, X } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import useUser from "@/hooks/useUser";
import useCart from "@/hooks/useCart";
import Swal from "sweetalert2";
import Image from "next/image";
import Link from "next/link";
import useSpecificUserAddress from "@/hooks/useSpecificUserAddress";
import dynamic from "next/dynamic";

const CheckOutPage = () => {
  const [user] = useUser();
  const { cart = [], refetch, isLoading, isError, error } = useCart();
  const { userAddress = [] } = useSpecificUserAddress();

  // Order Items

  const shippingFee = 120;
  const items = cart.reduce((sum, item) => sum + +item.quantity, 0);
  const totalItemsPrice = cart.reduce(
    (sum, item) => sum + +(item.quantity * item.price),
    0
  );
  const discount = totalItemsPrice - totalItemsPrice * 0.35;
  const totalPrice = shippingFee + discount;

  const handleDeleteCart = (id) => {
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
              refetch();
            }
          })
          .catch((error) => {
            console.error("Error deleting item:", error);
          });
      }
    });
  };

  // add Address

  const handleDeleteAddress = (email) => {
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
        fetch(`/api/user-address/${email}`, {
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
              refetch();
            }
          })
          .catch((error) => {
            console.error("Error deleting item:", error);
          });
      }
    });
  };

  return (
    <div className="bg-gray-50 mt-10 font overflow-hidden">
      <MaxWidthWrapper>
        <div className="lg:flex block justify-between mb-20">
          <div className="lg:w-[650px] w-[350px]">
            {/* add address */}

            <motion.div
              whileInView={{ x: 0, opacity: 1 }}
              initial={{ x: -100, opacity: 0 }}
              transition={{ duration: 2, delay: 1 }}
              className="border"
            >
              {userAddress.length > 0 ? (
                <div className="p-6 bg-white  shadow-md rounded-lg ">
                  {userAddress.map((item, i) => (
                    <div key={i}>
                      <div className="flex  justify-between ">
                        <p className="text-[12px]">Deliver to - {item.name}</p>
                        <X
                          onClick={() => handleDeleteAddress(user?.email)}
                          className="opacity-50 bg-slate-100 cursor-pointer p-1 rounded-md"
                        />
                      </div>
                      <div className="flex items-center text-[10px]">
                        <p className="text-[#00abf0] bg-gray-100 py-1 px-2 mr-2 my-2">
                          HOME{" "}
                        </p>
                        <span>
                          {item.number} {item.area}, {item.address}, {item.city}
                          , {item.division}
                        </span>
                        <Link
                          className="text-[#00abf0] ml-1"
                          href={`/update-address/${user?.email}`}
                        >
                          change
                        </Link>
                      </div>
                      <div className="border px-2 py-1 mb-2 mt-1 text-[#5a6367]  border-[#8a70ea] text-[8px] shadow-sm rounded-md">
                        <p>
                          Collect your parcel from your given address point with
                          low shipping fee
                        </p>
                      </div>
                      <p className="text-[12px]">Email to - {item?.email}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="px-10 py-4 mt-4  cursor-pointer bg-white shadow-md rounded-lg ">
                  <Link
                    href={"/add-your-address"}
                    className="flex items-center"
                  >
                    <Plus size={20} /> <p className="ml-2"> add your address</p>
                  </Link>
                </div>
              )}
            </motion.div>

            {/*fetch product */}

            <motion.div
              whileInView={{ x: 0, opacity: 1 }}
              initial={{ x: -100, opacity: 0 }}
              transition={{ duration: 2, delay: 1 }}
            >
              {cart.map((product) => (
                <div
                  className="bg-white shadow-md rounded-lg px-10 py-6 mt-6"
                  key={product._id}
                >
                  <div className="my-4 flex items-center justify-between">
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

                        <div className="flex items-center">
                          <p className="lg:text-[7px] text-[6px] border px-0.5 mt-1 text-gray-600 flex items-center">
                            <ShieldCheck size={8} className="mr-0.5" /> Verified
                            Product
                          </p>
                          <p className="lg:text-[7px] text-[6px] border px-0.5 ml-2 mt-1 text-gray-600 flex items-center">
                            <Tags size={8} className="mr-0.5" /> Best Price
                          </p>
                        </div>
                      </div>
                    </div>

                    <div>
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
                          {product.price - (product.price * 35) / 100}
                        </p>
                      </div>
                      <p className="font-medium lg:text-[10px] text-[8px]">
                        Quantity: {product.quantity}
                      </p>
                    </div>

                    <div>
                      <X
                        onClick={() => handleDeleteCart(product._id)}
                        className="opacity-50 bg-slate-100 cursor-pointer p-1 rounded-md"
                      />
                    </div>
                  </div>

                  <p className="border-0 border-t mb-4"></p>

                  <div className="flex justify-between">
                    <div className="border py-2 lg:px-6 px-2 border-[#00abf0] text-[8px] shadow-sm rounded-md pt-2">
                      <p className="text-orange-600">
                        Standard Delivery | 120 tk
                      </p>
                      <p className="pt-1">Receive Date TODO: 4 Jun </p>
                    </div>

                    <div className="flex items-center ">
                      <p className="lg:text-[10px] text-[9px]">
                        {product.quantity} Items & SubTotal{" "}
                        <span className="text-orange-500">
                          {(
                            product.quantity *
                            (product.price - product.price * 0.35)
                          ).toFixed(2)}
                        </span>
                      </p>
                      <Image
                        src={"/taka.png"}
                        width={200}
                        height={200}
                        className="lg:w-[10px] lg:h-[10px] w-[9px] h-[9px]"
                        alt="taka"
                        placeholder="blur"
                        blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* cart calculation */}

          <motion.div
            whileInView={{ x: 0, opacity: 1 }}
            initial={{ x: 100, opacity: 0 }}
            transition={{ duration: 2, delay: 1 }}
          >
            <div className="border w-[350px] lg:w-[450px] h-[300px] lg:ml-20 px-10 py-4 bg-white shadow-md rounded-lg">
              <div>
                <p className=" mt-8 pb-2 font1">Order Items</p>

                <div className="flex mt-2 font1 lg:text-sm text-[12px]">
                  <span className="flex-1">Shipping Fee</span>
                  <span>{shippingFee * cart.length}</span>
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
                  Place Order
                </Link>
              </div>
            </div>

            <Link
              href="/products"
              className={`${buttonVariants({
                variant: "link",
                size: "sm",
              })} font lg:ml-20 my-4`}
            >
              Add more items to your cart go to shopping &rarr;
            </Link>
          </motion.div>
        </div>
      </MaxWidthWrapper>
    </div>
  );
};

export default dynamic(() => Promise.resolve(CheckOutPage), { ssr: false });
// TODO Middleware auto refetch address
