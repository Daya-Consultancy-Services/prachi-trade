import Link from "next/link"
import { COMPANY_INFO } from "@/lib/constants"
import { footerLinks } from "@/data/navigation"

export default function Footer() {
  return (
    <footer className="bg-[#3C372F] text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-4">QUICK LINKS</h3>
            <ul className="space-y-2">
              {footerLinks.quickLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-gray-300 hover:text-white transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Products */}
          <div>
            <h3 className="font-bold text-lg mb-4">PRODUCTS</h3>
            <ul className="space-y-2">
              {footerLinks.products.map((product) => (
                <li key={product.name}>
                  <Link href={product.href} className="text-gray-300 hover:text-white transition-colors">
                    {product.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Us */}
          <div>
            <h3 className="font-bold text-lg mb-4">CONTACT US</h3>
            <ul className="space-y-2 text-gray-300">
              <li>{COMPANY_INFO.phone}</li>
              <li>{COMPANY_INFO.email}</li>
              <li className="text-sm">{COMPANY_INFO.address}</li>
              <li>GSTIN: {COMPANY_INFO.gstin}</li>
            </ul>
          </div>

          {/* Follow Us */}
          <div>
            <h3 className="font-bold text-lg mb-4">FOLLOW US</h3>
            <ul className="space-y-2">
              {footerLinks.socialMedia.map((social) => (
                <li key={social.name}>
                  <Link href={social.href} className="text-gray-300 hover:text-white transition-colors">
                    {social.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400 text-sm">
          © Copyrights Reserved 2025. All Rights Reserved. | Powered by {COMPANY_INFO.poweredBy}
        </div>
      </div>
    </footer>
  )
}
