"use client";

import React, { useState } from "react";
import Image from "next/image";
import { PORTFOLIO_ITEMS, ProjectItem } from "@/data/content";
import { X, ZoomIn, ArrowUpRight, Filter } from "lucide-react";

const CATEGORIES = [
  "All",
  "Landscaping",
  "Residential",
  "Architecture",
  "Interiors",
  "Outdoor Spaces",
] as const;

type FilterCategory = (typeof CATEGORIES)[number];

export default function Portfolio() {
  const [activeFilter, setActiveFilter] = useState<FilterCategory>("All");
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  const filteredProjects =
    activeFilter === "All"
      ? PORTFOLIO_ITEMS
      : PORTFOLIO_ITEMS.filter((item) => item.category === activeFilter);

  const scrollToContact = () => {
    setSelectedProject(null);
    const el = document.querySelector("#contact");
    if (el) {
      const navOffset = 80;
      const pos = el.getBoundingClientRect().top + window.pageYOffset - navOffset;
      window.scrollTo({ top: pos, behavior: "smooth" });
    }
  };

  return (
    <section
      id="portfolio"
      className="py-20 lg:py-32 bg-[#FAF6F0] text-[#18221D] relative border-t border-[#C69A3A]/25 scroll-mt-16"
      aria-label="Athreya Design Studio Portfolio"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="w-8 h-[1.5px] bg-[#C69A3A]" />
              <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#063D2E]">
                Visual Gallery
              </span>
            </div>
            <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl font-normal text-[#063D2E]">
              Spaces We’ve Designed
            </h2>
          </div>

          <p className="text-sm sm:text-base text-[#2A3630]/80 max-w-md font-light">
            A curated glimpse of landscape plans, luxury villa environments, rooftop terrace concepts, and modern architectural spaces.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 no-scrollbar" role="tablist">
          <div className="flex items-center gap-1.5 pr-2 border-r border-[#C69A3A]/30 text-[#063D2E]/60 text-xs uppercase tracking-wider font-semibold">
            <Filter className="w-3.5 h-3.5 text-[#C69A3A]" />
            <span className="hidden sm:inline">Filter:</span>
          </div>

          {CATEGORIES.map((category) => (
            <button
              key={category}
              onClick={() => setActiveFilter(category)}
              role="tab"
              aria-selected={activeFilter === category}
              className={`px-4 py-2 text-xs uppercase tracking-wider font-medium transition-all duration-200 whitespace-nowrap cursor-pointer ${
                activeFilter === category
                  ? "bg-[#063D2E] text-[#F4EBDD] border border-[#063D2E] shadow-sm"
                  : "bg-transparent text-[#2A3630]/70 border border-[#063D2E]/15 hover:border-[#C69A3A] hover:text-[#063D2E]"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              onClick={() => setSelectedProject(project)}
              className="group cursor-pointer bg-[#FAF6F0] border border-[#063D2E]/15 hover:border-[#C69A3A] transition-all duration-300 shadow-sm hover:shadow-xl flex flex-col overflow-hidden"
            >
              {/* Image Thumbnail */}
              <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-[#063D2E]">
                <Image
                  src={project.image}
                  alt={project.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-[#063D2E]/30 group-hover:bg-transparent transition-colors duration-300" />

                {/* Hover Quick Zoom Button */}
                <div className="absolute top-4 right-4 p-2 rounded bg-[#063D2E]/80 backdrop-blur-sm text-[#F4EBDD] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <ZoomIn className="w-4 h-4 text-[#C69A3A]" />
                </div>

                {/* Category Badge */}
                <div className="absolute bottom-4 left-4">
                  <span className="text-[10px] uppercase tracking-widest font-semibold px-2.5 py-1 bg-[#FAF6F0]/95 text-[#063D2E] border border-[#C69A3A]/40 shadow-sm">
                    {project.category}
                  </span>
                </div>
              </div>

              {/* Project Card Text Content */}
              <div className="p-6 flex flex-col justify-between flex-grow">
                <div>
                  <h3 className="font-display text-xl sm:text-2xl text-[#063D2E] font-medium mb-2 group-hover:text-[#0B4A36] transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#2A3630]/80 font-light leading-relaxed mb-4">
                    {project.description}
                  </p>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 pt-3 border-t border-[#063D2E]/10">
                  {project.tags.map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className="text-[10px] uppercase tracking-wider text-[#063D2E]/70 bg-[#063D2E]/5 px-2 py-0.5"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Gallery Footer Note */}
        <div className="mt-14 p-6 bg-[#063D2E] text-[#F4EBDD] flex flex-col sm:flex-row items-center justify-between gap-6 border border-[#C69A3A]/30">
          <div>
            <h4 className="font-display text-xl sm:text-2xl font-normal text-[#FAF6F0]">
              Ready to bring your architectural or landscape vision to life?
            </h4>
            <p className="text-xs sm:text-sm text-[#E8DFD0]/80 font-light mt-1">
              Custom site-specific layouts crafted to your precise property parameters.
            </p>
          </div>
          <button
            onClick={scrollToContact}
            className="shrink-0 inline-flex items-center gap-2 px-6 py-3 bg-[#C69A3A] hover:bg-[#F4EBDD] text-[#063D2E] text-xs font-semibold uppercase tracking-wider transition-all duration-300 cursor-pointer shadow"
          >
            <span>Consult With Us</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Lightbox Modal Viewer */}
      {selectedProject && (
        <div
          className="fixed inset-0 z-50 bg-[#03241B]/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 lg:p-10 animate-in fade-in duration-200"
          onClick={() => setSelectedProject(null)}
          role="dialog"
          aria-modal="true"
          aria-label={selectedProject.title}
        >
          <div
            className="relative max-w-4xl w-full bg-[#063D2E] border border-[#C69A3A]/40 text-[#F4EBDD] shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-4 right-4 z-20 p-2.5 bg-[#03241B]/80 text-[#F4EBDD] hover:text-[#C69A3A] border border-[#C69A3A]/30 transition-colors focus:outline-none cursor-pointer"
              aria-label="Close image viewer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Image */}
            <div className="relative h-[300px] sm:h-[420px] md:h-[480px] w-full bg-black">
              <Image
                src={selectedProject.image}
                alt={selectedProject.alt}
                fill
                sizes="(max-width: 1024px) 100vw, 896px"
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#063D2E] via-transparent to-transparent" />
            </div>

            {/* Modal Content */}
            <div className="p-6 sm:p-8 space-y-4">
              <div className="flex items-center justify-between gap-4">
                <span className="text-[11px] uppercase tracking-[0.25em] text-[#C69A3A] font-semibold">
                  {selectedProject.category}
                </span>
                <span className="text-xs uppercase tracking-wider text-[#E8DFD0]/60">
                  Athreya Studio Concept Showcase
                </span>
              </div>

              <h3 className="font-display text-2xl sm:text-3xl text-[#FAF6F0] font-normal">
                {selectedProject.title}
              </h3>

              <p className="text-sm text-[#E8DFD0]/90 font-light leading-relaxed">
                {selectedProject.description}
              </p>

              <div className="flex flex-wrap gap-2 pt-2">
                {selectedProject.tags.map((tag, tIdx) => (
                  <span
                    key={tIdx}
                    className="text-xs uppercase tracking-wider text-[#C69A3A] bg-[#03241B] border border-[#C69A3A]/30 px-3 py-1"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="pt-4 border-t border-[#C69A3A]/20 flex justify-end">
                <button
                  onClick={scrollToContact}
                  className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#C69A3A] text-[#063D2E] hover:bg-[#F4EBDD] text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer"
                >
                  <span>Request Similar Design</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
