"use client";

import { BarChart3, Package, MessageSquare, Users, LogOut, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Sidebar = ({ sidebarOpen, setSidebarOpen, enquiries }) => {
    const pathname = usePathname();

    const handleLogout = () => {
        localStorage.removeItem("token");
        window.location.href = "/admin-portal-xyz-login";
    };

    return (
        <div
            className={`fixed inset-y-0 left-0 z-50 w-64 bg-gray-900 transform ${
                sidebarOpen ? "translate-x-0" : "-translate-x-full"
            } transition-transform duration-200 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}
        >
            <div className="flex items-center justify-between p-4 border-b border-gray-700">
                <h2 className="text-xl font-bold text-white">Admin Panel</h2>
                <Link href="/admin/dashboard" className="lg:hidden text-gray-400 hover:text-white">
                    <X size={24} />
                </Link>
            </div>
            <nav className="mt-8">
                <div className="px-4 space-y-2">
                    <Link
                        href="/admin/dashboard"
                        className={`w-full flex items-center px-4 py-2 text-left rounded-lg transition-colors ${
                            pathname === "/admin/dashboard"
                                ? "bg-blue-600 text-white"
                                : "text-gray-300 hover:bg-gray-700"
                        }`}
                    >
                        <BarChart3 className="mr-3" size={20} />
                        Dashboard
                    </Link>
                    <Link
                        href="/admin/products"
                        className={`w-full flex items-center px-4 py-2 text-left rounded-lg transition-colors ${
                            pathname === "/admin/products"
                                ? "bg-blue-600 text-white"
                                : "text-gray-300 hover:bg-gray-700"
                        }`}
                    >
                        <Package className="mr-3" size={20} />
                        Products
                    </Link>
                    <Link
                        href="/admin/enquiries"
                        className={`w-full flex items-center px-4 py-2 text-left rounded-lg transition-colors ${
                            pathname === "/admin/enquiries"
                                ? "bg-blue-600 text-white"
                                : "text-gray-300 hover:bg-gray-700"
                        }`}
                    >
                        <MessageSquare className="mr-3" size={20} />
                        Enquiries
                        {enquiries.filter((e) => e.status === "unread").length > 0 && (
                            <span className="ml-auto bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                                {enquiries.filter((e) => e.status === "unread").length}
                            </span>
                        )}
                    </Link>
                    <Link
                        href="/admin/analytics"
                        className={`w-full flex items-center px-4 py-2 text-left rounded-lg transition-colors ${
                            pathname === "/admin/analytics"
                                ? "bg-blue-600 text-white"
                                : "text-gray-300 hover:bg-gray-700"
                        }`}
                    >
                        <Users className="mr-3" size={20} />
                        Analytics
                    </Link>
                </div>
                <div className="absolute bottom-4 left-4 right-4">
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center px-4 py-2 text-gray-300 hover:bg-gray-700 rounded-lg transition-colors"
                    >
                        <LogOut className="mr-3" size={20} />
                        Logout
                    </button>
                </div>
            </nav>
        </div>
    );
};

export default Sidebar;
