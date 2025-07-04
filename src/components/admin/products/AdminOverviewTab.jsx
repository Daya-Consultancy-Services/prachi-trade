import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const AdminOverviewTab = ({ categories, getIcon }) => (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {categories.map((category) => (
            <Card key={category._id} className="hover:shadow-md transition-shadow">
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
                            <div key={subcategory._id} className="border rounded-lg p-3">
                                <div className="flex justify-between items-start mb-2">
                                    <h4 className="font-medium">{subcategory.name}</h4>
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
                                            <span className="text-gray-600">{product.name}</span>
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
);

export default AdminOverviewTab;
