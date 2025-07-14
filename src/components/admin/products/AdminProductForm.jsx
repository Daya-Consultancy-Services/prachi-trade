import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogTrigger,
    DialogFooter,
} from "@/components/ui/dialog";
import { Plus, Save, Trash2 } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@radix-ui/react-select";
import { Textarea } from "@/components/ui/textarea";

const AdminProductForm = ({
    open,
    setOpen,
    productForm,
    setProductForm,
    categories,
    getSubcategoriesForCategory,
    handleImageUpload,
    imageUploading,
    imageError,
    addProduct,
    editProduct,
    deleteProduct,
    editingProduct,
    setEditingProduct,
}) => {
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        if (editingProduct) {
            setIsEditing(true);
            setProductForm({
                ...editingProduct,
                categoryId:
                    categories.find((cat) =>
                        cat.subcategories.some((sub) => sub._id === editingProduct.subcategory)
                    )?._id || "",
                subcategoryId: editingProduct.subcategory,
            });
        } else {
            setIsEditing(false);
            setProductForm({
                name: "",
                brand: "",
                price: "",
                unit: "",
                stock: "",
                categoryId: "",
                subcategoryId: "",
                image: "",
                description: "",
            });
        }
    }, [editingProduct]);

    const handleSubmit = async () => {
        if (isEditing && editingProduct) {
            await editProduct(editingProduct._id, productForm);
        } else {
            await addProduct();
        }
        setOpen(false);
    };

    const handleDelete = async () => {
        if (editingProduct) {
            await deleteProduct(editingProduct._id);
            setDeleteDialogOpen(false);
            setOpen(false);
        }
    };

    return (
        <>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <Button className="flex items-center gap-2">
                        <Plus className="w-4 h-4" />
                        Add Product
                    </Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>{isEditing ? "Edit Product" : "Add New Product"}</DialogTitle>
                        <DialogDescription>
                            {isEditing ? "Update the product details" : "Create a new product"}
                        </DialogDescription>
                    </DialogHeader>
                    <div
                        className="space-y-4 max-h-[70vh] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100"
                        style={{ scrollbarWidth: "thin" }}
                    >
                        <div>
                            <Label htmlFor="productCategory">Category</Label>
                            <Select
                                value={productForm.categoryId}
                                onValueChange={(value) =>
                                    setProductForm({
                                        ...productForm,
                                        categoryId: value,
                                        subcategoryId: "",
                                    })
                                }
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select category" />
                                </SelectTrigger>
                                <SelectContent>
                                    {categories.map((category) => (
                                        <SelectItem
                                            key={category._id}
                                            value={category._id.toString()}
                                        >
                                            {category.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div>
                            <Label htmlFor="productSubcategory">Subcategory</Label>
                            <Select
                                value={productForm.subcategoryId}
                                onValueChange={(value) =>
                                    setProductForm({ ...productForm, subcategoryId: value })
                                }
                                disabled={!productForm.categoryId}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select subcategory" />
                                </SelectTrigger>
                                <SelectContent>
                                    {getSubcategoriesForCategory(productForm.categoryId).map(
                                        (subcategory) => (
                                            <SelectItem
                                                key={subcategory._id}
                                                value={subcategory._id.toString()}
                                            >
                                                {subcategory.name}
                                            </SelectItem>
                                        )
                                    )}
                                </SelectContent>
                            </Select>
                        </div>
                        <div>
                            <Label htmlFor="productName">Product Name</Label>
                            <Input
                                id="productName"
                                value={productForm.name}
                                onChange={(e) =>
                                    setProductForm({ ...productForm, name: e.target.value })
                                }
                                placeholder="e.g., UltraTech Cement"
                            />
                        </div>
                        <div>
                            <Label htmlFor="productBrand">Brand</Label>
                            <Input
                                id="productBrand"
                                value={productForm.brand}
                                onChange={(e) =>
                                    setProductForm({ ...productForm, brand: e.target.value })
                                }
                                placeholder="e.g., UltraTech"
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <Label htmlFor="productPrice">Price (₹)</Label>
                                <Input
                                    id="productPrice"
                                    type="number"
                                    value={productForm.price}
                                    onChange={(e) =>
                                        setProductForm({ ...productForm, price: e.target.value })
                                    }
                                    placeholder="350"
                                    required
                                    min={0}
                                />
                            </div>
                            <div>
                                <Label htmlFor="productUnit">Unit</Label>
                                <Input
                                    id="productUnit"
                                    value={productForm.unit}
                                    onChange={(e) =>
                                        setProductForm({ ...productForm, unit: e.target.value })
                                    }
                                    placeholder="bag, kg, liter"
                                />
                            </div>
                        </div>
                        <div>
                            <Label htmlFor="productStock">Stock Quantity</Label>
                            <Input
                                id="productStock"
                                type="number"
                                value={productForm.stock}
                                onChange={(e) =>
                                    setProductForm({ ...productForm, stock: e.target.value })
                                }
                                placeholder="100"
                            />
                        </div>
                        <div>
                            <Label htmlFor="productDescription">Description</Label>
                            <Textarea
                                id="productDescription"
                                value={productForm.description}
                                onChange={(e) =>
                                    setProductForm({ ...productForm, description: e.target.value })
                                }
                                placeholder="Enter product description"
                                rows={3}
                            />
                        </div>
                        <div>
                            <Label htmlFor="productImage">Product Image</Label>
                            <Input
                                id="productImage"
                                type="file"
                                accept="image/*"
                                onChange={handleImageUpload}
                                disabled={imageUploading}
                            />
                            {imageUploading && (
                                <div className="text-sm text-gray-500 mt-1">Uploading...</div>
                            )}
                            {imageError && (
                                <div className="text-sm text-red-500 mt-1">{imageError}</div>
                            )}
                            {productForm.image && (
                                <img
                                    src={productForm.image}
                                    alt="Product Preview"
                                    className="mt-2 rounded border w-32 h-32 object-cover"
                                />
                            )}
                        </div>
                        <div className="flex gap-2">
                            <Button onClick={handleSubmit} className="flex-1">
                                {isEditing ? (
                                    <>
                                        <Save className="w-4 h-4 mr-2" />
                                        Save Changes
                                    </>
                                ) : (
                                    <>
                                        <Plus className="w-4 h-4 mr-2" />
                                        Add Product
                                    </>
                                )}
                            </Button>
                            {isEditing && (
                                <Button
                                    variant="destructive"
                                    onClick={() => setDeleteDialogOpen(true)}
                                >
                                    <Trash2 className="w-4 h-4 mr-2" />
                                    Delete
                                </Button>
                            )}
                        </div>
                    </div>
                </DialogContent>
            </Dialog>

            {/* Delete Confirmation Dialog - Replaced AlertDialog with Dialog */}
            <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Are you absolutely sure?</DialogTitle>
                        <DialogDescription>
                            This action cannot be undone. This will permanently delete the product.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
                            Cancel
                        </Button>
                        <Button variant="destructive" onClick={handleDelete}>
                            Delete
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default AdminProductForm;
