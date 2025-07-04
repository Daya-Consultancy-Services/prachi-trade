"use client";

import React, { useState } from "react";
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

const PrachiTrade = () => {
    // Initial data structure
    const [categories, setCategories] = useState([
        {
            id: 1,
            name: "Building Materials",
            description: "Essential materials for construction",
            icon: "Building",
            subcategories: [
                {
                    id: 1,
                    name: "Cement",
                    description: "Various types of cement",
                    products: [
                        {
                            id: 1,
                            name: "UltraTech Cement",
                            brand: "UltraTech",
                            price: 350,
                            unit: "bag",
                            stock: 100,
                        },
                        {
                            id: 2,
                            name: "Ambuja Cement",
                            brand: "Ambuja",
                            price: 340,
                            unit: "bag",
                            stock: 150,
                        },
                    ],
                },
                {
                    id: 2,
                    name: "Steel Rod",
                    description: "TMT bars and steel rods",
                    products: [
                        {
                            id: 3,
                            name: "Jindal Steel TMT",
                            brand: "Jindal Steel",
                            price: 65,
                            unit: "kg",
                            stock: 500,
                        },
                        {
                            id: 4,
                            name: "JSW Steel TMT",
                            brand: "JSW Steel",
                            price: 67,
                            unit: "kg",
                            stock: 300,
                        },
                    ],
                },
            ],
        },
        {
            id: 2,
            name: "Paints",
            description: "Interior and exterior paints",
            icon: "Palette",
            subcategories: [
                {
                    id: 3,
                    name: "Interior Paint",
                    description: "Paints for indoor use",
                    products: [
                        {
                            id: 5,
                            name: "Asian Paints Royale",
                            brand: "Asian Paints",
                            price: 450,
                            unit: "liter",
                            stock: 80,
                        },
                    ],
                },
            ],
        },
    ]);

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
    });

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
    const addCategory = () => {
        if (categoryForm.name.trim()) {
            const newCategory = {
                id: Date.now(),
                name: categoryForm.name,
                description: categoryForm.description,
                icon: "Package",
                subcategories: [],
            };
            setCategories([...categories, newCategory]);
            setCategoryForm({ name: "", description: "" });
            setOpenDialog(null);
        }
    };

    // Add subcategory
    const addSubcategory = () => {
        if (subcategoryForm.name.trim() && subcategoryForm.categoryId) {
            const newSubcategory = {
                id: Date.now(),
                name: subcategoryForm.name,
                description: subcategoryForm.description,
                products: [],
            };

            setCategories(
                categories.map((cat) =>
                    cat.id === parseInt(subcategoryForm.categoryId)
                        ? { ...cat, subcategories: [...cat.subcategories, newSubcategory] }
                        : cat
                )
            );

            setSubcategoryForm({ name: "", description: "", categoryId: "" });
            setOpenDialog(null);
        }
    };

    // Add product
    const addProduct = () => {
        if (productForm.name.trim() && productForm.categoryId && productForm.subcategoryId) {
            const newProduct = {
                id: Date.now(),
                name: productForm.name,
                brand: productForm.brand,
                price: parseFloat(productForm.price) || 0,
                unit: productForm.unit,
                stock: parseInt(productForm.stock) || 0,
            };

            setCategories(
                categories.map((cat) =>
                    cat.id === parseInt(productForm.categoryId)
                        ? {
                              ...cat,
                              subcategories: cat.subcategories.map((sub) =>
                                  sub.id === parseInt(productForm.subcategoryId)
                                      ? { ...sub, products: [...sub.products, newProduct] }
                                      : sub
                              ),
                          }
                        : cat
                )
            );

            setProductForm({
                name: "",
                brand: "",
                price: "",
                unit: "",
                stock: "",
                categoryId: "",
                subcategoryId: "",
            });
            setOpenDialog(null);
        }
    };

    // Get subcategories for selected category
    const getSubcategoriesForCategory = (categoryId) => {
        const category = categories.find((cat) => cat.id === parseInt(categoryId));
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

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Prachi Trade</h1>
                    <p className="text-gray-600">Building Materials & Home Improvement Products</p>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <Card>
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-600">Categories</p>
                                    <p className="text-2xl font-bold text-gray-900">
                                        {totalCategories}
                                    </p>
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
                                    <p className="text-sm font-medium text-gray-600">
                                        Subcategories
                                    </p>
                                    <p className="text-2xl font-bold text-gray-900">
                                        {totalSubcategories}
                                    </p>
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
                                    <p className="text-2xl font-bold text-gray-900">
                                        {totalProducts}
                                    </p>
                                </div>
                                <div className="p-3 bg-purple-100 rounded-full">
                                    <ShoppingCart className="w-6 h-6 text-purple-600" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-600">Total Stock</p>
                                    <p className="text-2xl font-bold text-gray-900">
                                        {categories.reduce(
                                            (sum, cat) =>
                                                sum +
                                                cat.subcategories.reduce(
                                                    (subSum, sub) =>
                                                        subSum +
                                                        sub.products.reduce(
                                                            (prodSum, prod) => prodSum + prod.stock,
                                                            0
                                                        ),
                                                    0
                                                ),
                                            0
                                        )}
                                    </p>
                                </div>
                                <div className="p-3 bg-orange-100 rounded-full">
                                    <Package className="w-6 h-6 text-orange-600" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Main Content */}
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                    <TabsList className="grid w-full grid-cols-4">
                        <TabsTrigger value="overview">Overview</TabsTrigger>
                        <TabsTrigger value="categories">Categories</TabsTrigger>
                        <TabsTrigger value="subcategories">Subcategories</TabsTrigger>
                        <TabsTrigger value="products">Products</TabsTrigger>
                    </TabsList>

                    {/* Overview Tab */}
                    <TabsContent value="overview" className="mt-6">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {categories.map((category) => (
                                <Card
                                    key={category.id}
                                    className="hover:shadow-md transition-shadow"
                                >
                                    <CardHeader>
                                        <CardTitle className="flex items-center gap-2">
                                            {getIcon(category.icon)}
                                            {category.name}
                                        </CardTitle>
                                        <CardDescription>{category.description}</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-3">
                                            {category.subcategories.map((subcategory) => (
                                                <div
                                                    key={subcategory.id}
                                                    className="border rounded-lg p-3"
                                                >
                                                    <div className="flex justify-between items-start mb-2">
                                                        <h4 className="font-medium">
                                                            {subcategory.name}
                                                        </h4>
                                                        <Badge variant="secondary">
                                                            {subcategory.products.length} products
                                                        </Badge>
                                                    </div>
                                                    <div className="space-y-1">
                                                        {subcategory.products.map((product) => (
                                                            <div
                                                                key={product.id}
                                                                className="flex justify-between items-center text-sm"
                                                            >
                                                                <span className="text-gray-600">
                                                                    {product.name}
                                                                </span>
                                                                <span className="font-medium">
                                                                    ₹{product.price}/{product.unit}
                                                                </span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </TabsContent>

                    {/* Categories Tab */}
                    <TabsContent value="categories" className="mt-6">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-semibold">Manage Categories</h2>
                            <Dialog
                                open={openDialog === "category"}
                                onOpenChange={(open) => setOpenDialog(open ? "category" : null)}
                            >
                                <DialogTrigger asChild>
                                    <Button className="flex items-center gap-2">
                                        <Plus className="w-4 h-4" />
                                        Add Category
                                    </Button>
                                </DialogTrigger>
                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle>Add New Category</DialogTitle>
                                        <DialogDescription>
                                            Create a new product category
                                        </DialogDescription>
                                    </DialogHeader>
                                    <div className="space-y-4">
                                        <div>
                                            <Label htmlFor="categoryName">Category Name</Label>
                                            <Input
                                                id="categoryName"
                                                value={categoryForm.name}
                                                onChange={(e) =>
                                                    setCategoryForm({
                                                        ...categoryForm,
                                                        name: e.target.value,
                                                    })
                                                }
                                                placeholder="e.g., Building Materials"
                                            />
                                        </div>
                                        <div>
                                            <Label htmlFor="categoryDescription">Description</Label>
                                            <Textarea
                                                id="categoryDescription"
                                                value={categoryForm.description}
                                                onChange={(e) =>
                                                    setCategoryForm({
                                                        ...categoryForm,
                                                        description: e.target.value,
                                                    })
                                                }
                                                placeholder="Brief description of the category"
                                            />
                                        </div>
                                        <Button onClick={addCategory} className="w-full">
                                            Add Category
                                        </Button>
                                    </div>
                                </DialogContent>
                            </Dialog>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {categories.map((category) => (
                                <Card key={category.id}>
                                    <CardHeader>
                                        <CardTitle className="flex items-center gap-2">
                                            {getIcon(category.icon)}
                                            {category.name}
                                        </CardTitle>
                                        <CardDescription>{category.description}</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="flex justify-between items-center">
                                            <Badge variant="outline">
                                                {category.subcategories.length} subcategories
                                            </Badge>
                                            <div className="flex gap-2">
                                                <Button variant="outline" size="sm">
                                                    <Edit2 className="w-4 h-4" />
                                                </Button>
                                                <Button variant="outline" size="sm">
                                                    <Trash2 className="w-4 h-4" />
                                                </Button>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </TabsContent>

                    {/* Subcategories Tab */}
                    <TabsContent value="subcategories" className="mt-6">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-semibold">Manage Subcategories</h2>
                            <Dialog
                                open={openDialog === "subcategory"}
                                onOpenChange={(open) => setOpenDialog(open ? "subcategory" : null)}
                            >
                                <DialogTrigger asChild>
                                    <Button className="flex items-center gap-2">
                                        <Plus className="w-4 h-4" />
                                        Add Subcategory
                                    </Button>
                                </DialogTrigger>
                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle>Add New Subcategory</DialogTitle>
                                        <DialogDescription>
                                            Create a new product subcategory
                                        </DialogDescription>
                                    </DialogHeader>
                                    <div className="space-y-4">
                                        <div>
                                            <Label htmlFor="subcategoryCategory">Category</Label>
                                            <Select
                                                value={subcategoryForm.categoryId}
                                                onValueChange={(value) =>
                                                    setSubcategoryForm({
                                                        ...subcategoryForm,
                                                        categoryId: value,
                                                    })
                                                }
                                            >
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select category" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {categories.map((category) => (
                                                        <SelectItem
                                                            key={category.id}
                                                            value={category.id.toString()}
                                                        >
                                                            {category.name}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div>
                                            <Label htmlFor="subcategoryName">
                                                Subcategory Name
                                            </Label>
                                            <Input
                                                id="subcategoryName"
                                                value={subcategoryForm.name}
                                                onChange={(e) =>
                                                    setSubcategoryForm({
                                                        ...subcategoryForm,
                                                        name: e.target.value,
                                                    })
                                                }
                                                placeholder="e.g., Cement"
                                            />
                                        </div>
                                        <div>
                                            <Label htmlFor="subcategoryDescription">
                                                Description
                                            </Label>
                                            <Textarea
                                                id="subcategoryDescription"
                                                value={subcategoryForm.description}
                                                onChange={(e) =>
                                                    setSubcategoryForm({
                                                        ...subcategoryForm,
                                                        description: e.target.value,
                                                    })
                                                }
                                                placeholder="Brief description of the subcategory"
                                            />
                                        </div>
                                        <Button onClick={addSubcategory} className="w-full">
                                            Add Subcategory
                                        </Button>
                                    </div>
                                </DialogContent>
                            </Dialog>
                        </div>

                        <div className="space-y-6">
                            {categories.map((category) => (
                                <Card key={category.id}>
                                    <CardHeader>
                                        <CardTitle className="flex items-center gap-2">
                                            {getIcon(category.icon)}
                                            {category.name}
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                            {category.subcategories.map((subcategory) => (
                                                <div
                                                    key={subcategory.id}
                                                    className="border rounded-lg p-4"
                                                >
                                                    <div className="flex justify-between items-start mb-2">
                                                        <h4 className="font-medium">
                                                            {subcategory.name}
                                                        </h4>
                                                        <Badge variant="secondary">
                                                            {subcategory.products.length}
                                                        </Badge>
                                                    </div>
                                                    <p className="text-sm text-gray-600 mb-3">
                                                        {subcategory.description}
                                                    </p>
                                                    <div className="flex gap-2">
                                                        <Button variant="outline" size="sm">
                                                            <Edit2 className="w-4 h-4" />
                                                        </Button>
                                                        <Button variant="outline" size="sm">
                                                            <Trash2 className="w-4 h-4" />
                                                        </Button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </TabsContent>

                    {/* Products Tab */}
                    <TabsContent value="products" className="mt-6">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-semibold">Manage Products</h2>
                            <Dialog
                                open={openDialog === "product"}
                                onOpenChange={(open) => setOpenDialog(open ? "product" : null)}
                            >
                                <DialogTrigger asChild>
                                    <Button className="flex items-center gap-2">
                                        <Plus className="w-4 h-4" />
                                        Add Product
                                    </Button>
                                </DialogTrigger>
                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle>Add New Product</DialogTitle>
                                        <DialogDescription>Create a new product</DialogDescription>
                                    </DialogHeader>
                                    <div className="space-y-4">
                                        <div>
                                            <Label htmlFor="productCategory">Category</Label>
                                            <Select
                                                value={productForm.categoryId}
                                                onValueChange={(value) =>
                                                    setProductForm({
                                                        ...productForm,
                                                        categoryId: value,
                                                        subcategoryId: "",
                                                    })
                                                }
                                            >
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select category" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {categories.map((category) => (
                                                        <SelectItem
                                                            key={category.id}
                                                            value={category.id.toString()}
                                                        >
                                                            {category.name}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div>
                                            <Label htmlFor="productSubcategory">Subcategory</Label>
                                            <Select
                                                value={productForm.subcategoryId}
                                                onValueChange={(value) =>
                                                    setProductForm({
                                                        ...productForm,
                                                        subcategoryId: value,
                                                    })
                                                }
                                            >
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select subcategory" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {getSubcategoriesForCategory(
                                                        productForm.categoryId
                                                    ).map((subcategory) => (
                                                        <SelectItem
                                                            key={subcategory.id}
                                                            value={subcategory.id.toString()}
                                                        >
                                                            {subcategory.name}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div>
                                            <Label htmlFor="productName">Product Name</Label>
                                            <Input
                                                id="productName"
                                                value={productForm.name}
                                                onChange={(e) =>
                                                    setProductForm({
                                                        ...productForm,
                                                        name: e.target.value,
                                                    })
                                                }
                                                placeholder="e.g., UltraTech Cement"
                                            />
                                        </div>
                                        <div>
                                            <Label htmlFor="productBrand">Brand</Label>
                                            <Input
                                                id="productBrand"
                                                value={productForm.brand}
                                                onChange={(e) =>
                                                    setProductForm({
                                                        ...productForm,
                                                        brand: e.target.value,
                                                    })
                                                }
                                                placeholder="e.g., UltraTech"
                                            />
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <Label htmlFor="productPrice">Price (₹)</Label>
                                                <Input
                                                    id="productPrice"
                                                    type="number"
                                                    value={productForm.price}
                                                    onChange={(e) =>
                                                        setProductForm({
                                                            ...productForm,
                                                            price: e.target.value,
                                                        })
                                                    }
                                                    placeholder="350"
                                                />
                                            </div>
                                            <div>
                                                <Label htmlFor="productUnit">Unit</Label>
                                                <Input
                                                    id="productUnit"
                                                    value={productForm.unit}
                                                    onChange={(e) =>
                                                        setProductForm({
                                                            ...productForm,
                                                            unit: e.target.value,
                                                        })
                                                    }
                                                    placeholder="bag, kg, liter"
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <Label htmlFor="productStock">Stock Quantity</Label>
                                            <Input
                                                id="productStock"
                                                type="number"
                                                value={productForm.stock}
                                                onChange={(e) =>
                                                    setProductForm({
                                                        ...productForm,
                                                        stock: e.target.value,
                                                    })
                                                }
                                                placeholder="100"
                                            />
                                        </div>
                                        <Button onClick={addProduct} className="w-full">
                                            Add Product
                                        </Button>
                                    </div>
                                </DialogContent>
                            </Dialog>
                        </div>

                        <div className="space-y-6">
                            {categories.map((category) => (
                                <Card key={category.id}>
                                    <CardHeader>
                                        <CardTitle className="flex items-center gap-2">
                                            {getIcon(category.icon)}
                                            {category.name}
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        {category.subcategories.map((subcategory) => (
                                            <div key={subcategory.id} className="mb-6 last:mb-0">
                                                <h4 className="font-medium text-lg mb-3">
                                                    {subcategory.name}
                                                </h4>
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
                                                                <tr
                                                                    key={product.id}
                                                                    className="hover:bg-gray-50"
                                                                >
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
                                                                                    : product.stock >
                                                                                      20
                                                                                    ? "secondary"
                                                                                    : "destructive"
                                                                            }
                                                                        >
                                                                            {product.stock}
                                                                        </Badge>
                                                                    </td>
                                                                    <td className="border border-gray-200 p-3">
                                                                        <div className="flex gap-2">
                                                                            <Button
                                                                                variant="outline"
                                                                                size="sm"
                                                                            >
                                                                                <Edit2 className="w-4 h-4" />
                                                                            </Button>
                                                                            <Button
                                                                                variant="outline"
                                                                                size="sm"
                                                                            >
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
