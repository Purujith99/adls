"use client";

import React, { useState } from "react";
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
  Calendar,
  Sparkles,
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
  const [timeframe, setTimeframe] = useState<"today" | "allTime">("today");

  // Helper to check if a date string is from today
  const isToday = (dateStr: string) => {
    const date = new Date(dateStr);
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  // Filter enquiries based on timeframe
  const displayEnquiries =
    timeframe === "today"
      ? recentEnquiries.filter((e) => isToday(e.createdAt))
      : recentEnquiries;

  // Calculate dynamic stats for selected timeframe
  const displayStats = (() => {
    if (timeframe === "allTime") return stats;

    const todayEnquiries = recentEnquiries.filter((e) => isToday(e.createdAt));
    const byProj: Record<string, number> = {};
    const byLoc: Record<string, number> = {};

    todayEnquiries.forEach((e) => {
      const pType = e.projectType || "Unspecified";
      byProj[pType] = (byProj[pType] || 0) + 1;

      const city = e.location.split(",").pop()?.trim() || e.location;
      byLoc[city] = (byLoc[city] || 0) + 1;
    });

    return {
      total: todayEnquiries.length,
      newCount: todayEnquiries.filter((e) => e.status === "New").length,
      inContactCount: todayEnquiries.filter((e) => e.status === "In Contact").length,
      scheduledCount: todayEnquiries.filter((e) => e.status === "Consultation Scheduled").length,
      proposalCount: todayEnquiries.filter((e) => e.status === "Proposal Sent").length,
      completedCount: todayEnquiries.filter((e) => e.status === "Completed").length,
      archivedCount: todayEnquiries.filter((e) => e.status === "Archived").length,
      byProjectType: byProj,
      byLocation: byLoc,
    };
  })();

  const metricCards = [
    {
      title: timeframe === "today" ? "Today's Enquiries" : "Total Enquiries",
      count: displayStats.total,
      label: timeframe === "today" ? "Received today" : "All-time submissions",
      icon: Inbox,
      color: "border-emerald-500/30 text-emerald-300 bg-emerald-950/40",
      iconBg: "bg-emerald-500/10 text-emerald-400",
      filterKey: "All",
    },
    {
      title: timeframe === "today" ? "Today's New Items" : "New Enquiries",
      count: displayStats.newCount,
      label: "Pending initial action",
      icon: Clock,
      color: "border-amber-500/30 text-amber-300 bg-amber-950/30",
      iconBg: "bg-amber-500/10 text-amber-400",
      filterKey: "New",
    },
    {
      title: timeframe === "today" ? "Today's Meetings" : "Consultations Fixed",
      count: displayStats.scheduledCount,
      label: "Scheduled meetings",
      icon: CalendarCheck,
      color: "border-purple-500/30 text-purple-300 bg-purple-950/30",
      iconBg: "bg-purple-500/10 text-purple-400",
      filterKey: "Consultation Scheduled",
    },
    {
      title: timeframe === "today" ? "Today's Proposals" : "Proposals & Completed",
      count: displayStats.proposalCount + displayStats.completedCount,
      label: "Active proposals & signed",
      icon: CheckCircle2,
      color: "border-teal-500/30 text-teal-300 bg-teal-950/30",
      iconBg: "bg-teal-500/10 text-teal-400",
      filterKey: "Proposal Sent",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header & Timeframe Switcher Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-[#061F18] border border-emerald-900/60 p-4 rounded-2xl shadow-xl">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-[#C69A3A]" />
          <div>
            <h2 className="text-base font-serif font-semibold text-[#FAF6F0]">
              Studio Dashboard Overview
            </h2>
            <p className="text-xs text-emerald-400/60 font-mono">
              {timeframe === "today"
                ? "Daily Metrics (Resets to zero at midnight)"
                : "All-Time Historical Summary"}
            </p>
          </div>
        </div>

        {/* Toggle Pills */}
        <div className="flex items-center gap-1.5 bg-[#092B21] p-1.5 rounded-xl border border-emerald-800/60">
          <button
            onClick={() => setTimeframe("today")}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              timeframe === "today"
                ? "bg-[#C69A3A] text-[#061F18] shadow-md font-bold"
                : "text-emerald-400/70 hover:text-emerald-100"
            }`}
          >
            <Calendar className="w-3.5 h-3.5" />
            Today&apos;s Daily Stats
          </button>
          <button
            onClick={() => setTimeframe("allTime")}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              timeframe === "allTime"
                ? "bg-[#C69A3A] text-[#061F18] shadow-md font-bold"
                : "text-emerald-400/70 hover:text-emerald-100"
            }`}
          >
            <Inbox className="w-3.5 h-3.5" />
            All-Time Total ({stats.total})
          </button>
        </div>
      </div>

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
                {timeframe === "today" ? "Today's Category Demand" : "Project Category Demand"}
              </h3>
            </div>
            <span className="text-xs text-emerald-400/60 font-mono">
              {Object.keys(displayStats.byProjectType).length} Categories
            </span>
          </div>

          <div className="space-y-4">
            {Object.entries(displayStats.byProjectType).length === 0 ? (
              <p className="text-sm text-emerald-500 py-4 text-center">
                {timeframe === "today"
                  ? "No new enquiries received today yet."
                  : "No project type data recorded yet."}
              </p>
            ) : (
              Object.entries(displayStats.byProjectType).map(([type, count]) => {
                const percentage = Math.round((count / (displayStats.total || 1)) * 100);
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
                {timeframe === "today" ? "Today's Location Spread" : "Location & City Spread"}
              </h3>
            </div>
            <span className="text-xs text-emerald-400/60 font-mono">
              Pan-India Inquiries
            </span>
          </div>

          <div className="space-y-4">
            {Object.entries(displayStats.byLocation).length === 0 ? (
              <p className="text-sm text-emerald-500 py-4 text-center">
                {timeframe === "today"
                  ? "No new location data for today yet."
                  : "No location data recorded yet."}
              </p>
            ) : (
              Object.entries(displayStats.byLocation).map(([loc, count]) => {
                const percentage = Math.round((count / (displayStats.total || 1)) * 100);
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
              {timeframe === "today"
                ? "Today's Project Consultation Submissions"
                : "Recent Project Consultation Enquiries"}
            </h3>
          </div>
          <button
            onClick={() => onNavigateToEnquiries("All")}
            className="text-xs text-[#C69A3A] hover:underline font-medium flex items-center gap-1"
          >
            View All History ({stats.total}) <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {displayEnquiries.length === 0 ? (
          <p className="text-sm text-emerald-500 py-6 text-center">
            {timeframe === "today"
              ? "No new project enquiries submitted today yet."
              : "No enquiries recorded."}
          </p>
        ) : (
          <div className="divide-y divide-emerald-900/50">
            {displayEnquiries.slice(0, 5).map((enq) => (
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
                    {new Date(enq.createdAt).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
