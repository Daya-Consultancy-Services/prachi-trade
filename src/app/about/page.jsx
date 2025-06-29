import Footer from '@/components/layout/footer'
import Header from '@/components/layout/header'
import Image from 'next/image';

import React from 'react'

const page = () => {
  return (
    <div>
      <Header/>
     
        <div className="container mx-auto px-4 py-10 grid md:grid-cols-2 gap-10 items-center">
      
      <div>
        <Image src={"/steel1.png"} alt="Structural Steel" className="w-full h-auto object-cover"  width={400}    // Adjust width as per your design
        height={300}  />
      </div>

      <div>
       
        <p className="text-gray-700 mb-4">
          At Prachi trades, we are more than just suppliers—we are the trusted foundation behind your most ambitious visions in construction, architecture, and design. With deep roots in the industry, we specialize in delivering premium building essentials—ranging from high-strength rods and structural steel to an exquisite selection of marble, hard stone, and finely graded sand.
        </p>
        <p className="text-gray-700 mb-4">
          What sets us apart is our unwavering commitment to quality at every stage: from sourcing raw materials at ethically managed quarries to ensuring precision-cut stone slabs tailored to your exact needs.
        </p>
        <p className="text-gray-700">
          Our rods and reinforcement bars are meticulously selected to meet national and international standards, providing structural integrity and peace of mind for projects large and small. Engineers and builders count on our products to deliver durability, tensile strength, and consistency—attributes that form the backbone of sturdy foundations and lasting constructions.
        </p>
      </div>
    </div>
     <div>
       <p className="text-gray-700 mb-4">
          At Prachi trades, we are more than just suppliers—we are the trusted foundation behind your most ambitious visions in construction, architecture, and design. With deep roots in the industry, we specialize in delivering premium building essentials—ranging from high-strength rods and structural steel to an exquisite selection of marble, hard stone, and finely graded sand.
        </p>
        <p className="text-gray-700 mb-4">
          What sets us apart is our unwavering commitment to quality at every stage: from sourcing raw materials at ethically managed quarries to ensuring precision-cut stone slabs tailored to your exact needs.
        </p>
    </div>
   
      <Footer/>
    </div>
  )
}

export default page
