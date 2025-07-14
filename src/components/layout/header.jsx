"use client";
import Link from "next/link";
import { ChevronDown, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { COMPANY_INFO } from "@/lib/constants";
import { navigationItems } from "@/data/navigation";
import { useState, useEffect } from "react";
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

export default function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [categories, setCategories] = useState([]);
    const [enquiryOpen, setEnquiryOpen] = useState(false);
    const [form, setForm] = useState({ name: "", email: "", mobile: "", message: "", product: "" });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetch("/api/categories")
            .then((res) => res.json())
            .then((data) => setCategories(data));
    }, []);

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
            setEnquiryOpen(false);
        } catch (err) {
            toast.error("Submission failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <header className="relative w-full">
            {/* Top Bar */}
            <div className="relative w-full py-1.5 text-xs bg-white text-black border-b border-gray-200">
                {/* Center Email */}
                <div className="flex justify-center relative">
                    <span>{COMPANY_INFO.email}</span>
                    <span className="absolute right-4 md:right-12">{COMPANY_INFO.location}</span>
                </div>
            </div>

            {/* Main Navigation */}
            <div className="relative w-full bg-[#3C372F] text-white flex items-center justify-between px-4 md:px-12 py-4">
                {/* Left: Logo */}
                <Link href="/" className="flex items-center">
                    <div className="w-40 md:w-50 h-10 flex items-center justify-center">
                        <img src="/logo.png" alt="Steel" className="h-40 w-40" />
                    </div>
                </Link>

                {/* Center: Navigation Menu - Desktop */}
                <nav className="hidden md:flex space-x-8 font-medium">
                    {navigationItems.map((item) => (
                        <div key={item.name} className="relative group">
                            {item.hasDropdown ? (
                                <button
                                    className="hover:text-orange-500 transition-colors flex items-center focus:outline-none"
                                    onClick={(e) => e.preventDefault()}
                                >
                                    {item.name}
                                    <ChevronDown className="ml-1 w-4 h-4" />
                                </button>
                            ) : (
                                <Link
                                    href={item.href}
                                    className="hover:text-orange-500 transition-colors flex items-center"
                                >
                                    {item.name}
                                </Link>
                            )}

                            {/* Dynamic Dropdown for PRODUCTS */}
                            {item.hasDropdown && (
                                <div className="absolute left-1/2 top-full z-50 transform -translate-x-1/2 mt-4 w-[900px] bg-white rounded-lg shadow-lg p-10 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                                    <div className="grid grid-cols-2 grid-rows-2 gap-x-20 gap-y-8">
                                        {categories?.slice(0, 4).map((category) => (
                                            <div key={category._id} className="min-w-[200px]">
                                                <div className="font-bold text-blue-600 text-lg mb-2">
                                                    <Link
                                                        href={`/category/${category?._id
                                                            .toLowerCase()
                                                            .replace(/ /g, "")}`}
                                                        className="font-bold text-blue-600 text-lg mb-2 hover:underline"
                                                    >
                                                        {category.name}
                                                    </Link>
                                                </div>
                                                <ul className="ml-2 space-y-2">
                                                    {category.subcategories?.length > 0 ? (
                                                        category.subcategories.map(
                                                            (subcategory) => (
                                                                <li key={subcategory._id}>
                                                                    <Link
                                                                        href={`/subcategory/${subcategory._id}`}
                                                                        className="font-medium text-gray-800 hover:text-orange-600 cursor-pointer"
                                                                    >
                                                                        {subcategory.name}
                                                                    </Link>
                                                                    {subcategory.products?.length >
                                                                        0 && (
                                                                        <ul className="ml-4 mt-1 space-y-1">
                                                                            {subcategory.products
                                                                                .slice(0, 5)
                                                                                .map((product) => (
                                                                                    <li
                                                                                        key={
                                                                                            product._id
                                                                                        }
                                                                                        className="text-xs text-gray-600 hover:text-orange-600 cursor-pointer"
                                                                                    >
                                                                                        <Link
                                                                                            href={`/product/${product._id}`}
                                                                                        >
                                                                                            {product.brand ||
                                                                                                product.name}
                                                                                        </Link>
                                                                                    </li>
                                                                                ))}
                                                                            {subcategory.products
                                                                                .length > 5 && (
                                                                                <li className="text-xs text-gray-500 italic">
                                                                                    +
                                                                                    {subcategory
                                                                                        .products
                                                                                        .length -
                                                                                        5}{" "}
                                                                                    more
                                                                                </li>
                                                                            )}
                                                                        </ul>
                                                                    )}
                                                                </li>
                                                            )
                                                        )
                                                    ) : (
                                                        <li className="text-xs text-gray-400 italic">
                                                            No subcategories
                                                        </li>
                                                    )}
                                                </ul>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </nav>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden text-white focus:outline-none"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                    <Menu className="w-6 h-6" />
                </button>

                {/* Right: Enquiry and Contact Button - Desktop */}
                <div className="hidden md:flex relative items-center space-x-4">
                    {/* Product Enquiry Button */}
                    <Dialog open={enquiryOpen} onOpenChange={setEnquiryOpen}>
                        <DialogTrigger asChild>
                            <Button
                                className="bg-white text-gray-800 hover:bg-gray-100 px-6 py-2 rounded-full font-medium"
                                onClick={() => setEnquiryOpen(true)}
                            >
                                PRODUCT ENQUIRY
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Product Enquiry</DialogTitle>
                                <DialogDescription>
                                    Submit your enquiry and we will get back to you soon.
                                </DialogDescription>
                            </DialogHeader>
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
                        </DialogContent>
                    </Dialog>
                    {/* Vertical Contact Button */}
                    <div className="bg-orange-500 absolute -right-3 top-8 text-white text-sm px-8 py-2 rotate-90 origin-bottom-right cursor-pointer hover:bg-orange-600">
                        <Link href="/contact">
                            <span className="p-2 rotate-90"> Contact</span>
                        </Link>
                    </div>
                </div>

                {/* Mobile Menu - Dropdown */}
                {mobileMenuOpen && (
                    <div className="absolute top-full left-0 w-full bg-[#3C372F] md:hidden z-50 shadow-lg">
                        <div className="flex flex-col py-4">
                            {navigationItems.map((item) => (
                                <div key={item.name} className="border-b border-gray-700">
                                    <Link
                                        className="block px-6 py-3 hover:text-orange-500 transition-colors"
                                        onClick={() => setMobileMenuOpen(false)}
                                        href={item.href || "#"}
                                    >
                                        {item.name}
                                    </Link>
                                    {/* Dynamic Dropdown for PRODUCTS (Mobile) */}
                                    {item.hasDropdown && (
                                        <div className="pl-8 bg-gray-800">
                                            {categories.map((category) => (
                                                <div key={category._id}>
                                                    <Link
                                                        href={`/category/${category._id}`}
                                                        className="block px-4 py-2 hover:text-orange-500"
                                                        onClick={() => setMobileMenuOpen(false)}
                                                    >
                                                        {category.name}
                                                    </Link>
                                                    {category.subcategories?.length > 0 && (
                                                        <div className="pl-4">
                                                            {category.subcategories.map(
                                                                (subcategory) => (
                                                                    <Link
                                                                        key={subcategory._id}
                                                                        href={`/subcategory/${subcategory._id}`}
                                                                        className="block px-4 py-2 hover:text-orange-500"
                                                                        onClick={() =>
                                                                            setMobileMenuOpen(false)
                                                                        }
                                                                    >
                                                                        {subcategory.name}
                                                                    </Link>
                                                                )
                                                            )}
                                                        </div>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}

                            {/* Mobile buttons */}
                            <div className="px-6 py-4 flex flex-col space-y-4">
                                <Button
                                    className="bg-white text-gray-800 hover:bg-gray-100 px-6 py-2 rounded-full font-medium w-full"
                                    onClick={() => setEnquiryOpen(true)}
                                >
                                    PRODUCT ENQUIRY
                                </Button>
                                <Link
                                    href="/contact"
                                    className="bg-orange-500 text-white text-center px-6 py-2 rounded-full font-medium hover:bg-orange-600"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    CONTACT
                                </Link>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </header>
    );
}
