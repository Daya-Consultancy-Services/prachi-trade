export default function HeroSection() {
  return (
    <section className="relative min-h-[60vh] md:min-h-[70vh] flex items-center justify-center overflow-hidden">
      
      {/* Background image */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/image2.png')" }}
      ></div>
      
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black opacity-40"></div> 

      {/* Text content */}
      <div className="relative text-white max-w-2xl text-center px-4 py-8">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 leading-snug">
          THE LARGEST BUILDING MATERIAL SUPPLIER IN ODISHA
        </h1>
        <p className="text-sm sm:text-base md:text-lg opacity-90">
          As the largest building material supplier in ODISHA, we offer a wide range of products that cater to the
          varied aspects of construction, from groundwork to completion, taking care of every single step in the
          construction process.
        </p>
      </div>
    </section>
  );
}
