"use client";

import React from "react";
import Image from "next/image";
import { ARCHITECTURE_SERVICES } from "@/data/content";
import {
  FileText,
  DraftingCompass,
  Eye,
  Home,
  MapPin,
  ArrowUpRight,
} from "lucide-react";

export default function ArchitectureServices() {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "FileText":
        return <FileText className="w-5 h-5 text-[#C69A3A]" />;
      case "DraftingCompass":
        return <DraftingCompass className="w-5 h-5 text-[#C69A3A]" />;
      case "Eye":
        return <Eye className="w-5 h-5 text-[#C69A3A]" />;
      case "Home":
        return <Home className="w-5 h-5 text-[#C69A3A]" />;
      case "MapPin":
        return <MapPin className="w-5 h-5 text-[#C69A3A]" />;
      default:
        return <DraftingCompass className="w-5 h-5 text-[#C69A3A]" />;
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
    <div id="architecture" className="scroll-mt-24 pt-16 lg:pt-24">
      {/* Category Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-6 border-b border-[#C69A3A]/30">
        <div>
          <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#C69A3A] block mb-2">
            Category 02
          </span>
          <h3 className="font-display text-3xl sm:text-4xl text-[#063D2E] font-normal">
            Architecture & Interior Design
          </h3>
          <p className="text-xs uppercase tracking-[0.2em] text-[#C69A3A] font-semibold mt-1">
            Design + Execution
          </p>
        </div>
        <p className="mt-4 md:mt-0 text-sm sm:text-base text-[#2A3630]/80 max-w-md font-light">
          From precise floor plans and 3D walkthroughs to on-site execution guidance, crafting structural elegance with functional clarity.
        </p>
      </div>

      {/* Main Grid: Architectural Image Showcase + 5 Technical Service Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* Left Column: Architectural Photo Visual Showcase */}
        <div className="lg:col-span-5 relative min-h-[380px] lg:min-h-[520px] bg-[#063D2E] overflow-hidden shadow-xl border border-[#063D2E]/10">
          <Image
            src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80"
            alt="Modern luxury architecture residential villa design"
            fill
            sizes="(max-width: 1024px) 100vw, 40vw"
            className="object-cover object-center scale-100 hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#063D2E] via-[#063D2E]/40 to-transparent" />

          {/* Bottom Card Annotation */}
          <div className="absolute bottom-6 left-6 right-6 p-5 bg-[#063D2E]/90 backdrop-blur-md border border-[#C69A3A]/30 text-[#F4EBDD]">
            <span className="text-[10px] uppercase tracking-widest text-[#C69A3A] font-semibold block mb-1">
              Architectural Precision
            </span>
            <h4 className="font-display text-lg sm:text-xl text-[#FAF6F0] font-normal">
              Seamless Integration of Structure & Interior Ambiance
            </h4>
            <p className="text-xs text-[#E8DFD0]/80 mt-1 font-light">
              Crafting spatial harmony from foundation to finish.
            </p>
          </div>
        </div>

        {/* Right Column: 5 Services Cards */}
        <div className="lg:col-span-7 flex flex-col justify-between space-y-4">
          {ARCHITECTURE_SERVICES.map((service, index) => (
            <div
              key={service.id}
              className="group p-5 sm:p-6 bg-[#FAF6F0] border border-[#063D2E]/10 hover:border-[#C69A3A] transition-all duration-300 shadow-sm hover:shadow-md flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 bg-[#063D2E] text-[#C69A3A] shrink-0 group-hover:bg-[#0B4A36] transition-colors">
                  {getIcon(service.icon)}
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <h4 className="font-display text-lg sm:text-xl text-[#063D2E] font-medium group-hover:text-[#0B4A36] transition-colors">
                      {service.title}
                    </h4>
                    {service.badge && (
                      <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 bg-[#063D2E]/10 text-[#063D2E] font-medium border border-[#063D2E]/20">
                        {service.badge}
                      </span>
                    )}
                  </div>
                  <p className="text-xs sm:text-sm text-[#2A3630]/80 font-light leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </div>

              <span className="hidden sm:inline-block font-display text-lg text-[#063D2E]/30 group-hover:text-[#C69A3A] transition-colors shrink-0">
                0{index + 1}
              </span>
            </div>
          ))}

          {/* Architecture Consultation Strip */}
          <div className="pt-2">
            <button
              onClick={scrollToContact}
              className="w-full flex items-center justify-between p-4 bg-[#063D2E] hover:bg-[#0B4A36] text-[#F4EBDD] border border-[#C69A3A]/40 transition-colors group cursor-pointer"
            >
              <span className="text-xs uppercase tracking-widest font-semibold text-[#FAF6F0]">
                Schedule an Architectural & Interior Site Consultation
              </span>
              <div className="flex items-center gap-1 text-[#C69A3A]">
                <span className="text-xs uppercase font-medium">Inquire</span>
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
