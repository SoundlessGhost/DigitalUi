import { PRODUCT_CATEGORIES } from "@/config";
import { Menu, X , LogOutIcon} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import toast from "react-hot-toast";
import useUser from "@/hooks/useUser";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Button, buttonVariants } from "./ui/button";
import { getAuth, signOut } from "@firebase/auth";
import { app } from "../../firebase.config";

const MobileNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const auth = getAuth(app);
  const [user] = useUser();

  const handleLogOut = () => {
    signOut(auth)
      .then(() => {
        toast.success("user logOut successfully");
      })
      .catch((e) => {
        toast.error(e.message);
      });
  };

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const closeOnCurrent = (href) => {
    if (pathname === href) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (isOpen) document.body.classList.add("overflow-hidden");
    else document.body.classList.remove("overflow-hidden");
  }, [isOpen]);

  if (!isOpen)
    return (
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="lg:hidden relative -m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
      >
        <Menu className="h-6 w-6" aria-hidden="true" />
      </button>
    );

  return (
    <div>
      <div className="relative z-40 lg:hidden">
        <div className="fixed inset-0 bg-black bg-opacity-25" />
      </div>

      <div className="fixed overflow-y-scroll overscroll-y-none inset-0 z-40 flex">
        <div className="w-4/5">
          <div className="relative flex w-full max-w-sm flex-col overflow-y-auto bg-white pb-12 shadow-xl">
            <div className="flex px-4 pb-2 pt-5">
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="relative -m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
              >
                <X className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>

            <div className="mt-2">
              <ul>
                {PRODUCT_CATEGORIES.map((category) => (
                  <li
                    key={category.label}
                    className="space-y-10 px-4 pb-8 pt-10"
                  >
                    <div className="border-b border-gray-200">
                      <div className="-mb-px flex">
                        <p className="border-transparent text-gray-900 flex-1 whitespace-nowrap border-b-2 py-4 text-base font-medium">
                          {category.label}
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-y-10 gap-x-4">
                      {category.featured.map((item) => (
                        <div key={item.name} className="group relative text-sm">
                          <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75">
                            <Image
                              fill
                              src={item.imageSrc}
                              alt="product category image"
                              className="object-cover object-center"
                            />
                          </div>
                          <Link
                            href={item.href}
                            className="mt-6 block font-medium text-gray-900"
                          >
                            {item.name}
                          </Link>
                        </div>
                      ))}
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {user ? (
              <Button
              onClick={handleLogOut}
              variant="ghost"
              className="font -m-2 flex items-center p-2 font-medium text-gray-900"
            >
              Log out <LogOutIcon size={15} className="ml-1" />
            </Button>
            ) : (
              <div className=" border-t block border-gray-200 px-4 py-6">
                <div
                  className={`${buttonVariants({
                    variant: "link",
                  })} flow-root font`}
                >
                  <Link
                    onClick={() => closeOnCurrent("/sign-in")}
                    href="/sign-in"
                    className="-m-2 block p-2 font-medium text-gray-900"
                  >
                    Sign in &rarr;
                  </Link>
                </div>
                <div
                  className={`${buttonVariants({
                    variant: "link",
                  })} flow-root font`}
                >
                  <Link
                    onClick={() => closeOnCurrent("/sign-up")}
                    href="/sign-up"
                    className="-m-2 block p-2 font-medium text-gray-900"
                  >
                    Sign up &rarr;
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileNav;
