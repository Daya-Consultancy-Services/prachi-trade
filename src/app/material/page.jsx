"use client";
import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header";
import Image from "next/image";

export default function CementPage() {
  return (
    <div>
        <Header/>
   
      
      {/* Header with Background Image */}
      {/* <div
        className="bg-cover bg-center text-white py-16 px-4"
        style={{ backgroundImage: "url('/cement6.jpg')" }} // Place header image in public folder
      >
        
        
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            THE BEST CEMENT DEALER TO SAFEGUARDING YOUR CONSTRUCTIONAL SOLUTION
          </h1>
          <p className="max-w-2xl mx-auto">
            When building your ideal home, we are here as the best cement dealer
            in India to save your building. Our motto is getting the tough stuff
            and helping you stand up firm.
          </p>
        </div>
      </div> */}
       <section className="relative h-96 flex items-center justify-center overflow-hidden">
      {/* Background image with blur effect */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-orange-300"
        
      ></div>
      
      {/* Dark overlay to improve text readability */}
      <div className="absolute inset-0 bg-black opacity-30"></div> 

      {/* Text content - remains clear */}
      <div className="relative text-white max-w-5xl text-center px-4">
        <h1 className="text-lg md:text-4xl font-bold mb-4">
          THE BEST CEMENT DEALER TO SAFEGUARDING YOUR CONSTRUCTIONAL SOLUTION
        </h1>
        <p className="text-lg md:text-sm opacity-90">
          When building your ideal home, we are here as the best cement dealer
            in India to save your building. Our motto is getting the tough stuff
            and helping you stand up firm.
        </p>
      </div>
    </section>

      {/* Cement Products Section */}
    <div className="min-h-screen bg-white">

      {/* UltraTech Cement - Full Width */}
      <div className="w-full bg-white py-10 px-4 flex flex-col md:flex-row items-center justify-center gap-8">
        <div className="max-w-6xl w-full flex flex-col md:flex-row items-center gap-8">
          <Image src="/cement1.png" alt="UltraTech Cement" width={400} height={800} />
          <div>
            <h2 className="text-xl font-bold mb-3">UltraTech Cement</h2>
            <p className="mb-3">
              India is the largest producer of gray cement, ready mix material, and white cement. UltraTech Cement plays a vital role in today&apos;s tough India. As a brand, it inspires many real estate and engineering professionals to create a more conceptual brand.
            </p>
            <p>
              UltraTech has a combined capacity of 116.8 million tonnes of gray cement per annum (MTPA). UltraTech has a network of over one lakh channel partners across the country and has a market share of over 80% across India. You can connect with UltraTech by searching for UltraTech Cement dealers near me.
            </p>
          </div>
        </div>
      </div>

      {/* Shree Cement - Full Width */}
      <div className="w-full bg-orange-100 py-10 px-4 flex flex-col md:flex-row items-center justify-center gap-8">
        <div className="max-w-6xl w-full flex flex-col md:flex-row items-center gap-8">
          <div className="md:order-2">
            <Image src="/cement2.png" alt="Shree Cement" width={800} height={800} />
          </div>
          <div>
            <h2 className="text-xl font-bold text-orange-700 mb-3">Shree Cement</h2>
            <p className="mb-3">
              A leading construction company in India, Nuvoco is one of the leading cement manufacturers in India and a well-known player in the East, offering high-quality cement products. If you are looking for a building material company, you are in the right place; you can also search Nuvoco Cement dealers near me.
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Up to 70% more power than regular computers - High Power</li>
              <li>Up to 25% less water consumption than others</li>
              <li>Faster build cycle times than competitors</li>
              <li>Great abundance and freshness of things</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Dalmia Cement - Full Width */}
      <div className="w-full bg-white py-10 px-4 flex flex-col md:flex-row items-center justify-center gap-8">
        <div className="max-w-6xl w-full flex flex-col md:flex-row items-center gap-8">
          <Image src="/cement4.jpg" alt="Dalmia Cement" width={800} height={800} />
          <div>
            <h2 className="text-xl font-bold mb-3">Dalmia Cement</h2>
            <p className="mb-3">
              The organization works with a manufacturing limit of 30.75 MnT per annum (MTPA) across thirteen concrete plants and crushing units across nine states. With north of 20,000 sellers and sub-vendors, the organization benefits over 22 states and is among the leading players in each locale where it is available. To find the cement dealer nearest to you now, search Dalmia Cement dealers near me.
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>80 Years of Trust</li>
              <li>Powerful Item Execution</li>
              <li>Designed Flawlessly for all Blend Plans</li>
              <li>Productive On Location Technical support</li>
              <li>Conveyance According to Responsibility</li>
            </ul>
          </div>
        </div>
      </div>

      {/* JK Cement - Full Width */}
      <div className="w-full bg-orange-100 py-10 px-4 flex flex-col md:flex-row items-center justify-center gap-8">
        <div className="max-w-6xl w-full flex flex-col md:flex-row items-center gap-8">
          <div className="md:order-2">
            <Image src="/cement5.jpg" alt="JK Cement" width={800} height={800} />
          </div>
          <div>
            <h2 className="text-xl font-bold text-orange-700 mb-3">JK Cement</h2>
            <p className="mb-3">
              A leading construction company in India, Nuvoco is one of the leading cement manufacturers in India and a well-known player in the East, offering high-quality cement products. If you are looking for a building material company, you are in the right place; you can also search Nuvoco Cement dealers near me.
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Up to 70% more power than regular computers - High Power</li>
              <li>Up to 25% less water consumption than others</li>
              <li>Faster build cycle times than competitors</li>
              <li>Great abundance and freshness of things</li>
            </ul>
          </div>
        </div>
      </div>

    </div>
   
    <Footer/>
    </div>
  );
}
