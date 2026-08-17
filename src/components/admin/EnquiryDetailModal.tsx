"use client";

import React, { useState, useEffect } from "react";
import { Enquiry, EnquiryStatus } from "@/types/enquiry";
import {
  X,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Building,
  MessageSquare,
  Star,
  Trash2,
  Save,
  Check,
  ExternalLink,
} from "lucide-react";
import { WhatsAppIcon } from "@/components/Icons";

interface EnquiryDetailModalProps {
  enquiry: Enquiry | null;
  onClose: () => void;
  onUpdate: (updated: Enquiry) => void;
  onDelete: (id: string) => void;
}

const STATUSES: EnquiryStatus[] = [
  "New",
  "In Contact",
  "Consultation Scheduled",
  "Proposal Sent",
  "Completed",
  "Archived",
];

const STATUS_COLORS: Record<EnquiryStatus, string> = {
  New: "bg-amber-500/20 text-amber-300 border-amber-500/30",
  "In Contact": "bg-blue-500/20 text-blue-300 border-blue-500/30",
  "Consultation Scheduled": "bg-purple-500/20 text-purple-300 border-purple-500/30",
  "Proposal Sent": "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
  Completed: "bg-teal-500/20 text-teal-300 border-teal-500/30",
  Archived: "bg-zinc-500/20 text-zinc-400 border-zinc-500/30",
};

export default function EnquiryDetailModal({
  enquiry,
  onClose,
  onUpdate,
  onDelete,
}: EnquiryDetailModalProps) {
  const [adminNotes, setAdminNotes] = useState("");
  const [status, setStatus] = useState<EnquiryStatus>("New");
  const [flagged, setFlagged] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    if (enquiry) {
      setAdminNotes(enquiry.adminNotes || "");
      setStatus(enquiry.status);
      setFlagged(!!enquiry.flagged);
      setSaveSuccess(false);
    }
  }, [enquiry]);

  if (!enquiry) return null;

  const sanitizePhone = (phone: string) => {
    return phone.replace(/[^0-9]/g, "");
  };

  const handleSaveNotes = async () => {
    setIsSaving(true);
    try {
      const res = await fetch("/api/enquiries", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: enquiry.id,
          adminNotes,
          status,
          flagged,
        }),
      });

      const data = await res.json();
      if (data.success && data.enquiry) {
        onUpdate(data.enquiry);
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 2000);
      }
    } catch (err) {
      console.error("Save error:", err);
    } finally {
      setIsSaving(false);
    }
  };

  const handleStatusChange = async (newStatus: EnquiryStatus) => {
    setStatus(newStatus);
    try {
      const res = await fetch("/api/enquiries", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: enquiry.id,
          status: newStatus,
        }),
      });

      const data = await res.json();
      if (data.success && data.enquiry) {
        onUpdate(data.enquiry);
      }
    } catch (err) {
      console.error("Status update error:", err);
    }
  };

  const handleToggleFlag = async () => {
    const newFlagged = !flagged;
    setFlagged(newFlagged);
    try {
      const res = await fetch("/api/enquiries", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: enquiry.id,
          flagged: newFlagged,
        }),
      });

      const data = await res.json();
      if (data.success && data.enquiry) {
        onUpdate(data.enquiry);
      }
    } catch (err) {
      console.error("Flag update error:", err);
    }
  };

  const cleanPhone = sanitizePhone(enquiry.phone);
  const whatsappUrl = `https://wa.me/${cleanPhone.startsWith("91") ? cleanPhone : "91" + cleanPhone}?text=${encodeURIComponent(`Hello ${enquiry.name}, thank you for reaching out to Athreya Designs regarding your ${enquiry.projectType} project in ${enquiry.location}.`)}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-end bg-black/70 backdrop-blur-sm p-0 sm:p-4 transition-opacity">
      <div className="bg-[#092B21] border-l sm:border border-[#C69A3A]/30 w-full max-w-2xl h-full sm:h-[95vh] sm:rounded-2xl shadow-2xl flex flex-col overflow-hidden text-[#FAF6F0]">
        {/* Header */}
        <div className="p-6 border-b border-emerald-800/40 flex items-center justify-between bg-[#061F18]">
          <div className="flex items-center space-x-3">
            <button
              onClick={handleToggleFlag}
              className={`p-2 rounded-lg border transition-colors ${
                flagged
                  ? "bg-amber-500/20 text-amber-400 border-amber-500/40"
                  : "bg-emerald-950 text-emerald-600 border-emerald-800/40 hover:text-amber-400"
              }`}
              title={flagged ? "Unstar Enquiry" : "Star Enquiry"}
            >
              <Star className={`w-5 h-5 ${flagged ? "fill-amber-400" : ""}`} />
            </button>
            <div>
              <h2 className="text-xl font-serif font-medium text-[#FAF6F0] flex items-center gap-2">
                {enquiry.name}
              </h2>
              <p className="text-xs text-emerald-400/70 font-mono">
                ID: {enquiry.id} • {new Date(enquiry.createdAt).toLocaleString()}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-emerald-950 hover:bg-emerald-900 border border-emerald-800/50 text-emerald-300 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-6 space-y-6 overflow-y-auto flex-1 custom-scrollbar">
          {/* Status Selection Row */}
          <div className="bg-[#0A3629] p-4 rounded-xl border border-emerald-800/50 flex flex-wrap items-center justify-between gap-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400/80">
              Current Status:
            </span>
            <div className="flex items-center gap-2 flex-wrap">
              {STATUSES.map((st) => (
                <button
                  key={st}
                  onClick={() => handleStatusChange(st)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                    status === st
                      ? STATUS_COLORS[st] + " ring-2 ring-[#C69A3A]/40 font-bold"
                      : "bg-emerald-950/40 text-emerald-400/60 border-emerald-900/50 hover:text-emerald-200"
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>
          </div>

          {/* Quick Actions Row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <a
              href={`tel:${enquiry.phone}`}
              className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-emerald-900/60 hover:bg-emerald-800 border border-emerald-700/50 text-emerald-200 text-sm font-medium transition-colors"
            >
              <Phone className="w-4 h-4 text-[#C69A3A]" />
              <span>Call Client</span>
            </a>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-[#25D366]/20 hover:bg-[#25D366]/30 border border-[#25D366]/40 text-emerald-100 text-sm font-medium transition-colors"
            >
              <WhatsAppIcon className="w-4 h-4 text-[#25D366]" />
              <span>WhatsApp</span>
              <ExternalLink className="w-3.5 h-3.5 text-emerald-400/70" />
            </a>
            <a
              href={`mailto:${enquiry.email}?subject=Athreya Designs - Project Consultation Enquiry&body=Dear ${encodeURIComponent(enquiry.name)},\n\nThank you for reaching out to Athreya Designs regarding your project.`}
              className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-300 text-sm font-medium transition-colors"
            >
              <Mail className="w-4 h-4 text-[#C69A3A]" />
              <span>Email Client</span>
            </a>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-[#061F18] p-4 rounded-xl border border-emerald-900/60 space-y-1">
              <span className="text-xs text-emerald-400/70 flex items-center gap-1.5">
                <Building className="w-3.5 h-3.5 text-[#C69A3A]" /> Project Category
              </span>
              <p className="text-sm font-medium text-emerald-100">
                {enquiry.projectType}
              </p>
            </div>

            <div className="bg-[#061F18] p-4 rounded-xl border border-emerald-900/60 space-y-1">
              <span className="text-xs text-emerald-400/70 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#C69A3A]" /> Location / City
              </span>
              <p className="text-sm font-medium text-emerald-100">
                {enquiry.location}
              </p>
            </div>

            <div className="bg-[#061F18] p-4 rounded-xl border border-emerald-900/60 space-y-1">
              <span className="text-xs text-emerald-400/70 flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-[#C69A3A]" /> Direct Telephone
              </span>
              <p className="text-sm font-medium text-emerald-100 select-all font-mono">
                {enquiry.phone}
              </p>
            </div>

            <div className="bg-[#061F18] p-4 rounded-xl border border-emerald-900/60 space-y-1">
              <span className="text-xs text-emerald-400/70 flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-[#C69A3A]" /> Email Address
              </span>
              <p className="text-sm font-medium text-emerald-100 select-all font-mono break-all">
                {enquiry.email}
              </p>
            </div>
          </div>

          {/* Client Message / Requirements */}
          <div className="bg-[#061F18] p-5 rounded-xl border border-emerald-900/60 space-y-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#C69A3A] flex items-center gap-1.5">
              <MessageSquare className="w-4 h-4" /> Project Description & Requirements
            </span>
            <p className="text-sm text-emerald-200/90 leading-relaxed whitespace-pre-wrap font-sans">
              {enquiry.message}
            </p>
          </div>

          {/* Admin Notes Section */}
          <div className="bg-[#0A3629] p-5 rounded-xl border border-[#C69A3A]/30 space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold uppercase tracking-wider text-[#C69A3A]">
                Internal Studio Notes & Reminders
              </label>
              {saveSuccess && (
                <span className="text-xs text-emerald-400 flex items-center gap-1">
                  <Check className="w-3.5 h-3.5" /> Notes Saved!
                </span>
              )}
            </div>
            <textarea
              rows={4}
              value={adminNotes}
              onChange={(e) => setAdminNotes(e.target.value)}
              placeholder="Add follow-up notes, site visit schedules, estimate summaries, or architectural feedback..."
              className="w-full bg-[#061F18] border border-emerald-800/60 rounded-xl p-3 text-sm text-emerald-100 placeholder-emerald-700 focus:outline-none focus:border-[#C69A3A] focus:ring-1 focus:ring-[#C69A3A]"
            />
            <div className="flex justify-end">
              <button
                onClick={handleSaveNotes}
                disabled={isSaving}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#C69A3A] hover:bg-[#b0872e] text-[#061F18] font-medium text-xs transition-colors shadow-lg disabled:opacity-50"
              >
                <Save className="w-3.5 h-3.5" />
                {isSaving ? "Saving..." : "Save Notes"}
              </button>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-emerald-900/60 bg-[#061F18] flex items-center justify-between">
          <button
            onClick={() => {
              if (confirm("Are you sure you want to delete this enquiry?")) {
                onDelete(enquiry.id);
                onClose();
              }
            }}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-red-950/40 hover:bg-red-900/50 border border-red-800/40 text-red-400 text-xs transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" /> Delete Enquiry
          </button>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-emerald-900/80 hover:bg-emerald-800 text-emerald-200 text-xs font-medium transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
