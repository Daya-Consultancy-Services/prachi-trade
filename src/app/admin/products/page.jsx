"use client";

import { Edit, Eye, Plus, Search, Trash2, Package } from "lucide-react";
import { useEffect, useState } from "react";
import AdminLayout from "@/components/admin-layout";
import SummaryCard from "@/components/SummaryCard";

const ProductsContent = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch("/api/products")
            .then((r) => r.json())
            .then(setProducts);
    }, []);

    return (
        <div className="space-y-6">
            <div className="flex flex-wrap gap-6 mb-8">
                <SummaryCard
                    icon={Package}
                    value={products.length}
                    label="Total Products"
                    iconBg="bg-purple-100"
                    iconColor="text-purple-600"
                />
            </div>
            <div className="flex justify-between items-center">
                <div className="flex items-center space-x-4">
                    <div className="relative">
                        <Search
                            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                            size={20}
                        />
                        <input
                            type="text"
                            placeholder="Search products..."
                            className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                </div>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center">
                    <Plus size={20} className="mr-2" />
                    Add Product
                </button>
            </div>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Product
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Category
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Price
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Date Added
                            </th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {products.map((product) => (
                            <tr key={product._id || product.id}>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div>
                                        <div className="text-sm font-medium text-gray-900">
                                            {product.name}
                                        </div>
                                        <div className="text-sm text-gray-500">
                                            {product.description?.substring(0, 50)}...
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-900">
                                        {product.category?.name || product.category}
                                    </div>
                                    <div className="text-sm text-gray-500">
                                        {product.subcategory?.name || product.subcategory}
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                    ₹{product.price?.toLocaleString?.() || product.price}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {product.createdAt
                                        ? new Date(product.createdAt).toLocaleDateString()
                                        : ""}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <div className="flex items-center justify-end space-x-2">
                                        <button className="text-blue-600 hover:text-blue-900">
                                            <Eye size={16} />
                                        </button>
                                        <button className="text-green-600 hover:text-green-900">
                                            <Edit size={16} />
                                        </button>
                                        <button className="text-red-600 hover:text-red-900">
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

const ProductsPage = () => (
    <AdminLayout>
        <ProductsContent />
    </AdminLayout>
);

export default ProductsPage;
