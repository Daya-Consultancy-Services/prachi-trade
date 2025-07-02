"use client";

import React, { useState, useEffect } from "react";
import {
    Package,
    MessageSquare,
    BarChart3,
    Users,
    LogOut,
    Plus,
    Eye,
    Edit,
    Trash2,
    Search,
    Menu,
    X,
} from "lucide-react";
import Header from "./dashboard/Header";
import Sidebar from "./dashboard/Sidebar";

const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState("dashboard");
    const [products, setProducts] = useState([]);
    const [enquiries, setEnquiries] = useState([]);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [user, setUser] = useState({ name: "Admin User", email: "admin@buildingmaterials.com" });

    // Fetch products and enquiries from API
    useEffect(() => {
        fetch("/api/products")
            .then((r) => r.json())
            .then(setProducts);
    }, []);

    // Analytics data
    const analytics = {
        totalVisitors: 1250, // TODO: Replace with real analytics if available
        totalEnquiries: enquiries.length,
        totalProducts: products.length,
        monthlyVisitors: [
            { month: "Jan", visitors: 320 },
            { month: "Feb", visitors: 450 },
            { month: "Mar", visitors: 280 },
            { month: "Apr", visitors: 380 },
            { month: "May", visitors: 520 },
        ],
    };

    const DashboardContent = () => (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <div className="flex items-center">
                    <div className="p-2 bg-blue-100 rounded-lg">
                        <Users className="w-6 h-6 text-blue-600" />
                    </div>
                    <div className="ml-4">
                        <p className="text-sm font-medium text-gray-600">Total Visitors</p>
                        <p className="text-2xl font-semibold text-gray-900">
                            {analytics.totalVisitors}
                        </p>
                    </div>
                </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <div className="flex items-center">
                    <div className="p-2 bg-green-100 rounded-lg">
                        <MessageSquare className="w-6 h-6 text-green-600" />
                    </div>
                    <div className="ml-4">
                        <p className="text-sm font-medium text-gray-600">Total Enquiries</p>
                        <p className="text-2xl font-semibold text-gray-900">
                            {analytics.totalEnquiries}
                        </p>
                    </div>
                </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <div className="flex items-center">
                    <div className="p-2 bg-purple-100 rounded-lg">
                        <Package className="w-6 h-6 text-purple-600" />
                    </div>
                    <div className="ml-4">
                        <p className="text-sm font-medium text-gray-600">Total Products</p>
                        <p className="text-2xl font-semibold text-gray-900">
                            {analytics.totalProducts}
                        </p>
                    </div>
                </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <div className="flex items-center">
                    <div className="p-2 bg-orange-100 rounded-lg">
                        <BarChart3 className="w-6 h-6 text-orange-600" />
                    </div>
                    <div className="ml-4">
                        <p className="text-sm font-medium text-gray-600">This Month</p>
                        <p className="text-2xl font-semibold text-gray-900">520</p>
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <div className="flex h-screen bg-gray-800">
            <Sidebar
                sidebarOpen={sidebarOpen}
                setSidebarOpen={setSidebarOpen}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                enquiries={enquiries}
            />
            {sidebarOpen && (
                <div
                    className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                ></div>
            )}
            <div className="flex-1 flex flex-col overflow-hidden">
                <Header activeTab={activeTab} user={user} setSidebarOpen={setSidebarOpen} />
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6 lg:ml-64">
                    {/* {renderContent()} */}
                </main>
            </div>
        </div>
    );
};

export default AdminDashboard;
