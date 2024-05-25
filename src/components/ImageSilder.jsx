"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import useProduct from "@/hooks/useProduct";
import Image from "next/image";

export default function ImageSlider() {
  const [productData] = useProduct();
  return (
    <div className="group relative bg-zinc-100 aspect-square overflow-hidden rounded-xl">
      <Swiper
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        modules={[Autoplay]}
        loop={true}
        className="mySwiper"
      >
        {productData.map((product, i) => (
          <SwiperSlide key={i} className="-z-10 relative h-full w-full">
            <Image
              fill
              loading="eager"
              className="-z-10 h-full w-full object-cover object-center"
              src={product.images[0]}
              alt="Product image"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
