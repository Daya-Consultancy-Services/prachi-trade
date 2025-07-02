"use client";

import { SidebarProvider } from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/sonner";

export default function ClientProviders({ children }) {
    return (
        <SidebarProvider>
            {children}
            <Toaster />
        </SidebarProvider>
    );
}
