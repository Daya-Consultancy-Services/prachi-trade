import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { COMPANY_INFO } from "@/lib/constants";
import { navigationItems } from "@/data/navigation";

export default function Header() {
  return (
    <header className="relative w-full">

      {/* Top Bar */}
      <div className="relative w-full py-1.5 text-xs bg-white text-black border-b border-gray-200">
        
        {/* Center Email */}
        <div className="flex justify-center relative">
          <span>{COMPANY_INFO.email}</span>
          <span className="absolute right-12">{COMPANY_INFO.location}</span>
        </div>
        
      </div>

      {/* Main Navigation */}
      <div className="relative w-full bg-[#3C372F] text-white flex items-center justify-between px-4 md:px-12 py-4">

        {/* Left: Logo */}
        <Link href="/" className="flex items-center">
          <div className="w-50 h-10  flex items-center justify-center">
            <img src="/logo.png" alt="Steel"    />
          </div>
        </Link>

        {/* Center: Navigation Menu */}
        <nav className="hidden md:flex space-x-8 font-medium">
          {navigationItems.map((item) => (
            <div key={item.name} className="relative group">
              <Link href={item.href} className="hover:text-orange-500 transition-colors flex items-center">
                {item.name}
                {item.hasDropdown && <ChevronDown className="ml-1 w-4 h-4" />}
              </Link>

              {item.hasDropdown && (
                <div className="absolute top-full left-0 mt-2 w-48 bg-white text-gray-800 rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  <div className="py-2">
                    <Link href="buildingmaterial" className="block px-4 py-2 hover:bg-gray-100">Building Materials</Link>
                    <Link href="fabrication" className="block px-4 py-2 hover:bg-gray-100">Fabrication</Link>
                    <Link href="tilepipe" className="block px-4 py-2 hover:bg-gray-100">Tiles & Sanitary</Link>
                    <Link href="paint" className="block px-4 py-2 hover:bg-gray-100">Paint</Link>
                  </div>
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Right: Enquiry and Contact Button */}
        <div className="flex relative items-center space-x-4">

          {/* Product Enquiry Button */}
          <Button className="bg-white text-gray-800 hover:bg-gray-100 px-6 py-2 rounded-full font-medium">
            PRODUCT ENQUIRY
          </Button>

          {/* Vertical Contact Button */}
          <div className="bg-orange-500    absolute -right-3 top-8 text-white text-sm px-8  py-2 rotate-90 origin-bottom-right cursor-pointer hover:bg-orange-600">
           <Link href="/contact">
           <span className="p-2 rotate-90"> Contact</span>
           </Link>
           
          </div>

        </div>
      </div>

    </header>
  );
}
