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
        fetch("/api/enquiries")
            .then((r) => r.json())
            .then(setEnquiries);
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

    const EnquiriesContent = () => (
        <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200">
                    <h3 className="text-lg font-medium text-gray-900">Customer Enquiries</h3>
                </div>
                <div className="divide-y divide-gray-200">
                    {enquiries.map((enquiry) => (
                        <div
                            key={enquiry._id || enquiry.id}
                            className={`p-6 ${
                                enquiry.status === "unread" ? "bg-blue-50" : "bg-white"
                            }`}
                        >
                            <div className="flex items-start justify-between">
                                <div className="flex-1">
                                    <div className="flex items-center space-x-2">
                                        <h4 className="text-sm font-medium text-gray-900">
                                            {enquiry.name}
                                        </h4>
                                        <span className="text-sm text-gray-500">
                                            {enquiry.email}
                                        </span>
                                        {enquiry.status === "unread" && (
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                                New
                                            </span>
                                        )}
                                    </div>
                                    <p className="mt-2 text-sm text-gray-600">{enquiry.message}</p>
                                </div>
                                <span className="text-xs text-gray-400">
                                    {enquiry.createdAt
                                        ? new Date(enquiry.createdAt).toLocaleDateString()
                                        : ""}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );

    const AnalyticsContent = () => (
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

    const renderContent = () => {
        switch (activeTab) {
            case "dashboard":
                return <DashboardContent />;
            case "products":
                return <ProductsContent />;
            case "enquiries":
                return <EnquiriesContent />;
            case "analytics":
                return <AnalyticsContent />;
            default:
                return <DashboardContent />;
        }
    };

    return (
        <div className="flex h-screen bg-gray-100">
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
                    {renderContent()}
                </main>
            </div>
        </div>
    );
};

export default AdminDashboard;
