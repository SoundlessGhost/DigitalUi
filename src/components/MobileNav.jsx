import { PRODUCT_CATEGORIES } from "@/config";
import {
  Menu,
  X,
  User,
  Settings,
  CreditCard,
  UserPlus,
  Plus,
  LogOut,
  LogIn,
  UserRoundPlus,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import toast from "react-hot-toast";
import useUser from "@/hooks/useUser";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getAuth, signOut } from "@firebase/auth";
import { app } from "../../firebase.config";

const getUser = async () => {
  try {
    const res = await fetch("http://localhost:3000/api/users", {
      cache: "no-store",
    });
    if (!res.ok) {
      throw new Error("Fetching error: " + res.statusText);
    }
    const FetchValue = await res.json();
    return FetchValue;
  } catch (error) {
    console.error("Error fetching data:", error.message);
    return [];
  }
};

const MobileNav = () => {
  const [currentUsers, setCurrentUsers] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const auth = getAuth(app);
  const [user] = useUser();
  const router = useRouter();

  // Filter user from database

  useEffect(() => {
    const fetchData = async () => {
      const FetchValue = await getUser();

      // Ensure FetchValue is iterable (an array in this case)
      if (Array.isArray(FetchValue)) {
        const filteredUser = FetchValue.filter(
          (FetchUser) => FetchUser?.email === user?.email
        );
        setCurrentUsers(filteredUser);
      } else {
        console.error("FetchValue is not an array or iterable", FetchValue);
      }
    };

    fetchData();
  }, [user]);

  // Window Close Or Open

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
        className="lg:hidden relative -m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-450"
      >
        <Menu className="h-6 w-6" aria-hidden="true" />
      </button>
    );

  // Handle Logout Function

  const handleLogOut = () => {
    signOut(auth)
      .then(() => {
        router.push("/");
        closeOnCurrent("/");
      })
      .catch((e) => {
        toast.error(e.message);
      });
  };

  return (
    <div>
      <div className="relative z-45 lg:hidden">
        <div className="fixed inset-0 bg-black bg-opacity-25" />
      </div>

      <div className="fixed overflow-y-scroll overscroll-y-none inset-0 z-45 flex">
        <div className="w-4/5">
          <div className="relative flex w-full max-w-sm flex-col overflow-y-auto bg-white pb-12 shadow-xl">
            {/* Close Button */}

            <div className="flex px-4 pb-2 pt-5">
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="relative -ml-4 -mt-2 inline-flex items-center justify-center rounded-md p-2 text-gray-450"
              >
                <X className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>

            {/* User Image and Details */}

            <div>
              {user ? (
                <>
                  <div className="flex items-center">
                    <div>
                      {user?.image ? (
                        <Image
                          width={50}
                          height={50}
                          src={user?.image}
                          alt="User Image"
                          className="rounded-full"
                        />
                      ) : (
                        <Image
                          width={50}
                          height={50}
                          src={"/user.jpg"}
                          alt="User Image"
                          className="rounded-full"
                        />
                      )}
                    </div>

                    <div>
                      {currentUsers.map((currentUser, i) => (
                        <div key={i}>
                          <p className="text-sm">
                            {currentUser.name
                              ? currentUser.name
                              : "Unknown Name"}
                          </p>
                          <p className="text-[12px] text-gray-500">
                            {currentUser.email}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="ml-6">
                    <div className="flex items-center my-4 cursor-pointer">
                      <User className="mr-2 h-4 w-4" />
                      <span>Profile</span>
                    </div>
                    <div className="flex items-center my-4 cursor-pointer">
                      <CreditCard className="mr-2 h-4 w-4" />
                      <span>Billing</span>
                    </div>
                    <div className="flex items-center my-4 cursor-pointer">
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Settings</span>
                    </div>
                    <div className="flex items-center my-4 cursor-pointer">
                      <UserPlus className="mr-2 h-4 w-4" />
                      <span>Invite users</span>
                    </div>
                    <div className="flex items-center my-4 cursor-pointer">
                      <Plus className="mr-2 h-4 w-4" />
                      <span>New Team</span>
                    </div>
                    <div
                      onClick={handleLogOut}
                      className="flex items-center my-4 cursor-pointer"
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Log out</span>
                    </div>
                  </div>
                </>
              ) : (
                <div className="ml-6">
                  <div
                    onClick={() => closeOnCurrent("/sign-in")}
                    className="flex items-center my-4 cursor-pointer"
                  >
                    <LogIn className="mr-2 h-4 w-4" />
                    <Link href={"sign-in"}>LogIn</Link>
                  </div>
                  <div
                    onClick={() => closeOnCurrent("/sign-up")}
                    className="flex items-center my-4 cursor-pointer"
                  >
                    <UserRoundPlus className="mr-2 h-4 w-4" />
                    <Link href={"/sign-up"}>Create Account</Link>
                  </div>
                </div>
              )}
            </div>

            {/* Product fetch  */}

            <div>
              <ul>
                {PRODUCT_CATEGORIES.map((category) => (
                  <li
                    key={category.label}
                    className="space-y-10 px-4 pb-8 pt-6"
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

            {/*TODO Change Product */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileNav;
