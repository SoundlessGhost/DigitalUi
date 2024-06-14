"use client";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { Button, buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";

const TopTittle = () => {
  return (
    <div>
      <MaxWidthWrapper>
        <div className="bg-white py-20 mx-auto text-center flex flex-col items-center max-w-3xl overflow-hidden">
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 2, delay: 1 }}
          >
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Our marketplace for high-quality{" "}
              <span className="text-blue-600">digital assets</span>.
            </h1>
            <p className="mt-6 text-lg max-w-prose text-muted-foreground">
              Welcome to Digital Ui. Every asset on our platform is verified by
              our team to ensure our highest quality standards.
            </p>
          </motion.div>

          <motion.div
            whileInView={{ y: 0, opacity: 1 }}
            initial={{ y: 100, opacity: 0 }}
            transition={{ duration: 2, delay: 1.5 }}
            className="flex flex-col sm:flex-row gap-4 mt-6"
          >
            <Link href="/products" className={buttonVariants()}>
              Browse Trending
            </Link>
            <Button variant="ghost">Our quality promise &rarr;</Button>
          </motion.div>
        </div>
      </MaxWidthWrapper>
    </div>
  );
};

export default dynamic(() => Promise.resolve(TopTittle), { ssr: false });
