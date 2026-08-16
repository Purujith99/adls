"use client";

import { BRAND_INFO } from "@/data/content";
import { Phone, Mail, ArrowUp, MessageSquare } from "lucide-react";
import { InstagramIcon } from "@/components/Icons";



export default function Footer() {
  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) {
      const navOffset = 80;
      const pos = el.getBoundingClientRect().top + window.pageYOffset - navOffset;
      window.scrollTo({ top: pos, behavior: "smooth" });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer
      className="bg-[#03241B] text-[#FAF6F0] border-t border-[#C69A3A]/30 relative z-10"
      aria-label="Athreya Design Studio Footer"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-16 pb-12 border-b border-[#C69A3A]/20">
          {/* Column 1: Brand & Tagline */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-2.5">
              <span className="w-3 h-3 rounded-full bg-[#C69A3A]" />
              <span className="font-display text-2xl font-semibold tracking-wider text-[#FAF6F0] uppercase">
                ATHREYA
              </span>
            </div>
            <p className="text-xs uppercase tracking-[0.2em] font-medium text-[#C69A3A] pl-5.5">
              Design & Landscaping Studio
            </p>

            <p className="font-display text-xl text-[#F4EBDD] italic pt-2">
              “{BRAND_INFO.tagline}”
            </p>

            <p className="text-xs text-[#E8DFD0]/70 font-light max-w-sm leading-relaxed">
              We Plan. We Design. We Create. High-end landscape planning, architectural drawings, 3D visualization, and drip irrigation across India.
            </p>
          </div>

          {/* Column 2: Navigation Links */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs uppercase tracking-[0.2em] font-semibold text-[#C69A3A]">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-sm text-[#E8DFD0]/85 font-light">
              <li>
                <button
                  onClick={() => scrollTo("#hero")}
                  className="hover:text-[#C69A3A] transition-colors cursor-pointer"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo("#portfolio")}
                  className="hover:text-[#C69A3A] transition-colors cursor-pointer"
                >
                  Projects & Gallery
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo("#about")}
                  className="hover:text-[#C69A3A] transition-colors cursor-pointer"
                >
                  About Studio
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo("#services")}
                  className="hover:text-[#C69A3A] transition-colors cursor-pointer"
                >
                  Services
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo("#why-us")}
                  className="hover:text-[#C69A3A] transition-colors cursor-pointer"
                >
                  Why Choose Us
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo("#contact")}
                  className="hover:text-[#C69A3A] transition-colors cursor-pointer"
                >
                  Contact & Consultation
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Direct Contact Information */}
          <div className="lg:col-span-4 space-y-4">
            <h4 className="text-xs uppercase tracking-[0.2em] font-semibold text-[#C69A3A]">
              Contact Details
            </h4>
            <div className="space-y-3 text-xs sm:text-sm text-[#E8DFD0]/85 font-light">
              <div className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-[#C69A3A] shrink-0 mt-0.5" />
                <div className="space-y-1">
                  {BRAND_INFO.phones.map((p, idx) => (
                    <a
                      key={idx}
                      href={`tel:${p.value}`}
                      className="block hover:text-[#C69A3A] transition-colors"
                    >
                      {p.display}
                    </a>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-[#C69A3A] shrink-0" />
                <a
                  href={`mailto:${BRAND_INFO.email}`}
                  className="hover:text-[#C69A3A] transition-colors break-all"
                >
                  {BRAND_INFO.email}
                </a>
              </div>

              <div className="flex items-center gap-3">
                <InstagramIcon className="w-4 h-4 text-[#C69A3A] shrink-0" />
                <a
                  href={BRAND_INFO.instagram.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#C69A3A] transition-colors"
                >
                  {BRAND_INFO.instagram.handle}
                </a>
              </div>

              <div className="flex items-center gap-3">
                <MessageSquare className="w-4 h-4 text-[#C69A3A] shrink-0" />
                <a
                  href={`https://wa.me/${BRAND_INFO.whatsapp.number}?text=${encodeURIComponent(
                    BRAND_INFO.whatsapp.defaultMessage
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#C69A3A] transition-colors"
                >
                  WhatsApp Direct Inquiry
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Back to Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#E8DFD0]/60 font-light">
          <p>© 2026 Athreya Design & Landscaping Studio. All rights reserved.</p>

          <button
            onClick={scrollToTop}
            className="inline-flex items-center gap-2 text-xs uppercase tracking-wider text-[#C69A3A] hover:text-[#FAF6F0] transition-colors cursor-pointer"
          >
            <span>Back to Top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
