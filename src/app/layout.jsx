import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { SidebarProvider } from "@/components/ui/sidebar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
    title: "Prachi Trade - Building Materials Supplier in Odisha",
    description:
        "The largest building material supplier in ODISHA offering wide range of construction materials",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <main>
                    <SidebarProvider>{children}</SidebarProvider>
                </main>
                <Toaster />
            </body>
        </html>
    );
}
