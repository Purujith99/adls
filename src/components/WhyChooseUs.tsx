"use client";

import React from "react";
import { WHY_CHOOSE_US_PILLARS } from "@/data/content";
import { Droplet, Leaf, Award, ShieldCheck, Sparkles } from "lucide-react";

export default function WhyChooseUs() {
  const getPillarIcon = (iconName: string) => {
    switch (iconName) {
      case "Droplet":
        return <Droplet className="w-6 h-6 text-[#C69A3A]" />;
      case "Leaf":
        return <Leaf className="w-6 h-6 text-[#C69A3A]" />;
      case "Award":
        return <Award className="w-6 h-6 text-[#C69A3A]" />;
      case "ShieldCheck":
        return <ShieldCheck className="w-6 h-6 text-[#C69A3A]" />;
      default:
        return <Sparkles className="w-6 h-6 text-[#C69A3A]" />;
    }
  };

  return (
    <section
      id="why-us"
      className="py-20 lg:py-32 bg-[#063D2E] text-[#FAF6F0] relative overflow-hidden"
      aria-label="Why Choose Athreya Design & Landscaping Studio"
    >
      {/* Subtle Background Geometric Accents */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="max-w-7xl mx-auto h-full px-4 flex justify-between border-x border-[#C69A3A]/30">
          <div className="w-[1px] h-full bg-[#C69A3A]/20" />
          <div className="w-[1px] h-full bg-[#C69A3A]/20" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#0B4A36] border border-[#C69A3A]/40 mb-4">
            <span className="text-[11px] uppercase tracking-[0.2em] font-semibold text-[#C69A3A]">
              Our Distinct Strengths
            </span>
          </div>

          <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl font-normal leading-[1.1] text-[#FAF6F0] mb-6">
            Why Choose Us?
          </h2>

          <p className="text-base sm:text-lg text-[#E8DFD0]/90 font-light max-w-2xl mx-auto leading-relaxed">
            Founded on disciplined architectural planning, ecological harmony, and practical longevity for every environment we craft.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {WHY_CHOOSE_US_PILLARS.map((pillar, index) => (
            <div
              key={index}
              className="group p-8 bg-[#03241B] border border-[#C69A3A]/25 hover:border-[#C69A3A] transition-all duration-300 shadow-xl flex flex-col justify-between relative overflow-hidden"
            >
              {/* Pillar Number */}
              <span className="font-display text-4xl text-[#C69A3A]/20 group-hover:text-[#C69A3A]/50 transition-colors absolute top-4 right-5">
                0{index + 1}
              </span>

              <div>
                <div className="w-14 h-14 bg-[#063D2E] border border-[#C69A3A]/40 flex items-center justify-center mb-6 group-hover:bg-[#C69A3A] group-hover:border-[#F4EBDD] transition-colors duration-300">
                  <div className="group-hover:text-[#063D2E] transition-colors">
                    {getPillarIcon(pillar.icon)}
                  </div>
                </div>

                <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#C69A3A] block mb-2">
                  {pillar.highlight}
                </span>

                <h3 className="font-display text-2xl text-[#FAF6F0] font-normal mb-3 group-hover:text-[#F4EBDD] transition-colors">
                  {pillar.title}
                </h3>

                <p className="text-xs sm:text-sm text-[#E8DFD0]/80 font-light leading-relaxed">
                  {pillar.description}
                </p>
              </div>

              {/* Bottom Gold Accent */}
              <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-transparent group-hover:bg-[#C69A3A] transition-colors duration-300" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
