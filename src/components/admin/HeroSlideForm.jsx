"use client";
import { useState } from "react";

export default function HeroSlideForm({ editingSlide, onCancel, onSuccess }) {
    const [formData, setFormData] = useState({
        title: editingSlide?.title || "",
        description: editingSlide?.description || "",
        imageUrl: editingSlide?.imageUrl || "",
        isActive: editingSlide?.isActive ?? true,
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const url = editingSlide ? `/api/hero-slides/${editingSlide._id}` : "/api/hero-slides";
            const method = editingSlide ? "PUT" : "POST";

            const response = await fetch(url, {
                method,
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error("Failed to save slide");
            }

            onSuccess();
        } catch (error) {
            console.error("Error saving slide:", error);
            alert("Failed to save slide. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-4">
                {editingSlide ? "Edit Slide" : "Add New Slide"}
            </h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Title</label>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Description</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        rows="3"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Image URL</label>
                    <input
                        type="text"
                        name="imageUrl"
                        value={formData.imageUrl}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>
                <div className="mb-4 flex items-center">
                    <input
                        type="checkbox"
                        id="isActive"
                        name="isActive"
                        checked={formData.isActive}
                        onChange={handleChange}
                        className="mr-2"
                    />
                    <label htmlFor="isActive" className="text-sm">
                        Active
                    </label>
                </div>
                <div className="flex justify-end gap-2">
                    {editingSlide && (
                        <button
                            type="button"
                            onClick={onCancel}
                            className="px-4 py-2 text-sm bg-gray-200 rounded hover:bg-gray-300"
                            disabled={isSubmitting}
                        >
                            Cancel
                        </button>
                    )}
                    <button
                        type="submit"
                        className="px-4 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? "Saving..." : editingSlide ? "Update Slide" : "Add Slide"}
                    </button>
                </div>
            </form>
        </div>
    );
}
