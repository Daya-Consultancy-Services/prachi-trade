import React, { useState } from "react";
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
    editSubcategory,
    deleteSubcategory,
}) => {
    const [deletingSubcategory, setDeletingSubcategory] = useState(null);
    const [editingSubcategoryId, setEditingSubcategoryId] = useState(null);

    const handleEditClick = (subcategory) => {
        setEditingSubcategoryId(subcategory._id);
        setSubcategoryForm({
            name: subcategory.name,
            description: subcategory.description || "",
            categoryId: subcategory.category._id || subcategory.category,
        });
        setOpenDialog("edit-subcategory");
    };

    const handleSubmit = async () => {
        if (openDialog === "subcategory") {
            await addSubcategory();
        } else if (openDialog === "edit-subcategory" && editingSubcategoryId) {
            await editSubcategory(editingSubcategoryId, {
                name: subcategoryForm.name,
                description: subcategoryForm.description,
                categoryId: subcategoryForm.categoryId,
            });
        }
        setOpenDialog(null);
        setEditingSubcategoryId(null);
    };

    const confirmDelete = async () => {
        if (deletingSubcategory) {
            await deleteSubcategory(deletingSubcategory._id);
            setDeletingSubcategory(null);
        }
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Manage Subcategories</h2>
                <AdminSubcategoryForm
                    open={openDialog === "subcategory" || openDialog === "edit-subcategory"}
                    setOpen={(open) => {
                        if (!open) setOpenDialog(null);
                    }}
                    subcategoryForm={subcategoryForm}
                    setSubcategoryForm={setSubcategoryForm}
                    categories={categories}
                    onSubmit={handleSubmit}
                    isEditMode={openDialog === "edit-subcategory"}
                />
            </div>

            {/* Delete Confirmation Modal */}
            {deletingSubcategory && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg max-w-md w-full">
                        <h3 className="text-lg font-semibold mb-2">Confirm Deletion</h3>
                        <p className="text-gray-600 mb-4">
                            Are you sure you want to delete "{deletingSubcategory.name}"? This will
                            also remove all its products.
                        </p>
                        <div className="flex justify-end gap-2">
                            <Button variant="outline" onClick={() => setDeletingSubcategory(null)}>
                                Cancel
                            </Button>
                            <Button variant="destructive" onClick={confirmDelete}>
                                Delete
                            </Button>
                        </div>
                    </div>
                </div>
            )}

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
                                                {subcategory.products.length} products
                                            </Badge>
                                        </div>
                                        <p className="text-sm text-gray-600 mb-3">
                                            {subcategory.description || "No description"}
                                        </p>
                                        <div className="flex gap-2">
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => handleEditClick(subcategory)}
                                            >
                                                <Edit2 className="w-4 h-4" />
                                            </Button>
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => setDeletingSubcategory(subcategory)}
                                            >
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
};

export default AdminSubcategoriesTab;
