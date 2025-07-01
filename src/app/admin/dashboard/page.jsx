"use client";
import Link from "next/link";

export default function AdminDashboard() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded shadow-md w-full max-w-lg text-center">
                <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>
                <p className="mb-6">
                    Welcome, Admin! Here you can manage products and site content.
                </p>
                <Link
                    href="/admin/products"
                    className="bg-orange-600 text-white py-2 px-6 rounded font-bold"
                >
                    Update Products
                </Link>
            </div>
        </div>
    );
}
