"use client";

import AdminLayout from "@/components/admin-layout";
import { useEffect, useState } from "react";
import { MessageSquare } from "lucide-react";
import SummaryCard from "@/components/SummaryCard";

const EnquiriesContent = () => {
    const [enquiries, setEnquiries] = useState([]);

    useEffect(() => {
        fetch("/api/enquiries")
            .then((r) => r.json())
            .then(setEnquiries);
    }, []);

    return (
        <div className="space-y-6">
            <div className="flex flex-wrap gap-6 mb-8">
                <SummaryCard
                    icon={MessageSquare}
                    value={enquiries.length}
                    label="Total Enquiries"
                    iconBg="bg-green-100"
                    iconColor="text-green-600"
                />
            </div>
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
                                        {enquiry.mobile && (
                                            <span className="text-sm text-gray-500">
                                                {enquiry.mobile}
                                            </span>
                                        )}
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
};

const EnquiriesPage = () => (
    <AdminLayout>
        <EnquiriesContent />
    </AdminLayout>
);

export default EnquiriesPage;
