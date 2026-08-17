"use client";

import React, { useState, useEffect } from "react";
import { Enquiry, EnquiryStats, EnquiryStatus } from "@/types/enquiry";
import AdminDashboard from "@/components/admin/AdminDashboard";
import EnquiriesList from "@/components/admin/EnquiriesList";
import EnquiryDetailModal from "@/components/admin/EnquiryDetailModal";
import {
  ShieldCheck,
  Lock,
  LayoutDashboard,
  Inbox,
  Star,
  Plus,
  ArrowLeft,
  RefreshCw,
  LogOut,
  X,
  Building,
} from "lucide-react";
import Link from "next/link";

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pinInput, setPinInput] = useState("");
  const [pinError, setPinError] = useState(false);

  const [activeTab, setActiveTab] = useState<"dashboard" | "enquiries">("dashboard");
  const [activeStatusFilter, setActiveStatusFilter] = useState("All");

  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [stats, setStats] = useState<EnquiryStats>({
    total: 0,
    newCount: 0,
    inContactCount: 0,
    scheduledCount: 0,
    proposalCount: 0,
    completedCount: 0,
    archivedCount: 0,
    byProjectType: {},
    byLocation: {},
  });

  const [selectedEnquiry, setSelectedEnquiry] = useState<Enquiry | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // New Test Enquiry Modal State
  const [showAddModal, setShowAddModal] = useState(false);
  const [newForm, setNewForm] = useState({
    name: "",
    phone: "",
    email: "",
    projectType: "Luxury Villa Architecture",
    location: "Jubilee Hills, Hyderabad",
    message: "",
  });

  useEffect(() => {
    // Check local session
    const authSession = sessionStorage.getItem("athreya_admin_auth");
    if (authSession === "true") {
      setIsAuthenticated(true);
    }
  }, []);

  const fetchEnquiries = async () => {
    setIsRefreshing(true);
    try {
      const res = await fetch("/api/enquiries");
      const data = await res.json();
      if (data.success) {
        setEnquiries(data.enquiries || []);
        setStats(
          data.stats || {
            total: 0,
            newCount: 0,
            inContactCount: 0,
            scheduledCount: 0,
            proposalCount: 0,
            completedCount: 0,
            archivedCount: 0,
            byProjectType: {},
            byLocation: {},
          }
        );
      }
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchEnquiries();
    }
  }, [isAuthenticated]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinInput === "1234") {
      setIsAuthenticated(true);
      sessionStorage.setItem("athreya_admin_auth", "true");
      setPinError(false);
    } else {
      setPinError(true);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem("athreya_admin_auth");
    setPinInput("");
  };

  const handleUpdateEnquiry = (updated: Enquiry) => {
    setEnquiries((prev) =>
      prev.map((e) => (e.id === updated.id ? updated : e))
    );
    if (selectedEnquiry?.id === updated.id) {
      setSelectedEnquiry(updated);
    }
    fetchEnquiries();
  };

  const handleDeleteEnquiry = async (id: string) => {
    try {
      const res = await fetch(`/api/enquiries?id=${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success) {
        setEnquiries((prev) => prev.filter((e) => e.id !== id));
        fetchEnquiries();
      }
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  const handleQuickUpdateStatus = async (id: string, newStatus: EnquiryStatus) => {
    try {
      const res = await fetch("/api/enquiries", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: newStatus }),
      });
      const data = await res.json();
      if (data.success && data.enquiry) {
        handleUpdateEnquiry(data.enquiry);
      }
    } catch (err) {
      console.error("Status update error:", err);
    }
  };

  const handleToggleFlag = async (id: string, currentFlagged: boolean) => {
    try {
      const res = await fetch("/api/enquiries", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, flagged: !currentFlagged }),
      });
      const data = await res.json();
      if (data.success && data.enquiry) {
        handleUpdateEnquiry(data.enquiry);
      }
    } catch (err) {
      console.error("Flag update error:", err);
    }
  };

  const handleCreateTestEnquiry = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newForm.name || !newForm.phone || !newForm.email || !newForm.message) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      const res = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newForm),
      });
      const data = await res.json();
      if (data.success) {
        setShowAddModal(false);
        setNewForm({
          name: "",
          phone: "",
          email: "",
          projectType: "Luxury Villa Architecture",
          location: "Jubilee Hills, Hyderabad",
          message: "",
        });
        fetchEnquiries();
      }
    } catch (err) {
      console.error("Create test enquiry error:", err);
    }
  };

  // Passcode Authentication Screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#061F18] text-[#FAF6F0] flex items-center justify-center p-4 relative overflow-hidden font-sans">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-emerald-900/20 via-transparent to-transparent pointer-events-none" />

        <div className="max-w-md w-full bg-[#092B21] border border-[#C69A3A]/40 rounded-3xl p-8 shadow-2xl relative z-10 space-y-6">
          <div className="text-center space-y-2">
            <div className="inline-flex p-3 rounded-2xl bg-emerald-950 border border-[#C69A3A]/30 text-[#C69A3A]">
              <Lock className="w-6 h-6" />
            </div>
            <h1 className="text-2xl font-serif font-medium text-[#FAF6F0]">
              Athreya Designs
            </h1>
            <p className="text-xs text-emerald-400/70 font-mono">
              PROJECT CONSULTATION ADMIN PORTAL
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-emerald-300">
                Enter Studio Passcode
              </label>
              <input
                type="password"
                value={pinInput}
                onChange={(e) => setPinInput(e.target.value)}
                placeholder="Default PIN: 1234"
                className="w-full bg-[#061F18] border border-emerald-800 rounded-xl px-4 py-3 text-center text-lg tracking-widest text-emerald-100 placeholder-emerald-700 focus:outline-none focus:border-[#C69A3A] focus:ring-1 focus:ring-[#C69A3A]"
                autoFocus
              />
              {pinError && (
                <p className="text-xs text-red-400 text-center font-medium">
                  Incorrect Passcode. Try: 1234
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-[#C69A3A] hover:bg-[#b0872e] text-[#061F18] font-semibold text-sm transition-colors shadow-lg"
            >
              Access Admin Portal
            </button>
          </form>

          <div className="text-center pt-2">
            <Link
              href="/"
              className="text-xs text-emerald-400/60 hover:text-emerald-300 inline-flex items-center gap-1"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Return to Website
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#061F18] text-[#FAF6F0] font-sans flex flex-col">
      {/* Top Admin Header */}
      <header className="bg-[#041510] border-b border-emerald-900/60 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-xl bg-emerald-950 border border-[#C69A3A]/40 text-[#C69A3A]">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-base font-serif font-semibold text-[#FAF6F0] flex items-center gap-2">
                Athreya Designs
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#C69A3A]/20 text-[#C69A3A] font-mono border border-[#C69A3A]/30">
                  ADMIN
                </span>
              </h1>
              <p className="text-[10px] text-emerald-400/60 font-mono hidden sm:block">
                Architectural & Landscape Enquiry Management
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={fetchEnquiries}
              disabled={isRefreshing}
              className="p-2 rounded-xl bg-emerald-950 hover:bg-emerald-900 border border-emerald-800/50 text-emerald-300 transition-colors"
              title="Refresh Data"
            >
              <RefreshCw className={`w-4 h-4 ${isRefreshing ? "animate-spin" : ""}`} />
            </button>

            <Link
              href="/"
              target="_blank"
              className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-xl bg-emerald-950 hover:bg-emerald-900 border border-emerald-800/50 text-emerald-300 text-xs transition-colors"
            >
              <Building className="w-3.5 h-3.5 text-[#C69A3A]" /> Live Site
            </Link>

            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-red-950/40 hover:bg-red-900/60 border border-red-800/40 text-red-400 text-xs transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" /> Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full space-y-8">
        {/* Navigation Tabs */}
        <div className="flex items-center justify-between border-b border-emerald-900/60 pb-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setActiveTab("dashboard")}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all border ${
                activeTab === "dashboard"
                  ? "bg-[#C69A3A] text-[#061F18] border-[#C69A3A] shadow-lg"
                  : "bg-[#092B21] text-emerald-300/80 border-emerald-900/60 hover:text-emerald-100"
              }`}
            >
              <LayoutDashboard className="w-4 h-4" /> Studio Dashboard
            </button>

            <button
              onClick={() => {
                setActiveTab("enquiries");
                setActiveStatusFilter("All");
              }}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all border ${
                activeTab === "enquiries"
                  ? "bg-[#C69A3A] text-[#061F18] border-[#C69A3A] shadow-lg"
                  : "bg-[#092B21] text-emerald-300/80 border-emerald-900/60 hover:text-emerald-100"
              }`}
            >
              <Inbox className="w-4 h-4" /> All Enquiries ({stats.total})
            </button>
          </div>

          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-900/60 hover:bg-emerald-800 border border-emerald-700/50 text-emerald-200 text-xs transition-colors"
          >
            <Plus className="w-4 h-4 text-[#C69A3A]" /> New Entry
          </button>
        </div>

        {/* Dynamic Content */}
        {isLoading ? (
          <div className="py-20 text-center space-y-3">
            <RefreshCw className="w-8 h-8 text-[#C69A3A] animate-spin mx-auto" />
            <p className="text-sm text-emerald-400">Loading studio enquiries...</p>
          </div>
        ) : activeTab === "dashboard" ? (
          <AdminDashboard
            stats={stats}
            recentEnquiries={enquiries}
            onSelectEnquiry={(enq) => setSelectedEnquiry(enq)}
            onNavigateToEnquiries={(filter) => {
              setActiveTab("enquiries");
              if (filter) setActiveStatusFilter(filter);
            }}
          />
        ) : (
          <EnquiriesList
            enquiries={enquiries}
            activeStatusFilter={activeStatusFilter}
            onFilterChange={(st) => setActiveStatusFilter(st)}
            onSelectEnquiry={(enq) => setSelectedEnquiry(enq)}
            onDeleteEnquiry={handleDeleteEnquiry}
            onQuickUpdateStatus={handleQuickUpdateStatus}
            onToggleFlag={handleToggleFlag}
            onAddNewEnquiry={() => setShowAddModal(true)}
          />
        )}
      </main>

      {/* Enquiry Detail Modal */}
      {selectedEnquiry && (
        <EnquiryDetailModal
          enquiry={selectedEnquiry}
          onClose={() => setSelectedEnquiry(null)}
          onUpdate={handleUpdateEnquiry}
          onDelete={handleDeleteEnquiry}
        />
      )}

      {/* Create Test Enquiry Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="bg-[#092B21] border border-[#C69A3A]/40 w-full max-w-lg rounded-2xl shadow-2xl p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-emerald-800/40 pb-3">
              <h3 className="text-lg font-serif font-medium text-[#FAF6F0]">
                Add Test Consultation Enquiry
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-emerald-400 hover:text-emerald-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateTestEnquiry} className="space-y-4">
              <div>
                <label className="text-xs text-emerald-300 font-medium">Client Name</label>
                <input
                  type="text"
                  required
                  value={newForm.name}
                  onChange={(e) => setNewForm({ ...newForm, name: e.target.value })}
                  placeholder="e.g. Vikramaditya Raju"
                  className="w-full mt-1 bg-[#061F18] border border-emerald-800 rounded-xl p-2.5 text-xs text-emerald-100 placeholder-emerald-700"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-emerald-300 font-medium">Phone</label>
                  <input
                    type="text"
                    required
                    value={newForm.phone}
                    onChange={(e) => setNewForm({ ...newForm, phone: e.target.value })}
                    placeholder="+91 99887 76655"
                    className="w-full mt-1 bg-[#061F18] border border-emerald-800 rounded-xl p-2.5 text-xs text-emerald-100 placeholder-emerald-700"
                  />
                </div>
                <div>
                  <label className="text-xs text-emerald-300 font-medium">Email</label>
                  <input
                    type="email"
                    required
                    value={newForm.email}
                    onChange={(e) => setNewForm({ ...newForm, email: e.target.value })}
                    placeholder="vikram@example.com"
                    className="w-full mt-1 bg-[#061F18] border border-emerald-800 rounded-xl p-2.5 text-xs text-emerald-100 placeholder-emerald-700"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-emerald-300 font-medium">Project Category</label>
                  <select
                    value={newForm.projectType}
                    onChange={(e) => setNewForm({ ...newForm, projectType: e.target.value })}
                    className="w-full mt-1 bg-[#061F18] border border-emerald-800 rounded-xl p-2.5 text-xs text-emerald-100"
                  >
                    <option value="Luxury Villa Architecture">Luxury Villa Architecture</option>
                    <option value="Landscape Architecture & Garden">Landscape Architecture & Garden</option>
                    <option value="Turnkey Interior & Architecture">Turnkey Interior & Architecture</option>
                    <option value="Commercial & Office Architecture">Commercial & Office Architecture</option>
                    <option value="Farmhouse & Resort Masterplanning">Farmhouse & Resort Masterplanning</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs text-emerald-300 font-medium">City / Location</label>
                  <input
                    type="text"
                    required
                    value={newForm.location}
                    onChange={(e) => setNewForm({ ...newForm, location: e.target.value })}
                    placeholder="e.g. Jubilee Hills, Hyderabad"
                    className="w-full mt-1 bg-[#061F18] border border-emerald-800 rounded-xl p-2.5 text-xs text-emerald-100 placeholder-emerald-700"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs text-emerald-300 font-medium">Project Description</label>
                <textarea
                  rows={3}
                  required
                  value={newForm.message}
                  onChange={(e) => setNewForm({ ...newForm, message: e.target.value })}
                  placeholder="Details about site dimensions, budget, landscape scope..."
                  className="w-full mt-1 bg-[#061F18] border border-emerald-800 rounded-xl p-2.5 text-xs text-emerald-100 placeholder-emerald-700"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-emerald-800/40">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl bg-emerald-950 text-emerald-300 text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-[#C69A3A] hover:bg-[#b0872e] text-[#061F18] font-semibold text-xs"
                >
                  Create Enquiry
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
