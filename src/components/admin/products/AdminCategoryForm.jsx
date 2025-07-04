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
import { Plus } from "lucide-react";

const AdminCategoryForm = ({ open, setOpen, categoryForm, setCategoryForm, addCategory }) => (
    <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
                <Plus className="w-4 h-4" />
                Add Category
            </Button>
        </DialogTrigger>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Add New Category</DialogTitle>
                <DialogDescription>Create a new product category</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
                <div>
                    <Label htmlFor="categoryName">Category Name</Label>
                    <Input
                        id="categoryName"
                        value={categoryForm.name}
                        onChange={(e) => setCategoryForm({ ...categoryForm, name: e.target.value })}
                        placeholder="e.g., Building Materials"
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
                <Button onClick={addCategory} className="w-full">
                    Add Category
                </Button>
            </div>
        </DialogContent>
    </Dialog>
);

export default AdminCategoryForm;
