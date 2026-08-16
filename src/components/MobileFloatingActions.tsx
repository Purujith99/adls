"use client";

import React, { useState, useEffect } from "react";
import { BRAND_INFO } from "@/data/content";
import { Phone, MessageSquare, Calendar } from "lucide-react";

export default function MobileFloatingActions() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show floating buttons after scrolling past 300px
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToContact = () => {
    const el = document.querySelector("#contact");
    if (el) {
      const navOffset = 80;
      const pos = el.getBoundingClientRect().top + window.pageYOffset - navOffset;
      window.scrollTo({ top: pos, behavior: "smooth" });
    }
  };

  if (!isVisible) return null;

  return (
    <aside
      aria-label="Quick mobile contact actions"
      className="fixed bottom-4 left-4 right-4 z-40 lg:hidden animate-in fade-in slide-in-from-bottom-4 duration-300 pointer-events-none"
    >
      <div className="max-w-md mx-auto bg-[#063D2E]/95 backdrop-blur-md border border-[#C69A3A]/40 p-2 shadow-2xl flex items-center justify-between gap-2 pointer-events-auto">
        {/* Call Button */}
        <a
          href={`tel:${BRAND_INFO.primaryPhone}`}
          className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 px-3 bg-[#03241B] hover:bg-[#0B4A36] text-[#FAF6F0] border border-[#C69A3A]/30 text-xs font-semibold uppercase tracking-wider transition-colors"
          aria-label="Call Athreya Studio"
        >
          <Phone className="w-3.5 h-3.5 text-[#C69A3A]" />
          <span>Call</span>
        </a>

        {/* WhatsApp Button */}
        <a
          href={`https://wa.me/${BRAND_INFO.whatsapp.number}?text=${encodeURIComponent(
            BRAND_INFO.whatsapp.defaultMessage
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 px-3 bg-[#0B4A36] hover:bg-[#063D2E] text-[#FAF6F0] border border-[#C69A3A]/40 text-xs font-semibold uppercase tracking-wider transition-colors"
          aria-label="Chat on WhatsApp"
        >
          <MessageSquare className="w-3.5 h-3.5 text-[#C69A3A]" />
          <span>WhatsApp</span>
        </a>

        {/* Book / Contact Button */}
        <button
          onClick={scrollToContact}
          className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 px-3 bg-[#C69A3A] hover:bg-[#F4EBDD] text-[#063D2E] text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer"
          aria-label="Book Consultation"
        >
          <Calendar className="w-3.5 h-3.5" />
          <span>Consult</span>
        </button>
      </div>
    </aside>
  );
}
