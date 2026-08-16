"use client";

import React from "react";
import LandscapingServices from "./LandscapingServices";
import ArchitectureServices from "./ArchitectureServices";

export default function Services() {
  return (
    <section
      id="services"
      className="py-20 lg:py-32 bg-[#F4EBDD]/60 text-[#18221D] relative border-t border-[#C69A3A]/20"
      aria-label="Athreya Design & Landscaping Studio Services"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Section Header */}
        <div className="max-w-3xl mb-16 sm:mb-20">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-8 h-[1.5px] bg-[#C69A3A]" />
            <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#063D2E]">
              Comprehensive Offerings
            </span>
          </div>

          <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl font-normal leading-[1.1] text-[#063D2E] mb-5">
            Our Services
          </h2>

          <p className="text-base sm:text-xl text-[#2A3630]/90 font-light leading-relaxed">
            From landscape planning to architectural design, we create spaces with purpose.
          </p>
        </div>

        {/* Section 1: Landscape Design Services */}
        <LandscapingServices />

        {/* Section 2: Architecture & Interior Design Services */}
        <ArchitectureServices />
      </div>
    </section>
  );
}
