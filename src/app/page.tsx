import React from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import Industries from "@/components/Industries";
import VisualBreak from "@/components/VisualBreak";
import Portfolio from "@/components/Portfolio";
import WhyChooseUs from "@/components/WhyChooseUs";
import Process from "@/components/Process";
import ServiceArea from "@/components/ServiceArea";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import MobileFloatingActions from "@/components/MobileFloatingActions";

export default function Home() {
  return (
    <div className="relative min-h-screen flex flex-col bg-[#FAF6F0] selection:bg-[#063D2E] selection:text-[#F4EBDD]">
      {/* Sticky / Floating Navigation Header */}
      <Navbar />

      {/* Main Single-Scroll Content */}
      <main className="flex-grow">
        {/* 1. Hero Section */}
        <Hero />

        {/* 2. Spaces We've Designed (Portfolio & Lightbox Gallery) */}
        <Portfolio />

        {/* 3. Intro / About Section */}
        <About />

        {/* 4. Services Section (Landscape Design & Architecture) */}
        <Services />

        {/* 5. Sectors / We Design For */}
        <Industries />

        {/* 6. Cinematic Visual Break */}
        <VisualBreak />

        {/* 7. Why Choose Us (4 Pillars) */}
        <WhyChooseUs />

        {/* 8. Process Section (5 Steps Timeline) */}
        <Process />

        {/* 9. Pan-India Service Area Badge */}
        <ServiceArea />

        {/* 10. Contact & Consultation Form */}
        <Contact />
      </main>

      {/* Footer */}
      <Footer />

      {/* Mobile Floating Action Bar */}
      <MobileFloatingActions />
    </div>
  );
}
