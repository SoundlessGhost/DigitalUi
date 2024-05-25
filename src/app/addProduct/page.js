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
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const { product, category, price, productImg, productImg1, email } = data;
    const createdProduct = {
      email,
      product,
      category,
      price,
      images: [productImg, productImg1],
    };

    fetch("http://localhost:3000/api/products", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(createdProduct),
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
    toast.success("product successfully created");
  };
  return (
    <div>
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
              <p className="font text-[12px] mt-2 text-red-600">
                {errors.email?.message}
              </p>
            </div>

            <div>
              <Label htmlFor="product">Name</Label>
              <Input
                {...register("product", { required: true })}
                className="mt-2"
                placeholder="Product name"
              />
              <p className="font text-[12px] mt-2 text-red-600">
                {errors.product?.message}
              </p>
            </div>

            <div className="mt-4">
              <Label htmlFor="category">Category</Label>
              <Input
                {...register("category", { required: true })}
                className="mt-2"
                placeholder="Category"
              />
              <p className="font text-[12px] mt-2 text-red-600">
                {errors.category?.message}
              </p>
            </div>

            <div className="mt-4">
              <Label htmlFor="price">Price</Label>
              <Input
                {...register("price", { required: true })}
                className="mt-2"
                placeholder="Price"
              />
              <p className="font text-[12px] mt-2 text-red-600">
                {errors.price?.message}
              </p>
            </div>

            <div className="mt-4">
              <Label htmlFor="productImg">ProductImg</Label>
              <Input
                {...register("productImg", { required: true })}
                className="mt-2"
                placeholder="ProductImg"
              />
              <p className="font text-[12px] mt-2 text-red-600">
                {errors.productImg?.message}
              </p>
            </div>
            <div className="mt-4">
              <Label htmlFor="productImg1">ProductImg 1</Label>
              <Input
                {...register("productImg1", { required: true })}
                className="mt-2"
                placeholder="ProductImg"
              />
              <p className="font text-[12px] mt-2 text-red-600">
                {errors.productImg1?.message}
              </p>
            </div>
            <Button className="w-full mt-6 font">Continue to add</Button>
          </form>
        </div>
      </MaxWidthWrapper>
    </div>
  );
};

export default AddProductPage;
