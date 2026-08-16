"use client";

import React from "react";
import { BRAND_INFO } from "@/data/content";
import { Globe2, Sparkles, MapPin } from "lucide-react";

export default function ServiceArea() {
  return (
    <section
      className="py-12 sm:py-16 bg-[#03241B] text-[#FAF6F0] border-y border-[#C69A3A]/25 relative overflow-hidden"
      aria-label="National Service Coverage"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Left: Icon & Badge */}
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-none bg-[#063D2E] border border-[#C69A3A]/40 flex items-center justify-center text-[#C69A3A] shrink-0">
              <Globe2 className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#C69A3A] animate-pulse" />
                <span className="text-[10px] sm:text-xs uppercase tracking-[0.25em] font-semibold text-[#C69A3A]">
                  National Reach
                </span>
              </div>
              <h3 className="font-display text-xl sm:text-2xl lg:text-3xl text-[#FAF6F0] font-normal">
                {BRAND_INFO.serviceAreaShort}
              </h3>
            </div>
          </div>

          {/* Right: Brochure Statement Highlight */}
          <div className="flex items-center gap-3 px-5 py-3 bg-[#063D2E]/80 border border-[#C69A3A]/30">
            <MapPin className="w-4 h-4 text-[#C69A3A] shrink-0" />
            <span className="text-xs sm:text-sm font-medium tracking-wider text-[#F4EBDD] uppercase">
              {BRAND_INFO.serviceArea}
            </span>
            <Sparkles className="w-3.5 h-3.5 text-[#C69A3A] shrink-0" />
          </div>
        </div>
      </div>
    </section>
  );
}
