"use client";

import React from "react";
import Image from "next/image";
import { ArrowDown, ArrowUpRight, Sparkles, Compass } from "lucide-react";
import { BRAND_INFO } from "@/data/content";

export default function Hero() {
  const scrollTo = (id: string) => {
    const element = document.querySelector(id);
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
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center bg-[#03241B] text-[#FAF6F0] overflow-hidden pt-20 pb-12"
      aria-label="Hero Section"
    >
      {/* Background Photography with Architectural Depth */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=85"
          alt="Luxury architectural residence with modern landscape garden"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center scale-105 animate-fade-in"
        />
        {/* Multi-layered Deep Forest Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#03241B]/95 via-[#063D2E]/85 to-[#03241B]/90" />
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-[#03241B]/50 to-[#03241B]/95" />
      </div>

      {/* Decorative Architectural Gold Lines & Botanical Vector Flourish */}
      <div className="absolute inset-0 pointer-events-none z-10 opacity-25">
        <div className="max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex justify-between border-x border-[#C69A3A]/20">
          <div className="w-[1px] h-full bg-[#C69A3A]/10 hidden md:block" />
          <div className="w-[1px] h-full bg-[#C69A3A]/10 hidden lg:block" />
        </div>
      </div>

      {/* Hero Content Container */}
      <div className="relative z-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center justify-center my-auto">
        {/* Eyebrow Badge */}
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#063D2E]/80 border border-[#C69A3A]/40 backdrop-blur-md mb-6 sm:mb-8 animate-in fade-in slide-in-from-bottom-3 duration-700">
          <Sparkles className="w-3.5 h-3.5 text-[#C69A3A]" />
          <span className="text-[11px] sm:text-xs font-semibold uppercase tracking-[0.25em] text-[#F4EBDD]">
            {BRAND_INFO.name}
          </span>
        </div>

        {/* Main Headline */}
        <h1 className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-normal leading-[1.08] tracking-tight text-[#FAF6F0] mb-6 sm:mb-8 max-w-4xl">
          Designing Spaces. <br />
          <span className="italic font-light text-[#F4EBDD] block sm:inline">
            Enhancing Life.
          </span>
        </h1>

        {/* Secondary Brand Statement & Supporting Triad */}
        <div className="max-w-2xl mx-auto mb-8 sm:mb-10 space-y-3">
          <p className="text-base sm:text-xl md:text-2xl font-display tracking-wide text-[#E8DFD0] font-light">
            “{BRAND_INFO.secondaryStatement}”
          </p>

          <div className="flex items-center justify-center gap-3 sm:gap-6 pt-2">
            <span className="text-xs sm:text-sm font-medium tracking-[0.2em] text-[#C69A3A] uppercase">
              Green
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#C69A3A]/60" />
            <span className="text-xs sm:text-sm font-medium tracking-[0.2em] text-[#C69A3A] uppercase">
              Functional
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#C69A3A]/60" />
            <span className="text-xs sm:text-sm font-medium tracking-[0.2em] text-[#C69A3A] uppercase">
              Beautiful
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-4 w-full sm:w-auto mb-12 sm:mb-16">
          <button
            onClick={() => scrollTo("#contact")}
            className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#C69A3A] hover:bg-[#F4EBDD] text-[#063D2E] text-xs sm:text-sm font-semibold uppercase tracking-widest transition-all duration-300 shadow-xl shadow-black/30 hover:scale-[1.02] cursor-pointer"
          >
            <span>Book a Consultation</span>
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>

          <button
            onClick={() => scrollTo("#landscaping")}
            className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-transparent hover:bg-[#063D2E]/60 border border-[#C69A3A]/50 text-[#F4EBDD] hover:border-[#C69A3A] text-xs sm:text-sm font-semibold uppercase tracking-widest transition-all duration-300 backdrop-blur-sm cursor-pointer"
          >
            <Compass className="w-4 h-4 text-[#C69A3A]" />
            <span>Explore Our Services</span>
          </button>
        </div>

        {/* Scroll Indicator */}
        <div className="flex flex-col items-center gap-2 pt-2 opacity-80 hover:opacity-100 transition-opacity">
          <span className="text-[10px] tracking-[0.25em] uppercase text-[#C69A3A] font-medium">
            Scroll to Discover
          </span>
          <button
            onClick={() => scrollTo("#portfolio")}
            aria-label="Scroll to visual gallery"
            className="p-2 rounded-full border border-[#C69A3A]/30 text-[#C69A3A] hover:border-[#C69A3A] hover:text-[#FAF6F0] transition-colors cursor-pointer animate-bounce"
          >
            <ArrowDown className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Subtle Botanical Corner Line Graphic */}
      <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-[#FAF6F0] to-transparent pointer-events-none" />
    </section>
  );
}
