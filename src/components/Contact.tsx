"use client";

import React, { useState } from "react";
import { BRAND_INFO, PROJECT_TYPES } from "@/data/content";
import {
  Phone,
  Mail,
  Send,
  CheckCircle,
  AlertCircle,
  ArrowUpRight,
} from "lucide-react";
import { InstagramIcon, WhatsAppIcon } from "@/components/Icons";


interface FormData {
  name: string;
  phone: string;
  email: string;
  projectType: string;
  location: string;
  message: string;
}

interface FormErrors {
  name?: string;
  phone?: string;
  email?: string;
  projectType?: string;
  location?: string;
  message?: string;
}

export default function Contact() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    phone: "",
    email: "",
    projectType: "",
    location: "",
    message: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  const validate = (): boolean => {
    const errs: FormErrors = {};

    if (!formData.name.trim()) {
      errs.name = "Please enter your full name.";
    }

    if (!formData.phone.trim()) {
      errs.phone = "Please provide your phone number.";
    } else if (!/^[0-9+() -]{7,16}$/.test(formData.phone.trim())) {
      errs.phone = "Please enter a valid phone number.";
    }

    if (!formData.email.trim()) {
      errs.email = "Please enter your email address.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      errs.email = "Please enter a valid email address.";
    }

    if (!formData.projectType) {
      errs.projectType = "Please select a project type.";
    }

    if (!formData.location.trim()) {
      errs.location = "Please specify your project location/city.";
    }

    if (!formData.message.trim()) {
      errs.message = "Please tell us briefly about your project.";
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    try {
      const res = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setSubmittedSuccess(true);
        setFormData({
          name: "",
          phone: "",
          email: "",
          projectType: "",
          location: "",
          message: "",
        });
        setErrors({});
      } else {
        alert("There was an error submitting your enquiry. Please try again.");
      }
    } catch (err) {
      console.error("Submission error:", err);
      alert("Network error. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  return (
    <section
      id="contact"
      className="py-20 lg:py-32 bg-[#063D2E] text-[#FAF6F0] relative overflow-hidden"
      aria-label="Contact Athreya Design & Landscaping Studio"
    >
      {/* Background Architectural Overlay */}
      <div className="absolute inset-0 bg-forest-gradient opacity-95" />
      <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-[#C69A3A]/10 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left Column: Studio Introduction & Direct Contact Points */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-[1.5px] bg-[#C69A3A]" />
                <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#C69A3A]">
                  Get In Touch
                </span>
              </div>

              <h2 className="font-display text-3xl sm:text-5xl font-normal leading-[1.1] text-[#FAF6F0] mb-6">
                Let’s Design Your Space.
              </h2>

              <p className="text-base sm:text-lg text-[#E8DFD0]/90 font-light leading-relaxed mb-8">
                Tell us about your project and let’s create something beautiful, functional, and purposeful.
              </p>

              {/* Direct Communication Channels */}
              <div className="space-y-4 pt-2">
                {/* Phone Numbers */}
                <div className="p-4 bg-[#03241B]/80 border border-[#C69A3A]/30">
                  <div className="flex items-center gap-3 mb-2">
                    <Phone className="w-4 h-4 text-[#C69A3A]" />
                    <span className="text-xs uppercase tracking-wider font-semibold text-[#C69A3A]">
                      Direct Telephone
                    </span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 pl-7">
                    {BRAND_INFO.phones.map((p, idx) => (
                      <a
                        key={idx}
                        href={`tel:${p.value}`}
                        className="text-sm sm:text-base font-medium text-[#FAF6F0] hover:text-[#C69A3A] transition-colors"
                      >
                        {p.display}
                      </a>
                    ))}
                  </div>
                </div>

                {/* Email Address */}
                <div className="p-4 bg-[#03241B]/80 border border-[#C69A3A]/30">
                  <div className="flex items-center gap-3 mb-2">
                    <Mail className="w-4 h-4 text-[#C69A3A]" />
                    <span className="text-xs uppercase tracking-wider font-semibold text-[#C69A3A]">
                      Email Inquiries
                    </span>
                  </div>
                  <div className="pl-7">
                    <a
                      href={`mailto:${BRAND_INFO.email}`}
                      className="text-sm sm:text-base font-medium text-[#FAF6F0] hover:text-[#C69A3A] transition-colors break-all"
                    >
                      {BRAND_INFO.email}
                    </a>
                  </div>
                </div>

                {/* Instagram & Social */}
                <div className="p-4 bg-[#03241B]/80 border border-[#C69A3A]/30 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <InstagramIcon className="w-4 h-4 text-[#C69A3A]" />
                    <div>
                      <span className="text-xs uppercase tracking-wider font-semibold text-[#C69A3A] block">
                        Instagram
                      </span>
                      <a
                        href={BRAND_INFO.instagram.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-medium text-[#FAF6F0] hover:text-[#C69A3A] transition-colors"
                      >
                        {BRAND_INFO.instagram.handle}
                      </a>
                    </div>
                  </div>
                  <a
                    href={BRAND_INFO.instagram.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 text-[#C69A3A] hover:text-[#FAF6F0] transition-colors"
                    aria-label="Visit Athreya Instagram"
                  >
                    <ArrowUpRight className="w-4 h-4" />
                  </a>
                </div>

                {/* WhatsApp Quick CTA Button */}
                <div className="pt-2">
                  <a
                    href={`https://wa.me/${BRAND_INFO.whatsapp.number}?text=${encodeURIComponent(
                      BRAND_INFO.whatsapp.defaultMessage
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-3 px-6 py-3.5 bg-[#0B4A36] hover:bg-[#C69A3A] text-[#FAF6F0] hover:text-[#063D2E] text-xs font-semibold uppercase tracking-wider border border-[#C69A3A]/50 transition-all duration-300 shadow-md group"
                  >
                    <WhatsAppIcon className="w-4 h-4 text-[#C69A3A] group-hover:text-[#063D2E] transition-colors" />
                    <span>Chat on WhatsApp</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Service Area Badge in Column */}
            <div className="pt-4 border-t border-[#C69A3A]/20">
              <span className="text-xs uppercase tracking-[0.2em] text-[#C69A3A] font-semibold block mb-1">
                Pan-India Availability
              </span>
              <p className="text-xs text-[#E8DFD0]/70 font-light">
                {BRAND_INFO.serviceArea}. We consult and deliver architectural & landscape design across all regions.
              </p>
            </div>
          </div>

          {/* Right Column: Interactive Consultation Form */}
          <div className="lg:col-span-7">
            <div className="p-8 sm:p-10 bg-[#03241B]/95 border border-[#C69A3A]/40 shadow-2xl relative">
              <h3 className="font-display text-2xl sm:text-3xl text-[#FAF6F0] font-normal mb-2">
                Project Consultation Enquiry
              </h3>
              <p className="text-xs sm:text-sm text-[#E8DFD0]/75 font-light mb-8">
                Fill out the details below, and our design team will connect with you to review your requirements.
              </p>

              {submittedSuccess ? (
                <div className="p-8 bg-[#063D2E] border border-[#C69A3A] text-center space-y-4 animate-in fade-in duration-300">
                  <div className="w-12 h-12 rounded-full bg-[#C69A3A]/20 text-[#C69A3A] flex items-center justify-center mx-auto">
                    <CheckCircle className="w-6 h-6" />
                  </div>
                  <h4 className="font-display text-2xl text-[#FAF6F0] font-normal">
                    Thank You for Reaching Out
                  </h4>
                  <p className="text-sm text-[#E8DFD0]/90 font-light max-w-md mx-auto">
                    We have received your project details. Our team at Athreya Design & Landscaping Studio will review your specifications and get in touch with you shortly.
                  </p>
                  <div className="pt-4">
                    <button
                      onClick={() => setSubmittedSuccess(false)}
                      className="px-6 py-2.5 bg-[#C69A3A] text-[#063D2E] text-xs font-semibold uppercase tracking-wider hover:bg-[#F4EBDD] transition-colors cursor-pointer"
                    >
                      Submit Another Enquiry
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-5">
                  {/* Name & Phone Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-xs uppercase tracking-wider font-medium text-[#F4EBDD] mb-1.5"
                      >
                        Your Name <span className="text-[#C69A3A]">*</span>
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="e.g. Rahul Sharma"
                        className={`w-full px-4 py-3 bg-[#063D2E]/70 border text-sm text-[#FAF6F0] placeholder-[#E8DFD0]/40 focus:bg-[#063D2E] focus:outline-none transition-colors ${
                          errors.name
                            ? "border-red-400 focus:border-red-400"
                            : "border-[#C69A3A]/35 focus:border-[#C69A3A]"
                        }`}
                      />
                      {errors.name && (
                        <p className="mt-1 text-[11px] text-red-300 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3 shrink-0" />
                          <span>{errors.name}</span>
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="phone"
                        className="block text-xs uppercase tracking-wider font-medium text-[#F4EBDD] mb-1.5"
                      >
                        Phone Number <span className="text-[#C69A3A]">*</span>
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+91 98765 43210"
                        className={`w-full px-4 py-3 bg-[#063D2E]/70 border text-sm text-[#FAF6F0] placeholder-[#E8DFD0]/40 focus:bg-[#063D2E] focus:outline-none transition-colors ${
                          errors.phone
                            ? "border-red-400 focus:border-red-400"
                            : "border-[#C69A3A]/35 focus:border-[#C69A3A]"
                        }`}
                      />
                      {errors.phone && (
                        <p className="mt-1 text-[11px] text-red-300 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3 shrink-0" />
                          <span>{errors.phone}</span>
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Email & Project Type Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-xs uppercase tracking-wider font-medium text-[#F4EBDD] mb-1.5"
                      >
                        Email Address <span className="text-[#C69A3A]">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="you@domain.com"
                        className={`w-full px-4 py-3 bg-[#063D2E]/70 border text-sm text-[#FAF6F0] placeholder-[#E8DFD0]/40 focus:bg-[#063D2E] focus:outline-none transition-colors ${
                          errors.email
                            ? "border-red-400 focus:border-red-400"
                            : "border-[#C69A3A]/35 focus:border-[#C69A3A]"
                        }`}
                      />
                      {errors.email && (
                        <p className="mt-1 text-[11px] text-red-300 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3 shrink-0" />
                          <span>{errors.email}</span>
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="projectType"
                        className="block text-xs uppercase tracking-wider font-medium text-[#F4EBDD] mb-1.5"
                      >
                        Project Type <span className="text-[#C69A3A]">*</span>
                      </label>
                      <select
                        id="projectType"
                        name="projectType"
                        value={formData.projectType}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 bg-[#063D2E]/70 border text-sm text-[#FAF6F0] focus:bg-[#063D2E] focus:outline-none transition-colors ${
                          errors.projectType
                            ? "border-red-400 focus:border-red-400"
                            : "border-[#C69A3A]/35 focus:border-[#C69A3A]"
                        }`}
                      >
                        <option value="" className="bg-[#063D2E] text-[#F4EBDD]">
                          Select project category...
                        </option>
                        {PROJECT_TYPES.map((type) => (
                          <option
                            key={type}
                            value={type}
                            className="bg-[#063D2E] text-[#F4EBDD]"
                          >
                            {type}
                          </option>
                        ))}
                      </select>
                      {errors.projectType && (
                        <p className="mt-1 text-[11px] text-red-300 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3 shrink-0" />
                          <span>{errors.projectType}</span>
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Location */}
                  <div>
                    <label
                      htmlFor="location"
                      className="block text-xs uppercase tracking-wider font-medium text-[#F4EBDD] mb-1.5"
                    >
                      Project Location / City <span className="text-[#C69A3A]">*</span>
                    </label>
                    <input
                      type="text"
                      id="location"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      placeholder="e.g. Hyderabad, Bengaluru, Visakhapatnam, etc."
                      className={`w-full px-4 py-3 bg-[#063D2E]/70 border text-sm text-[#FAF6F0] placeholder-[#E8DFD0]/40 focus:bg-[#063D2E] focus:outline-none transition-colors ${
                        errors.location
                          ? "border-red-400 focus:border-red-400"
                          : "border-[#C69A3A]/35 focus:border-[#C69A3A]"
                      }`}
                    />
                    {errors.location && (
                      <p className="mt-1 text-[11px] text-red-300 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3 shrink-0" />
                        <span>{errors.location}</span>
                      </p>
                    )}
                  </div>

                  {/* Project Details Message */}
                  <div>
                    <label
                      htmlFor="message"
                      className="block text-xs uppercase tracking-wider font-medium text-[#F4EBDD] mb-1.5"
                    >
                      Tell Us About Your Project <span className="text-[#C69A3A]">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Describe your site dimensions, requirements, garden scope, or architectural vision..."
                      className={`w-full px-4 py-3 bg-[#063D2E]/70 border text-sm text-[#FAF6F0] placeholder-[#E8DFD0]/40 focus:bg-[#063D2E] focus:outline-none transition-colors resize-y ${
                        errors.message
                          ? "border-red-400 focus:border-red-400"
                          : "border-[#C69A3A]/35 focus:border-[#C69A3A]"
                      }`}
                    />
                    {errors.message && (
                      <p className="mt-1 text-[11px] text-red-300 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3 shrink-0" />
                        <span>{errors.message}</span>
                      </p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#C69A3A] hover:bg-[#F4EBDD] text-[#063D2E] text-xs sm:text-sm font-semibold uppercase tracking-widest transition-all duration-300 shadow-xl cursor-pointer disabled:opacity-75"
                    >
                      {isSubmitting ? (
                        <span>Sending Consultation Request...</span>
                      ) : (
                        <>
                          <span>Send Enquiry</span>
                          <Send className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
