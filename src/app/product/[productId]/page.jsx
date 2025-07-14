"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";

export default function ProductDetailPage() {
    const { productId } = useParams();
    const [product, setProduct] = useState(null);
    const [enquiry, setEnquiry] = useState({ name: "", email: "", mobile: "", message: "" });
    const [enquiryStatus, setEnquiryStatus] = useState(null);
    const [subcategoryProducts, setSubcategoryProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [imageLoaded, setImageLoaded] = useState(false);
    const [activeImage, setActiveImage] = useState(0);

    useEffect(() => {
        setLoading(true);
        fetch("/api/products")
            .then((res) => res.json())
            .then((products) => {
                const found = products.find((prod) => prod._id === productId);
                console.log("found p    roduct", found);
                setProduct(found);

                if (found && found.subcategory) {
                    // Fetch subcategories to get all products in the same subcategory
                    fetch("/api/subcategories")
                        .then((res) => res.json())
                        .then((subcategories) => {
                            console.log("object",subcategories)
                            const currentSubcategory = subcategories.find(
                                (sub) => sub._id === found.subcategory._id
                            );
                            if (currentSubcategory && currentSubcategory.products) {
                                // Filter out the current product and set the rest as related products
                                setSubcategoryProducts(
                                    currentSubcategory.products.filter((p) => p._id !== productId)
                                );
                            }
                            setLoading(false);
                        });
                } else {
                    setSubcategoryProducts([]);
                    setLoading(false);
                }
            });
    }, [productId]);

    useEffect(() => {
        console.log("subcategoryProducts",subcategoryProducts);
    },[subcategoryProducts]);


    if (loading || !product) {
        return (
            <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
                <Header />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="grid lg:grid-cols-2 gap-12">
                        {/* Image Gallery Skeleton */}
                        <div className="space-y-4">
                            <Skeleton className="w-full h-96 rounded-2xl" />
                            <div className="grid grid-cols-4 gap-3">
                                {[1, 2, 3, 4].map((i) => (
                                    <Skeleton key={i} className="h-20 rounded-lg" />
                                ))}
                            </div>
                        </div>

                        {/* Product Info Skeleton */}
                        <div className="space-y-6">
                            <Skeleton className="h-10 w-3/4" />
                            <Skeleton className="h-6 w-1/2" />
                            <div className="space-y-2">
                                {[1, 2, 3, 4, 5].map((i) => (
                                    <Skeleton key={i} className="h-4 w-full" />
                                ))}
                            </div>
                            <div className="pt-4">
                                <Skeleton className="h-14 w-full rounded-lg" />
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }

    // Sample product images (replace with your actual image data)
    const productImages = [
        product.image || "/cement4.jpg",
        "/cement2.jpg",
        "/cement3.jpg",
        "/cement1.jpg",
    ];

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
            <Header />

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
                                        href={`/category/${product.category?._id}`}
                                        className="ml-1 text-sm font-medium text-gray-700 hover:text-orange-600 md:ml-2 capitalize"
                                    >
                                        {product.category?.name || "Category"}
                                    </Link>
                                </div>
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
                                        href={`/subcategory/${product?.subcategory?._id}`}
                                        className="ml-1 text-sm font-medium text-gray-700 hover:text-orange-600 md:ml-2 capitalize"
                                    >
                                        {product.subcategoryName || "Subcategory"}
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
                                        {product.name}
                                    </span>
                                </div>
                            </li>
                        </ol>
                    </nav>
                </div>
            </div>

            {/* Product Section */}
            <section className="py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="grid lg:grid-cols-2 gap-12">
                        {/* Image Gallery */}
                        <div className="space-y-4">
                            <div className="relative bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
                                {!imageLoaded && (
                                    <div className="w-full h-96 bg-gray-200 animate-pulse rounded-xl"></div>
                                )}
                                <img
                                    src={productImages[activeImage]}
                                    alt={product.name}
                                    className={`w-full h-96 object-contain transition-opacity duration-300 ${
                                        imageLoaded ? "opacity-100" : "opacity-0"
                                    }`}
                                    onLoad={() => setImageLoaded(true)}
                                />
                                {product.price && (
                                    <div className="absolute top-4 right-4 bg-orange-600 text-white font-bold py-2 px-4 rounded-full shadow-lg">
                                        ${product.price.toFixed(2)}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Product Details */}
                        <div className="space-y-6">
                            <div>
                                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                                    {product.name}
                                </h1>
                                {product.brand && (
                                    <span className="inline-block px-4 py-1 bg-orange-100 text-orange-800 rounded-full text-sm font-semibold">
                                        {product.brand}
                                    </span>
                                )}
                            </div>

                            <div className="prose max-w-none text-gray-600">
                                <p className="text-lg">{product.description}</p>
                            </div>

                            {/* CTA Buttons */}
                            <div className="flex flex-col sm:flex-row gap-4 pt-4">
                                <button
                                    onClick={() =>
                                        document
                                            .getElementById("enquiry-form")
                                            .scrollIntoView({ behavior: "smooth" })
                                    }
                                    className="flex-1 bg-orange-600 hover:bg-orange-700 text-white py-3 px-6 rounded-lg font-bold text-base shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300"
                                >
                                    Get Quote Now
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Product Enquiry Form */}
            <section id="enquiry-form" className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 mb-3 relative inline-block">
                            Request <span className="text-orange-600">Quote</span>
                            <span className="absolute bottom-0 left-0 w-full h-1 bg-orange-500 transform translate-y-1 scale-x-75"></span>
                        </h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            Fill out the form below and our team will contact you shortly
                        </p>
                    </div>

                    <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
                        <div className="md:flex">
                            <div className="md:w-1/2 bg-orange-600 p-8 text-white">
                                <h3 className="text-2xl font-bold mb-4">Contact Information</h3>
                                <p className="mb-6">
                                    Have questions about {product.name}? Our experts are here to
                                    help you with all your needs.
                                </p>
                                <div className="space-y-4">
                                    <div className="flex items-start">
                                        <div className="flex-shrink-0 bg-orange-500 p-2 rounded-lg">
                                            <svg
                                                className="w-6 h-6"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2"
                                                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                                ></path>
                                            </svg>
                                        </div>
                                        <div className="ml-3">
                                            <p className="text-sm font-medium">Email us at</p>
                                            <p className="text-lg font-bold">
                                                info@prachitrade.co.in
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="md:w-1/2 p-8">
                                {enquiryStatus && (
                                    <div
                                        className={`mb-6 p-4 rounded-xl text-center font-semibold ${
                                            enquiryStatus.success
                                                ? "bg-green-50 text-green-700 border border-green-200"
                                                : "bg-red-50 text-red-700 border border-red-200"
                                        }`}
                                    >
                                        {enquiryStatus.message}
                                    </div>
                                )}
                                <form
                                    onSubmit={async (e) => {
                                        e.preventDefault();
                                        setEnquiryStatus(null);
                                        const res = await fetch("/api/enquiries", {
                                            method: "POST",
                                            headers: { "Content-Type": "application/json" },
                                            body: JSON.stringify({
                                                ...enquiry,
                                                product: product.name,
                                            }),
                                        });
                                        if (res.ok) {
                                            setEnquiry({
                                                name: "",
                                                email: "",
                                                mobile: "",
                                                message: "",
                                            });
                                            setEnquiryStatus({
                                                success: true,
                                                message:
                                                    "Thank you! Your enquiry has been submitted successfully.",
                                            });
                                        } else {
                                            const data = await res.json();
                                            setEnquiryStatus({
                                                success: false,
                                                message:
                                                    data.error ||
                                                    "Failed to submit enquiry. Please try again.",
                                            });
                                        }
                                    }}
                                    className="space-y-4"
                                >
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Full Name *
                                        </label>
                                        <input
                                            type="text"
                                            required
                                            placeholder="John Doe"
                                            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200"
                                            value={enquiry.name}
                                            onChange={(e) =>
                                                setEnquiry({ ...enquiry, name: e.target.value })
                                            }
                                        />
                                    </div>
                                    <div className="grid md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Mobile Number *
                                            </label>
                                            <input
                                                type="tel"
                                                required
                                                placeholder="+1 (555) 123-4567"
                                                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200"
                                                value={enquiry.mobile}
                                                onChange={(e) =>
                                                    setEnquiry({
                                                        ...enquiry,
                                                        mobile: e.target.value,
                                                    })
                                                }
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Email Address
                                            </label>
                                            <input
                                                type="email"
                                                placeholder="john@example.com"
                                                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200"
                                                value={enquiry.email}
                                                onChange={(e) =>
                                                    setEnquiry({
                                                        ...enquiry,
                                                        email: e.target.value,
                                                    })
                                                }
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Your Message *
                                        </label>
                                        <textarea
                                            required
                                            placeholder="Tell us about your requirements..."
                                            rows="4"
                                            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200"
                                            value={enquiry.message}
                                            onChange={(e) =>
                                                setEnquiry({ ...enquiry, message: e.target.value })
                                            }
                                        ></textarea>
                                    </div>
                                    <button
                                        type="submit"
                                        className="w-full bg-orange-600 hover:bg-orange-700 text-white py-3 px-6 rounded-lg font-bold text-base shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300"
                                    >
                                        Submit Enquiry
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Related Products */}
            {subcategoryProducts && subcategoryProducts.length > 0 && (
                <section className="py-16 bg-gray-50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-bold text-gray-900 mb-3 relative inline-block">
                                Similar <span className="text-orange-600">Products</span>
                                <span className="absolute bottom-0 left-0 w-full h-1 bg-orange-500 transform translate-y-1 scale-x-75"></span>
                            </h2>
                            <p className="text-gray-600 max-w-2xl mx-auto">
                                Explore more products in the same category
                            </p>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {subcategoryProducts.map((prod) => (
                                <div
                                    key={prod._id}
                                    className="group bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-orange-200"
                                >
                                    <div className="relative h-48 overflow-hidden">
                                        <img
                                            src={prod.image || "/cement4.jpg"}
                                            alt={prod.name}
                                            className="w-full h-full object-contain p-4 transition-transform duration-500 group-hover:scale-110"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>
                                        {prod.price && (
                                            <div className="absolute top-2 right-2 bg-orange-600 text-white text-xs font-bold px-2 py-1 rounded">
                                                ${prod.price.toFixed(2)}
                                            </div>
                                        )}
                                    </div>
                                    <div className="p-5">
                                        <div className="mb-3">
                                            <h3 className="text-lg font-semibold text-gray-800 line-clamp-1">
                                                {prod.brand || prod.name}
                                            </h3>
                                            <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                                                {prod.name}
                                            </p>
                                        </div>
                                        <Link
                                            href={`/product/${prod._id}`}
                                            className="mt-4 inline-flex items-center justify-center w-full text-center bg-orange-600 hover:bg-orange-700 text-white font-medium py-2 px-4 rounded-full transition-all duration-300 shadow-sm hover:shadow-md"
                                        >
                                            View Details
                                            <svg
                                                className="ml-2 w-4 h-4"
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
                    </div>
                </section>
            )}

            <Footer />
        </div>
    );
}
