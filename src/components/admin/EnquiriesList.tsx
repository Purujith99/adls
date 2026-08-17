"use client";

import React, { useState } from "react";
import { Enquiry, EnquiryStatus } from "@/types/enquiry";
import {
  Search,
  Filter,
  Download,
  Phone,
  Mail,
  MapPin,
  Star,
  Trash2,
  Eye,
  Plus,
  Building,
  Calendar,
  CheckSquare,
  Square,
  FileSpreadsheet,
} from "lucide-react";
import { WhatsAppIcon } from "@/components/Icons";

interface EnquiriesListProps {
  enquiries: Enquiry[];
  activeStatusFilter: string;
  onFilterChange: (status: string) => void;
  onSelectEnquiry: (enquiry: Enquiry) => void;
  onDeleteEnquiry: (id: string) => void;
  onQuickUpdateStatus: (id: string, newStatus: EnquiryStatus) => void;
  onToggleFlag: (id: string, currentFlagged: boolean) => void;
  onAddNewEnquiry: () => void;
}

const STATUS_OPTIONS: (EnquiryStatus | "All")[] = [
  "All",
  "New",
  "In Contact",
  "Consultation Scheduled",
  "Proposal Sent",
  "Completed",
  "Archived",
];

const STATUS_BADGE: Record<EnquiryStatus, string> = {
  New: "bg-amber-500/20 text-amber-300 border-amber-500/30",
  "In Contact": "bg-blue-500/20 text-blue-300 border-blue-500/30",
  "Consultation Scheduled": "bg-purple-500/20 text-purple-300 border-purple-500/30",
  "Proposal Sent": "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
  Completed: "bg-teal-500/20 text-teal-300 border-teal-500/30",
  Archived: "bg-zinc-500/20 text-zinc-400 border-zinc-500/30",
};

export default function EnquiriesList({
  enquiries,
  activeStatusFilter,
  onFilterChange,
  onSelectEnquiry,
  onDeleteEnquiry,
  onQuickUpdateStatus,
  onToggleFlag,
  onAddNewEnquiry,
}: EnquiriesListProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  // Filter local items
  const filteredEnquiries = enquiries.filter((e) => {
    const matchesStatus =
      activeStatusFilter === "All" || e.status === activeStatusFilter;

    const q = searchTerm.toLowerCase().trim();
    const matchesSearch =
      !q ||
      e.name.toLowerCase().includes(q) ||
      e.email.toLowerCase().includes(q) ||
      e.phone.toLowerCase().includes(q) ||
      e.location.toLowerCase().includes(q) ||
      e.projectType.toLowerCase().includes(q) ||
      e.message.toLowerCase().includes(q);

    return matchesStatus && matchesSearch;
  });

  const sanitizePhone = (phone: string) => phone.replace(/[^0-9]/g, "");

  const exportToCSV = () => {
    if (filteredEnquiries.length === 0) return;

    const headers = [
      "ID",
      "Name",
      "Phone",
      "Email",
      "Project Type",
      "Location",
      "Message",
      "Status",
      "Admin Notes",
      "Created At",
    ];

    const rows = filteredEnquiries.map((e) => [
      `"${e.id}"`,
      `"${e.name.replace(/"/g, '""')}"`,
      `"${e.phone.replace(/"/g, '""')}"`,
      `"${e.email.replace(/"/g, '""')}"`,
      `"${e.projectType.replace(/"/g, '""')}"`,
      `"${e.location.replace(/"/g, '""')}"`,
      `"${e.message.replace(/"/g, '""')}"`,
      `"${e.status}"`,
      `"${(e.adminNotes || "").replace(/"/g, '""')}"`,
      `"${new Date(e.createdAt).toLocaleString()}"`,
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute(
      "download",
      `Athreya_Enquiries_Export_${new Date().toISOString().slice(0, 10)}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleSelectAll = () => {
    if (selectedIds.length === filteredEnquiries.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredEnquiries.map((e) => e.id));
    }
  };

  const handleToggleSelect = (id: string) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((i) => i !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  return (
    <div className="space-y-6">
      {/* Search & Action Bar */}
      <div className="bg-[#061F18] border border-emerald-900/60 rounded-2xl p-4 sm:p-5 shadow-xl flex flex-col md:flex-row gap-4 items-center justify-between">
        {/* Search Input */}
        <div className="relative w-full md:w-96">
          <Search className="w-4 h-4 text-emerald-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by client name, email, city, phone..."
            className="w-full bg-[#0A3629] border border-emerald-800/60 rounded-xl pl-10 pr-4 py-2.5 text-xs text-emerald-100 placeholder-emerald-600 focus:outline-none focus:border-[#C69A3A] focus:ring-1 focus:ring-[#C69A3A]"
          />
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-3 w-full md:w-auto justify-end">
          <button
            onClick={onAddNewEnquiry}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-emerald-900/80 hover:bg-emerald-800 border border-emerald-700/50 text-emerald-200 text-xs font-medium transition-colors"
          >
            <Plus className="w-3.5 h-3.5 text-[#C69A3A]" /> Add Test Enquiry
          </button>
          <button
            onClick={exportToCSV}
            disabled={filteredEnquiries.length === 0}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#C69A3A] hover:bg-[#b0872e] text-[#061F18] text-xs font-medium shadow-lg transition-colors disabled:opacity-50"
          >
            <FileSpreadsheet className="w-3.5 h-3.5" /> Export CSV ({filteredEnquiries.length})
          </button>
        </div>
      </div>

      {/* Status Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 custom-scrollbar">
        {STATUS_OPTIONS.map((status) => {
          const count =
            status === "All"
              ? enquiries.length
              : enquiries.filter((e) => e.status === status).length;

          return (
            <button
              key={status}
              onClick={() => onFilterChange(status)}
              className={`px-4 py-2 rounded-xl text-xs font-medium transition-all whitespace-nowrap flex items-center gap-2 border ${
                activeStatusFilter === status
                  ? "bg-[#C69A3A] text-[#061F18] border-[#C69A3A] font-semibold shadow-md"
                  : "bg-[#061F18] text-emerald-400/80 border-emerald-900/60 hover:border-emerald-700 hover:text-emerald-200"
              }`}
            >
              <span>{status}</span>
              <span
                className={`px-1.5 py-0.5 rounded-full text-[10px] font-mono ${
                  activeStatusFilter === status
                    ? "bg-[#061F18]/20 text-[#061F18]"
                    : "bg-emerald-950 text-emerald-400"
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Enquiries Table Card */}
      <div className="bg-[#061F18] border border-emerald-900/60 rounded-2xl shadow-xl overflow-hidden">
        {filteredEnquiries.length === 0 ? (
          <div className="p-12 text-center space-y-3">
            <Filter className="w-10 h-10 text-emerald-700 mx-auto" />
            <h4 className="text-base font-serif text-emerald-200">No Enquiries Found</h4>
            <p className="text-xs text-emerald-500 max-w-sm mx-auto">
              There are no project consultation enquiries matching your selected filter or search query.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#041510] border-b border-emerald-900/60 text-[11px] font-mono uppercase tracking-wider text-emerald-400/70">
                  <th className="py-3.5 px-4 w-10">
                    <button
                      onClick={handleSelectAll}
                      className="text-emerald-500 hover:text-emerald-300"
                    >
                      {selectedIds.length === filteredEnquiries.length ? (
                        <CheckSquare className="w-4 h-4 text-[#C69A3A]" />
                      ) : (
                        <Square className="w-4 h-4" />
                      )}
                    </button>
                  </th>
                  <th className="py-3.5 px-4">Client Details</th>
                  <th className="py-3.5 px-4">Project Category & Location</th>
                  <th className="py-3.5 px-4">Date Submitted</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-emerald-900/40 text-xs">
                {filteredEnquiries.map((enq) => {
                  const cleanPhone = sanitizePhone(enq.phone);
                  const whatsappUrl = `https://wa.me/${cleanPhone.startsWith("91") ? cleanPhone : "91" + cleanPhone}`;
                  const isSelected = selectedIds.includes(enq.id);

                  return (
                    <tr
                      key={enq.id}
                      className={`hover:bg-emerald-950/40 transition-colors group ${
                        isSelected ? "bg-emerald-950/60" : ""
                      }`}
                    >
                      <td className="py-4 px-4">
                        <button
                          onClick={() => handleToggleSelect(enq.id)}
                          className="text-emerald-500 hover:text-emerald-300"
                        >
                          {isSelected ? (
                            <CheckSquare className="w-4 h-4 text-[#C69A3A]" />
                          ) : (
                            <Square className="w-4 h-4" />
                          )}
                        </button>
                      </td>

                      {/* Client Info */}
                      <td className="py-4 px-4">
                        <div className="flex items-start gap-2.5">
                          <button
                            onClick={() => onToggleFlag(enq.id, !!enq.flagged)}
                            className="mt-0.5 text-emerald-700 hover:text-amber-400 transition-colors"
                            title={enq.flagged ? "Unstar" : "Star"}
                          >
                            <Star
                              className={`w-3.5 h-3.5 ${
                                enq.flagged ? "text-amber-400 fill-amber-400" : ""
                              }`}
                            />
                          </button>
                          <div>
                            <button
                              onClick={() => onSelectEnquiry(enq)}
                              className="font-serif font-medium text-sm text-emerald-100 hover:text-[#C69A3A] transition-colors text-left"
                            >
                              {enq.name}
                            </button>
                            <div className="flex items-center gap-3 text-[11px] text-emerald-400/60 mt-0.5 font-mono">
                              <span>{enq.phone}</span>
                              <span>•</span>
                              <span className="truncate max-w-[140px]">
                                {enq.email}
                              </span>
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Project Category & Location */}
                      <td className="py-4 px-4">
                        <div className="space-y-0.5">
                          <p className="font-medium text-emerald-200">
                            {enq.projectType}
                          </p>
                          <p className="text-[11px] text-emerald-400/60 flex items-center gap-1">
                            <MapPin className="w-3 h-3 text-[#C69A3A]" />
                            {enq.location}
                          </p>
                        </div>
                      </td>

                      {/* Date */}
                      <td className="py-4 px-4 font-mono text-[11px] text-emerald-400/70">
                        {new Date(enq.createdAt).toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </td>

                      {/* Status Dropdown */}
                      <td className="py-4 px-4">
                        <select
                          value={enq.status}
                          onChange={(e) =>
                            onQuickUpdateStatus(
                              enq.id,
                              e.target.value as EnquiryStatus
                            )
                          }
                          className={`px-2.5 py-1 rounded-lg text-xs font-medium border focus:outline-none cursor-pointer ${
                            STATUS_BADGE[enq.status]
                          }`}
                        >
                          {STATUS_OPTIONS.filter((s) => s !== "All").map((s) => (
                            <option
                              key={s}
                              value={s}
                              className="bg-[#061F18] text-emerald-100"
                            >
                              {s}
                            </option>
                          ))}
                        </select>
                      </td>

                      {/* Actions */}
                      <td className="py-4 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <a
                            href={`tel:${enq.phone}`}
                            className="p-1.5 rounded-lg bg-emerald-950 hover:bg-emerald-900 text-emerald-300 transition-colors"
                            title="Call"
                          >
                            <Phone className="w-3.5 h-3.5 text-[#C69A3A]" />
                          </a>
                          <a
                            href={whatsappUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 rounded-lg bg-emerald-950 hover:bg-emerald-900 text-emerald-300 transition-colors"
                            title="WhatsApp"
                          >
                            <WhatsAppIcon className="w-3.5 h-3.5 text-[#25D366]" />
                          </a>
                          <button
                            onClick={() => onSelectEnquiry(enq)}
                            className="p-1.5 rounded-lg bg-emerald-900/60 hover:bg-emerald-800 text-emerald-200 transition-colors"
                            title="View Full Details"
                          >
                            <Eye className="w-3.5 h-3.5 text-[#C69A3A]" />
                          </button>
                          <button
                            onClick={() => {
                              if (confirm("Delete this enquiry?")) {
                                onDeleteEnquiry(enq.id);
                              }
                            }}
                            className="p-1.5 rounded-lg bg-red-950/40 hover:bg-red-900/50 text-red-400 transition-colors"
                            title="Delete"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
