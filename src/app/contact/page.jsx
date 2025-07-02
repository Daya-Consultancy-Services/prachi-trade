"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function ContactModal() {
    const [isOpen, setIsOpen] = useState(true);
    const [form, setForm] = useState({ name: "", email: "", mobile: "", message: "", product: "" });
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await fetch("/api/enquiries", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });
            if (!res.ok) throw new Error("Failed to submit enquiry");
            toast.success("Thank you for your enquiry! We will get back to you soon.");
            setForm({ name: "", email: "", mobile: "", message: "", product: "" });
            setTimeout(() => router.push("/"), 2000);
        } catch (err) {
            toast.error("Submission failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            {isOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white rounded-xl p-8 w-full max-w-md relative shadow-xl">
                        {/* Close Button */}
                        <button
                            onClick={() => router.push("/")}
                            className="absolute top-2 right-2 text-black font-bold text-2xl hover:text-orange-600 transition"
                            aria-label="Close"
                        >
                            &times;
                        </button>
                        <h2 className="text-3xl font-bold mb-6 text-center text-orange-600">
                            Contact Us
                        </h2>
                        <form className="space-y-4" onSubmit={handleSubmit}>
                            <div>
                                <Label htmlFor="name">Name *</Label>
                                <Input
                                    id="name"
                                    name="name"
                                    value={form.name}
                                    onChange={handleChange}
                                    required
                                    placeholder="Your Name"
                                    autoComplete="name"
                                />
                            </div>
                            <div>
                                <Label htmlFor="mobile">Mobile *</Label>
                                <Input
                                    id="mobile"
                                    name="mobile"
                                    value={form.mobile}
                                    onChange={handleChange}
                                    required
                                    placeholder="Your Mobile"
                                    autoComplete="tel"
                                />
                            </div>
                            <div>
                                <Label htmlFor="email">Email *</Label>
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    value={form.email}
                                    onChange={handleChange}
                                    required
                                    placeholder="Your Email"
                                    autoComplete="email"
                                />
                            </div>
                            <div>
                                <Label htmlFor="product">Product (optional)</Label>
                                <Input
                                    id="product"
                                    name="product"
                                    value={form.product}
                                    onChange={handleChange}
                                    placeholder="Product of interest (e.g. Cement)"
                                />
                            </div>
                            <div>
                                <Label htmlFor="message">Message *</Label>
                                <Textarea
                                    id="message"
                                    name="message"
                                    value={form.message}
                                    onChange={handleChange}
                                    required
                                    placeholder="Your Message"
                                    rows={3}
                                />
                            </div>
                            <Button
                                type="submit"
                                className="w-full bg-orange-600 text-white py-2 rounded-full font-bold hover:bg-orange-700 transition"
                                disabled={loading}
                            >
                                {loading ? "Submitting..." : "SUBMIT"}
                            </Button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
