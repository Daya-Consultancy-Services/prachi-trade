"use client";

import AdminLayout from "@/components/admin-layout";
import { useState } from "react";

const AnalyticsContent = () => {
    const [enquiries, setEnquiries] = useState([]);
    const [products, setProducts] = useState([]);

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
        <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Monthly Visitors</h3>
                    <div className="space-y-3">
                        {analytics.monthlyVisitors.map((item) => (
                            <div key={item.month} className="flex items-center justify-between">
                                <span className="text-sm text-gray-600">{item.month}</span>
                                <div className="flex items-center space-x-2">
                                    <div className="w-32 bg-gray-200 rounded-full h-2">
                                        <div
                                            className="bg-blue-600 h-2 rounded-full"
                                            style={{ width: `${(item.visitors / 600) * 100}%` }}
                                        ></div>
                                    </div>
                                    <span className="text-sm font-medium text-gray-900 w-12 text-right">
                                        {item.visitors}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Activity</h3>
                    <div className="space-y-3">
                        <div className="flex items-center space-x-3">
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            <span className="text-sm text-gray-600">New enquiry from John Doe</span>
                        </div>
                        <div className="flex items-center space-x-3">
                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                            <span className="text-sm text-gray-600">
                                Product added: TMT Steel Bars
                            </span>
                        </div>
                        <div className="flex items-center space-x-3">
                            <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                            <span className="text-sm text-gray-600">
                                Price updated for Portland Cement
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const AnalyticsPage = () => {
    <AdminLayout>
        <AnalyticsContent />
    </AdminLayout>;
};

export default AnalyticsPage;
