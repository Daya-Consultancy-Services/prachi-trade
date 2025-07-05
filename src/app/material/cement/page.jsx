"use client";
import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header";
import Image from "next/image";
import { useEffect } from "react";

export default function CementProductsPage() {
    useEffect(() => {
        const response = fetch("/api/products");
        const data = response.json();

        console.log("data>>>>>>>>>>>>>", data);
    }, []);

    return (
        <div>
            <Header />
            <section className="relative h-96 flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-cover bg-center bg-orange-300"></div>
                <div className="absolute inset-0 bg-black opacity-30"></div>
                <div className="relative text-white max-w-5xl text-center px-4">
                    <h1 className="text-lg md:text-4xl font-bold mb-4">
                        PREMIUM CEMENT BRANDS FOR EVERY PROJECT
                    </h1>
                    <p className="text-lg md:text-sm opacity-90">
                        Discover our selection of top cement brands, trusted for quality and
                        performance in construction.
                    </p>
                </div>
            </section>
            <div className="min-h-screen bg-white">
                {/* Ultratech */}
                <div className="w-full bg-white py-10 px-4 flex flex-col md:flex-row items-center justify-center gap-8">
                    <Image src="/cement1.png" alt="Ultratech Cement" width={400} height={800} />
                    <div>
                        <h2 className="text-xl font-bold mb-3">Ultratech</h2>
                        <p className="mb-3">
                            Ultratech Cement is India's No. 1 cement brand, known for its superior
                            quality and strength. It is widely used in residential, commercial, and
                            infrastructure projects.
                        </p>
                    </div>
                </div>
                {/* JK Lakshmi */}
                <div className="w-full bg-orange-100 py-10 px-4 flex flex-col md:flex-row items-center justify-center gap-8">
                    <div className="md:order-2">
                        <Image
                            src="/cement5.jpg"
                            alt="JK Lakshmi Cement"
                            width={400}
                            height={800}
                        />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-orange-700 mb-3">JK Lakshmi</h2>
                        <p className="mb-3">
                            JK Lakshmi Cement is recognized for its consistent quality and
                            innovative products, making it a popular choice for builders and
                            contractors.
                        </p>
                    </div>
                </div>
                {/* Shree */}
                <div className="w-full bg-white py-10 px-4 flex flex-col md:flex-row items-center justify-center gap-8">
                    <Image src="/cement2.png" alt="Shree Cement" width={400} height={800} />
                    <div>
                        <h2 className="text-xl font-bold mb-3">Shree</h2>
                        <p className="mb-3">
                            Shree Cement is known for its high performance and eco-friendly
                            manufacturing processes, making it a sustainable choice for modern
                            construction.
                        </p>
                    </div>
                </div>
                {/* Dalmia */}
                <div className="w-full bg-orange-100 py-10 px-4 flex flex-col md:flex-row items-center justify-center gap-8">
                    <div className="md:order-2">
                        <Image src="/cement4.jpg" alt="Dalmia Cement" width={400} height={800} />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-orange-700 mb-3">Dalmia</h2>
                        <p className="mb-3">
                            Dalmia Cement is trusted for its reliability and technical excellence,
                            serving a wide range of construction needs across India.
                        </p>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}
