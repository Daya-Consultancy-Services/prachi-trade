"use client";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { brands } from "@/data/brands";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default function MissionSection() {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch("/api/categories");
                if (!response.ok) {
                    throw new Error("Failed to fetch categories");
                }
                const data = await response.json();
                setCategories(data);
            } catch (err) {
                setError(err.message);
                console.error("Error fetching categories:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();
    }, []);

    return (
        <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-gray-50 to-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Left side - Brand showcase */}
                    <div className="relative">
                        {/* Main showcase image */}
                        <div className="relative aspect-[4/3] rounded-xl overflow-hidden shadow-lg mb-6">
                            <Image
                                src="/cement4.jpg"
                                alt="Building materials showcase"
                                fill
                                className="object-cover"
                                quality={100}
                                priority
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                            <div className="absolute bottom-6 left-6">
                                <span className="inline-block bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                                    Trusted Since 1995
                                </span>
                            </div>
                        </div>

                        {/* Brand logos grid */}
                        <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 sm:gap-4">
                            {brands.slice(0, 6).map((brand) => (
                                <div
                                    key={brand?.id}
                                    className="bg-white p-3 sm:p-4 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 hover:border-orange-200"
                                >
                                    <Image
                                        src={brand?.logo || "/placeholder-brand.png"}
                                        alt={brand?.name}
                                        width={120}
                                        height={60}
                                        className="w-full h-auto object-contain grayscale hover:grayscale-0 transition-all duration-500"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right side - Mission content */}
                    <div className="space-y-6">
                        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight">
                            Building <span className="text-orange-500">Stronger</span> Foundations{" "}
                            <br />
                            <span className="text-gray-800">For Odisha's Future</span>
                        </h2>

                        <div className="space-y-4">
                            <p className="text-gray-600 text-md leading-relaxed">
                                As your trusted partner and authorized dealer of India's top
                                construction brands, we provide premium materials to make your
                                projects last.
                            </p>

                            <div className="flex items-center space-x-2 text-gray-600">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5 text-orange-500"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                                <span className="text-md">Locally available - just a call away</span>
                            </div>
                        </div>

                        {/* Product category buttons - Dynamic from API */}
                        <div className="pt-4">
                            <h3 className="text-lg font-semibold text-gray-700 mb-3">
                                Our Product Categories
                            </h3>
                            {loading ? (
                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                    {[...Array(6)].map((_, i) => (
                                        <Skeleton key={i} className="h-12 rounded-lg bg-gray-200" />
                                    ))}
                                </div>
                            ) : error ? (
                                <div className="text-red-500 bg-red-50 p-3 rounded-lg">
                                    Failed to load categories. {error}
                                </div>
                            ) : (
                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                    {categories.slice(0, 6).map((category) => (
                                        <Link
                                            key={category._id}
                                            href={`/category/${category._id}`}
                                            className="inline-flex items-center justify-center px-2 py-2 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-lg hover:border-orange-300 transition-all duration-200 text-sm sm:text-base font-medium text-gray-700 hover:text-orange-600"
                                        >
                                            {category.name}
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
