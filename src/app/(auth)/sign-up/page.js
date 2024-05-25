"use client";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useForm } from "react-hook-form";

import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { app } from "../../../../firebase.config";
import toast from "react-hot-toast";

const SignUpPage = () => {
  const auth = getAuth(app);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const { email, password } = data;
    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        toast.success("user created successfully");
      })
      .catch((e) => {
        toast.error(e.message);
      });
  };

  return (
    <div className="container relative flex flex-col pt-20 justify-center items-center lg:px-0">
      <div className="w-full mx-auto flex flex-col justify-center space-y-6 sm:w-[350px] ">
        <div className="flex flex-col items-center ">
          <Image
            src="/eagle.png"
            width={40}
            height={40}
            alt="Picture of the eagle"
          />
          <h1 className="text-2xl font-bold font ">Create your account</h1>
          <Link
            className={buttonVariants({
              variant: "link",
            })}
            href="/sign-in"
          >
            Already have an account? sign in
            <ArrowRight className="w-3 ml-0.5" />
          </Link>
        </div>

        <div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                {...register("email", { required: true })}
                className="mt-2"
                placeholder="You@example.com"
              />
              <p className="font text-[12px] mt-2 text-red-600">
                {errors.email?.message}
              </p>
            </div>

            <div className="mt-4">
              <Label htmlFor="password">Password</Label>
              <Input
                {...register("password", {
                  required: true,
                  minLength: {
                    value: 8,
                    message: "password must be 8 characters",
                  },
                })}
                className="mt-2"
                placeholder="Password"
              />
              <p className="font text-[12px] mt-2 text-red-600">
                {errors.password?.message}
              </p>
            </div>
            <Button className="w-full mt-6 font">Sign up</Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
