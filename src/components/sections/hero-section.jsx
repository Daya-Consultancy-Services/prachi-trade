"use client";
import { useState, useEffect } from "react";

export default function HeroSection() {
    const [slides, setSlides] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const fetchSlides = async () => {
            try {
                const response = await fetch("/api/hero-slides");
                const data = await response.json();
                setSlides(data.filter((slide) => slide.isActive)); // Only use active slides
            } catch (error) {
                console.error("Error fetching hero slides:", error);
            }
        };

        fetchSlides();
    }, []);

    useEffect(() => {
        if (slides.length > 0) {
            const interval = setInterval(() => {
                setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
            }, 3000);

            return () => clearInterval(interval);
        }
    }, [slides]);

    if (slides.length === 0) {
        return null; // or return a loading state
    }

    const currentSlide = slides[currentIndex];

    return (
        <section className="relative min-h-[60vh] md:min-h-[70vh] flex items-center justify-center overflow-hidden">
            {/* Background Image Carousel */}
            <div
                className="absolute inset-0 bg-cover bg-center transition-all duration-1000"
                style={{ backgroundImage: `url('${currentSlide.imageUrl}')` }}
            ></div>

            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-black opacity-40"></div>

            {/* Text Content */}
            <div className="relative text-white max-w-2xl text-center px-4 py-8 z-10">
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 leading-snug">
                    {currentSlide.title}
                </h1>
                <p className="text-sm sm:text-base md:text-lg opacity-90">
                    {currentSlide.description}
                </p>
            </div>
        </section>
    );
}
