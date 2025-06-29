export default function HeroSection() {
  return (
    <section className="relative h-96 flex items-center justify-center overflow-hidden">
      {/* Background image with blur effect */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/image2.png')" }}
      ></div>
      
      {/* Dark overlay to improve text readability */}
      <div className="absolute inset-0 bg-black opacity-30"></div> 

      {/* Text content - remains clear */}
      <div className="relative text-white max-w-2xl text-center px-4">
        <h1 className="text-4xl md:text-4xl font-bold mb-4">
          THE LARGEST BUILDING MATERIAL SUPPLIER IN ODISHA
        </h1>
        <p className="text-lg md:text-sm opacity-90">
          As the largest building material supplier in ODISHA, we offer a wide range of products that cater to the
          varied aspects of construction, from groundwork to completion taking care of every single step in the
          construction process.
        </p>
      </div>
    </section>
  );
}