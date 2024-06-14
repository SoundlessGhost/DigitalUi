"use client";
/* eslint-disable react/no-unescaped-entities */
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useUser from "@/hooks/useUser";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm, Controller } from "react-hook-form";
import toast from "react-hot-toast";

const AddressPage = () => {
  const router = useRouter();
  const [user] = useUser();
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm();

  const onSubmit = (data) => {
    const { name, address, number, division, city, area } = data;

    const AddressInformation = {
      name,
      address,
      number,
      division,
      city,
      area,
      email: user?.email,
    };
    fetch("https://digital-ui-nu.vercel.app/api/user-address", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(AddressInformation),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to save address");
        }
        return res.json();
      })
      .then(() => {
        toast.success("Successfully saved your address");
        router.push("/checkout");
      })
      .catch(() => {
        toast.error("Failed to save your address");
      });
  };

  return (
    <div className=" overflow-hidden">
      <MaxWidthWrapper>
        <div className="my-10 font">
          <p className="text-sm mb-6">Add your billing address</p>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="lg:flex items-center mb-6">
              <div>
                <Label>Your Full Name</Label>
                <Input
                  {...register("name", { required: true })}
                  className="lg:w-96 w-[350px]"
                  placeholder="Your name"
                />
                <p className="font mt-1 text-[10px] text-red-600">
                  {errors.name?.type === "required" && (
                    <span role="alert">
                      Name is required | You can't leave empty
                    </span>
                  )}
                </p>
              </div>

              <div className="lg:ml-10">
                <Label>Address</Label>
                <Input
                  {...register("address", { required: true })}
                  className="lg:w-96 w-[350px]"
                  placeholder="House no / street / area"
                />
                <p className="font mt-1 text-[10px] text-red-600">
                  {errors.address?.type === "required" && (
                    <span role="alert">
                      Address is required | Provide your address
                    </span>
                  )}
                </p>
              </div>
            </div>

            <div className="lg:flex items-center mb-6">
              <div>
                <Label>Mobile Number</Label>
                <Input
                  {...register("number", { required: true })}
                  className="lg:w-96 w-[350px]"
                  placeholder="Valid mobile number"
                />
                <p className="font mt-1 text-[10px] text-red-600">
                  {errors.number?.type === "required" && (
                    <span role="alert">
                      Mobile Number is required | You can't leave empty
                    </span>
                  )}
                </p>
              </div>

              <div className="lg:ml-10">
                <Label>Division</Label>
                <Controller
                  name="division"
                  control={control}
                  defaultValue=""
                  rules={{ required: true }}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className="lg:w-[384px] w-[350px]">
                        <SelectValue placeholder="Please choose your division" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="Dhaka">Dhaka</SelectItem>
                          <SelectItem value="Chittagong">Chittagong</SelectItem>
                          <SelectItem value="Rajshahi">Rajshahi</SelectItem>
                          <SelectItem value="Khulna">Khulna</SelectItem>
                          <SelectItem value="Sylhet">Sylhet </SelectItem>
                          <SelectItem value="Barisal">Barisal </SelectItem>
                          <SelectItem value="Rangpur">Rangpur </SelectItem>
                          <SelectItem value="Mymensingh">Mymensingh</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  )}
                />
                <p className="font mt-1 text-[10px] text-red-600">
                  {errors.division?.type === "required" && (
                    <span role="alert">
                      Division is required | Select your division
                    </span>
                  )}
                </p>
              </div>
            </div>

            <div className="lg:flex items-center mb-6">
              <div>
                <Label>City</Label>
                <Input
                  {...register("city", { required: true })}
                  className="lg:w-96 w-[350px]"
                  placeholder="Input your city"
                />
                <p className="font mt-1 text-[10px] text-red-600">
                  {errors.city?.type === "required" && (
                    <span role="alert">
                      City is required | Provide your city
                    </span>
                  )}
                </p>
              </div>

              <div className="lg:ml-10">
                <Label>Area</Label>
                <Input
                  {...register("area", { required: true })}
                  className="lg:w-96 w-[350px]"
                  placeholder="Input your area"
                />
                <p className="font mt-1 text-[10px] text-red-600">
                  {errors.area?.type === "required" && (
                    <span role="alert">
                      Area is required | Provide your area
                    </span>
                  )}
                </p>
              </div>
            </div>
            <Button className="mt-6 w-40 font">Save</Button>
          </form>
        </div>
      </MaxWidthWrapper>
    </div>
  );
};

export default dynamic(() => Promise.resolve(AddressPage), { ssr: false });
