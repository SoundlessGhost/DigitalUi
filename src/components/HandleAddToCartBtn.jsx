"use client";
import useUser from "@/hooks/useUser";
import { Button, buttonVariants } from "./ui/button";
import { ReloadIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import toast from "react-hot-toast";
import useCart from "@/hooks/useCart";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";

const HandleAddToCartBtn = ({ products, quantity }) => {
  const [user] = useUser();
  const { cart, refetch, isLoading, isError, error } = useCart();
  const router = useRouter();

  const handleAddCart = async (e) => {
    if (!user) {
      // Redirect to sign-in page if user is not authenticated
      router.push("/sign-in");
      return;
    }

    if (quantity === 0) {
      toast.error("Please select a quantity");
      e.preventDefault();
      return;
    }

    const { name, price, Size, Color, images } = products;
    const AddedProductInfo = {
      user: user?.email,
      name,
      ProductFirstImage: images[0],
      ProductSecondImage: images[1],
      Size,
      Color,
      price,
      quantity,
    };

    try {
      const response = await fetch("http://localhost:3000/api/carts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(AddedProductInfo),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      toast.success(`${quantity} item(s) have been added to your cart`);
      refetch();
    } catch (error) {
      toast.error(error.message || "Failed to add item to cart");
    }
  };

  return (
    <div className="flex items-center">
      <Link
        href={quantity === 0 ? "#" : "/checkout"}
        onClick={(e) => {
          if (!user) {
            e.preventDefault();
            router.push("/sign-in");
            return;
          }
          handleAddCart(e);
        }}
        className={`${buttonVariants()} ${
          quantity === 0 ? "opacity-50 cursor-not-allowed" : ""
        }`}
        aria-disabled={quantity === 0}
      >
        Buy Now
      </Link>
      {isLoading ? (
        <p disabled className="flex items-center">
          <ReloadIcon className="mr-2 h-4 w-4 animate-spin ml-4" />
          Please wait
        </p>
      ) : (
        <Button onClick={handleAddCart} variant="ghost" className="ml-4">
          Add to Cart
        </Button>
      )}
    </div>
  );
};

export default dynamic(() => Promise.resolve(HandleAddToCartBtn), { ssr: false });
