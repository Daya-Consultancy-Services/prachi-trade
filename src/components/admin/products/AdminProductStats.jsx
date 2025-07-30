import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Building, Package, ShoppingCart } from "lucide-react";

const AdminProductStats = ({ totalCategories, totalSubcategories, totalProducts }) => (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
            <CardContent className="p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-sm font-medium text-gray-600">Categories</p>
                        <p className="text-2xl font-bold text-gray-900">{totalCategories}</p>
                    </div>
                    <div className="p-3 bg-blue-100 rounded-full">
                        <Building className="w-6 h-6 text-blue-600" />
                    </div>
                </div>
            </CardContent>
        </Card>
        <Card>
            <CardContent className="p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-sm font-medium text-gray-600">Subcategories</p>
                        <p className="text-2xl font-bold text-gray-900">{totalSubcategories}</p>
                    </div>
                    <div className="p-3 bg-green-100 rounded-full">
                        <Package className="w-6 h-6 text-green-600" />
                    </div>
                </div>
            </CardContent>
        </Card>
        <Card>
            <CardContent className="p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-sm font-medium text-gray-600">Products</p>
                        <p className="text-2xl font-bold text-gray-900">{totalProducts}</p>
                    </div>
                    <div className="p-3 bg-purple-100 rounded-full">
                        <ShoppingCart className="w-6 h-6 text-purple-600" />
                    </div>
                </div>
            </CardContent>
        </Card>
        {/* <Card>
            <CardContent className="p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-sm font-medium text-gray-600">Total Stock</p>
                        <p className="text-2xl font-bold text-gray-900">{totalStock}</p>
                    </div>
                    <div className="p-3 bg-orange-100 rounded-full">
                        <Package className="w-6 h-6 text-orange-600" />
                    </div>
                </div>
            </CardContent>
        </Card> */}
    </div>
);

export default AdminProductStats;
