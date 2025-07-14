"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import BrandsSection from "@/components/sections/brand-section";
import { Skeleton } from "@/components/ui/skeleton";

export default function SubcategoryPage() {
    const { subcategoryId } = useParams();
    const [subcategory, setSubcategory] = useState(null);

    useEffect(() => {
        fetch("/api/subcategories")
            .then((res) => res.json())
            .then((data) => {
                const found = data.find((sub) => sub._id === subcategoryId);
                setSubcategory(found);
            });
    }, [subcategoryId]);

    if (!subcategory)
        return (
            <div className="flex justify-center space-x-10 p-8">
                {[1, 2, 3].map((i) => (
                    <Skeleton key={i} className="w-72 h-96" />
                ))}
            </div>
        );

    return (
        <div>
            <Header />
            {/* Hero Section */}
            <section className="bg-gradient-to-r from-orange-400 to-orange-600 py-12 text-white text-center">
                <h1 className="text-3xl md:text-4xl font-bold mb-2">
                    THE BEST CEMENT DEALER TO SAFEGUARDING YOUR CONSTRUCTIONAL SOLUTION
                </h1>
                <p className="max-w-2xl mx-auto text-lg opacity-90">
                    We offer a wide range of cement products to meet your construction needs.
                    Quality, reliability, and service you can trust.
                </p>
            </section>
            <section className="py-12 bg-white text-center">
                <div className="max-w-4xl mx-auto mt-10">
                    {subcategory.products && subcategory.products.length > 0 ? (
                        subcategory.products.map((prod, idx) => {
                            const isEven = idx % 2 === 0;
                            return (
                                <div
                                    key={prod._id}
                                    className={`flex flex-col md:flex-row items-center justify-between rounded-xl shadow-md mb-10 p-8 ${
                                        isEven ? "bg-white" : "bg-orange-50"
                                    }`}
                                >
                                    {/* Image left, text right for even; reverse for odd */}
                                    {isEven ? (
                                        <>
                                            <img
                                                src={prod.image || "/cement4.jpg"}
                                                alt={prod.name}
                                                className="w-40 h-40 object-contain mb-4 md:mb-0 md:mr-8"
                                            />
                                            <div className="flex-1 text-left">
                                                <div className="bg-orange-100 px-4 py-2 rounded mb-2 inline-block">
                                                    <h2 className="text-2xl font-bold text-orange-700">
                                                        {prod.name} ({prod.brand})
                                                    </h2>
                                                </div>
                                                <p className="mb-2 text-gray-700 text-base">
                                                    {prod.description}
                                                </p>
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <div className="flex-1 text-left md:mr-8">
                                                <div className="bg-orange-100 px-4 py-2 rounded mb-2 inline-block">
                                                    <h2 className="text-2xl font-bold text-orange-700">
                                                        {prod.name} ({prod.brand})
                                                    </h2>
                                                </div>
                                                <p className="mb-2 text-gray-700 text-base">
                                                    {prod.description}
                                                </p>
                                            </div>
                                            <img
                                                src={prod.image || "/cement4.jpg"}
                                                alt={prod.name}
                                                className="w-40 h-40 object-contain mb-4 md:mb-0"
                                            />
                                        </>
                                    )}
                                </div>
                            );
                        })
                    ) : (
                        <p>No products found in this subcategory.</p>
                    )}
                </div>
            </section>
            <BrandsSection />
            <Footer />
        </div>
    );
}
