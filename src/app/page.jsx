import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import HeroSection from "@/components/sections/hero-section";
import MissionSection from "@/components/sections/mission-section";
import BrandSection from "@/components/sections/brand-section";
import Link from "next/link";
import { Phone } from "lucide-react";

export default function HomePage() {
    return (
        <div className="min-h-screen bg-white relative overflow-visible">
            <Header />
            <main>
                <HeroSection />
                <MissionSection />
                <BrandSection />
            </main>
            <Footer />

            {/* Contact Icon Button Fixed to Overflow Page */}
            <div className="fixed right-[20px] bottom-8 z-50">
                <Link href="/contact">
                    <div className="bg-orange-500 hover:bg-orange-600 text-white p-4 rounded-full shadow-lg cursor-pointer">
                        <Phone className="w-6 h-6" />
                    </div>
                </Link>
            </div>
        </div>
    );
}
