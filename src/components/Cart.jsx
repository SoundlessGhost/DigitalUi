import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { buttonVariants } from "./ui/button";
import Link from "next/link";
import Image from "next/image";
import { FaOpencart } from "react-icons/fa6";
const Cart = () => {
  const itemCount = 0;

  return (
    <Sheet>
      <SheetTrigger asChild>
        <FaOpencart size={20} className="ml-4 cursor-pointer " />
      </SheetTrigger>
      <SheetContent>
        <SheetTitle className="text-sm text-center font">Cart (0)</SheetTitle>
        {itemCount > 0 ? (
          <>
            <p className="border-0 border-b mt-8 pb-2 font">cart items</p>
            <div className="flex mt-2 font text-sm">
              <span className="flex-1">Shipping</span>
              <span>Fee</span>
            </div>

            <div className="flex mt-2 font text-sm">
              <span className="flex-1">Transaction Fee</span>
              <span>1</span>
            </div>

            <div className="flex mt-2 font text-sm">
              <span className="flex-1">Total</span>
              <span>1</span>
            </div>

            <Link
              className={`${buttonVariants()} w-full mt-6`}
              href="/checkout"
            >
              Continue to checkout
            </Link>
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

export default Cart;
