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

    useEffect(() => {
        setLoading(true);
        fetch("/api/products")
            .then((res) => res.json())
            .then((products) => {
                const found = products.find((prod) => prod._id === productId);
                setProduct(found);

                if (found && found.subcategory) {
                    // Fetch all products in the same subcategory
                    fetch("/api/subcategories")
                        .then((res) => res.json())
                        .then((subcategories) => {
                            const sub = subcategories.find((s) => s._id === found.subcategory);
                            setSubcategoryProducts(
                                sub?.products?.filter((p) => p._id !== productId) || []
                            );
                            setLoading(false);
                        });
                } else {
                    setSubcategoryProducts([]);
                    setLoading(false);
                }
            });
    }, [productId]);

    if (loading || !product)
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
                <div className="max-w-6xl mx-auto px-4 py-12">
                    <div className="grid lg:grid-cols-2 gap-8">
                        <Skeleton className="w-full h-96 rounded-2xl shadow-lg" />
                        <div className="space-y-6">
                            <Skeleton className="h-12 w-3/4" />
                            <Skeleton className="h-8 w-1/2" />
                            <Skeleton className="h-6 w-full" />
                            <Skeleton className="h-6 w-2/3" />
                            <div className="flex gap-4">
                                <Skeleton className="h-16 w-32" />
                                <Skeleton className="h-16 w-32" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );

    return (
        <div className="min-h-screen bg-white">
            <Header />

            {/* Hero Section */}
            <section className="py-10 bg-orange-50">
                <div className="max-w-6xl mx-auto px-4">
                    <div className="grid lg:grid-cols-2 gap-8 items-center">
                        {/* Product Image */}
                        <div className="relative">
                            <div className="relative bg-white rounded-xl overflow-hidden border border-gray-100">
                                {!imageLoaded && (
                                    <div className="w-full h-80 bg-gray-200 animate-pulse rounded-xl"></div>
                                )}
                                <img
                                    src={product.image || "/cement4.jpg"}
                                    alt={product.name}
                                    className={`w-full h-80 object-cover transition-all duration-500 ${
                                        imageLoaded ? "opacity-100" : "opacity-0"
                                    }`}
                                    onLoad={() => setImageLoaded(true)}
                                />
                            </div>
                        </div>

                        {/* Product Details */}
                        <div className="space-y-4">
                            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 leading-tight">
                                {product.name}
                            </h1>
                            {product.brand && (
                                <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-base font-semibold">
                                    {product.brand}
                                </span>
                            )}
                            <p className="text-base text-gray-600 leading-relaxed">
                                {product.description}
                            </p>
                            {/* CTA Button */}
                            <div className="pt-2">
                                <button
                                    onClick={() =>
                                        document
                                            .getElementById("enquiry-form")
                                            .scrollIntoView({ behavior: "smooth" })
                                    }
                                    className="w-full bg-orange-600 text-white py-3 px-6 rounded-lg font-bold text-base shadow hover:shadow-md transform hover:scale-105 transition-all duration-300"
                                >
                                    Get Quote Now
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Product Enquiry Form */}
            <section id="enquiry-form" className="py-10 bg-white">
                <div className="max-w-4xl mx-auto px-4">
                    <div className="text-center mb-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">Get Product Quote</h2>
                        <p className="text-base text-gray-600 max-w-2xl mx-auto">
                            Fill out the form below and we'll get back to you about this product.
                        </p>
                    </div>
                    <div className="max-w-2xl mx-auto">
                        <div className="bg-white rounded-xl shadow p-6 border border-gray-100">
                            {enquiryStatus && (
                                <div
                                    className={`mb-4 p-3 rounded-xl text-center font-semibold ${
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
                                        body: JSON.stringify({ ...enquiry, product: product.name }),
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
                                            message: "Enquiry submitted successfully!",
                                        });
                                    } else {
                                        const data = await res.json();
                                        setEnquiryStatus({
                                            success: false,
                                            message: data.error || "Failed to submit enquiry.",
                                        });
                                    }
                                }}
                                className="space-y-4"
                            >
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div className="space-y-1">
                                        <label className="block text-sm font-semibold text-gray-700">
                                            Your Name *
                                        </label>
                                        <input
                                            type="text"
                                            required
                                            placeholder="Enter your full name"
                                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200"
                                            value={enquiry.name}
                                            onChange={(e) =>
                                                setEnquiry({ ...enquiry, name: e.target.value })
                                            }
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="block text-sm font-semibold text-gray-700">
                                            Mobile Number *
                                        </label>
                                        <input
                                            type="tel"
                                            required
                                            placeholder="Enter your mobile number"
                                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200"
                                            value={enquiry.mobile}
                                            onChange={(e) =>
                                                setEnquiry({ ...enquiry, mobile: e.target.value })
                                            }
                                        />
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <label className="block text-sm font-semibold text-gray-700">
                                        Email Address
                                    </label>
                                    <input
                                        type="email"
                                        placeholder="Enter your email address"
                                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200"
                                        value={enquiry.email}
                                        onChange={(e) =>
                                            setEnquiry({ ...enquiry, email: e.target.value })
                                        }
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="block text-sm font-semibold text-gray-700">
                                        Your Message *
                                    </label>
                                    <textarea
                                        required
                                        placeholder="Tell us about your requirements, quantity needed, or any specific questions..."
                                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 resize-none"
                                        rows={4}
                                        value={enquiry.message}
                                        onChange={(e) =>
                                            setEnquiry({ ...enquiry, message: e.target.value })
                                        }
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="w-full bg-orange-600 text-white py-3 px-6 rounded-lg font-bold text-base shadow hover:shadow-md transform hover:scale-105 transition-all duration-300"
                                >
                                    Submit Enquiry
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>

            {/* Related Products */}
            {subcategoryProducts.length > 0 && (
                <section className="py-10 bg-gray-50">
                    <div className="max-w-7xl mx-auto px-4">
                        <div className="text-center mb-8">
                            <h2 className="text-xl font-bold text-gray-900 mb-2">
                                More in {product.subcategoryName || "this category"}
                            </h2>
                            <p className="text-base text-gray-600">
                                Explore other products that might interest you
                            </p>
                        </div>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {subcategoryProducts.map((prod) => (
                                <div
                                    key={prod._id}
                                    className="group bg-white rounded-xl shadow hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
                                >
                                    <div className="relative overflow-hidden">
                                        <img
                                            src={prod.image || "/cement4.jpg"}
                                            alt={prod.name}
                                            className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
                                        />
                                    </div>
                                    <div className="p-4">
                                        <div className="mb-2">
                                            <h3 className="text-lg font-bold text-gray-900 mb-1 line-clamp-2">
                                                {prod.brand || prod.name}
                                            </h3>
                                            <p className="text-xs text-gray-600 line-clamp-2">
                                                {prod.name}
                                            </p>
                                        </div>
                                        <Link href={`/product/${prod._id}`}>
                                            <button className="w-full bg-orange-600 text-white py-2 px-4 rounded-lg font-semibold hover:shadow-md transform hover:scale-105 transition-all duration-300">
                                                View Details
                                            </button>
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
