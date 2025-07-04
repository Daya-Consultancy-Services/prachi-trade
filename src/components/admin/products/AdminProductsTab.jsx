import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Edit2, Trash2 } from "lucide-react";
import AdminProductForm from "./AdminProductForm";

const AdminProductsTab = ({
    categories,
    getIcon,
    openDialog,
    setOpenDialog,
    productForm,
    setProductForm,
    addProduct,
    getSubcategoriesForCategory,
    handleImageUpload,
    imageUploading,
    imageError,
}) => (
    <div>
        <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Manage Products</h2>
            <AdminProductForm
                open={openDialog === "product"}
                setOpen={(open) => setOpenDialog(open ? "product" : null)}
                productForm={productForm}
                setProductForm={setProductForm}
                categories={categories}
                getSubcategoriesForCategory={getSubcategoriesForCategory}
                handleImageUpload={handleImageUpload}
                imageUploading={imageUploading}
                imageError={imageError}
                addProduct={addProduct}
            />
        </div>
        <div className="space-y-6">
            {categories.map((category) => (
                <Card key={category._id}>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            {getIcon(category.icon)}
                            {category.name}
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        {category.subcategories.map((subcategory) => (
                            <div key={subcategory._id} className="mb-6 last:mb-0">
                                <h4 className="font-medium text-lg mb-3">{subcategory.name}</h4>
                                <div className="overflow-x-auto">
                                    <table className="w-full border-collapse border border-gray-200">
                                        <thead>
                                            <tr className="bg-gray-50">
                                                <th className="border border-gray-200 p-3 text-left">
                                                    Product Name
                                                </th>
                                                <th className="border border-gray-200 p-3 text-left">
                                                    Brand
                                                </th>
                                                <th className="border border-gray-200 p-3 text-left">
                                                    Price
                                                </th>
                                                <th className="border border-gray-200 p-3 text-left">
                                                    Unit
                                                </th>
                                                <th className="border border-gray-200 p-3 text-left">
                                                    Stock
                                                </th>
                                                <th className="border border-gray-200 p-3 text-left">
                                                    Actions
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {subcategory.products.map((product) => (
                                                <tr key={product.id} className="hover:bg-gray-50">
                                                    <td className="border border-gray-200 p-3">
                                                        {product.name}
                                                    </td>
                                                    <td className="border border-gray-200 p-3">
                                                        {product.brand}
                                                    </td>
                                                    <td className="border border-gray-200 p-3">
                                                        ₹{product.price}
                                                    </td>
                                                    <td className="border border-gray-200 p-3">
                                                        {product.unit}
                                                    </td>
                                                    <td className="border border-gray-200 p-3">
                                                        <Badge
                                                            variant={
                                                                product.stock > 50
                                                                    ? "default"
                                                                    : product.stock > 20
                                                                    ? "secondary"
                                                                    : "destructive"
                                                            }
                                                        >
                                                            {product.stock}
                                                        </Badge>
                                                    </td>
                                                    <td className="border border-gray-200 p-3">
                                                        <div className="flex gap-2">
                                                            <Button variant="outline" size="sm">
                                                                <Edit2 className="w-4 h-4" />
                                                            </Button>
                                                            <Button variant="outline" size="sm">
                                                                <Trash2 className="w-4 h-4" />
                                                            </Button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        ))}
                    </CardContent>
                </Card>
            ))}
        </div>
    </div>
);

export default AdminProductsTab;
