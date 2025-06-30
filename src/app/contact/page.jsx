"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ContactModal() {
  const [isOpen, setIsOpen] = useState(true);
  const router = useRouter();

  return (
    <div>
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-xl p-8 w-full max-w-md relative">
            
            {/* Close Button */}
            <button
              onClick={() => router.push("/")}
              className="absolute top-2 right-2 text-black font-bold"
            >
              &times;
            </button>

            <h2 className="text-2xl font-bold mb-4 text-center">Contact Us</h2>

            <form className="space-y-4">
              <div>
                <label className="block mb-1 font-medium">Name *</label>
                <input
                  type="text"
                  placeholder="Your Name *"
                  className="w-full border rounded-full px-4 py-2 focus:outline-none"
                />
              </div>

              <div>
                <label className="block mb-1 font-medium">Mobile *</label>
                <input
                  type="text"
                  placeholder="Your Mobile *"
                  className="w-full border rounded-full px-4 py-2 focus:outline-none"
                />
              </div>

              <div>
                <label className="block mb-1 font-medium">Email *</label>
                <input
                  type="email"
                  placeholder="Your Email *"
                  className="w-full border rounded-full px-4 py-2 focus:outline-none"
                />
              </div>

              <div>
                <label className="block mb-1 font-medium">Message *</label>
                <textarea
                  placeholder="Your Message *"
                  className="w-full border rounded-full px-4 py-2 focus:outline-none"
                  rows="2"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-orange-600 text-white py-2 rounded-full font-bold"
              >
                SUBMIT
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
