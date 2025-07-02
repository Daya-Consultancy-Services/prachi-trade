"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import {
    Home,
    LineChart,
    Package,
    ShoppingCart,
    Users,
    Settings,
    MessageCircle,
} from "lucide-react";
import Link from "next/link";
import { AdminSidebar, AppSidebar } from "@/components/app-sidebar";

const CLOUDINARY_UPLOAD_PRESET = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;
const CLOUDINARY_CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

const navItems = [
    { label: "Dashboard", icon: Home, href: "/admin/dashboard" },
    { label: "Products", icon: Package, href: "/admin/products" },
    { label: "Enquiries", icon: MessageCircle, href: "/admin/enquiries" },
    { label: "Analytics", icon: LineChart, href: "#" },
    { label: "Settings", icon: Settings, href: "#" },
];

export default function AdminProductsPage() {
    const router = useRouter();
    const [categories, setCategories] = useState([]);
    const [subcategories, setSubcategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [catName, setCatName] = useState("");
    const [subcatName, setSubcatName] = useState("");
    const [subcatCat, setSubcatCat] = useState("");
    const [prodName, setProdName] = useState("");
    const [prodDesc, setProdDesc] = useState("");
    const [prodBrand, setProdBrand] = useState("");
    const [prodSubcat, setProdSubcat] = useState("");
    const [prodImage, setProdImage] = useState(null);
    const [prodImageUrl, setProdImageUrl] = useState("");
    const [loading, setLoading] = useState(false);

    // Auth check
    useEffect(() => {
        if (typeof window !== "undefined") {
            const token = localStorage.getItem("token");
            if (!token) {
                router.replace("/admin-portal-xyz-login");
            }
        }
    }, [router]);

    // Fetch all data
    useEffect(() => {
        fetch("/api/categories")
            .then((r) => r.json())
            .then(setCategories);
        fetch("/api/subcategories")
            .then((r) => r.json())
            .then(setSubcategories);
        fetch("/api/products")
            .then((r) => r.json())
            .then(setProducts);
    }, [loading]);

    // Category
    const handleAddCategory = async (e) => {
        e.preventDefault();
        setLoading(true);
        await fetch("/api/categories", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name: catName }),
        });
        setCatName("");
        setLoading(false);
    };

    // Subcategory
    const handleAddSubcategory = async (e) => {
        e.preventDefault();
        setLoading(true);
        await fetch("/api/subcategories", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name: subcatName, categoryId: subcatCat }),
        });
        setSubcatName("");
        setSubcatCat("");
        setLoading(false);
    };

    // Product image upload to Cloudinary
    const handleImageUpload = async (file) => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
        const res = await fetch(
            `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
            {
                method: "POST",
                body: formData,
            }
        );
        const data = await res.json();
        return data.secure_url;
    };

    // Product
    const handleAddProduct = async (e) => {
        e.preventDefault();
        setLoading(true);
        let imageUrl = prodImageUrl;
        if (prodImage) {
            imageUrl = await handleImageUpload(prodImage);
            setProdImageUrl(imageUrl);
        }
        await fetch("/api/products", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                name: prodName,
                description: prodDesc,
                image: imageUrl,
                brand: prodBrand,
                subcategoryId: prodSubcat,
            }),
        });
        setProdName("");
        setProdDesc("");
        setProdBrand("");
        setProdSubcat("");
        setProdImage(null);
        setProdImageUrl("");
        setLoading(false);
    };

    return (
        <div className="flex min-h-screen w-full flex-col bg-white">
            <div className="flex flex-1">
                {/* Sidebar */}
                {/* <AdminSidebar navItems={navItems} /> */}
                <AppSidebar />
                {/* Main Content */}
                <main className="flex-1 container mx-auto px-4 py-8 space-y-8 text-gray-500">
                    {/* Category Form */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Add Category</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleAddCategory} className="flex gap-4 items-end">
                                <div>
                                    <Label>Category Name</Label>
                                    <Input
                                        value={catName}
                                        onChange={(e) => setCatName(e.target.value)}
                                        required
                                    />
                                </div>
                                <Button type="submit" disabled={loading}>
                                    Add
                                </Button>
                            </form>
                        </CardContent>
                    </Card>
                    {/* Subcategory Form */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Add Subcategory</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleAddSubcategory} className="flex gap-4 items-end">
                                <div>
                                    <Label>Subcategory Name</Label>
                                    <Input
                                        value={subcatName}
                                        onChange={(e) => setSubcatName(e.target.value)}
                                        required
                                    />
                                </div>
                                <div>
                                    <Label>Parent Category</Label>
                                    <select
                                        value={subcatCat}
                                        onChange={(e) => setSubcatCat(e.target.value)}
                                        required
                                        className="border rounded px-2 py-1"
                                    >
                                        <option value="">Select Category</option>
                                        {categories.map((cat) => (
                                            <option key={cat._id} value={cat._id}>
                                                {cat.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <Button type="submit" disabled={loading}>
                                    Add
                                </Button>
                            </form>
                        </CardContent>
                    </Card>
                    {/* Product Form */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Add Product</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <form
                                onSubmit={handleAddProduct}
                                className="grid grid-cols-1 md:grid-cols-2 gap-4"
                            >
                                <div>
                                    <Label>Product Name</Label>
                                    <Input
                                        value={prodName}
                                        onChange={(e) => setProdName(e.target.value)}
                                        required
                                    />
                                </div>
                                <div>
                                    <Label>Brand</Label>
                                    <Input
                                        value={prodBrand}
                                        onChange={(e) => setProdBrand(e.target.value)}
                                    />
                                </div>
                                <div className="md:col-span-2">
                                    <Label>Description</Label>
                                    <Input
                                        value={prodDesc}
                                        onChange={(e) => setProdDesc(e.target.value)}
                                    />
                                </div>
                                <div>
                                    <Label>Subcategory</Label>
                                    <select
                                        value={prodSubcat}
                                        onChange={(e) => setProdSubcat(e.target.value)}
                                        required
                                        className="border rounded px-2 py-1"
                                    >
                                        <option value="">Select Subcategory</option>
                                        {subcategories.map((sub) => (
                                            <option key={sub._id} value={sub._id}>
                                                {sub.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <Label>Product Image</Label>
                                    <Input
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => setProdImage(e.target.files[0])}
                                    />
                                    {prodImageUrl && (
                                        <img
                                            src={prodImageUrl}
                                            alt="Preview"
                                            className="mt-2 w-24 h-24 object-cover rounded"
                                        />
                                    )}
                                </div>
                                <Button type="submit" className="md:col-span-2" disabled={loading}>
                                    Add Product
                                </Button>
                            </form>
                        </CardContent>
                    </Card>
                    {/* Lists */}
                    <div className="grid md:grid-cols-3 gap-8">
                        <Card>
                            <CardHeader>
                                <CardTitle>Categories</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ul className="space-y-1">
                                    {categories.map((cat) => (
                                        <li key={cat._id}>{cat.name}</li>
                                    ))}
                                </ul>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader>
                                <CardTitle>Subcategories</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ul className="space-y-1">
                                    {subcategories.map((sub) => (
                                        <li key={sub._id}>{sub.name}</li>
                                    ))}
                                </ul>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader>
                                <CardTitle>Products</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ul className="space-y-1">
                                    {products.map((prod) => (
                                        <li key={prod._id} className="flex items-center gap-2">
                                            {prod.image && (
                                                <img
                                                    src={prod.image}
                                                    alt={prod.name}
                                                    className="w-8 h-8 object-cover rounded"
                                                />
                                            )}
                                            <span>{prod.name}</span>
                                        </li>
                                    ))}
                                </ul>
                            </CardContent>
                        </Card>
                    </div>
                </main>
            </div>
        </div>
    );
}
