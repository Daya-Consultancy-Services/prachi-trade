"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";

export default function ProductDetailPage() {
    const { productId } = useParams();
    const [product, setProduct] = useState(null);

    useEffect(() => {
        fetch("/api/products")
            .then((res) => res.json())
            .then((data) => {
                const found = data.find((prod) => prod._id === productId);
                setProduct(found);
            });
    }, [productId]);

    if (!product) return <div>Loading...</div>;

    return (
        <div>
            <Header />
            <section className="py-12 bg-white text-center">
                <div className="max-w-2xl mx-auto">
                    <img
                        src={product.image || "/cement4.jpg"}
                        alt={product.name}
                        className="w-full h-80 object-cover mb-6 rounded-xl"
                    />
                    <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
                    <h2 className="text-xl text-orange-600 mb-4">{product.brand}</h2>
                    <p className="mb-4">{product.description}</p>
                    <div className="flex justify-center gap-8 mb-4">
                        <span className="font-bold">Price:</span> <span>₹{product.price}</span>
                        <span className="font-bold">Unit:</span> <span>{product.unit}</span>
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    );
}
