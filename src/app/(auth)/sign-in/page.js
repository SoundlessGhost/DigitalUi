"use client";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useForm } from "react-hook-form";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { app } from "../../../../firebase.config";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import dynamic from "next/dynamic";

const SignInPage = () => {
  const auth = getAuth(app);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const { email, password } = data;

    try {
      // Sign In With Firebase

      const signInRes = await signInWithEmailAndPassword(auth, email, password);

      if (signInRes?.user?.email) {
        router.push("/");
      }

      // Create JWT Token

      if (auth.currentUser && auth.currentUser.email) {
        const res = await fetch("/api/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        });

        if (!res.ok) {
          const error = await res.json();
          throw new Error(error.message || "Failed to login");
        } else {
          const response = await res.json();
          const token = response.token;
          Cookies.set("token", token, {
            expires: 1,
            secure: true,
            sameSite: "strict",
          });
        }
      } else {
        Cookies.remove("token");
        router.push("/");
      }
    } catch (error) {
      console.error("Error during login process:", error);
      toast.error(error.message);
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
          <h1 className="text-2xl font-bold font ">Welcome Back</h1>
          <Link
            className={buttonVariants({
              variant: "link",
            })}
            href="/sign-up"
          >
            Don&apos;t have an account? sign up
            <ArrowRight className="w-3 ml-0.5" />
          </Link>
        </div>

        {/* Form */}

        <div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                {...register("email", { required: true })}
                className="mt-2"
                placeholder="You@example.com"
              />
              <p className="font mt-1 text-[10px] text-red-600">
                {errors.email?.type === "required" && (
                  <span role="alert">email is required</span>
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
            <Button className="w-full mt-6 font">Sign in</Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default dynamic(() => Promise.resolve(SignInPage), { ssr: false });
// TODO edit profile
