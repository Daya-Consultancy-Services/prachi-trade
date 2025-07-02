import { Inter } from "next/font/google";
import "./globals.css";
import ClientProviders from "@/components/ClientProviders";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
    title: "Prachi Trade - Building Materials Supplier in Odisha",
    description:
        "The largest building material supplier in ODISHA offering wide range of construction materials",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={inter.className}>
                <ClientProviders>
                    <main>{children}</main>
                </ClientProviders>
            </body>
        </html>
    );
}
