"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header";
import BrandsSection from "@/components/sections/brand-section";
import { Skeleton } from "@/components/ui/skeleton";

export default function FabricationsPage() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        Promise.all([
            fetch("/api/categories").then((res) => res.json()),
            fetch("/api/subcategories").then((res) => res.json()),
        ]).then(([categories, subcategories]) => {
            const fabricationCategory = categories.find((cat) =>
                cat.name.toLowerCase().includes("fabrication")
            );
            if (!fabricationCategory) {
                setProducts([]);
                setLoading(false);
                return;
            }
            const fabricationSubcategories = subcategories.filter(
                (sub) => sub.category === fabricationCategory._id
            );
            const allProducts = fabricationSubcategories.flatMap((sub) => sub.products || []);
            setProducts(allProducts);
            setLoading(false);
        });
    }, []);

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
                <div className="flex flex-wrap justify-center gap-8 p-4">
                    {loading ? (
                        [1, 2, 3, 4].map((i) => <Skeleton key={i} className="w-72 h-96" />)
                    ) : products.length > 0 ? (
                        products.map((prod) => (
                            <div
                                key={prod._id}
                                className="bg-white border rounded-xl shadow-md p-4 w-72 min-w-[270px] flex flex-col items-center"
                            >
                                <img
                                    src={prod.image || "/cement4.jpg"}
                                    alt={prod.name}
                                    className="w-full h-40 object-cover mb-4 rounded"
                                />
                                <h3 className="text-xl font-bold mb-2">
                                    {prod.brand || prod.name}
                                </h3>
                                <p className="text-sm mb-4">{prod.name}</p>
                                <button className="bg-orange-600 text-white py-2 px-4 rounded-full font-bold">
                                    <Link
                                        href={`/material/${
                                            prod.subcategoryName || prod.subcategory
                                        }`}
                                        className="block px-4 py-2"
                                    >
                                        VIEW PRODUCTS
                                    </Link>
                                </button>
                            </div>
                        ))
                    ) : (
                        <p>No products found in this category.</p>
                    )}
                </div>
            </section>
            <BrandsSection />
            <Footer />
        </div>
    );
}
