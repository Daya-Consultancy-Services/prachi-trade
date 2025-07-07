"use client";

import React, { useState, useEffect } from "react";
import { Package, MessageSquare, BarChart3, Users } from "lucide-react";
import Header from "@/components/dashboard/Header";
import Sidebar from "@/components/dashboard/Sidebar";
import AdminLayout from "@/components/admin-layout";
import SummaryCard from "@/components/SummaryCard";
import { ChartAreaInteractive } from "@/components/chart-area-interactive";

const AdminDashboard = () => {
    const [products, setProducts] = useState([]);
    const [enquiries, setEnquiries] = useState([]);
    const [analytics, setAnalytics] = useState({ daily: [], weekly: [], monthly: [], yearly: [] });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("/api/products")
            .then((r) => r.json())
            .then(setProducts);
        fetch("/api/enquiries")
            .then((r) => r.json())
            .then(setEnquiries);
        fetch("/api/analytics/visits")
            .then((r) => r.json())
            .then((data) => {
                setAnalytics(data);
                setLoading(false);
            });
    }, []);

    useEffect(() => {
        console.log("Analytics", analytics);
    }, [analytics]);

    // Calculate total visitors (all time)
    const totalVisitors = analytics.yearly.reduce((sum, y) => sum + y.count, 0);
    // This month's visitors
    const thisMonth =
        analytics.monthly.length > 0 ? analytics.monthly[analytics.monthly.length - 1].count : 0;

    return (
        <div className="max-w-6xl mx-auto w-full">
            <div className="flex flex-wrap gap-6 mt-6 mb-10">
                <SummaryCard
                    icon={Users}
                    value={totalVisitors}
                    label="Total Visitors"
                    iconBg="bg-blue-100"
                    iconColor="text-blue-600"
                />
                <SummaryCard
                    icon={MessageSquare}
                    value={enquiries.length}
                    label="Total Enquiries"
                    iconBg="bg-green-100"
                    iconColor="text-green-600"
                />
                <SummaryCard
                    icon={Package}
                    value={products.length}
                    label="Total Products"
                    iconBg="bg-purple-100"
                    iconColor="text-purple-600"
                />
                <SummaryCard
                    icon={BarChart3}
                    value={thisMonth}
                    label="This Month"
                    iconBg="bg-orange-100"
                    iconColor="text-orange-600"
                />
            </div>
            <div className="mb-10">
                <ChartAreaInteractive
                    daily={analytics?.daily || []}
                    weekly={analytics?.weekly || []}
                    monthly={analytics?.monthly || []}
                    yearly={analytics?.yearly || []}
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
