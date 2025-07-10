import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Edit2, Trash2, Plus } from "lucide-react";
import AdminCategoryForm from "./AdminCategoryForm";

const AdminCategoriesTab = ({
    categories,
    getIcon,
    openDialog,
    setOpenDialog,
    categoryForm,
    setCategoryForm,
    addCategory,
    editCategory,
    deleteCategory,
}) => {
    const [deletingCategory, setDeletingCategory] = useState(null);
    const [editingCategoryId, setEditingCategoryId] = useState(null);

    const handleEditClick = (category) => {
        setEditingCategoryId(category._id);
        setCategoryForm({
            name: category.name,
            description: category.description || "",
        });
        setOpenDialog("edit");
    };

    const handleAddClick = () => {
        setCategoryForm({ name: "", description: "" });
        setOpenDialog("add");
    };


    const handleSubmit = async () => {
        if (openDialog === "add") {
            await addCategory();
        } else if (openDialog === "edit" && editingCategoryId) {
            await editCategory(editingCategoryId, {
                name: categoryForm.name,
                description: categoryForm.description,
            });
        }
        setOpenDialog(null);
        setEditingCategoryId(null);
    };
    const confirmDelete = async (categoryId) => {
        await deleteCategory(categoryId);
        setDeletingCategory(null);
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Manage Categories</h2>
                <Button onClick={handleAddClick} className="flex items-center gap-2">
                    <Plus className="w-4 h-4" />
                    Add Category
                </Button>
            </div>

            {/* Add/Edit Category Form */}
            <AdminCategoryForm
                open={openDialog === "add" || openDialog === "edit"}
                setOpen={(open) => {
                    if (!open) setOpenDialog(null);
                }}
                categoryForm={categoryForm}
                setCategoryForm={setCategoryForm}
                onSubmit={handleSubmit}
                isEditMode={openDialog === "edit"}
            />

            {/* Delete Confirmation Modal */}
            {deletingCategory && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg max-w-md w-full">
                        <h3 className="text-lg font-semibold mb-2">Confirm Deletion</h3>
                        <p className="text-gray-600 mb-4">
                            Are you sure you want to delete "{deletingCategory.name}"? This will
                            also remove all its subcategories.
                        </p>
                        <div className="flex justify-end gap-2">
                            <Button variant="outline" onClick={() => setDeletingCategory(null)}>
                                Cancel
                            </Button>
                            <Button
                                variant="destructive"
                                onClick={() => confirmDelete(deletingCategory._id)}
                            >
                                Delete
                            </Button>
                        </div>
                    </div>
                </div>
            )}

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
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => handleEditClick(category)}
                                    >
                                        <Edit2 className="w-4 h-4" />
                                    </Button>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => setDeletingCategory(category)}
                                    >
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
};

export default AdminCategoriesTab;
