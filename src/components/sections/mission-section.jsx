import Image from "next/image";
import { Button } from "@/components/ui/button";
import { brands } from "@/data/brands";
import { productCategories } from "@/data/products";

export default function MissionSection() {
  return (
    <section className="py-12 sm:py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          
          {/* Left side - Brand logos grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {brands.slice(0, 6).map((brand) => (
              <div key={brand?.id} className="bg-white p-4 rounded-lg shadow-sm">
                <Image
                  src={brand?.logo || "/cement1.png"}
                  alt={brand?.name}
                  width={120}
                  height={60}
                  className="w-full h-auto object-contain"
                />
              </div>
            ))}

            <div className="bg-white p-1 rounded-lg shadow-sm col-span-1">
              <Image
                src="/cement5.jpg"
                alt="Building materials showcase"
                width={300}
                height={80}
                className="w-full h-auto object-contain"
              />
            </div>

            <div className="bg-white p-1 rounded-lg shadow-sm">
              <Image
                src="/cement2.png"
                alt="Product showcase 1"
                width={120}
                height={60}
                className="w-full h-auto object-contain"
              />
            </div>

            <div className="bg-white p-1 rounded-lg shadow-sm col-span-1 sm:col-span-2">
              <Image
                src="/cement4.jpg"
                alt="Product showcase 2"
                width={240}
                height={60}
                className="w-full h-auto object-contain"
              />
            </div>
          </div>

          {/* Right side - Mission content */}
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold mb-4 leading-snug">
              Our mission is to <span className="text-orange-500">Build your dream stronger</span>
            </h2>

            <p className="text-gray-600 mb-4 text-sm sm:text-base">
              Make your foundation strong with your trusted partner and authorized dealer of India's top brands in
              construction materials like UltraTech, Dalmia, Jindal, TATA Tiscon, Nuvoco and more
            </p>

            <p className="text-gray-600 mb-6 text-sm sm:text-base">
              And we are Local. Just a call away from you
            </p>

            {/* Product category buttons */}
            <div className="grid grid-cols-2 gap-4">
              {productCategories.map((category) => (
                <Button
                  key={category.id}
                  variant="outline"
                  className="bg-blue-50 text-blue-600 border-blue-200 hover:bg-blue-100 text-xs sm:text-sm"
                >
                  {category.name}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
