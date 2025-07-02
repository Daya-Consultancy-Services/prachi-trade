import React, { useState, useEffect } from "react";
import Sidebar from "./dashboard/Sidebar";
import Header from "./dashboard/Header";

const AdminLayout = ({ children, initialTab = "dashboard" }) => {
    const [activeTab, setActiveTab] = useState(initialTab);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [enquiries, setEnquiries] = useState([]);
    const [user, setUser] = useState({ name: "Admin User", email: "admin@buildingmaterials.com" });

    useEffect(() => {
        fetch("/api/enquiries")
            .then((r) => r.json())
            .then(setEnquiries);
    }, []);

    return (
        <div className="min-h-screen flex bg-gray-100">
            <Sidebar
                sidebarOpen={sidebarOpen}
                setSidebarOpen={setSidebarOpen}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                enquiries={enquiries}
            />
            <div className="flex-1 flex flex-col">
                <Header activeTab={activeTab} user={user} setSidebarOpen={setSidebarOpen} />
                <main className="flex-1 p-6">{children}</main>
            </div>
        </div>
    );
};

export default AdminLayout;
