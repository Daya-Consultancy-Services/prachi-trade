"use client";
import Link from "next/link";
import { ChevronDown, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { COMPANY_INFO } from "@/lib/constants";
import { navigationItems } from "@/data/navigation";
import { useState, useEffect } from "react";

export default function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [categories, setCategories] = useState([]);
    const [subcategories, setSubcategories] = useState([]);

    useEffect(() => {
        fetch("/api/categories")
            .then((res) => res.json())
            .then((data) => setCategories(data));
        fetch("/api/subcategories")
            .then((res) => res.json())
            .then((data) => setSubcategories(data));
    }, []);

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
                                        {categories.slice(0, 4).map((cat) => {
                                            // Gather all products from all subcategories of this category
                                            const products = subcategories
                                                .filter((sub) => sub.category === cat._id)
                                                .flatMap((sub) => sub.products || []);

                                            return (
                                                <div key={cat._id} className="min-w-[200px]">
                                                    <div className="font-bold text-blue-600 text-lg mb-2">
                                                        <Link
                                                            href={`/${cat.name
                                                                .toLowerCase()
                                                                .replace(/ /g, "")}`}
                                                            className="font-bold text-blue-600 text-lg mb-2 hover:underline"
                                                        >
                                                            {cat.name}
                                                        </Link>
                                                    </div>
                                                    <ul className="ml-2 space-y-1">
                                                        {products.length > 0 ? (
                                                            products.map((prod) => (
                                                                <li
                                                                    key={prod._id}
                                                                    className="text-sm text-gray-800 hover:text-orange-600 cursor-pointer"
                                                                >
                                                                    <Link
                                                                        href={`/product/${prod._id}`}
                                                                    >
                                                                        {prod.brand}
                                                                    </Link>
                                                                </li>
                                                            ))
                                                        ) : (
                                                            <li className="text-xs text-gray-400 italic">
                                                                No products
                                                            </li>
                                                        )}
                                                    </ul>
                                                </div>
                                            );
                                        })}
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
                    <Button className="bg-white text-gray-800 hover:bg-gray-100 px-6 py-2 rounded-full font-medium">
                        PRODUCT ENQUIRY
                    </Button>

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
                                            {categories.map((cat) => (
                                                <div key={cat._id}>
                                                    <Link
                                                        href={`/category/${cat._id}`}
                                                        className="block px-4 py-2 hover:text-orange-500"
                                                        onClick={() => setMobileMenuOpen(false)}
                                                    >
                                                        {cat.name}
                                                    </Link>
                                                    {cat.subcategories &&
                                                        cat.subcategories.length > 0 && (
                                                            <div className="pl-4">
                                                                {cat.subcategories.map((sub) => (
                                                                    <Link
                                                                        key={sub._id}
                                                                        href={`/subcategory/${sub._id}`}
                                                                        className="block px-4 py-2 hover:text-orange-500"
                                                                        onClick={() =>
                                                                            setMobileMenuOpen(false)
                                                                        }
                                                                    >
                                                                        {sub.name}
                                                                    </Link>
                                                                ))}
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
                                <Button className="bg-white text-gray-800 hover:bg-gray-100 px-6 py-2 rounded-full font-medium w-full">
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
