import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, LineChart, Package, Settings, MessageCircle } from "lucide-react";
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarRail,
} from "@/components/ui/sidebar";

const adminNav = [
    { label: "Dashboard", icon: Home, href: "/admin/dashboard" },
    { label: "Products", icon: Package, href: "/admin/products" },
    { label: "Enquiries", icon: MessageCircle, href: "/admin/enquiries" },
    { label: "Analytics", icon: LineChart, href: "#" },
    { label: "Settings", icon: Settings, href: "#" },
];

export function AppSidebar(props) {
    const pathname = usePathname();
    return (
        <Sidebar {...props}>
            <SidebarHeader className="text-2xl font-bold flex items-center px-4 h-16">
                <div className="text-2xl font-bold">Admin Panel</div>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
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
