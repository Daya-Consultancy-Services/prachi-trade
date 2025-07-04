"use client";

import { SidebarProvider } from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/sonner";

export default function ClientProviders({ children }) {
    return (
        // <SidebarProvider className="bg-red-200">
        <>
            {children}
            <Toaster />
        </>

        // </SidebarProvider>
    );
}
