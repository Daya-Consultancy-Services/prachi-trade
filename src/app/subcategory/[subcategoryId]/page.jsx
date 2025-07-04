"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import BrandsSection from "@/components/sections/brand-section";

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

    if (!subcategory) return <div>Loading...</div>;

    return (
        <div>
            <Header />
            <section className="py-12 bg-white text-center">
                <div>
                    <p className="text-gray-700 mb-4">
                        Welcome to the {subcategory.name} subcategory!
                    </p>
                </div>
                <h6>PRODUCTS</h6>
                <h2 className="text-3xl font-bold mb-4">
                    Our <span className="text-orange-600">Products</span>
                </h2>
                <div className="flex justify-center space-x-10 overflow-x-auto p-4">
                    {subcategory.products && subcategory.products.length > 0 ? (
                        subcategory.products.map((prod) => (
                            <div
                                key={prod._id}
                                className="bg-white border rounded-xl shadow-md p-2 w-72 min-w-[270px] relative"
                            >
                                <img
                                    src={prod.image || "/cement4.jpg"}
                                    alt={prod.name}
                                    className="w-full h-60 object-cover mb-4"
                                />
                                <h3 className="text-xl font-bold mb-2">{prod.name}</h3>
                                <p className="text-sm mb-4">{prod.brand}</p>
                                <button className="bg-orange-600 text-white py-2 px-4 rounded-full font-bold">
                                    <Link href={`/product/${prod._id}`} className="block px-4 py-2">
                                        VIEW DETAILS
                                    </Link>
                                </button>
                            </div>
                        ))
                    ) : (
                        <p>No products found.</p>
                    )}
                </div>
            </section>
            <BrandsSection />
            <Footer />
        </div>
    );
}
