import React from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Plus, Save } from "lucide-react";

const AdminSubcategoryForm = ({
    open,
    setOpen,
    subcategoryForm,
    setSubcategoryForm,
    categories,
    onSubmit,
    isEditMode = false,
}) => {
    const handleFormSubmit = (e) => {
        e.preventDefault();
        onSubmit();
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            {!isEditMode && (
                <Button onClick={() => setOpen(true)} className="flex items-center gap-2">
                    <Plus className="w-4 h-4" />
                    Add Subcategory
                </Button>
            )}
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        {isEditMode ? "Edit Subcategory" : "Add New Subcategory"}
                    </DialogTitle>
                </DialogHeader>
                <form onSubmit={handleFormSubmit} className="space-y-4">
                    <div>
                        <Label htmlFor="subcategoryCategory">Category</Label>
                        <Select
                            value={subcategoryForm.categoryId}
                            onValueChange={(value) =>
                                setSubcategoryForm({ ...subcategoryForm, categoryId: value })
                            }
                            required
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                            <SelectContent>
                                {categories.map((category) => (
                                    <SelectItem key={category._id} value={category._id.toString()}>
                                        {category.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <div>
                        <Label htmlFor="subcategoryName">Subcategory Name</Label>
                        <Input
                            id="subcategoryName"
                            value={subcategoryForm.name}
                            onChange={(e) =>
                                setSubcategoryForm({ ...subcategoryForm, name: e.target.value })
                            }
                            placeholder="e.g., Cement"
                            required
                        />
                    </div>
                    <div>
                        <Label htmlFor="subcategoryDescription">Description</Label>
                        <Textarea
                            id="subcategoryDescription"
                            value={subcategoryForm.description}
                            onChange={(e) =>
                                setSubcategoryForm({
                                    ...subcategoryForm,
                                    description: e.target.value,
                                })
                            }
                            placeholder="Brief description of the subcategory"
                        />
                    </div>
                    <Button type="submit" className="w-full">
                        {isEditMode ? (
                            <>
                                <Save className="w-4 h-4 mr-2" />
                                Update Subcategory
                            </>
                        ) : (
                            <>
                                <Plus className="w-4 h-4 mr-2" />
                                Add Subcategory
                            </>
                        )}
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default AdminSubcategoryForm;
