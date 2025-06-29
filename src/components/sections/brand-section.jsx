
"use client";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

const brands = [
  { id: 1, src: "/brands/cement6.png", alt: "Maha Cement" },
  { id: 2, src: "/brands/cement7.jpg", alt: "Ultratech" },
  { id: 3, src: "/brands/cement8.png", alt: "Ramco" },
  { id: 4, src: "/brands/cement9.png", alt: "Raasi Gold" },
  { id: 5, src: "/brands/cement10.png", alt: "Iuvo" },
  { id: 6, src: "/brands/ambuja.jpg", alt: "Ambuja" },
  { id: 7, src: "/brands/ultratech.png", alt: "Ultratech" },
  { id: 8, src: "/brands/cement9.png", alt: "Raasi Gold" },
];

export default function BrandsSection() {
  return (
    <section className="py-12 text-center relative">
      <h3 className="text-sm uppercase text-gray-500 mb-1">Brands</h3>
      <h2 className="text-2xl md:text-3xl font-bold">
        Our <span className="text-orange-500">Trusted Brands</span>
      </h2>

      <div className="mt-8 max-w-6xl mx-auto px-4 relative">
        <Swiper
          modules={[Navigation, Autoplay]}
          spaceBetween={20}
          slidesPerView={2}
          navigation
          autoplay={{ delay: 2500, disableOnInteraction: false }}
          breakpoints={{
            640: { slidesPerView: 3 },
            768: { slidesPerView: 4 },
            1024: { slidesPerView: 5 },
          }}
          className="relative"
        >
          {brands.map((brand) => (
            <SwiperSlide key={brand.id}>
              <div className="bg-white shadow-md p-4 flex items-center justify-center h-28">
                <Image src={brand.src} alt={brand.alt} width={120} height={60} objectFit="contain" />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Arrow Styling inside component */}
        <style jsx global>{`
          .swiper-button-next,
          .swiper-button-prev {
            width: 24px;
            height: 24px;
            color: black;
          }
          .swiper-button-next::after,
          .swiper-button-prev::after {
            font-size: 16px;
          }
        `}</style>
      </div>
    </section>
  );
}
