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
    const [subcategories, setSubcategories] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        Promise.all([
            fetch("/api/categories").then((res) => res.json()),
            fetch("/api/subcategories").then((res) => res.json()),
        ]).then(([categories, subcategories]) => {
            const found = categories.find((cat) => cat._id === categoryId);
            setCategory(found);
            setSubcategories(subcategories.filter((sub) => sub.category._id === categoryId));
            setLoading(false);
        });
    }, [categoryId]);



    // Gather all products from all subcategories of this category
    const products = subcategories.flatMap((sub) => sub.products || []);
    useEffect(() => {
        console.log("products:", subcategories);
    }, [products]);

    if (loading) {
        return (
            <div className="flex justify-center space-x-10 p-8">
                {[1, 2, 3, 4].map((i) => (
                    <Skeleton key={i} className="w-72 h-96" />
                ))}
            </div>
        );
    }

    return (
        <div>
            <Header />
            <section className="py-12 bg-white text-center">
                <div>
                    <p className="text-gray-700 mb-4">
                        {category?.name ? `All products in ${category.name}` : "Category"}
                    </p>
                </div>
                <h6>PRODUCTS</h6>
                <h2 className="text-3xl font-bold mb-4">
                    Our <span className="text-orange-600">Products</span>
                </h2>
                <div className="flex flex-wrap justify-center gap-8 p-4">
                    {products.length > 0 ? (
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
                                    <Link href={`/product/${prod._id}`} className="block px-4 py-2">
                                        VIEW PRODUCT
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
