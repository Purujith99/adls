"use client";

import React from "react";
import Image from "next/image";
import { Leaf, ShieldCheck, Sparkles, ArrowUpRight } from "lucide-react";
import { BRAND_INFO } from "@/data/content";

export default function About() {
  const scrollToContact = () => {
    const el = document.querySelector("#contact");
    if (el) {
      const navOffset = 80;
      const pos = el.getBoundingClientRect().top + window.pageYOffset - navOffset;
      window.scrollTo({ top: pos, behavior: "smooth" });
    }
  };

  return (
    <section
      id="about"
      className="py-20 lg:py-32 bg-[#FAF6F0] text-[#18221D] relative overflow-hidden border-t border-[#C69A3A]/25 scroll-mt-16"
      aria-label="About Athreya Design & Landscaping Studio"
    >
      {/* Decorative Botanical Background Geometry */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#063D2E]/5 rounded-full blur-3xl pointer-events-none -mr-32 -mt-32" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#C69A3A]/5 rounded-full blur-3xl pointer-events-none -ml-20 -mb-20" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header Eyebrow */}
        <div className="flex items-center gap-3 mb-4">
          <span className="w-8 h-[1.5px] bg-[#C69A3A]" />
          <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#063D2E]">
            About The Studio
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Editorial Copy */}
          <div className="lg:col-span-6 space-y-6 sm:space-y-8 order-2 lg:order-1">
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-normal leading-[1.15] text-[#063D2E]">
              Thoughtful Design. <br />
              <span className="italic text-[#0B4A36] font-light">
                Beautiful Spaces.
              </span>
            </h2>

            <div className="space-y-5 text-base sm:text-lg text-[#2A3630]/90 leading-relaxed font-light">
              <p>
                <strong className="font-medium text-[#063D2E]">
                  Athreya Design & Landscaping Studio
                </strong>{" "}
                creates thoughtfully planned outdoor and architectural environments that combine creativity, functionality, and sustainability.
              </p>
              <p>
                We design spaces that are not only beautiful to look at, but also practical, comfortable, and built around the way people actually use them. From expansive farmhouses and luxury villas to modern rooftop terrace gardens, our holistic design philosophy ensures seamless balance between nature and built structures.
              </p>
            </div>

            {/* Triad Badges: Green. Functional. Beautiful. */}
            <div className="pt-2 grid grid-cols-1 sm:grid-cols-3 gap-4 border-y border-[#C69A3A]/30 py-6">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded bg-[#063D2E]/10 text-[#063D2E]">
                  <Leaf className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-[#063D2E] tracking-wider uppercase">
                    Green
                  </h4>
                  <p className="text-xs text-[#2A3630]/75">Eco-resilient flora</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2 rounded bg-[#063D2E]/10 text-[#063D2E]">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-[#063D2E] tracking-wider uppercase">
                    Functional
                  </h4>
                  <p className="text-xs text-[#2A3630]/75">Purposeful layouts</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2 rounded bg-[#063D2E]/10 text-[#063D2E]">
                  <Sparkles className="w-4 h-4 text-[#C69A3A]" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-[#063D2E] tracking-wider uppercase">
                    Beautiful
                  </h4>
                  <p className="text-xs text-[#2A3630]/75">Timeless elegance</p>
                </div>
              </div>
            </div>

            {/* Secondary Statement Callout & CTA */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pt-2">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-[#C69A3A] font-semibold">
                  Our Core Principle
                </p>
                <p className="font-display text-lg text-[#063D2E] italic">
                  “{BRAND_INFO.secondaryStatement}”
                </p>
              </div>

              <button
                onClick={scrollToContact}
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#063D2E] hover:bg-[#0B4A36] text-[#F4EBDD] text-xs font-semibold uppercase tracking-wider transition-all duration-300 shadow-md group cursor-pointer"
              >
                <span>Discuss Your Project</span>
                <ArrowUpRight className="w-4 h-4 text-[#C69A3A] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>
            </div>
          </div>

          {/* Right Column: Architectural Imagery with Editorial Floating Tag */}
          <div className="lg:col-span-6 order-1 lg:order-2">
            <div className="relative">
              {/* Outer Decorative Gold Frame Offset */}
              <div className="absolute -inset-3 sm:-inset-4 border border-[#C69A3A]/40 -z-10 translate-x-3 translate-y-3 hidden sm:block" />

              {/* Main Image Container */}
              <div className="relative h-[380px] sm:h-[480px] lg:h-[560px] w-full overflow-hidden shadow-2xl bg-[#063D2E]">
                <Image
                  src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80"
                  alt="Modern architectural home with outdoor landscaped terrace and pool"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover object-center hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#063D2E]/80 via-transparent to-transparent" />

                {/* Editorial Floating Tag */}
                <div className="absolute bottom-6 left-6 right-6 p-4 sm:p-5 bg-[#FAF6F0]/95 backdrop-blur-md border border-[#C69A3A]/30 text-[#18221D] shadow-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#063D2E]">
                        Studio Ethos
                      </p>
                      <p className="font-display text-base sm:text-lg text-[#063D2E] font-medium">
                        Designing Spaces. Enhancing Life.
                      </p>
                    </div>
                    <span className="text-xs uppercase tracking-widest text-[#C69A3A] font-medium hidden sm:inline-block">
                      Pan-India
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
