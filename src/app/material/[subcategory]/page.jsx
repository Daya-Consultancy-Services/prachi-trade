"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import Image from "next/image";

export default function MaterialSubcategoryPage() {
    const params = useParams();
    const subcategory = params.subcategory;
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!subcategory) return;
        setLoading(true);
        fetch(`/api/products?subcategory=${subcategory}`)
            .then((res) => res.json())
            .then((data) => {
                setProducts(data);
                setLoading(false);
            });
    }, [subcategory]);

    // Alternating backgrounds
    const bgColors = ["bg-white", "bg-orange-100"];

    return (
        <div>
            <Header />
            {/* Hero Section */}
            <section className="relative h-96 flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-cover bg-center bg-orange-300"></div>
                <div className="absolute inset-0 bg-black opacity-30"></div>
                <div className="relative text-white max-w-5xl text-center px-4">
                    <h1 className="text-lg md:text-4xl font-bold mb-4">
                        {subcategory
                            ? `The Best Construction Dealer to Safeguard Your Constructional Solution`
                            : "Our Products"}
                    </h1>
                    <p className="text-lg md:text-sm opacity-90">
                        When building your ideal home, we are here as the best {subcategory} dealer
                        in India to save your building. Our motto is getting the tough stuff and
                        helping you stand up firm.
                    </p>
                </div>
            </section>

            {/* Dynamic Product Sections */}
            <div className="min-h-screen bg-white">
                {loading ? (
                    <div className="flex flex-col items-center justify-center py-20">
                        <p className="text-xl">Loading products...</p>
                    </div>
                ) : products.length > 0 ? (
                    products.map((prod, idx) => (
                        <div
                            key={prod._id}
                            className={`w-full ${
                                bgColors[idx % 2]
                            } py-10 px-4 flex flex-col md:flex-row items-center justify-center gap-8`}
                        >
                            <div
                                className={`max-w-6xl w-full flex flex-col md:flex-row items-center gap-8 ${
                                    idx % 2 === 1 ? "md:flex-row-reverse" : ""
                                }`}
                            >
                                <div className={idx % 2 === 1 ? "md:order-2" : ""}>
                                    <Image
                                        src={prod.image || "/cement4.jpg"}
                                        alt={prod.name}
                                        width={400}
                                        height={400}
                                    />
                                </div>
                                <div>
                                    <h2
                                        className={`text-xl font-bold mb-3 ${
                                            idx % 2 === 1 ? "text-orange-700" : ""
                                        }`}
                                    >
                                        {prod.brand || prod.name}
                                    </h2>
                                    <p className="mb-3">
                                        {prod.description || "No description available."}
                                    </p>
                                    {/* If product.features exists and is an array, render as a list */}
                                    {Array.isArray(prod.features) && prod.features.length > 0 && (
                                        <ul className="list-disc pl-5 space-y-1">
                                            {prod.features.map((feature, i) => (
                                                <li key={i}>{feature}</li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="flex flex-col items-center justify-center py-20">
                        <p className="text-xl">No products found in this subcategory.</p>
                    </div>
                )}
            </div>
            <Footer />
        </div>
    );
}
