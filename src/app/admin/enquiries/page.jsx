"use client";
import { AppSidebar } from "@/components/app-sidebar";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const mockEnquiries = [
    {
        name: "John Doe",
        email: "john@example.com",
        product: "Cement",
        message: "I want to know the price for bulk order.",
    },
    {
        name: "Jane Smith",
        email: "jane@example.com",
        product: "Steel Rod",
        message: "Is delivery available in Bhubaneswar?",
    },
];

export default function AdminEnquiriesPage() {
    return (
        <div className="flex min-h-screen w-full bg-muted/40">
            <AppSidebar />
            <main className="flex-1 p-8">
                <h1 className="text-3xl font-bold mb-8">Product Enquiries</h1>
                <div className="space-y-6">
                    {mockEnquiries.map((enquiry, idx) => (
                        <Card key={idx}>
                            <CardHeader>
                                <CardTitle>{enquiry.product}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="mb-2">
                                    <strong>Name:</strong> {enquiry.name}
                                </div>
                                <div className="mb-2">
                                    <strong>Email:</strong> {enquiry.email}
                                </div>
                                <div>
                                    <strong>Message:</strong> {enquiry.message}
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </main>
        </div>
    );
}
