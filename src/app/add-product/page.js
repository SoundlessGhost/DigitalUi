"use client";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const AddProductPage = () => {
  const {
    register,
    handleSubmit,
  } = useForm();

  const onSubmit = (data) => {
    const {
      product,
      Brand,
      Color,
      Size,
      price,
      productImg,
      productImg1,
      email,
    } = data;

    const ProductInfo = {
      email,
      product,
      Brand,
      Color,
      Size,
      price,
      images: [productImg, productImg1],
    };

    fetch("http://localhost:3000/api/products", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(ProductInfo),
    }).then((res) => res.json());
    toast.success("product successfully created");
  };
  return (
    <div className="bg-white py-10">
      <MaxWidthWrapper>
        <h1 className="text-center my-2 font text-2xl text-zinc-600">
          &darr; Add Your Product &darr;
        </h1>

        <div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                {...register("email", { required: true })}
                className="mt-2"
                placeholder="your email"
              />
            </div>

            <div>
              <Label htmlFor="product">Name</Label>
              <Input
                {...register("product", { required: true })}
                className="mt-2"
                placeholder="Product name"
              />
            </div>

            <div className="mt-4">
              <Label htmlFor="Color">Color Family</Label>
              <Input
                {...register("Color", { required: true })}
                className="mt-2"
                placeholder="Color"
              />
            </div>

            <div className="mt-4">
              <Label htmlFor="Brand">Brand</Label>
              <Input
                {...register("Brand", { required: true })}
                className="mt-2"
                placeholder="Brand"
              />
            </div>

            <div className="mt-4">
              <Label htmlFor="Size">Size</Label>
              <Input
                {...register("Size", { required: true })}
                className="mt-2"
                placeholder="Size"
              />
            </div>

            <div className="mt-4">
              <Label htmlFor="price">Price</Label>
              <Input
                {...register("price", { required: true })}
                className="mt-2"
                placeholder="Price"
              />
            </div>

            <div className="mt-4">
              <Label htmlFor="productImg">ProductImg</Label>
              <Input
                {...register("productImg", { required: true })}
                className="mt-2"
                placeholder="ProductImg"
              />
            </div>

            <div className="mt-4">
              <Label htmlFor="productImg1">ProductImg 1</Label>
              <Input
                {...register("productImg1", { required: true })}
                className="mt-2"
                placeholder="ProductImg"
              />
            </div>
            <Button className="w-full mt-6 font">Continue to add</Button>
          </form>
        </div>
      </MaxWidthWrapper>
    </div>
  );
};

export default AddProductPage;
