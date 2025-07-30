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

    const products = subcategories.flatMap((sub) => sub.products || []);

    if (loading) {
        return (
            <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-50 to-white">
                <Header />
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 p-8 max-w-7xl mx-auto">
                    {[...Array(8)].map((_, i) => (
                        <div key={i} className="flex flex-col space-y-3">
                            <Skeleton className="h-60 w-full rounded-lg" />
                            <Skeleton className="h-4 w-3/4 rounded" />
                            <Skeleton className="h-4 w-1/2 rounded" />
                            <Skeleton className="h-10 w-full rounded-full mt-4" />
                        </div>
                    ))}
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-50 to-white">
            <Header />

            {/* Hero Section */}
            <div className="relative bg-gradient-to-r from-orange-500 to-orange-600 py-20 px-4 sm:px-6 lg:px-8 text-center">
                <div className="absolute inset-0 bg-black opacity-10"></div>
                <div className="relative max-w-4xl mx-auto">
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 drop-shadow-md">
                        {category?.name || "Category"}
                    </h1>
                    <p className="text-xl text-orange-100 max-w-2xl mx-auto">
                        {category?.description || "Premium quality products for all your needs"}
                    </p>
                </div>
            </div>

            {/* Breadcrumb */}
            <div className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
                    <nav className="flex" aria-label="Breadcrumb">
                        <ol className="inline-flex items-center space-x-1 md:space-x-3">
                            <li className="inline-flex items-center">
                                <Link
                                    href="/"
                                    className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-orange-600"
                                >
                                    Home
                                </Link>
                            </li>
                            <li aria-current="page">
                                <div className="flex items-center">
                                    <svg
                                        className="w-3 h-3 text-gray-400 mx-1"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 6 10"
                                    >
                                        <path
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="m1 9 4-4-4-4"
                                        />
                                    </svg>
                                    <span className="ml-1 text-sm font-medium text-orange-600 md:ml-2 capitalize">
                                        {category?.name || "Category"}
                                    </span>
                                </div>
                            </li>
                        </ol>
                    </nav>
                </div>
            </div>

            <main className="flex-grow py-12 px-4 sm:px-6 lg:px-36">
                <div className="max-w-7xl mx-auto">
                    {/* Category Title */}
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 mb-3 relative inline-block">
                            Our <span className="text-orange-600">Products</span>
                            <span className="absolute bottom-0 left-0 w-full h-1 bg-orange-500 transform translate-y-1 scale-x-75"></span>
                        </h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            Browse through our extensive collection of high-quality products
                        </p>
                    </div>

                    {/* Product List */}
                    {products.length > 0 ? (
                        <div className="space-y-8">
                            {products.map((prod, index) => (
                                <div
                                    key={prod._id}
                                    className={`flex flex-col md:flex-row rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-orange-200 bg-white h-76 ${
                                        index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                                    }`}
                                >
                                    {/* Product Image - Fixed height container */}
                                    <div className="md:w-1/3 h-full relative overflow-hidden">
                                        <img
                                            src={prod.image || "/cement4.jpg"}
                                            alt={prod.name}
                                            className="w-full h-full object-contain transition-transform duration-500 hover:scale-105"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                                    </div>

                                    {/* Product Details - Fixed height container */}
                                    <div className="md:w-2/3 p-6 md:p-8 flex flex-col justify-center h-full">
                                        <div className="mb-4">
                                            <span className="inline-block bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded-full mb-2">
                                                {prod.brand || "Premium"}
                                            </span>
                                            <h3 className="text-2xl font-bold text-gray-900 mb-2">
                                                {prod.name}
                                            </h3>
                                            <p className="text-gray-600 mb-4 line-clamp-3">
                                                {prod.description ||
                                                    "High-quality product with premium features."}
                                            </p>
                                            {prod.price && (
                                                <p className="text-2xl font-bold text-orange-600 mb-4">
                                                    ${prod.price.toFixed(2)}
                                                </p>
                                            )}
                                        </div>
                                        <Link
                                            href={`/product/${prod._id}`}
                                            className="w-fit inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-all duration-200 shadow-sm hover:shadow-md"
                                        >
                                            View Details
                                            <svg
                                                className="ml-2 -mr-1 w-5 h-5"
                                                fill="currentColor"
                                                viewBox="0 0 20 20"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                                                    clipRule="evenodd"
                                                ></path>
                                            </svg>
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-16">
                            <div className="mx-auto w-24 h-24 text-gray-400 mb-4">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                    />
                                </svg>
                            </div>
                            <h3 className="text-lg font-medium text-gray-900 mb-1">
                                No products found
                            </h3>
                            <p className="text-gray-500 max-w-md mx-auto">
                                We couldn't find any products in this category. Please check back
                                later.
                            </p>
                            <Link
                                href="/"
                                className="mt-6 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
                            >
                                Back to Home
                            </Link>
                        </div>
                    )}
                </div>
            </main>
            <BrandsSection />
            <Footer />
        </div>
    );
}
