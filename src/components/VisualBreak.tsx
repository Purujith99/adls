"use client";

import React from "react";
import Image from "next/image";

export default function VisualBreak() {
  return (
    <section
      className="relative h-[65vh] min-h-[420px] max-h-[700px] w-full flex items-center justify-center overflow-hidden"
      aria-label="Atmospheric Showcase"
    >
      {/* High-res cinematic panoramic landscape photography */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?auto=format&fit=crop&w=2000&q=85"
          alt="Atmospheric landscaped residential garden with outdoor pergola seating"
          fill
          sizes="100vw"
          className="object-cover object-center scale-105"
        />
        {/* Deep translucent emerald-forest overlay */}
        <div className="absolute inset-0 bg-[#03241B]/65 backdrop-blur-[1px]" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#063D2E] via-transparent to-[#063D2E]/90" />
      </div>

      {/* Center Quote Overlay */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <div className="w-12 h-[1.5px] bg-[#C69A3A] mx-auto mb-6 sm:mb-8" />

        <h3 className="font-display text-3xl sm:text-5xl md:text-6xl font-light text-[#FAF6F0] leading-tight tracking-tight italic">
          “Spaces that feel as good as they look.”
        </h3>

        <div className="mt-6 flex items-center justify-center gap-4">
          <span className="text-[11px] sm:text-xs uppercase tracking-[0.25em] text-[#C69A3A] font-semibold">
            Athreya Design & Landscaping Studio
          </span>
        </div>
      </div>
    </section>
  );
}
