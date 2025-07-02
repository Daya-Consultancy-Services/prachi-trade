import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, LineChart, Package, ShoppingCart, Users, Settings } from "lucide-react";

import { SearchForm } from "@/components/search-form";
import { VersionSwitcher } from "@/components/version-switcher";
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarRail,
} from "@/components/ui/sidebar";

const adminNav = [
    { label: "Dashboard", icon: Home, href: "/admin/dashboard" },
    { label: "Orders", icon: ShoppingCart, href: "#" },
    { label: "Products", icon: Package, href: "/admin/products" },
    { label: "Customers", icon: Users, href: "#" },
    { label: "Analytics", icon: LineChart, href: "#" },
    { label: "Settings", icon: Settings, href: "#" },
];

export function AppSidebar({ ...props }) {
    const pathname = usePathname();
    return (
        <Sidebar {...props}>
            <SidebarHeader>
                <VersionSwitcher
                    versions={["1.0.1", "1.1.0-alpha", "2.0.0-beta1"]}
                    defaultVersion={"1.0.1"}
                />
                <SearchForm />
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Navigation</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {adminNav.map((item) => (
                                <SidebarMenuItem key={item.label}>
                                    <SidebarMenuButton asChild isActive={pathname === item.href}>
                                        <Link href={item.href} className="flex items-center gap-3">
                                            <item.icon className="w-5 h-5" />
                                            <span>{item.label}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarRail />
        </Sidebar>
    );
}

export function AdminSidebar({ navItems }) {
    return (
        <aside className="w-64 bg-white border-r flex flex-col">
            <div className="h-16 flex items-center justify-center border-b">
                <span className="text-xl font-bold">Admin Panel</span>
            </div>
            <nav className="flex-1 px-4 py-6">
                <ul className="space-y-2">
                    {navItems.map((item) => (
                        <li key={item.label}>
                            <Link
                                href={item.href}
                                className="flex items-center gap-3 px-3 py-2 rounded-md text-muted-foreground hover:bg-muted hover:text-primary transition-colors"
                            >
                                <item.icon className="w-5 h-5" />
                                <span>{item.label}</span>
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
        </aside>
    );
}
