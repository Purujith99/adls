"use client";

import React from "react";
import { LANDSCAPE_SERVICES } from "@/data/content";
import {
  Compass,
  Sprout,
  Maximize2,
  Layers,
  LayoutGrid,
  Droplets,
  CheckCircle2,
  ArrowUpRight,
} from "lucide-react";

export default function LandscapingServices() {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "Compass":
        return <Compass className="w-6 h-6 text-[#C69A3A]" />;
      case "Sprout":
        return <Sprout className="w-6 h-6 text-[#C69A3A]" />;
      case "Maximize2":
        return <Maximize2 className="w-6 h-6 text-[#C69A3A]" />;
      case "Layers":
        return <Layers className="w-6 h-6 text-[#C69A3A]" />;
      case "LayoutGrid":
        return <LayoutGrid className="w-6 h-6 text-[#C69A3A]" />;
      case "Droplets":
        return <Droplets className="w-6 h-6 text-[#C69A3A]" />;
      default:
        return <Sprout className="w-6 h-6 text-[#C69A3A]" />;
    }
  };

  const scrollToContact = () => {
    const el = document.querySelector("#contact");
    if (el) {
      const navOffset = 80;
      const pos = el.getBoundingClientRect().top + window.pageYOffset - navOffset;
      window.scrollTo({ top: pos, behavior: "smooth" });
    }
  };

  return (
    <div id="landscaping" className="scroll-mt-24">
      {/* Category Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-6 border-b border-[#C69A3A]/30">
        <div>
          <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#C69A3A] block mb-2">
            Category 01
          </span>
          <h3 className="font-display text-3xl sm:text-4xl text-[#063D2E] font-normal">
            Landscape Design
          </h3>
        </div>
        <p className="mt-4 md:mt-0 text-sm sm:text-base text-[#2A3630]/80 max-w-md font-light">
          Harmonizing natural topography, climate-resilient flora, and functional outdoor spaces that thrive throughout all seasons.
        </p>
      </div>

      {/* 6 Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {LANDSCAPE_SERVICES.map((service, index) => (
          <div
            key={service.id}
            className="group relative bg-[#FAF6F0] p-8 border border-[#063D2E]/10 hover:border-[#C69A3A] transition-all duration-300 shadow-sm hover:shadow-xl flex flex-col justify-between"
          >
            {/* Top Index & Icon */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 rounded-none bg-[#063D2E] flex items-center justify-center transition-transform group-hover:scale-110 duration-300">
                  {getIcon(service.icon)}
                </div>
                <span className="font-display text-2xl text-[#063D2E]/25 group-hover:text-[#C69A3A] transition-colors">
                  0{index + 1}
                </span>
              </div>

              <h4 className="font-display text-xl sm:text-2xl text-[#063D2E] font-medium mb-3 group-hover:text-[#0B4A36] transition-colors">
                {service.title}
              </h4>

              <p className="text-sm text-[#2A3630]/85 font-light leading-relaxed mb-6">
                {service.description}
              </p>
            </div>

            {/* Feature List */}
            {service.features && (
              <div className="pt-4 border-t border-[#063D2E]/10 space-y-2 mt-auto">
                {service.features.map((feature, fIdx) => (
                  <div
                    key={fIdx}
                    className="flex items-start gap-2 text-xs text-[#2A3630]/75"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#C69A3A] shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Hover Bottom Accent Bar */}
            <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-transparent group-hover:bg-[#C69A3A] transition-all duration-300" />
          </div>
        ))}
      </div>

      {/* Section Sub-CTA */}
      <div className="mt-10 p-6 bg-[#063D2E] text-[#F4EBDD] flex flex-col sm:flex-row items-center justify-between gap-4 border border-[#C69A3A]/30">
        <div className="text-center sm:text-left">
          <h5 className="font-display text-lg sm:text-xl font-normal text-[#FAF6F0]">
            Planning a custom garden, villa landscape, or terrace greening?
          </h5>
          <p className="text-xs sm:text-sm text-[#E8DFD0]/80 font-light mt-1">
            Get expert plant recommendations, spatial layouts, and water-efficient irrigation planning.
          </p>
        </div>
        <button
          onClick={scrollToContact}
          className="shrink-0 inline-flex items-center gap-2 px-5 py-2.5 bg-[#C69A3A] hover:bg-[#F4EBDD] text-[#063D2E] text-xs font-semibold uppercase tracking-wider transition-all duration-300 cursor-pointer"
        >
          <span>Request Garden Plan</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
