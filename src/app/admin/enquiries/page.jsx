"use client";

import { useEffect, useState } from "react";
import {
    MessageSquare,
    Search,
    Filter,
    Eye,
    Mail,
    Phone,
    Calendar,
    ChevronDown,
    Clock,
    User,
    MessageCircle,
} from "lucide-react";
import AdminLayout from "@/components/admin-layout";
import SummaryCard from "@/components/SummaryCard";

const EnquiriesContent = () => {
    const [enquiries, setEnquiries] = useState([]);
    const [filteredEnquiries, setFilteredEnquiries] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedEnquiry, setSelectedEnquiry] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetch dynamic data from API
        const fetchEnquiries = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const res = await fetch("/api/enquiries");
                if (!res.ok) throw new Error("Failed to fetch enquiries");
                const data = await res.json();
                setEnquiries(data);
                setFilteredEnquiries(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        };
        fetchEnquiries();
    }, []);

    useEffect(() => {
        let filtered = enquiries;
        // Filter by search term
        if (searchTerm) {
            filtered = filtered.filter(
                (enquiry) =>
                    enquiry.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    enquiry.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    enquiry.message.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }
        setFilteredEnquiries(filtered);
    }, [searchTerm, enquiries]);

    const getTimeAgo = (dateString) => {
        const date = new Date(dateString);
        const now = new Date();
        const diffMs = now - date;
        const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
        const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
        if (diffDays > 0) return `${diffDays} day${diffDays > 1 ? "s" : ""} ago`;
        if (diffHours > 0) return `${diffHours} hour${diffHours > 1 ? "s" : ""} ago`;
        return "Just now";
    };

    const todayCount = enquiries.filter((e) => {
        const today = new Date();
        const enquiryDate = new Date(e.createdAt);
        return enquiryDate.toDateString() === today.toDateString();
    }).length;

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-96">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center min-h-96">
                <div className="text-red-600">{error}</div>
            </div>
        );
    }

    return (
        <div className="p-6 space-y-6">
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <SummaryCard
                    icon={MessageSquare}
                    value={enquiries.length}
                    label="Total Enquiries"
                    iconBg="bg-blue-100"
                    iconColor="text-blue-600"
                />
                <SummaryCard
                    icon={Calendar}
                    value={todayCount}
                    label="Today's Enquiries"
                    iconBg="bg-green-100"
                    iconColor="text-green-600"
                />
            </div>

            {/* Search */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                    <div className="flex-1 relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Search enquiries by name, email, or message..."
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>
            </div>

            {/* Enquiries List */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                {filteredEnquiries.length === 0 ? (
                    <div className="p-12 text-center">
                        <MessageCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 mb-2">
                            No enquiries found
                        </h3>
                        <p className="text-gray-500">
                            {searchTerm
                                ? "Try adjusting your search criteria."
                                : "New enquiries will appear here."}
                        </p>
                    </div>
                ) : (
                    <div className="divide-y divide-gray-200">
                        {filteredEnquiries.map((enquiry) => (
                            <div
                                key={enquiry._id}
                                className={
                                    "p-6 transition-all duration-200 hover:bg-gray-50 cursor-pointer bg-white"
                                }
                                onClick={() => setSelectedEnquiry(enquiry)}
                            >
                                <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                        <div className="flex items-center space-x-3 mb-3">
                                            <div className="flex items-center space-x-2">
                                                <User className="w-4 h-4 text-gray-400" />
                                                <h4 className="text-base font-semibold text-gray-900">
                                                    {enquiry.name}
                                                </h4>
                                            </div>
                                        </div>
                                        <div className="flex items-center space-x-6 text-sm text-gray-600 mb-3">
                                            <div className="flex items-center space-x-1">
                                                <Mail className="w-4 h-4" />
                                                <span>{enquiry.email}</span>
                                            </div>
                                            {enquiry.mobile && (
                                                <div className="flex items-center space-x-1">
                                                    <Phone className="w-4 h-4" />
                                                    <span>{enquiry.mobile}</span>
                                                </div>
                                            )}
                                            {enquiry.product && (
                                                <div className="flex items-center space-x-1">
                                                    <span className="font-medium">Product:</span>
                                                    <span>{enquiry.product}</span>
                                                </div>
                                            )}
                                        </div>
                                        <p className="text-sm text-gray-700 line-clamp-2 mb-3">
                                            {enquiry.message}
                                        </p>
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center space-x-1 text-xs text-gray-500">
                                                <Clock className="w-3 h-3" />
                                                <span>{getTimeAgo(enquiry.createdAt)}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Selected Enquiry Modal */}
            {selectedEnquiry && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-xl max-w-2xl w-full max-h-[80vh] overflow-y-auto">
                        <div className="p-6 border-b border-gray-200">
                            <div className="flex items-center justify-between">
                                <h3 className="text-lg font-semibold text-gray-900">
                                    Enquiry Details
                                </h3>
                                <button
                                    onClick={() => setSelectedEnquiry(null)}
                                    className="text-gray-400 hover:text-gray-600"
                                >
                                    ×
                                </button>
                            </div>
                        </div>
                        <div className="p-6">
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Name
                                    </label>
                                    <p className="text-base text-gray-900">
                                        {selectedEnquiry.name}
                                    </p>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Email
                                    </label>
                                    <p className="text-base text-gray-900">
                                        {selectedEnquiry.email}
                                    </p>
                                </div>
                                {selectedEnquiry.mobile && (
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Mobile
                                        </label>
                                        <p className="text-base text-gray-900">
                                            {selectedEnquiry.mobile}
                                        </p>
                                    </div>
                                )}
                                {selectedEnquiry.product && (
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Product
                                        </label>
                                        <p className="text-base text-gray-900">
                                            {selectedEnquiry.product}
                                        </p>
                                    </div>
                                )}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Message
                                    </label>
                                    <p className="text-base text-gray-900 whitespace-pre-wrap">
                                        {selectedEnquiry.message}
                                    </p>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Received
                                    </label>
                                    <p className="text-base text-gray-900">
                                        {new Date(selectedEnquiry.createdAt).toLocaleString()}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

const EnquiriesPage = () => (
    <AdminLayout>
        <EnquiriesContent />
    </AdminLayout>
);

export default EnquiriesPage;
