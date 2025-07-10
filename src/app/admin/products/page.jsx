"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Edit2, Trash2, Package, Building, Palette, ShoppingCart } from "lucide-react";
import AdminLayout from "@/components/admin-layout";
import axios from "axios";
import AdminProductStats from "@/components/admin/products/AdminProductStats";
import AdminOverviewTab from "@/components/admin/products/AdminOverviewTab";
import AdminCategoriesTab from "@/components/admin/products/AdminCategoriesTab";
import AdminSubcategoriesTab from "@/components/admin/products/AdminSubcategoriesTab";
import AdminProductsTab from "@/components/admin/products/AdminProductsTab";
import { Skeleton } from "@/components/ui/skeleton";

// Add Cloudinary config (user must fill in their own values)
const CLOUDINARY_UPLOAD_PRESET = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;
const CLOUDINARY_CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

const PrachiTrade = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeTab, setActiveTab] = useState("overview");
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedSubcategory, setSelectedSubcategory] = useState(null);
    const [openDialog, setOpenDialog] = useState(null);

    // Form states
    const [categoryForm, setCategoryForm] = useState({ name: "", description: "" });
    const [subcategoryForm, setSubcategoryForm] = useState({
        name: "",
        description: "",
        categoryId: "",
    });
    const [productForm, setProductForm] = useState({
        name: "",
        brand: "",
        price: "",
        unit: "",
        stock: "",
        categoryId: "",
        subcategoryId: "",
        image: "",
        description: "",
    });
    const [imageUploading, setImageUploading] = useState(false);
    const [imageError, setImageError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);
            try {
                const catRes = await axios.get("/api/categories");
                // Each category has populated subcategories, but subcategories may not have products populated
                // So fetch subcategories with products
                const subRes = await axios.get("/api/subcategories");
                // Map subcategories by id for quick lookup
                const subMap = {};
                subRes.data.forEach((sub) => {
                    subMap[sub._id] = sub;
                });
                // Attach products to subcategories in categories
                const categoriesWithSubsAndProducts = catRes.data.map((cat) => ({
                    ...cat,
                    subcategories: cat.subcategories.map((sub) => subMap[sub._id] || sub),
                }));
                setCategories(categoriesWithSubsAndProducts);
            } catch (err) {
                setError("Failed to load data");
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    // Helper function to get icon component
    const getIcon = (iconName) => {
        switch (iconName) {
            case "Building":
                return <Building className="w-5 h-5" />;
            case "Palette":
                return <Palette className="w-5 h-5" />;
            default:
                return <Package className="w-5 h-5" />;
        }
    };

    // Add category
    const addCategory = async () => {
        if (categoryForm.name.trim()) {
            try {
                const res = await axios.post("/api/categories", {
                    name: categoryForm.name,
                    description: categoryForm.description,
                });
                // Refetch categories
                const catRes = await axios.get("/api/categories");
                const subRes = await axios.get("/api/subcategories");
                const subMap = {};
                subRes.data.forEach((sub) => {
                    subMap[sub._id] = sub;
                });
                const categoriesWithSubsAndProducts = catRes.data.map((cat) => ({
                    ...cat,
                    subcategories: cat.subcategories.map((sub) => subMap[sub._id] || sub),
                }));
                setCategories(categoriesWithSubsAndProducts);
                setCategoryForm({ name: "", description: "" });
                setOpenDialog(null);
            } catch (err) {
                setError("Failed to add category");
            }
        }
    };

    // Add subcategory
    const addSubcategory = async () => {
        if (subcategoryForm.name.trim() && subcategoryForm.categoryId) {
            try {
                const res = await axios.post("/api/subcategories", {
                    name: subcategoryForm.name,
                    categoryId: subcategoryForm.categoryId,
                });
                // Refetch categories and subcategories
                const catRes = await axios.get("/api/categories");
                const subRes = await axios.get("/api/subcategories");
                const subMap = {};
                subRes.data.forEach((sub) => {
                    subMap[sub._id] = sub;
                });
                const categoriesWithSubsAndProducts = catRes.data.map((cat) => ({
                    ...cat,
                    subcategories: cat.subcategories.map((sub) => subMap[sub._id] || sub),
                }));
                setCategories(categoriesWithSubsAndProducts);
                setSubcategoryForm({ name: "", description: "", categoryId: "" });
                setOpenDialog(null);
            } catch (err) {
                setError("Failed to add subcategory");
            }
        }
    };

    // Add this function to handle image upload to Cloudinary
    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        setImageUploading(true);
        setImageError(null);
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
        try {
            const res = await fetch(
                `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
                {
                    method: "POST",
                    body: formData,
                }
            );
            const data = await res.json();
            if (data.secure_url) {
                setProductForm((prev) => ({ ...prev, image: data.secure_url }));
            } else {
                setImageError("Failed to upload image");
            }
        } catch (err) {
            setImageError("Failed to upload image");
        } finally {
            setImageUploading(false);
        }
    };

    // Add product
    const addProduct = async () => {
        if (productForm.name.trim() && productForm.categoryId && productForm.subcategoryId) {
            try {
                const res = await axios.post("/api/products", {
                    name: productForm.name,
                    brand: productForm.brand,
                    price: parseFloat(productForm.price) || 0,
                    unit: productForm.unit,
                    stock: parseInt(productForm.stock) || 0,
                    subcategoryId: productForm.subcategoryId,
                    image: productForm.image,
                    description: productForm.description,
                });
                // Refetch categories and subcategories
                const catRes = await axios.get("/api/categories");
                const subRes = await axios.get("/api/subcategories");
                const subMap = {};
                subRes.data.forEach((sub) => {
                    subMap[sub._id] = sub;
                });
                const categoriesWithSubsAndProducts = catRes.data.map((cat) => ({
                    ...cat,
                    subcategories: cat.subcategories.map((sub) => subMap[sub._id] || sub),
                }));
                setCategories(categoriesWithSubsAndProducts);
                setProductForm({
                    name: "",
                    brand: "",
                    price: "",
                    unit: "",
                    stock: "",
                    categoryId: "",
                    subcategoryId: "",
                    image: "",
                    description: "",
                });
                setOpenDialog(null);
            } catch (err) {
                setError("Failed to add product");
            }
        }
    };

    const editCategory = async (categoryId, newData) => {
        try {
            await axios.put(`/api/categories?id=${categoryId}`, {
                name: newData.name,
                description: newData.description,
            });

            // Refetch categories to update the UI
            const catRes = await axios.get("/api/categories");
            const subRes = await axios.get("/api/subcategories");
            const subMap = {};
            subRes.data.forEach((sub) => {
                subMap[sub._id] = sub;
            });
            const categoriesWithSubsAndProducts = catRes.data.map((cat) => ({
                ...cat,
                subcategories: cat.subcategories.map((sub) => subMap[sub._id] || sub),
            }));
            setCategories(categoriesWithSubsAndProducts);
        } catch (err) {
            console.error("Error updating category:", err);
            setError("Failed to update category");
        }
    };

    const deleteCategory = async (categoryId) => {
        try {
            await axios.delete(`/api/categories?id=${categoryId}`);

            // Refetch categories to update the UI
            const catRes = await axios.get("/api/categories");
            const subRes = await axios.get("/api/subcategories");
            const subMap = {};
            subRes.data.forEach((sub) => {
                subMap[sub._id] = sub;
            });
            const categoriesWithSubsAndProducts = catRes.data.map((cat) => ({
                ...cat,
                subcategories: cat.subcategories.map((sub) => subMap[sub._id] || sub),
            }));
            setCategories(categoriesWithSubsAndProducts);
        } catch (err) {
            setError("Failed to delete category");
        }
    };

    // Get subcategories for selected category
    const getSubcategoriesForCategory = (categoryId) => {
        const category = categories.find(
            (cat) => cat._id === categoryId || cat.id === parseInt(categoryId)
        );
        return category ? category.subcategories : [];
    };

    // Calculate totals
    const totalCategories = categories.length;
    const totalSubcategories = categories.reduce((sum, cat) => sum + cat.subcategories.length, 0);
    const totalProducts = categories.reduce(
        (sum, cat) =>
            sum + cat.subcategories.reduce((subSum, sub) => subSum + sub.products.length, 0),
        0
    );

    const totalStock = categories.reduce((sum, cat) => {
        const catSum = (cat.subcategories || []).reduce((subSum, sub) => {
            return subSum + sub?.products.length;
        }, 0);

        return sum + catSum;
    }, 0);

    if (loading)
        return (
            <div className="flex items-center justify-center min-h-96">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    if (error) return <div className="p-8 text-center text-red-500">{error}</div>;

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Prachi Trade</h1>
                    <p className="text-gray-600">Building Materials & Home Improvement Products</p>
                </div>
                {/* Stats Cards */}
                <AdminProductStats
                    totalCategories={totalCategories}
                    totalSubcategories={totalSubcategories}
                    totalProducts={totalProducts}
                    totalStock={totalStock}
                />
                {/* Main Content */}
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                    <TabsList className="grid w-full grid-cols-4">
                        <TabsTrigger value="overview">Overview</TabsTrigger>
                        <TabsTrigger value="categories">Categories</TabsTrigger>
                        <TabsTrigger value="subcategories">Subcategories</TabsTrigger>
                        <TabsTrigger value="products">Products</TabsTrigger>
                    </TabsList>
                    <TabsContent value="overview" className="mt-6">
                        <AdminOverviewTab categories={categories} getIcon={getIcon} />
                    </TabsContent>
                    <TabsContent value="categories" className="mt-6">
                        <AdminCategoriesTab
                            categories={categories}
                            getIcon={getIcon}
                            openDialog={openDialog}
                            setOpenDialog={setOpenDialog}
                            categoryForm={categoryForm}
                            setCategoryForm={setCategoryForm}
                            addCategory={addCategory}
                            editCategory={editCategory} // Pass the new function
                            deleteCategory={deleteCategory} // Pass the new function
                        />
                    </TabsContent>
                    <TabsContent value="subcategories" className="mt-6">
                        <AdminSubcategoriesTab
                            categories={categories}
                            getIcon={getIcon}
                            openDialog={openDialog}
                            setOpenDialog={setOpenDialog}
                            subcategoryForm={subcategoryForm}
                            setSubcategoryForm={setSubcategoryForm}
                            addSubcategory={addSubcategory}
                        />
                    </TabsContent>
                    <TabsContent value="products" className="mt-6">
                        <AdminProductsTab
                            categories={categories}
                            getIcon={getIcon}
                            openDialog={openDialog}
                            setOpenDialog={setOpenDialog}
                            productForm={productForm}
                            setProductForm={setProductForm}
                            addProduct={addProduct}
                            getSubcategoriesForCategory={getSubcategoriesForCategory}
                            handleImageUpload={handleImageUpload}
                            imageUploading={imageUploading}
                            imageError={imageError}
                        />
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
};

// export default PrachiTrade;

const ProductsPage = () => (
    <AdminLayout>
        <PrachiTrade />
    </AdminLayout>
);

export default ProductsPage;
