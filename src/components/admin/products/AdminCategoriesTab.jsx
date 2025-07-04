import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Edit2, Trash2 } from "lucide-react";
import AdminCategoryForm from "./AdminCategoryForm";

const AdminCategoriesTab = ({
    categories,
    getIcon,
    openDialog,
    setOpenDialog,
    categoryForm,
    setCategoryForm,
    addCategory,
}) => (
    <div>
        <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Manage Categories</h2>
            <AdminCategoryForm
                open={openDialog === "category"}
                setOpen={(open) => setOpenDialog(open ? "category" : null)}
                categoryForm={categoryForm}
                setCategoryForm={setCategoryForm}
                addCategory={addCategory}
            />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category) => (
                <Card key={category._id}>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            {getIcon(category.icon)}
                            {category.name}
                        </CardTitle>
                        <CardDescription>{category.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex justify-between items-center">
                            <Badge variant="outline">
                                {category.subcategories.length} subcategories
                            </Badge>
                            <div className="flex gap-2">
                                <Button variant="outline" size="sm">
                                    <Edit2 className="w-4 h-4" />
                                </Button>
                                <Button variant="outline" size="sm">
                                    <Trash2 className="w-4 h-4" />
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    </div>
);

export default AdminCategoriesTab;
