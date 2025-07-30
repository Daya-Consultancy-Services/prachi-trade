"use client";
import { useState, useEffect } from "react";
import HeroSlideForm from "@/components/admin/HeroSlideForm";

export default function HeroSlidesAdmin() {
    const [slides, setSlides] = useState([]);
    const [editingSlide, setEditingSlide] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchSlides();
    }, []);

    const fetchSlides = async () => {
        try {
            const response = await fetch("/api/hero-slides");
            const data = await response.json();
            setSlides(data);
            setIsLoading(false);
        } catch (error) {
            console.error("Error fetching slides:", error);
            setIsLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (confirm("Are you sure you want to delete this slide?")) {
            try {
                await fetch(`/api/hero-slides/${id}`, {
                    method: "DELETE",
                });
                fetchSlides();
            } catch (error) {
                console.error("Error deleting slide:", error);
            }
        }
    };

    const handleEdit = (slide) => {
        setEditingSlide(slide);
    };

    const handleCancelEdit = () => {
        setEditingSlide(null);
    };

    if (isLoading) {
        return <div className="p-4">Loading...</div>;
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-6">Manage Hero Slides</h1>

            <HeroSlideForm
                editingSlide={editingSlide}
                onCancel={handleCancelEdit}
                onSuccess={() => {
                    setEditingSlide(null);
                    fetchSlides();
                }}
            />

            <div className="mt-8">
                <h2 className="text-xl font-semibold mb-4">Existing Slides</h2>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {slides.map((slide) => (
                        <div key={slide._id} className="border rounded-lg p-4 shadow">
                            <div className="h-40 bg-gray-100 mb-3 rounded overflow-hidden">
                                {slide.imageUrl && (
                                    <img
                                        src={slide.imageUrl}
                                        alt={slide.title}
                                        className="w-full h-full object-cover"
                                    />
                                )}
                            </div>
                            <h3 className="font-bold">{slide.title}</h3>
                            <p className="text-sm text-gray-600 line-clamp-2 mb-2">
                                {slide.description}
                            </p>
                            <div className="flex justify-between items-center">
                                <span
                                    className={`px-2 py-1 text-xs rounded ${
                                        slide.isActive
                                            ? "bg-green-100 text-green-800"
                                            : "bg-gray-100 text-gray-800"
                                    }`}
                                >
                                    {slide.isActive ? "Active" : "Inactive"}
                                </span>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => handleEdit(slide)}
                                        className="text-blue-500 hover:text-blue-700 text-sm"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(slide._id)}
                                        className="text-red-500 hover:text-red-700 text-sm"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
