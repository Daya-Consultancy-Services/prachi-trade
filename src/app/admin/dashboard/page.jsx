"use client";

import React, { useState, useEffect } from "react";
import { Package, MessageSquare, BarChart3, Users } from "lucide-react";
import Header from "@/components/dashboard/Header";
import Sidebar from "@/components/dashboard/Sidebar";
import AdminLayout from "@/components/admin-layout";
import SummaryCard from "@/components/SummaryCard";

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

    return (
        <div className="max-w-6xl mx-auto w-full">
            <div className="flex flex-wrap gap-6 mt-6 mb-10">
                <SummaryCard
                    icon={Users}
                    value={analytics.totalVisitors}
                    label="Total Visitors"
                    iconBg="bg-blue-100"
                    iconColor="text-blue-600"
                />
                <SummaryCard
                    icon={MessageSquare}
                    value={analytics.totalEnquiries}
                    label="Total Enquiries"
                    iconBg="bg-green-100"
                    iconColor="text-green-600"
                />
                <SummaryCard
                    icon={Package}
                    value={analytics.totalProducts}
                    label="Total Products"
                    iconBg="bg-purple-100"
                    iconColor="text-purple-600"
                />
                <SummaryCard
                    icon={BarChart3}
                    value={analytics.monthlyVisitors[4].visitors}
                    label="This Month"
                    iconBg="bg-orange-100"
                    iconColor="text-orange-600"
                />
            </div>
            {/* Add more dashboard content here if needed */}
        </div>
    );
};

const AdminDashboardPage = () => {
    return (
        <AdminLayout>
            <AdminDashboard />
        </AdminLayout>
    );
};

export default AdminDashboardPage;
