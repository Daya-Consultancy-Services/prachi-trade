"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import BrandsSection from "@/components/sections/brand-section";
import { Skeleton } from "@/components/ui/skeleton";

export default function CategoryPage() {
    const { categoryId } = useParams();
    const [category, setCategory] = useState(null);

    useEffect(() => {
        fetch("/api/categories")
            .then((res) => res.json())
            .then((data) => {
                const found = data.find((cat) => cat._id === categoryId);
                setCategory(found);
            });
    }, [categoryId]);

    if (!category)
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
            <section className="py-12 bg-white text-center">
                <div>
                    <p className="text-gray-700 mb-4">Welcome to the {category.name} category!</p>
                </div>
                <h6>PRODUCTS</h6>
                <h2 className="text-3xl font-bold mb-4">
                    Our <span className="text-orange-600">Products</span>
                </h2>
                <div className="flex justify-center space-x-10 overflow-x-auto p-4">
                    {category.subcategories && category.subcategories.length > 0 ? (
                        category.subcategories.map((sub) => (
                            <div
                                key={sub._id}
                                className="bg-white border rounded-xl shadow-md p-2 w-72 min-w-[270px] relative"
                            >
                                <img
                                    src="/cement4.jpg"
                                    alt={sub.name}
                                    className="w-full h-60 object-cover mb-4"
                                />
                                <h3 className="text-xl font-bold mb-2">{sub.name}</h3>
                                <p className="text-sm mb-4"></p>
                                <button className="bg-orange-600 text-white py-2 px-4 rounded-full font-bold">
                                    <Link
                                        href={`/subcategory/${sub._id}`}
                                        className="block px-4 py-2"
                                    >
                                        VIEW PRODUCTS
                                    </Link>
                                </button>
                            </div>
                        ))
                    ) : (
                        <p>No subcategories found.</p>
                    )}
                </div>
            </section>
            <BrandsSection />
            <Footer />
        </div>
    );
}
