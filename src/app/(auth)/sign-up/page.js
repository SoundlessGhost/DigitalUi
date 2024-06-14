"use client";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useForm } from "react-hook-form";

import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { app } from "../../../../firebase.config";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";

const SignUpPage = () => {
  const auth = getAuth(app);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const { img, name, email, password } = data;

    try {
      // Sign In With Firebase

      await createUserWithEmailAndPassword(auth, email, password);

      // Update Name And Photo with Firebase

      await updateProfile(auth.currentUser, {
        displayName: name,
        photoURL: img,
      });

      const userInformation = {
        name,
        email,
        password,
      };

      // After Created User, Data Save to MongoDB

      const res = await fetch("/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userInformation),
      });

      if (!res.ok) {
        throw new Error("Failed to Create User");
      } else {
        await res.json();
        router.push("/");
      }
    } catch (error) {
      console.error("Error during user creation:", error);
      toast.error(error.message || "Failed to Create User");
    }
  };

  return (
    <div className="container relative flex flex-col pt-20 justify-center items-center lg:px-0">
      <div className="w-full mx-auto flex flex-col justify-center space-y-6 sm:w-[350px] ">
        {/* Image And Text One */}

        <div className="flex flex-col items-center ">
          <Image
            src="/eagle.png"
            width={40}
            height={40}
            alt="Picture of the eagle"
            placeholder="blur"
            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA"
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

        {/* Form */}

        <div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <Label htmlFor="name">Name</Label>
              <Input
                {...register("name", { required: true })}
                className="mt-2"
                placeholder="Your Name"
              />
              <p className="font mt-1 text-[10px] text-red-600">
                {errors.name?.type === "required" && (
                  <span role="alert">name is required</span>
                )}
              </p>
            </div>

            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                {...register("email", { required: true })}
                className="mt-2"
                placeholder="You@example.com"
              />
              <p className="font mt-1 text-[10px] text-red-600">
                {errors.email?.type === "required" && (
                  <span role="alert">
                    email is required | you can not leave empty
                  </span>
                )}
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

            <div className="mt-4">
              <Label htmlFor="img">Your Images Url</Label>
              <Input
                {...register("img", { required: true })}
                className="mt-2"
                placeholder="images url"
              />
              <p className="font mt-1 text-[10px] text-red-600">
                {errors.img?.type === "required" && (
                  <span role="alert">
                    please provide your profile image url
                  </span>
                )}
              </p>
            </div>
            <Button className="w-full mt-6 font">Sign up</Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default dynamic(() => Promise.resolve(SignUpPage), { ssr: false });
