"use client";
import Link from "next/link";
import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header";
import BrandsSection from "@/components/sections/brand-section";

export default function buildingmaterial() {
    return (
        <div>
            <Header />

            <section className="py-12 bg-white text-center">
                <div>
                    <p className="text-gray-700 mb-4">
                        At Prachi trades, we are more than just suppliers—we are the trusted
                        foundation behind your most ambitious visions in construction, architecture,
                        and design. With deep roots in the industry, we specialize in delivering
                        premium building essentials—ranging from high-strength rods and structural
                        steel to an exquisite selection of marble, hard stone, and finely graded
                        sand.
                    </p>
                </div>
                <h6>PRODUCTS</h6>
                <h2 className="text-3xl font-bold mb-4">
                    Our <span className="text-orange-600">New Products</span>
                </h2>

                <div className="flex justify-center space-x-10 overflow-x-auto p-4">
                    {/* Steel Card */}
                    <div className="bg-white border rounded-xl shadow-md p-2 w-72 min-w-[270px] relative">
                        <img
                            src="/steel2.png"
                            alt="Steel"
                            className="w-full h-60 object-cover mb-4"
                        />
                        <h3 className="text-xl font-bold mb-2">MS Rod</h3>
                        <p className="text-sm mb-4">
                            Jindal Panther 550D, JSW steel 550D, SMC 550D, SEL 500D, Tata Tiscon
                            550D
                        </p>
                        <button className="bg-orange-600 text-white py-2 px-4 rounded-full font-bold">
                            <Link href="material" className="block px-4 py-2">
                                VIEW PRODUCTS
                            </Link>
                        </button>
                    </div>

                    {/* Cement Card */}
                    <div className="bg-white border rounded-xl shadow-md p-2 w-72 min-w-[270px] relative">
                        <img
                            src="/cement4.jpg"
                            alt="Cement"
                            className="w-full h-60 object-cover mb-4"
                        />

                        <h3 className="text-xl font-bold mb-2">Cement</h3>

                        <p className="text-sm mb-4">
                            DALMIA, Nuvoco, Ultratech, Maha Shakti, Raasi, Ramco, PPC, PSC
                        </p>

                        <button className="bg-orange-600 text-white py-2 px-4 rounded-full font-bold">
                            <Link href="material" className="block px-4 py-2">
                                VIEW PRODUCTS
                            </Link>
                        </button>
                    </div>

                    {/* RMC Card */}
                    {/* <div className="bg-white border rounded-xl shadow-md p-2 w-72 min-w-[270px] relative">
                        <img src="/rmc1.png" alt="RMC" className="w-full h-60 object-cover mb-4" />
                        <h3 className="text-xl font-bold mb-2">RMC</h3>
                        <p className="text-sm mb-4">
                            Ultratech, DALMIA, Nuvoco, Ultratech, Maha Shakti, Raasi, Ramco
                        </p>
                        <button className="bg-orange-600 text-white py-2 px-4 rounded-full font-bold">
                            <Link href="material" className="block px-4 py-2">
                                VIEW PRODUCTS
                            </Link>
                        </button>
                    </div> */}

                    {/* Roofing Sheets Card */}
                    {/* <div className="bg-white border rounded-xl shadow-md p-2 w-72 min-w-[270px] relative">
                        <img
                            src="/roofing sheet1.png"
                            alt="Roofing Sheets"
                            className="w-full h-60 object-cover mb-4"
                        />
                        <h3 className="text-xl font-bold mb-2">Roofing Sheets</h3>
                        <p className="text-sm mb-4">
                            Ultratech, DALMIA, Nuvoco, Ultratech, Maha Shakti, Raasi, Ramco
                        </p>
                        <button className="bg-orange-600 text-white py-2 px-4 rounded-full font-bold">
                            <Link href="material" className="block px-4 py-2">
                                VIEW PRODUCTS
                            </Link>
                        </button>
                    </div> */}
                </div>

                <div>
                    <p className="text-gray-700 mb-4">
                        At Prachi trades, we are more than just suppliers—we are the trusted
                        foundation behind your most ambitious visions in construction, architecture,
                        and design. With deep roots in the industry, we specialize in delivering
                        premium building essentials—ranging from high-strength rods and structural
                        steel to an exquisite selection of marble, hard stone, and finely graded
                        sand.
                    </p>
                </div>
            </section>
            <BrandsSection />
            <Footer />
        </div>
    );
}
