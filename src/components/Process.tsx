"use client";

import React, { useState } from "react";
import Image from "next/image";
import { PROCESS_STEPS } from "@/data/content";
import {
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  ArrowUpRight,
  Compass,
} from "lucide-react";

export default function Process() {
  const [activeStepIndex, setActiveStepIndex] = useState(0);

  const currentStep = PROCESS_STEPS[activeStepIndex];

  const handlePrev = () => {
    setActiveStepIndex((prev) => (prev > 0 ? prev - 1 : PROCESS_STEPS.length - 1));
  };

  const handleNext = () => {
    setActiveStepIndex((prev) => (prev < PROCESS_STEPS.length - 1 ? prev + 1 : 0));
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
    <section
      id="process"
      className="py-20 lg:py-32 bg-[#03241B] text-[#FAF6F0] relative overflow-hidden scroll-mt-16"
      aria-label="Athreya Design Studio Working Process"
    >
      {/* Background Architectural Blueprint Grid & Glowing Radial Accents */}
      <div className="absolute inset-0 bg-forest-gradient opacity-90" />
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-[#C69A3A]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-[#0B4A36]/60 rounded-full blur-3xl pointer-events-none" />

      {/* Decorative Grid Lines */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="max-w-7xl mx-auto h-full px-4 flex justify-between border-x border-[#C69A3A]/40">
          <div className="w-[1px] h-full bg-[#C69A3A]/20" />
          <div className="w-[1px] h-full bg-[#C69A3A]/20" />
          <div className="w-[1px] h-full bg-[#C69A3A]/20" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-18">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#063D2E] border border-[#C69A3A]/40 mb-4">
            <Compass className="w-3.5 h-3.5 text-[#C69A3A]" />
            <span className="text-[11px] uppercase tracking-[0.2em] font-semibold text-[#C69A3A]">
              Cinematic Design Journey
            </span>
          </div>

          <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl font-normal leading-[1.1] text-[#FAF6F0] mb-5">
            From Vision to Space
          </h2>

          <p className="text-base sm:text-lg text-[#E8DFD0]/90 font-light max-w-2xl mx-auto leading-relaxed">
            A disciplined, 5-stage architectural and ecological methodology guiding your project from conceptual discovery to thriving, long-term permanence.
          </p>
        </div>

        {/* Interactive Step Progress Track */}
        <div className="mb-10 sm:mb-14">
          {/* Progress Bar with Active Gold Fill */}
          <div className="relative mb-6 hidden md:block">
            <div className="h-[2px] w-full bg-[#063D2E] border-b border-[#C69A3A]/20 absolute top-6 left-0 right-0 z-0" />
            <div
              className="h-[2px] bg-gradient-to-r from-[#C69A3A] to-[#E0BA62] absolute top-6 left-0 z-0 transition-all duration-500"
              style={{
                width: `${(activeStepIndex / (PROCESS_STEPS.length - 1)) * 100}%`,
              }}
            />

            <div className="grid grid-cols-5 relative z-10">
              {PROCESS_STEPS.map((step, idx) => {
                const isActive = idx === activeStepIndex;
                const isPassed = idx < activeStepIndex;

                return (
                  <button
                    key={step.number}
                    onClick={() => setActiveStepIndex(idx)}
                    className="flex flex-col items-center group text-center focus:outline-none cursor-pointer"
                  >
                    {/* Node Circle */}
                    <div
                      className={`w-12 h-12 flex items-center justify-center font-display text-base font-semibold border-2 transition-all duration-300 ${
                        isActive
                          ? "bg-[#C69A3A] border-[#FAF6F0] text-[#063D2E] scale-110 shadow-lg shadow-[#C69A3A]/30"
                          : isPassed
                          ? "bg-[#063D2E] border-[#C69A3A] text-[#C69A3A]"
                          : "bg-[#03241B] border-[#C69A3A]/30 text-[#E8DFD0]/50 hover:border-[#C69A3A] hover:text-[#FAF6F0]"
                      }`}
                    >
                      {step.number}
                    </div>

                    <span
                      className={`mt-3 text-xs uppercase tracking-wider font-medium transition-colors ${
                        isActive
                          ? "text-[#C69A3A] font-semibold"
                          : "text-[#E8DFD0]/70 group-hover:text-[#FAF6F0]"
                      }`}
                    >
                      {step.title}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Mobile Step Selector Pills */}
          <div className="flex md:hidden gap-2 overflow-x-auto pb-2 no-scrollbar">
            {PROCESS_STEPS.map((step, idx) => (
              <button
                key={step.number}
                onClick={() => setActiveStepIndex(idx)}
                className={`px-3 py-2 text-xs uppercase tracking-wider font-semibold whitespace-nowrap border transition-all ${
                  idx === activeStepIndex
                    ? "bg-[#C69A3A] text-[#063D2E] border-[#C69A3A]"
                    : "bg-[#063D2E]/60 text-[#E8DFD0] border-[#C69A3A]/25"
                }`}
              >
                {step.number} — {step.title}
              </button>
            ))}
          </div>
        </div>

        {/* Main Stage Cinema Showcase Card */}
        <div className="bg-[#063D2E]/80 backdrop-blur-md border border-[#C69A3A]/40 shadow-2xl overflow-hidden relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
            {/* Left: Cinematic Stage Photography Frame */}
            <div className="lg:col-span-6 relative min-h-[300px] sm:min-h-[420px] lg:min-h-[500px] bg-black overflow-hidden group">
              <Image
                src={currentStep.image}
                alt={`${currentStep.title} stage - Athreya Design Studio`}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-center group-hover:scale-105 transition-transform duration-700 opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#063D2E] via-transparent to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#063D2E]/80 hidden lg:block" />

              {/* Stage Visual Watermark */}
              <div className="absolute top-6 left-6 px-3.5 py-1.5 bg-[#03241B]/90 backdrop-blur-md border border-[#C69A3A]/40 text-[#C69A3A] text-xs uppercase tracking-widest font-semibold">
                Stage {currentStep.number} of 05
              </div>

              {/* Tagline Badge on Image */}
              <div className="absolute bottom-6 left-6 right-6 p-4 bg-[#03241B]/90 backdrop-blur-md border border-[#C69A3A]/30 sm:hidden">
                <span className="text-[10px] uppercase tracking-widest text-[#C69A3A] font-semibold block">
                  Focus Scope
                </span>
                <p className="font-display text-base text-[#FAF6F0]">
                  {currentStep.tagline}
                </p>
              </div>
            </div>

            {/* Right: Detailed Stage Insights, Deliverables & Step Navigation */}
            <div className="lg:col-span-6 p-6 sm:p-10 lg:p-12 flex flex-col justify-between space-y-6">
              <div>
                {/* Step Top Hierarchy */}
                <div className="flex items-center justify-between gap-4 mb-4 pb-4 border-b border-[#C69A3A]/20">
                  <div>
                    <span className="text-[10px] uppercase tracking-[0.25em] font-semibold text-[#C69A3A] block">
                      Methodology Step {currentStep.number}
                    </span>
                    <span className="text-xs text-[#E8DFD0]/70 font-light">
                      {currentStep.tagline}
                    </span>
                  </div>

                  <span className="font-display text-4xl sm:text-5xl text-[#C69A3A]/40 font-light">
                    {currentStep.number}
                  </span>
                </div>

                {/* Step Main Title */}
                <h3 className="font-display text-2xl sm:text-4xl text-[#FAF6F0] font-normal mb-4">
                  {currentStep.title}
                </h3>

                {/* Summary Description */}
                <p className="text-sm sm:text-base text-[#E8DFD0]/90 font-light leading-relaxed mb-6">
                  {currentStep.description}
                </p>

                {/* In-depth Details Box */}
                <div className="p-4 bg-[#03241B]/80 border-l-2 border-[#C69A3A] mb-6">
                  <p className="text-xs sm:text-sm text-[#F4EBDD]/90 font-light italic leading-relaxed">
                    “{currentStep.details}”
                  </p>
                </div>

                {/* Key Deliverables List */}
                <div>
                  <h4 className="text-xs uppercase tracking-[0.2em] font-semibold text-[#C69A3A] mb-3 flex items-center gap-2">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Key Stage Deliverables</span>
                  </h4>

                  <ul className="space-y-2.5">
                    {currentStep.keyDeliverables.map((item, dIdx) => (
                      <li
                        key={dIdx}
                        className="flex items-center gap-3 text-xs sm:text-sm text-[#FAF6F0]/90 font-light"
                      >
                        <CheckCircle2 className="w-4 h-4 text-[#C69A3A] shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Step Navigation & Consultation CTA */}
              <div className="pt-6 border-t border-[#C69A3A]/20 flex flex-col sm:flex-row items-center justify-between gap-4">
                {/* Arrow Controls */}
                <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-start">
                  <button
                    onClick={handlePrev}
                    className="p-3 bg-[#03241B] hover:bg-[#C69A3A] text-[#FAF6F0] hover:text-[#063D2E] border border-[#C69A3A]/40 transition-colors cursor-pointer"
                    aria-label="Previous step"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>

                  <span className="text-xs uppercase tracking-widest text-[#C69A3A] px-3 font-semibold">
                    {activeStepIndex + 1} / {PROCESS_STEPS.length}
                  </span>

                  <button
                    onClick={handleNext}
                    className="p-3 bg-[#03241B] hover:bg-[#C69A3A] text-[#FAF6F0] hover:text-[#063D2E] border border-[#C69A3A]/40 transition-colors cursor-pointer"
                    aria-label="Next step"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

                <button
                  onClick={scrollToContact}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#C69A3A] hover:bg-[#F4EBDD] text-[#063D2E] text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer shadow-md"
                >
                  <span>Start at Step 01</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 5-Step Compact Horizontal Review Cards Track */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {PROCESS_STEPS.map((step, idx) => {
            const isCurrent = idx === activeStepIndex;
            return (
              <div
                key={step.number}
                onClick={() => setActiveStepIndex(idx)}
                className={`p-5 border transition-all duration-300 cursor-pointer flex flex-col justify-between ${
                  isCurrent
                    ? "bg-[#063D2E] border-[#C69A3A] shadow-lg shadow-black/30 translate-y-[-2px]"
                    : "bg-[#03241B]/80 border-[#C69A3A]/20 hover:border-[#C69A3A]/60 hover:bg-[#063D2E]/50"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span
                      className={`font-display text-xl font-medium ${
                        isCurrent ? "text-[#C69A3A]" : "text-[#E8DFD0]/40"
                      }`}
                    >
                      {step.number}
                    </span>
                    {isCurrent && (
                      <span className="w-2 h-2 rounded-full bg-[#C69A3A] animate-pulse" />
                    )}
                  </div>
                  <h4 className="font-display text-base text-[#FAF6F0] font-medium mb-1">
                    {step.title}
                  </h4>
                  <p className="text-[11px] text-[#E8DFD0]/70 line-clamp-2 font-light">
                    {step.description}
                  </p>
                </div>

                <div className="pt-3 mt-3 border-t border-[#C69A3A]/15 flex items-center justify-between text-[10px] uppercase tracking-wider text-[#C69A3A]">
                  <span>{isCurrent ? "Viewing" : "Click to view"}</span>
                  <span>→</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
