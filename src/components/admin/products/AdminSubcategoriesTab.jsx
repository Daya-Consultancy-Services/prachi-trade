import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Edit2, Trash2 } from "lucide-react";
import AdminSubcategoryForm from "./AdminSubcategoryForm";

const AdminSubcategoriesTab = ({
    categories,
    getIcon,
    openDialog,
    setOpenDialog,
    subcategoryForm,
    setSubcategoryForm,
    addSubcategory,
}) => (
    <div>
        <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Manage Subcategories</h2>
            <AdminSubcategoryForm
                open={openDialog === "subcategory"}
                setOpen={(open) => setOpenDialog(open ? "subcategory" : null)}
                subcategoryForm={subcategoryForm}
                setSubcategoryForm={setSubcategoryForm}
                categories={categories}
                addSubcategory={addSubcategory}
            />
        </div>
        <div className="space-y-6">
            {categories.map((category) => (
                <Card key={category._id}>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            {getIcon(category.icon)}
                            {category.name}
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {category.subcategories.map((subcategory) => (
                                <div key={subcategory._id} className="border rounded-lg p-4">
                                    <div className="flex justify-between items-start mb-2">
                                        <h4 className="font-medium">{subcategory.name}</h4>
                                        <Badge variant="secondary">
                                            {subcategory.products.length}
                                        </Badge>
                                    </div>
                                    <p className="text-sm text-gray-600 mb-3">
                                        {subcategory.description}
                                    </p>
                                    <div className="flex gap-2">
                                        <Button variant="outline" size="sm">
                                            <Edit2 className="w-4 h-4" />
                                        </Button>
                                        <Button variant="outline" size="sm">
                                            <Trash2 className="w-4 h-4" />
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    </div>
);

export default AdminSubcategoriesTab;
