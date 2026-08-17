"use client";

import React from "react";
import { Enquiry, EnquiryStats } from "@/types/enquiry";
import {
  Inbox,
  Clock,
  CalendarCheck,
  CheckCircle2,
  Building,
  MapPin,
  TrendingUp,
  ArrowUpRight,
  Star,
} from "lucide-react";

interface AdminDashboardProps {
  stats: EnquiryStats;
  recentEnquiries: Enquiry[];
  onSelectEnquiry: (enquiry: Enquiry) => void;
  onNavigateToEnquiries: (statusFilter?: string) => void;
}

export default function AdminDashboard({
  stats,
  recentEnquiries,
  onSelectEnquiry,
  onNavigateToEnquiries,
}: AdminDashboardProps) {
  const metricCards = [
    {
      title: "Total Enquiries",
      count: stats.total,
      label: "All-time submissions",
      icon: Inbox,
      color: "border-emerald-500/30 text-emerald-300 bg-emerald-950/40",
      iconBg: "bg-emerald-500/10 text-emerald-400",
      filterKey: "All",
    },
    {
      title: "New Enquiries",
      count: stats.newCount,
      label: "Pending initial action",
      icon: Clock,
      color: "border-amber-500/30 text-amber-300 bg-amber-950/30",
      iconBg: "bg-amber-500/10 text-amber-400",
      filterKey: "New",
    },
    {
      title: "Consultations Fixed",
      count: stats.scheduledCount,
      label: "Scheduled client meetings",
      icon: CalendarCheck,
      color: "border-purple-500/30 text-purple-300 bg-purple-950/30",
      iconBg: "bg-purple-500/10 text-purple-400",
      filterKey: "Consultation Scheduled",
    },
    {
      title: "Proposals & Completed",
      count: stats.proposalCount + stats.completedCount,
      label: "Active proposals & signed",
      icon: CheckCircle2,
      color: "border-teal-500/30 text-teal-300 bg-teal-950/30",
      iconBg: "bg-teal-500/10 text-teal-400",
      filterKey: "Proposal Sent",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Top Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {metricCards.map((card) => {
          const Icon = card.icon;
          return (
            <button
              key={card.title}
              onClick={() => onNavigateToEnquiries(card.filterKey)}
              className={`p-6 rounded-2xl border ${card.color} transition-all duration-300 hover:scale-[1.02] text-left relative overflow-hidden group shadow-lg`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400/80">
                  {card.title}
                </span>
                <div className={`p-2.5 rounded-xl ${card.iconBg}`}>
                  <Icon className="w-5 h-5" />
                </div>
              </div>
              <div className="mt-4 flex items-baseline justify-between">
                <p className="text-3xl font-serif font-bold text-[#FAF6F0]">
                  {card.count}
                </p>
                <span className="text-xs text-emerald-400/70 group-hover:text-[#C69A3A] flex items-center gap-0.5 transition-colors">
                  View <ArrowUpRight className="w-3.5 h-3.5" />
                </span>
              </div>
              <p className="mt-1 text-xs text-emerald-300/60 font-sans">
                {card.label}
              </p>
            </button>
          );
        })}
      </div>

      {/* Analytics Breakdown Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Project Types Distribution */}
        <div className="lg:col-span-6 bg-[#061F18] border border-emerald-900/60 rounded-2xl p-6 shadow-xl">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <Building className="w-5 h-5 text-[#C69A3A]" />
              <h3 className="text-lg font-serif font-medium text-[#FAF6F0]">
                Project Category Demand
              </h3>
            </div>
            <span className="text-xs text-emerald-400/60 font-mono">
              {Object.keys(stats.byProjectType).length} Categories
            </span>
          </div>

          <div className="space-y-4">
            {Object.entries(stats.byProjectType).length === 0 ? (
              <p className="text-sm text-emerald-500">No project type data recorded yet.</p>
            ) : (
              Object.entries(stats.byProjectType).map(([type, count]) => {
                const percentage = Math.round((count / (stats.total || 1)) * 100);
                return (
                  <div key={type} className="space-y-1.5">
                    <div className="flex justify-between text-xs">
                      <span className="text-emerald-200 font-medium">{type}</span>
                      <span className="text-emerald-400 font-mono">
                        {count} ({percentage}%)
                      </span>
                    </div>
                    <div className="h-2 w-full bg-emerald-950 rounded-full overflow-hidden border border-emerald-900/40">
                      <div
                        className="h-full bg-gradient-to-r from-emerald-600 to-[#C69A3A] rounded-full transition-all duration-500"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Geographic Distribution */}
        <div className="lg:col-span-6 bg-[#061F18] border border-emerald-900/60 rounded-2xl p-6 shadow-xl">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-[#C69A3A]" />
              <h3 className="text-lg font-serif font-medium text-[#FAF6F0]">
                Location & City Spread
              </h3>
            </div>
            <span className="text-xs text-emerald-400/60 font-mono">
              Pan-India Inquiries
            </span>
          </div>

          <div className="space-y-4">
            {Object.entries(stats.byLocation).length === 0 ? (
              <p className="text-sm text-emerald-500">No location data recorded yet.</p>
            ) : (
              Object.entries(stats.byLocation).map(([loc, count]) => {
                const percentage = Math.round((count / (stats.total || 1)) * 100);
                return (
                  <div key={loc} className="space-y-1.5">
                    <div className="flex justify-between text-xs">
                      <span className="text-emerald-200 font-medium">{loc}</span>
                      <span className="text-emerald-400 font-mono">
                        {count} ({percentage}%)
                      </span>
                    </div>
                    <div className="h-2 w-full bg-emerald-950 rounded-full overflow-hidden border border-emerald-900/40">
                      <div
                        className="h-full bg-gradient-to-r from-amber-600 to-emerald-500 rounded-full transition-all duration-500"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>

      {/* Recent Submissions Activity */}
      <div className="bg-[#061F18] border border-emerald-900/60 rounded-2xl p-6 shadow-xl">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-[#C69A3A]" />
            <h3 className="text-lg font-serif font-medium text-[#FAF6F0]">
              Recent Project Consultation Enquiries
            </h3>
          </div>
          <button
            onClick={() => onNavigateToEnquiries("All")}
            className="text-xs text-[#C69A3A] hover:underline font-medium flex items-center gap-1"
          >
            View All ({stats.total}) <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="divide-y divide-emerald-900/50">
          {recentEnquiries.slice(0, 5).map((enq) => (
            <div
              key={enq.id}
              onClick={() => onSelectEnquiry(enq)}
              className="py-4 first:pt-0 last:pb-0 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-emerald-900/20 p-3 rounded-xl transition-colors cursor-pointer"
            >
              <div className="flex items-start gap-3">
                <div className="mt-1">
                  {enq.flagged ? (
                    <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                  ) : (
                    <div className="w-2 h-2 rounded-full bg-emerald-500 mt-1.5" />
                  )}
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-emerald-100 flex items-center gap-2">
                    {enq.name}
                    <span className="text-xs text-emerald-400/60 font-mono font-normal">
                      • {enq.location}
                    </span>
                  </h4>
                  <p className="text-xs text-emerald-300/70 line-clamp-1 mt-0.5">
                    {enq.projectType}: {enq.message}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 self-end sm:self-center">
                <span
                  className={`px-2.5 py-1 rounded-lg text-xs font-medium border ${
                    enq.status === "New"
                      ? "bg-amber-500/20 text-amber-300 border-amber-500/30"
                      : enq.status === "Consultation Scheduled"
                      ? "bg-purple-500/20 text-purple-300 border-purple-500/30"
                      : "bg-emerald-500/20 text-emerald-300 border-emerald-500/30"
                  }`}
                >
                  {enq.status}
                </span>
                <span className="text-xs text-emerald-400/50 font-mono whitespace-nowrap">
                  {new Date(enq.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
