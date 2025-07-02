"use client";

import { Menu } from "lucide-react";
import { usePathname } from "next/navigation";

const getPageTitle = (pathname) => {
    if (pathname.includes("/admin/products")) return "Products";
    if (pathname.includes("/admin/enquiries")) return "Enquiries";
    if (pathname.includes("/admin/analytics")) return "Analytics";
    return "Dashboard";
};

const Header = ({ user, setSidebarOpen }) => {
    const pathname = usePathname();
    const pageTitle = getPageTitle(pathname);
    return (
        <header className="bg-white shadow-sm border-b border-gray-200">
            <div className="flex items-center justify-between px-4 py-4">
                <div className="flex items-center">
                    <button
                        onClick={() => setSidebarOpen(true)}
                        className="lg:hidden text-gray-600 hover:text-gray-900 mr-4"
                    >
                        <Menu size={24} />
                    </button>
                    <h1 className="text-2xl font-semibold text-gray-900 capitalize">{pageTitle}</h1>
                </div>
                <div className="flex items-center space-x-4">
                    <div className="text-right">
                        <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                        <p className="text-xs text-gray-500">{user?.email}</p>
                    </div>
                    <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                        <span className="text-white text-sm font-medium">
                            {user?.name?.charAt(0)}
                        </span>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
