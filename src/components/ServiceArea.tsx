"use client";

import React from "react";
import { User, Award, ShieldCheck, MapPin } from "lucide-react";
import { BRAND_INFO } from "@/data/content";

export const FOUNDERS = [
  {
    name: "Founder & Lead Architect",
    role: "Principal Landscape Architect",
    specialization: "Master Planning & Sustainable Landscape Architecture",
  },
  {
    name: "Co-Founder & Managing Partner",
    role: "Design & Project Director",
    specialization: "Architectural Execution & Spatial Design",
  },
];

export default function ServiceArea() {
  return (
    <section
      className="py-12 sm:py-16 bg-[#03241B] text-[#FAF6F0] border-y border-[#C69A3A]/25 relative overflow-hidden"
      aria-label="Leadership & Founders"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Left: Founders Section Header */}
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-none bg-[#063D2E] border border-[#C69A3A]/40 flex items-center justify-center text-[#C69A3A] shrink-0">
              <User className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#C69A3A] animate-pulse" />
                <span className="text-[10px] sm:text-xs uppercase tracking-[0.25em] font-semibold text-[#C69A3A]">
                  Leadership & Vision
                </span>
              </div>
              <h3 className="font-display text-xl sm:text-2xl lg:text-3xl text-[#FAF6F0] font-normal">
                Our Founders
              </h3>
            </div>
          </div>

          {/* Right: Founders Cards / Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full md:w-auto">
            {FOUNDERS.map((founder, idx) => (
              <div
                key={idx}
                className="flex items-start gap-3 px-5 py-4 bg-[#063D2E]/80 border border-[#C69A3A]/30 transition-all hover:border-[#C69A3A]/60"
              >
                <Award className="w-5 h-5 text-[#C69A3A] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-semibold text-[#F4EBDD] tracking-wide">
                    {founder.name}
                  </h4>
                  <p className="text-xs text-[#C69A3A] font-medium mt-0.5">
                    {founder.role}
                  </p>
                  <p className="text-[11px] text-[#FAF6F0]/70 mt-1">
                    {founder.specialization}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

