"use client";

import React, { useState, useEffect } from "react";
import { BRAND_INFO } from "@/data/content";
import { Menu, X, Phone, MessageSquare, ArrowUpRight } from "lucide-react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when clicking outside or pressing Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileMenuOpen(false);
    };
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { label: "Home", href: "#hero" },
    { label: "Portfolio", href: "#portfolio" },
    { label: "About", href: "#about" },
    { label: "Services", href: "#services" },
    { label: "Why Us", href: "#why-us" },
    { label: "Process", href: "#process" },
    { label: "Contact", href: "#contact" },
  ];

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      const navOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-[#063D2E]/95 backdrop-blur-md border-b border-[#C69A3A]/25 py-3 shadow-lg shadow-black/20"
          : "bg-gradient-to-b from-[#03241B]/80 via-[#063D2E]/40 to-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo Lockup */}
          <a
            href="#hero"
            onClick={(e) => handleNavClick(e, "#hero")}
            className="group flex flex-col items-start focus:outline-none"
            aria-label="Athreya Design & Landscaping Studio"
          >
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#C69A3A] group-hover:scale-125 transition-transform" />
              <span className="font-display text-lg sm:text-xl lg:text-2xl font-semibold tracking-wider text-[#F4EBDD] uppercase">
                ATHREYA
              </span>
            </div>
            <span className="text-[9px] sm:text-[10px] tracking-[0.2em] font-medium text-[#C69A3A] uppercase pl-4.5">
              Design & Landscaping Studio
            </span>
          </a>

          {/* Desktop Navigation Links */}
          <nav
            className="hidden lg:flex items-center space-x-7"
            aria-label="Main Navigation"
          >
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-xs xl:text-sm font-medium tracking-wider text-[#F4EBDD]/90 hover:text-[#C69A3A] transition-colors uppercase relative group py-1"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#C69A3A] transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* Desktop Consultation CTA */}
          <div className="hidden lg:flex items-center space-x-4">
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, "#contact")}
              className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider px-5 py-2.5 rounded-none border border-[#C69A3A] bg-[#C69A3A] text-[#063D2E] hover:bg-transparent hover:text-[#F4EBDD] transition-all duration-300 shadow-sm"
            >
              <span>Get a Consultation</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <a
              href={`https://wa.me/${BRAND_INFO.whatsapp.number}?text=${encodeURIComponent(
                BRAND_INFO.whatsapp.defaultMessage
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-[#C69A3A] hover:text-[#FAF6F0] transition-colors"
              aria-label="WhatsApp quick chat"
            >
              <MessageSquare className="w-5 h-5" />
            </a>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              type="button"
              className="p-2 rounded text-[#F4EBDD] hover:text-[#C69A3A] hover:bg-[#0B4A36]/60 transition-colors focus:outline-none"
              aria-expanded={mobileMenuOpen}
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 top-[60px] sm:top-[68px] z-40 bg-[#063D2E]/98 backdrop-blur-xl border-t border-[#C69A3A]/20 flex flex-col justify-between p-6 overflow-y-auto lg:hidden animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="flex flex-col space-y-4 pt-2">
            <div className="pb-3 border-b border-[#C69A3A]/20">
              <span className="text-[11px] uppercase tracking-widest text-[#C69A3A] font-semibold">
                Menu Navigation
              </span>
            </div>
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-lg font-display tracking-wide text-[#F4EBDD] hover:text-[#C69A3A] py-1 transition-colors flex items-center justify-between group"
              >
                <span>{link.label}</span>
                <span className="text-xs text-[#C69A3A] opacity-0 group-hover:opacity-100 transition-opacity">
                  →
                </span>
              </a>
            ))}
          </div>

          {/* Mobile Menu Footer & Direct Contact Actions */}
          <div className="pt-6 border-t border-[#C69A3A]/20 space-y-4">
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, "#contact")}
              className="w-full flex items-center justify-center gap-2 py-3 bg-[#C69A3A] text-[#063D2E] font-semibold text-sm uppercase tracking-wider hover:bg-[#F4EBDD] transition-colors"
            >
              <span>Book a Consultation</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <a
                href={`tel:${BRAND_INFO.primaryPhone}`}
                className="flex items-center justify-center gap-2 py-2.5 px-3 border border-[#C69A3A]/40 text-[#F4EBDD] text-xs font-medium tracking-wide hover:border-[#C69A3A] hover:bg-[#0B4A36] transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-[#C69A3A]" />
                <span>Call Us</span>
              </a>
              <a
                href={`https://wa.me/${BRAND_INFO.whatsapp.number}?text=${encodeURIComponent(
                  BRAND_INFO.whatsapp.defaultMessage
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 py-2.5 px-3 border border-[#C69A3A]/40 text-[#F4EBDD] text-xs font-medium tracking-wide hover:border-[#C69A3A] hover:bg-[#0B4A36] transition-colors"
              >
                <MessageSquare className="w-3.5 h-3.5 text-[#C69A3A]" />
                <span>WhatsApp</span>
              </a>
            </div>

            <p className="text-center text-[10px] tracking-wider uppercase text-[#C69A3A]/80 pt-2">
              Service Available All Over India
            </p>
          </div>
        </div>
      )}
    </header>
  );
}
