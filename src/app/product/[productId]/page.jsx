"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { Skeleton } from "@/components/ui/skeleton";

export default function ProductDetailPage() {
    const { productId } = useParams();
    const [product, setProduct] = useState(null);
    const [enquiry, setEnquiry] = useState({ name: "", email: "", mobile: "", message: "" });
    const [enquiryStatus, setEnquiryStatus] = useState(null);

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
            {/* Product Enquiry Form */}
            <section className="py-8 bg-gray-50">
                <div className="max-w-xl mx-auto bg-white rounded-lg shadow-md p-8">
                    <h3 className="text-2xl font-bold mb-4 text-center text-gray-800">
                        Product Enquiry
                    </h3>
                    {enquiryStatus && (
                        <div
                            className={`mb-4 text-center font-semibold ${
                                enquiryStatus.success ? "text-green-600" : "text-red-600"
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
                                setEnquiry({ name: "", email: "", mobile: "", message: "" });
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
                        <input
                            type="text"
                            required
                            placeholder="Your Name"
                            className="w-full border rounded px-4 py-2"
                            value={enquiry.name}
                            onChange={(e) => setEnquiry({ ...enquiry, name: e.target.value })}
                        />
                        <input
                            type="email"
                            required
                            placeholder="Your Email"
                            className="w-full border rounded px-4 py-2"
                            value={enquiry.email}
                            onChange={(e) => setEnquiry({ ...enquiry, email: e.target.value })}
                        />
                        <input
                            type="tel"
                            required
                            placeholder="Your Mobile"
                            className="w-full border rounded px-4 py-2"
                            value={enquiry.mobile}
                            onChange={(e) => setEnquiry({ ...enquiry, mobile: e.target.value })}
                        />
                        <textarea
                            required
                            placeholder="Your Message"
                            className="w-full border rounded px-4 py-2"
                            rows={4}
                            value={enquiry.message}
                            onChange={(e) => setEnquiry({ ...enquiry, message: e.target.value })}
                        />
                        <button
                            type="submit"
                            className="w-full bg-orange-600 text-white py-2 px-4 rounded font-bold hover:bg-orange-700 transition"
                        >
                            Submit Enquiry
                        </button>
                    </form>
                </div>
            </section>
            <Footer />
        </div>
    );
}
