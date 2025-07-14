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
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        fetch("/api/subcategories")
            .then((res) => res.json())
            .then((data) => {
                const found = data.find((sub) => sub._id === subcategoryId);
                setSubcategory(found);
                setLoading(false);
            });
    }, [subcategoryId]);

    if (loading) {
        return (
            <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-50 to-white">
                <Header />
                <div className="py-20 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-16">
                            <Skeleton className="h-10 w-1/3 mx-auto mb-4" />
                            <Skeleton className="h-6 w-2/3 mx-auto" />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {[...Array(6)].map((_, i) => (
                                <div
                                    key={i}
                                    className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"
                                >
                                    <Skeleton className="h-48 w-full rounded-lg mb-4" />
                                    <Skeleton className="h-6 w-3/4 mb-2" />
                                    <Skeleton className="h-4 w-1/2 mb-4" />
                                    <Skeleton className="h-10 w-full rounded-full" />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-50 to-white">
            <Header />

            {/* Hero Section */}
            <section className="relative bg-gradient-to-r from-orange-500 to-orange-600 py-20 text-white overflow-hidden">
                <div className="absolute inset-0 bg-[url('/concrete-pattern.png')] opacity-10"></div>
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight drop-shadow-md">
                        {subcategory?.name || "Subcategory"}
                    </h1>
                    <p className="text-xl text-orange-100 max-w-3xl mx-auto">
                        Premium quality construction materials for your projects
                    </p>
                    <div className="mt-8">
                        <div className="inline-flex rounded-md shadow">
                            <Link
                                href="/contact"
                                className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-orange-700 bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10 transition-all duration-200"
                            >
                                Get a Quote
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

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
                            <li>
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
                                    <Link
                                        href={`/category/${subcategory?.category?._id}`}
                                        className="ml-1 text-sm font-medium text-gray-700 hover:text-orange-600 md:ml-2 capitalize"
                                    >
                                        {subcategory?.category?.name || "Category"}
                                    </Link>
                                </div>
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
                                        {subcategory?.name || "Subcategory"}
                                    </span>
                                </div>
                            </li>
                        </ol>
                    </nav>
                </div>
            </div>

            {/* Products Section */}
            <section className="py-16 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 mb-3 relative inline-block">
                            Our <span className="text-orange-600">Products</span>
                            <span className="absolute bottom-0 left-0 w-full h-1 bg-orange-500 transform translate-y-1 scale-x-75"></span>
                        </h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            High-quality construction materials for professional and DIY projects
                        </p>
                    </div>

                    {subcategory?.products && subcategory.products.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {subcategory.products.map((prod) => (
                                <div
                                    key={prod._id}
                                    className="group bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-orange-200"
                                >
                                    <div className="relative h-60 overflow-hidden">
                                        <img
                                            src={prod.image || "/cement4.jpg"}
                                            alt={prod.name}
                                            className="w-full h-full object-contain p-4 transition-transform duration-500 group-hover:scale-105"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>
                                    </div>
                                    <div className="p-6">
                                        <div className="flex justify-between items-start mb-2">
                                            <h3 className="text-xl font-bold text-gray-900 line-clamp-1">
                                                {prod.name}
                                            </h3>
                                            {prod.price && (
                                                <span className="bg-orange-100 text-orange-800 text-sm font-semibold px-3 py-1 rounded-full">
                                                    ${prod.price.toFixed(2)}
                                                </span>
                                            )}
                                        </div>
                                        <span className="inline-block bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full mb-3">
                                            {prod.brand || "Premium Brand"}
                                        </span>
                                        <p className="text-gray-600 mb-4 line-clamp-2">
                                            {prod.description ||
                                                "High-quality construction material for professional use."}
                                        </p>
                                        <Link
                                            href={`/product/${prod._id}`}
                                            className="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-full text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-all duration-200 shadow-sm hover:shadow-md"
                                        >
                                            View Details
                                            <svg
                                                className="ml-2 -mr-1 w-4 h-4"
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
                                No products available
                            </h3>
                            <p className="text-gray-500 max-w-md mx-auto">
                                Currently there are no products in this subcategory. Please check
                                back later.
                            </p>
                            <Link
                                href="/categories"
                                className="mt-6 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
                            >
                                Browse Categories
                            </Link>
                        </div>
                    )}
                </div>
            </section>

            <BrandsSection />
            <Footer />
        </div>
    );
}
