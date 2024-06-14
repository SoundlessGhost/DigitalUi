"use client";
import useUser from "@/hooks/useUser";
import Link from "next/link";
import React from "react";
import dynamic from "next/dynamic";
import useSpecificUserAddress from "@/hooks/useSpecificUserAddress";
import { buttonVariants } from "@/components/ui/button";

const UserDetails = () => {
  const [user] = useUser();
  const { userAddress = [] } = useSpecificUserAddress();

  return (
    <div className="">
      <h1 className="my-3 text-2xl font-semibold">Manage My Account</h1>
      <div className="flex items-center font">
        <div className="bg-white p-6 pr-32 rounded-md">
          <div className="flex items-center">
            Personal Profile |{" "}
            <Link
              className="text-[#00abf0] ml-1"
              href={`/update-address/${user?.email}`}
            >
              edit
            </Link>
          </div>
          <p className="mt-4 font-sm text-gray-500">{user.displayName}</p>
          <p className="my-2">{user.email}</p>

          <Link
            href={"https://www.youtube.com/results?search_query=mr+beast"}
            target="_blank"
            className={`${buttonVariants({
              variant: "link",
            })} text-[#8a70ea] shadow-sm`}
          >
            Subscribe
          </Link>
        </div>

        <div className="bg-white p-5 pr-32 rounded-md ml-5">
          <div className="flex items-center">
            Personal Address |{" "}
            <Link
              className="text-[#00abf0] ml-1"
              href={`/update-address/${user?.email}`}
            >
              edit
            </Link>
          </div>
          <p className="text-[10px] my-4 text-gray-500">DELIVERY ADDRESS</p>
          <div>
            {userAddress.length > 0 ? (
              <div>
                {userAddress.map((item, i) => (
                  <div key={i}>
                    <p className="text-[12px]">{item.name}</p>
                    <div className="flex items-center text-[10px] mt-2">
                      <span>
                        {" "}
                        {item.area}, {item.address}, {item.city},{" "}
                        {item.division}
                      </span>
                    </div>
                    <span className="text-[10px]">{item.number}</span>
                    <p className="text-[12px]">{item?.email}</p>
                  </div>
                ))}
              </div>
            ) : (
              <Link
                href={"/add-your-address"}
                className={`${buttonVariants({
                  variant: "link",
                })}`}
              >
                <p> add your address</p>
              </Link>
            )}
          </div>
        </div>
      </div>

      <div className="px-10 py-4 mt-4  cursor-pointer bg-white shadow-md rounded-lg mb-4 border">
        <p className="ml-2"> Recent Orders</p>
        {/* TODO Recent Orders */}
      </div>
    </div>
  );
};

export default dynamic(() => Promise.resolve(UserDetails), {
  ssr: false,
});
