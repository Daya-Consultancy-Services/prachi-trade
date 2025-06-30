"use client";
import Link from "next/link";
import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header";
import BrandsSection from "@/components/sections/brand-section";

export default function tilepipe() {
  return (
    <div>
    <Header/>
    
    <section className="py-12 bg-white text-center">
       <div>
        <p className="text-gray-700 mb-4">
          At Prachi trades, we are more than just suppliers—we are the trusted foundation behind your most ambitious visions in construction, architecture, and design. With deep roots in the industry, we specialize in delivering premium building essentials—ranging from high-strength rods and structural steel to an exquisite selection of marble, hard stone, and finely graded sand.
        </p>
    </div> 
    <h6>PRODUCTS</h6>
      <h2 className="text-3xl font-bold mb-4">
        Our <span className="text-orange-600">New Products</span>
      </h2>

      <div className="flex justify-center space-x-4 overflow-x-auto p-4">
        {/* Steel Card */}
        <div className="bg-white border rounded-xl shadow-md  w-72 min-w-[270px] relative">
          <img src="/tile1.png" alt="Steel" className="h-60 w-full mx-auto mb-5" />
          <h3 className="text-xl font-bold mb-5">Tiles</h3>
          <p className="text-sm mb-5">
            Jindal Panther 550D, JSW steel 550D, SMC 550D, SEL 500D, Tata Tiscon 550D
          </p>
          <button className="bg-orange-600 text-white py-2 px-4 rounded-full font-bold mb-5">
             <Link href="sanitarypipe" className="block px-4 py-2">
            VIEW PRODUCTS
            </Link>
          </button>
        </div>

        {/* Basin Card */}
        <div className="bg-white border rounded-xl shadow-md w-72 min-w-[270px] relative">
          <img src="/basin.png" alt="Cement" className="h-60 w-full mx-auto mb-5" />
          <h3 className="text-xl font-bold mb-5">Basin</h3>
          <p className="text-sm mb-5">
            DALMIA, Nuvoco, Ultratech, Maha Shakti, Raasi, Ramco, PPC, PSC
          </p>
          <button className="bg-orange-600 text-white py-2 px-4 rounded-full font-bold mb-5">
             <Link href="sanitarypipe" className="block px-4 py-2">
            VIEW PRODUCTS
            </Link>
          </button>
        </div>

        {/* pan Card */}
        <div className="bg-white border rounded-xl shadow-md  w-72 min-w-[270px] relative">
          <img src="/pan.png" alt="RMC" className="h-60 w-full mx-auto mb-5" />
          <h3 className="text-xl font-bold mb-5">Pan</h3>
          <p className="text-sm mb-5">
            Ultratech, DALMIA, Nuvoco, Ultratech, Maha Shakti, Raasi, Ramco
          </p>
          <button className="bg-orange-600 text-white py-2 px-4 rounded-full font-bold mb-5">
             <Link href="sanitarypipe" className="block px-4 py-2">
            VIEW PRODUCTS
            </Link>
          </button>
        </div>

        {/* Roofing Sheets Card */}
        <div className="bg-white border rounded-xl shadow-md  w-72 min-w-[270px] relative">
          <img src="/roofing sheet1.png" alt="Roofing Sheets" className="h-60 w-full mx-auto mb-5" />
          <h3 className="text-xl font-bold mb-5">Roofing Sheets</h3>
          <p className="text-sm mb-5">
            Ultratech, DALMIA, Nuvoco, Ultratech, Maha Shakti, Raasi, Ramco
          </p>
          <button className="bg-orange-600 text-white py-2 px-4 rounded-full font-bold mb-5">
             <Link href="sanitarypipe" className="block px-4 py-2">
            VIEW PRODUCTS
            </Link>
          </button>
        </div>
      </div>
     
  
     <div>
        <p className="text-gray-700 mb-4">
          At Prachi trades, we are more than just suppliers—we are the trusted foundation behind your most ambitious visions in construction, architecture, and design. With deep roots in the industry, we specialize in delivering premium building essentials—ranging from high-strength rods and structural steel to an exquisite selection of marble, hard stone, and finely graded sand.
        </p>
    </div>
      </section>
      <BrandsSection/>
     <Footer/>
     </div>
  );
}
