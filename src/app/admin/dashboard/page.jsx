"use client";
import { Home, LineChart, Package, ShoppingCart, Users, Settings } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";
import { AdminSidebar, AppSidebar } from "@/components/app-sidebar";

const navItems = [
    { label: "Dashboard", icon: Home, href: "/admin/dashboard" },
    { label: "Orders", icon: ShoppingCart, href: "#" },
    { label: "Products", icon: Package, href: "/admin/products" },
    { label: "Customers", icon: Users, href: "#" },
    { label: "Analytics", icon: LineChart, href: "#" },
    { label: "Settings", icon: Settings, href: "#" },
];

export default function AdminDashboard() {
    const router = useRouter();

    // Auth check
    useEffect(() => {
        if (typeof window !== "undefined") {
            const token = localStorage.getItem("token");
            if (!token) {
                router.replace("/admin-portal-xyz-login");
            }
        }
    }, [router]);

    // Logout handler
    const handleLogout = () => {
        localStorage.removeItem("token");
        toast.success("Logout successful", { duration: 4000, position: "top-right" });
        router.replace("/admin-portal-xyz-login");
    };

    return (
        <div className="flex min-h-screen w-full flex-col bg-muted/40">
            <div className="flex flex-1">
                {/* Sidebar */}
                {/* <AdminSidebar navItems={navItems} /> */}
                <AppSidebar />
                {/* Main Content */}
                <main className="flex-1 p-8">
                    {/* Header */}
                    <div className="mb-8 flex items-center justify-between">
                        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
                        <div className="flex gap-2">
                            <Button onClick={handleLogout} variant="outline">
                                Logout
                            </Button>
                            <Button>Download</Button>
                        </div>
                    </div>
                    {/* Cards */}
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
                        <Card>
                            <CardHeader>
                                <CardTitle>Total Sales</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">$12,345</div>
                                <p className="text-xs text-muted-foreground">
                                    +20% from last month
                                </p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader>
                                <CardTitle>Orders</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">1,234</div>
                                <p className="text-xs text-muted-foreground">+5% from last month</p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader>
                                <CardTitle>Customers</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">567</div>
                                <p className="text-xs text-muted-foreground">+8% from last month</p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader>
                                <CardTitle>Active Now</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">34</div>
                                <p className="text-xs text-muted-foreground">+2 since last hour</p>
                            </CardContent>
                        </Card>
                    </div>
                    {/* Placeholder for charts or tables */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Recent Activity</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground">
                                This is a placeholder for recent activity, charts, or tables.
                            </p>
                        </CardContent>
                    </Card>
                </main>
            </div>
        </div>
    );
}
