"use client";
import Link from "next/link";
import { ChevronDown, ChevronRight, Menu, X } from "lucide-react";
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
    const [expandedCategory, setExpandedCategory] = useState(null);
    const [expandedSubcategory, setExpandedSubcategory] = useState(null);

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

    const toggleCategory = (categoryId) => {
        setExpandedCategory(expandedCategory === categoryId ? null : categoryId);
        setExpandedSubcategory(null);
    };

    const toggleSubcategory = (subcategoryId) => {
        setExpandedSubcategory(expandedSubcategory === subcategoryId ? null : subcategoryId);
    };

    return (
        <header className="relative w-full bg-[#3C372F] shadow-lg">
            

            {/* Main Navigation */}
            <div className="relative w-full text-white flex items-center justify-between px-4 md:px-12 py-4">
                {/* Logo */}
                <Link href="/" className="flex items-center">
                    <div className="w-40 md:w-50 h-10 flex items-center justify-center">
                        <img src="/logo.png" alt="Steel" className="h-40 w-40" />
                    </div>
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex space-x-8 font-medium">
                    {navigationItems.map((item) => (
                        <div key={item.name} className="relative group">
                            {item.hasDropdown ? (
                                <button
                                    className="hover:text-orange-400 transition-colors flex items-center focus:outline-none py-2"
                                    onClick={(e) => e.preventDefault()}
                                >
                                    {item.name}
                                    <ChevronDown className="ml-1 w-4 h-4 group-hover:rotate-180 transition-transform" />
                                </button>
                            ) : (
                                <Link
                                    href={item.href}
                                    className="hover:text-orange-400 transition-colors flex items-center py-2"
                                >
                                    {item.name}
                                </Link>
                            )}

                            {/* Mega Dropdown for PRODUCTS */}
                            {item.hasDropdown && (
                                <div className="absolute left-1/2 top-full z-50 transform -translate-x-1/2 mt-2 w-[900px] bg-white rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 border border-gray-200">
                                    <div className="grid grid-cols-2 gap-8 p-6">
                                        {categories?.slice(0, 4).map((category) => (
                                            <div key={category._id} className="min-w-[200px]">
                                                <Link
                                                    href={`/category/${category?._id
                                                        .toLowerCase()
                                                        .replace(/ /g, "")}`}
                                                    className="font-bold text-black text-lg mb-3 hover:text-orange-500 transition-colors flex items-center"
                                                >
                                                    {category.name}
                                                    <ChevronRight className="ml-1 w-4 h-4" />
                                                </Link>
                                                <ul className="ml-2 space-y-2">
                                                    {category.subcategories?.length > 0 ? (
                                                        category.subcategories.map(
                                                            (subcategory) => (
                                                                <li
                                                                    key={subcategory._id}
                                                                    className="relative"
                                                                >
                                                                    <div className="flex items-center">
                                                                        <Link
                                                                            href={`/subcategory/${subcategory._id}`}
                                                                            className="font-medium text-gray-800 hover:text-orange-500 transition-colors"
                                                                        >
                                                                            {subcategory.name}
                                                                        </Link>
                                                                        {subcategory.products
                                                                            ?.length > 0 && (
                                                                            <button
                                                                                className="ml-1 text-gray-500 hover:text-orange-500"
                                                                                onClick={(e) => {
                                                                                    e.preventDefault();
                                                                                    toggleSubcategory(
                                                                                        subcategory._id
                                                                                    );
                                                                                }}
                                                                            >
                                                                                <ChevronDown
                                                                                    className={`w-4 h-4 transition-transform ${
                                                                                        expandedSubcategory ===
                                                                                            subcategory._id &&
                                                                                        "rotate-180"
                                                                                    }`}
                                                                                />
                                                                            </button>
                                                                        )}
                                                                    </div>
                                                                    {subcategory.products?.length >
                                                                        0 &&
                                                                        expandedSubcategory ===
                                                                            subcategory._id && (
                                                                            <ul className="ml-4 mt-1 space-y-1 bg-gray-50 p-2 rounded">
                                                                                {subcategory.products
                                                                                    .slice(0, 3)
                                                                                    .map(
                                                                                        (
                                                                                            product
                                                                                        ) => (
                                                                                            <li
                                                                                                key={
                                                                                                    product._id
                                                                                                }
                                                                                                className="text-sm text-gray-600 hover:text-orange-500 transition-colors"
                                                                                            >
                                                                                                <Link
                                                                                                    href={`/product/${product._id}`}
                                                                                                    className="block py-1 px-2 rounded hover:bg-gray-100"
                                                                                                >
                                                                                                    {product.brand ||
                                                                                                        product.name}
                                                                                                </Link>
                                                                                            </li>
                                                                                        )
                                                                                    )}
                                                                                {subcategory
                                                                                    .products
                                                                                    .length > 3 && (
                                                                                    <li className="text-xs text-gray-500 hover:text-orange-500 transition-colors">
                                                                                        <Link
                                                                                            href={`/subcategory/${subcategory._id}`}
                                                                                            className="block py-1 px-2 rounded hover:bg-gray-100 italic"
                                                                                        >
                                                                                            View all{" "}
                                                                                            {
                                                                                                subcategory
                                                                                                    .products
                                                                                                    .length
                                                                                            }{" "}
                                                                                            products
                                                                                            →
                                                                                        </Link>
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
                                    {/* <div className="bg-gray-50 px-6 py-3 rounded-b-lg border-t border-gray-200">
                                        <Link
                                            href="/products"
                                            className="text-black hover:text-orange-500 font-medium flex items-center transition-colors"
                                        >
                                            View all products
                                            <ChevronRight className="ml-1 w-4 h-4" />
                                        </Link>
                                    </div> */}
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
                    {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>

                {/* Enquiry Button - Desktop */}
                <div className="hidden md:flex relative items-center">
                    <Dialog open={enquiryOpen} onOpenChange={setEnquiryOpen}>
                        <DialogTrigger asChild>
                            <Button
                                className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-full font-medium shadow-md transition-colors"
                                onClick={() => setEnquiryOpen(true)}
                            >
                                PRODUCT ENQUIRY
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-md">
                            <DialogHeader>
                                <DialogTitle className="text-2xl font-bold text-gray-800">
                                    Product Enquiry
                                </DialogTitle>
                                <DialogDescription className="text-gray-600">
                                    Submit your enquiry and we will get back to you soon.
                                </DialogDescription>
                            </DialogHeader>
                            <form className="space-y-4" onSubmit={handleSubmit}>
                                <div>
                                    <Label htmlFor="name" className="text-gray-700">
                                        Name *
                                    </Label>
                                    <Input
                                        id="name"
                                        name="name"
                                        value={form.name}
                                        onChange={handleChange}
                                        required
                                        placeholder="Your Name"
                                        autoComplete="name"
                                        className="mt-1"
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="mobile" className="text-gray-700">
                                        Mobile *
                                    </Label>
                                    <Input
                                        id="mobile"
                                        name="mobile"
                                        value={form.mobile}
                                        onChange={handleChange}
                                        required
                                        placeholder="Your Mobile"
                                        autoComplete="tel"
                                        className="mt-1"
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="email" className="text-gray-700">
                                        Email *
                                    </Label>
                                    <Input
                                        id="email"
                                        name="email"
                                        type="email"
                                        value={form.email}
                                        onChange={handleChange}
                                        required
                                        placeholder="Your Email"
                                        autoComplete="email"
                                        className="mt-1"
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="product" className="text-gray-700">
                                        Product (optional)
                                    </Label>
                                    <Input
                                        id="product"
                                        name="product"
                                        value={form.product}
                                        onChange={handleChange}
                                        placeholder="Product of interest (e.g. Cement)"
                                        className="mt-1"
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="message" className="text-gray-700">
                                        Message *
                                    </Label>
                                    <Textarea
                                        id="message"
                                        name="message"
                                        value={form.message}
                                        onChange={handleChange}
                                        required
                                        placeholder="Your Message"
                                        rows={3}
                                        className="mt-1"
                                    />
                                </div>
                                <Button
                                    type="submit"
                                    className="w-full bg-orange-600 hover:bg-orange-700 text-white py-3 rounded-full font-bold transition-colors shadow-md"
                                    disabled={loading}
                                >
                                    {loading ? (
                                        <span className="flex items-center">
                                            <svg
                                                className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                            >
                                                <circle
                                                    className="opacity-25"
                                                    cx="12"
                                                    cy="12"
                                                    r="10"
                                                    stroke="currentColor"
                                                    strokeWidth="4"
                                                ></circle>
                                                <path
                                                    className="opacity-75"
                                                    fill="currentColor"
                                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                                ></path>
                                            </svg>
                                            Submitting...
                                        </span>
                                    ) : (
                                        "SUBMIT ENQUIRY"
                                    )}
                                </Button>
                            </form>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div className="absolute top-full left-0 w-full bg-[#3C372F] md:hidden z-50 shadow-lg max-h-[calc(100vh-120px)] overflow-y-auto">
                    <div className="flex flex-col py-2 text-gray-300">
                        {navigationItems.map((item) => (
                            <div key={item.name} className="border-b border-gray-700">
                                {item.hasDropdown ? (
                                    <>
                                        <button
                                            className="w-full flex justify-between items-center px-6 py-3 hover:text-orange-400 transition-colors text-left"
                                            onClick={() => toggleCategory(item.name)}
                                        >
                                            <span>{item.name}</span>
                                            <ChevronDown
                                                className={`w-4 h-4 transition-transform ${
                                                    expandedCategory === item.name && "rotate-180"
                                                }`}
                                            />
                                        </button>
                                        {expandedCategory === item.name && (
                                            <div className="pl-6 bg-[#2a2722]">
                                                {categories.map((category) => (
                                                    <div key={category._id}>
                                                        <button
                                                            className="w-full flex justify-between items-center px-4 py-2 hover:text-orange-400 transition-colors text-left"
                                                            onClick={() =>
                                                                toggleSubcategory(category._id)
                                                            }
                                                        >
                                                            <span>{category.name}</span>
                                                            {category.subcategories?.length > 0 && (
                                                                <ChevronDown
                                                                    className={`w-4 h-4 transition-transform ${
                                                                        expandedSubcategory ===
                                                                            category._id &&
                                                                        "rotate-180"
                                                                    }`}
                                                                />
                                                            )}
                                                        </button>
                                                        {expandedSubcategory === category._id && (
                                                            <div className="pl-4 bg-[#1f1c18]">
                                                                {category.subcategories?.map(
                                                                    (subcategory) => (
                                                                        <div
                                                                            key={subcategory._id}
                                                                            className="border-b border-gray-800"
                                                                        >
                                                                            <Link
                                                                                href={`/subcategory/${subcategory._id}`}
                                                                                className="block px-4 py-2 hover:text-orange-400 transition-colors"
                                                                                onClick={() =>
                                                                                    setMobileMenuOpen(
                                                                                        false
                                                                                    )
                                                                                }
                                                                            >
                                                                                {subcategory.name}
                                                                            </Link>
                                                                        </div>
                                                                    )
                                                                )}
                                                            </div>
                                                        )}
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </>
                                ) : (
                                    <Link
                                        className="block px-6 py-3 hover:text-orange-400 transition-colors"
                                        onClick={() => setMobileMenuOpen(false)}
                                        href={item.href || "#"}
                                    >
                                        {item.name}
                                    </Link>
                                )}
                            </div>
                        ))}

                        {/* Mobile buttons */}
                        <div className="px-6 py-4 flex flex-col space-y-4">
                            <Button
                                className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-full font-medium shadow-md transition-colors"
                                onClick={() => {
                                    setEnquiryOpen(true);
                                    setMobileMenuOpen(false);
                                }}
                            >
                                PRODUCT ENQUIRY
                            </Button>
                            <Link
                                href="/contact"
                                className="bg-white text-gray-800 text-center px-6 py-3 rounded-full font-medium hover:bg-gray-100 transition-colors shadow-md"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                CONTACT US
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
}
