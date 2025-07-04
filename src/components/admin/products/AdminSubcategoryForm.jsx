import React from "react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogTrigger,
} from "@/components/ui/dialog";
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
import { Plus } from "lucide-react";

const AdminSubcategoryForm = ({
    open,
    setOpen,
    subcategoryForm,
    setSubcategoryForm,
    categories,
    addSubcategory,
}) => (
    <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
                <Plus className="w-4 h-4" />
                Add Subcategory
            </Button>
        </DialogTrigger>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Add New Subcategory</DialogTitle>
                <DialogDescription>Create a new product subcategory</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
                <div>
                    <Label htmlFor="subcategoryCategory">Category</Label>
                    <Select
                        value={subcategoryForm.categoryId}
                        onValueChange={(value) =>
                            setSubcategoryForm({ ...subcategoryForm, categoryId: value })
                        }
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
                    />
                </div>
                <div>
                    <Label htmlFor="subcategoryDescription">Description</Label>
                    <Textarea
                        id="subcategoryDescription"
                        value={subcategoryForm.description}
                        onChange={(e) =>
                            setSubcategoryForm({ ...subcategoryForm, description: e.target.value })
                        }
                        placeholder="Brief description of the subcategory"
                    />
                </div>
                <Button onClick={addSubcategory} className="w-full">
                    Add Subcategory
                </Button>
            </div>
        </DialogContent>
    </Dialog>
);

export default AdminSubcategoryForm;
