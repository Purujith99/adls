"use client";

import React from "react";
import Image from "next/image";
import { DESIGN_FOR_CATEGORIES } from "@/data/content";
import {
  Castle,
  Building2,
  TreePine,
  SunMedium,
  Hotel,
  GraduationCap,
  Sparkles,
} from "lucide-react";

export default function Industries() {
  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case "Castle":
        return <Castle className="w-5 h-5 text-[#C69A3A]" />;
      case "Building2":
        return <Building2 className="w-5 h-5 text-[#C69A3A]" />;
      case "TreePine":
        return <TreePine className="w-5 h-5 text-[#C69A3A]" />;
      case "SunMedium":
        return <SunMedium className="w-5 h-5 text-[#C69A3A]" />;
      case "Hotel":
        return <Hotel className="w-5 h-5 text-[#C69A3A]" />;
      case "GraduationCap":
        return <GraduationCap className="w-5 h-5 text-[#C69A3A]" />;
      default:
        return <Sparkles className="w-5 h-5 text-[#C69A3A]" />;
    }
  };

  return (
    <section
      id="sectors"
      className="py-20 lg:py-32 bg-[#063D2E] text-[#FAF6F0] relative overflow-hidden"
      aria-label="Sectors and Property Types We Design For"
    >
      {/* Background Architectural Grid Lines */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="max-w-7xl mx-auto h-full px-4 flex justify-between border-x border-[#C69A3A]/40">
          <div className="w-[1px] h-full bg-[#C69A3A]/20" />
          <div className="w-[1px] h-full bg-[#C69A3A]/20" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#0B4A36] border border-[#C69A3A]/40 mb-4">
            <span className="text-[11px] uppercase tracking-[0.2em] font-semibold text-[#C69A3A]">
              Specialized Project Sectors
            </span>
          </div>

          <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl font-normal leading-[1.1] text-[#FAF6F0] mb-6">
            We Design For
          </h2>

          <p className="text-base sm:text-lg text-[#E8DFD0]/90 font-light max-w-2xl mx-auto leading-relaxed">
            Tailoring environmental architecture and spatial balance to the distinct scale and identity of every project type.
          </p>
        </div>

        {/* 6 Category Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {DESIGN_FOR_CATEGORIES.map((item, idx) => (
            <div
              key={idx}
              className="group relative overflow-hidden bg-[#03241B] border border-[#C69A3A]/25 hover:border-[#C69A3A] transition-all duration-500 shadow-xl flex flex-col h-[340px]"
            >
              {/* Background Photography with Hover Zoom */}
              <div className="absolute inset-0 z-0">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover object-center group-hover:scale-110 transition-transform duration-700 opacity-40 group-hover:opacity-50"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#03241B] via-[#063D2E]/80 to-transparent" />
              </div>

              {/* Card Content */}
              <div className="relative z-10 p-6 sm:p-8 flex flex-col justify-between h-full">
                <div className="flex items-center justify-between">
                  <div className="p-3 bg-[#063D2E]/90 backdrop-blur-sm border border-[#C69A3A]/40 group-hover:border-[#C69A3A] group-hover:bg-[#C69A3A] transition-colors duration-300">
                    <div className="group-hover:text-[#063D2E] transition-colors">
                      {getCategoryIcon(item.iconName)}
                    </div>
                  </div>
                  <span className="font-display text-sm text-[#C69A3A]/60 font-light">
                    0{idx + 1}
                  </span>
                </div>

                <div>
                  <h3 className="font-display text-2xl sm:text-3xl text-[#FAF6F0] font-normal mb-2 group-hover:text-[#C69A3A] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#E8DFD0]/80 font-light leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>

              {/* Gold Top Accent Line on Hover */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-transparent group-hover:bg-[#C69A3A] transition-colors duration-300 z-20" />
            </div>
          ))}
        </div>

        {/* Supporting Anchor Statement Banner */}
        <div className="mt-16 sm:mt-20 p-8 sm:p-10 bg-[#0B4A36]/60 backdrop-blur-md border border-[#C69A3A]/30 text-center max-w-4xl mx-auto">
          <p className="font-display text-xl sm:text-2xl lg:text-3xl text-[#F4EBDD] font-light leading-relaxed italic">
            “We combine creativity, functionality and sustainability to deliver exceptional outdoor and indoor spaces.”
          </p>
          <div className="mt-4 flex items-center justify-center gap-3">
            <span className="w-6 h-[1px] bg-[#C69A3A]" />
            <span className="text-[10px] sm:text-xs uppercase tracking-[0.25em] text-[#C69A3A] font-semibold">
              Athreya Design Philosophy
            </span>
            <span className="w-6 h-[1px] bg-[#C69A3A]" />
          </div>
        </div>
      </div>
    </section>
  );
}
