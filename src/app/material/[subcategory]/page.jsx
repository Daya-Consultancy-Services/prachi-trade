"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useParams } from "next/navigation";
// import Header from "@/components/layout/header";
// import Footer from "@/components/layout/footer";
import { Skeleton } from "@/components/ui/skeleton";
import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header";
// import Skeleton from "@/components/ui/skeleton";

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

    return (
        <div>
            <Header />
            <section className="py-12 bg-white text-center">
                <h2 className="text-3xl font-bold mb-4">
                    {subcategory
                        ? `${subcategory.charAt(0).toUpperCase() + subcategory.slice(1)} Products`
                        : "Products"}
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
                                {/* Add more product details as needed */}
                            </div>
                        ))
                    ) : (
                        <p>No products found in this subcategory.</p>
                    )}
                </div>
            </section>
            <Footer />
        </div>
    );
}
