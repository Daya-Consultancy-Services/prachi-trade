import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Save } from "lucide-react";

const AdminCategoryForm = ({
    open,
    setOpen,
    categoryForm,
    setCategoryForm,
    onSubmit,
    isEditMode = false,
}) => {
    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit();
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{isEditMode ? "Edit Category" : "Add New Category"}</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <Label htmlFor="categoryName">Category Name</Label>
                        <Input
                            id="categoryName"
                            value={categoryForm.name}
                            onChange={(e) =>
                                setCategoryForm({ ...categoryForm, name: e.target.value })
                            }
                            placeholder="e.g., Building Materials"
                            required
                        />
                    </div>
                    <div>
                        <Label htmlFor="categoryDescription">Description</Label>
                        <Textarea
                            id="categoryDescription"
                            value={categoryForm.description}
                            onChange={(e) =>
                                setCategoryForm({ ...categoryForm, description: e.target.value })
                            }
                            placeholder="Brief description of the category"
                        />
                    </div>
                    <Button type="submit" className="w-full">
                        {isEditMode ? "Update Category" : "Add Category"}
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    );
};
export default AdminCategoryForm;
