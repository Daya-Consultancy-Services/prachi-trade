"use client";
import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header";
import Image from "next/image";

export default function MsRodPage() {
    return (
        <div>
            <Header />
            <section className="relative h-96 flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-cover bg-center bg-orange-300"></div>
                <div className="absolute inset-0 bg-black opacity-30"></div>
                <div className="relative text-white max-w-5xl text-center px-4">
                    <h1 className="text-lg md:text-4xl font-bold mb-4">
                        HIGH-QUALITY MS RODS FOR STRONG FOUNDATIONS
                    </h1>
                    <p className="text-lg md:text-sm opacity-90">
                        Explore our range of MS Rods from trusted brands for your construction
                        needs.
                    </p>
                </div>
            </section>
            <div className="min-h-screen bg-white">
                {/* Shyam Steel */}
                <div className="w-full bg-white py-10 px-4 flex flex-col md:flex-row items-center justify-center gap-8">
                    <Image src="/steel1.png" alt="Shyam Steel" width={400} height={800} />
                    <div>
                        <h2 className="text-xl font-bold mb-3">Shyam Steel</h2>
                        <p className="mb-3">
                            Shyam Steel is known for its high strength and durability, making it a
                            preferred choice for large-scale construction projects. Their MS rods
                            are manufactured with strict quality control to ensure reliability and
                            safety.
                        </p>
                    </div>
                </div>
                {/* GK IMT */}
                <div className="w-full bg-orange-100 py-10 px-4 flex flex-col md:flex-row items-center justify-center gap-8">
                    <div className="md:order-2">
                        <Image src="/steel2.png" alt="GK IMT" width={400} height={800} />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-orange-700 mb-3">GK IMT</h2>
                        <p className="mb-3">
                            GK IMT rods are engineered for superior performance and are trusted by
                            engineers and architects for their consistency and strength. Ideal for
                            both residential and commercial projects.
                        </p>
                    </div>
                </div>
                {/* Shrusti */}
                <div className="w-full bg-white py-10 px-4 flex flex-col md:flex-row items-center justify-center gap-8">
                    <Image src="/steel1.png" alt="Shrusti" width={400} height={800} />
                    <div>
                        <h2 className="text-xl font-bold mb-3">Shrusti</h2>
                        <p className="mb-3">
                            Shrusti MS rods are recognized for their excellent weldability and
                            flexibility, making them suitable for a wide range of construction
                            applications.
                        </p>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}
