"use client";

import React, { useState, useEffect } from "react";
import Sidebar from "./dashboard/Sidebar";
import Header from "./dashboard/Header";

const AdminLayout = ({ children }) => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [enquiries, setEnquiries] = useState([]);
    const [user, setUser] = useState({ name: "Admin User", email: "admin@buildingmaterials.com" });

    useEffect(() => {
        fetch("/api/enquiries")
            .then((r) => r.json())
            .then(setEnquiries);
    }, []);

    return (
        // In AdminLayout.jsx, modify the main container structure:
        <div className="min-h-screen flex bg-gray-100 overflow-x-hidden">
            {/* Add overflow-x-hidden */}
            <Sidebar
                sidebarOpen={sidebarOpen}
                setSidebarOpen={setSidebarOpen}
                enquiries={enquiries}
            />
            <div className="flex-1 flex flex-col overflow-hidden">
                {" "}
                {/* Add overflow-hidden */}
                <Header user={user} setSidebarOpen={setSidebarOpen} />
                <main className="flex-1 overflow-auto p-4">{children}</main>{" "}
                {/* Add overflow-auto and padding */}
            </div>
        </div>
    );
};

export default AdminLayout;
