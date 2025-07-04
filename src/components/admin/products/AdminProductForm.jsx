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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Plus } from "lucide-react";

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
}) => (
    <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
                <Plus className="w-4 h-4" />
                Add Product
            </Button>
        </DialogTrigger>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Add New Product</DialogTitle>
                <DialogDescription>Create a new product</DialogDescription>
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
                            setProductForm({ ...productForm, categoryId: value, subcategoryId: "" })
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
                    <Label htmlFor="productSubcategory">Subcategory</Label>
                    <Select
                        value={productForm.subcategoryId}
                        onValueChange={(value) =>
                            setProductForm({ ...productForm, subcategoryId: value })
                        }
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
                        onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                        placeholder="e.g., UltraTech Cement"
                    />
                </div>
                <div>
                    <Label htmlFor="productBrand">Brand</Label>
                    <Input
                        id="productBrand"
                        value={productForm.brand}
                        onChange={(e) => setProductForm({ ...productForm, brand: e.target.value })}
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
                        onChange={(e) => setProductForm({ ...productForm, stock: e.target.value })}
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
                    {imageError && <div className="text-sm text-red-500 mt-1">{imageError}</div>}
                    {productForm.image && (
                        <img
                            src={productForm.image}
                            alt="Product Preview"
                            className="mt-2 rounded border w-32 h-32 object-cover"
                        />
                    )}
                </div>
                <Button onClick={addProduct} className="w-full">
                    Add Product
                </Button>
            </div>
        </DialogContent>
    </Dialog>
);

export default AdminProductForm;
