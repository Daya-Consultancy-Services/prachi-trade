"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { Skeleton } from "@/components/ui/skeleton";

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

    if (!product)
        return (
            <div className="max-w-2xl mx-auto py-12">
                <Skeleton className="w-full h-80 mb-6 rounded-xl" />
                <Skeleton className="h-10 w-2/3 mb-2" />
                <Skeleton className="h-6 w-1/3 mb-4" />
                <Skeleton className="h-4 w-full mb-4" />
                <Skeleton className="h-8 w-1/2 mb-4" />
            </div>
        );

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
