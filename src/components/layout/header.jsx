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

    useEffect(() => {
        fetch("/api/categories")
            .then((res) => res.json())
            .then((data) => setCategories(data));
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
                                <div className="absolute top-full left-0 mt-2 w-56 bg-white text-gray-800 rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                                    <div className="py-2">
                                        {categories.map((cat) => (
                                            <div key={cat._id} className="group/parent relative">
                                                <Link
                                                    href={`/category/${cat._id}`}
                                                    className="block px-4 py-2 hover:bg-gray-100 whitespace-nowrap"
                                                >
                                                    {cat.name}
                                                </Link>
                                                {/* Subcategories as nested menu */}
                                                {cat.subcategories &&
                                                    cat.subcategories.length > 0 && (
                                                        <div className="absolute left-full top-0 mt-0 ml-1 w-48 bg-white text-gray-800 rounded-md shadow-lg opacity-0 invisible group-hover/parent:opacity-100 group-hover/parent:visible transition-all duration-200 z-50">
                                                            {cat.subcategories.map((sub) => (
                                                                <Link
                                                                    key={sub._id}
                                                                    href={`/subcategory/${sub._id}`}
                                                                    className="block px-4 py-2 hover:bg-gray-100 whitespace-nowrap"
                                                                >
                                                                    {sub.name}
                                                                </Link>
                                                            ))}
                                                        </div>
                                                    )}
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
