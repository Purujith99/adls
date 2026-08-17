import { NextResponse } from "next/server";
import {
  getEnquiries,
  addEnquiry,
  updateEnquiry,
  deleteEnquiry,
} from "@/lib/enquiriesStore";
import { EnquiryStats } from "@/types/enquiry";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const statusFilter = searchParams.get("status");
    const searchQuery = searchParams.get("search");

    let enquiries = await getEnquiries();

    // Stats calculations
    const stats: EnquiryStats = {
      total: enquiries.length,
      newCount: enquiries.filter((e) => e.status === "New").length,
      inContactCount: enquiries.filter((e) => e.status === "In Contact").length,
      scheduledCount: enquiries.filter((e) => e.status === "Consultation Scheduled").length,
      proposalCount: enquiries.filter((e) => e.status === "Proposal Sent").length,
      completedCount: enquiries.filter((e) => e.status === "Completed").length,
      archivedCount: enquiries.filter((e) => e.status === "Archived").length,
      byProjectType: {},
      byLocation: {},
    };

    enquiries.forEach((e) => {
      const pType = e.projectType || "Unspecified";
      stats.byProjectType[pType] = (stats.byProjectType[pType] || 0) + 1;

      // Extract city approximation
      const city = e.location.split(",").pop()?.trim() || e.location;
      stats.byLocation[city] = (stats.byLocation[city] || 0) + 1;
    });

    // Apply filtering
    if (statusFilter && statusFilter !== "All") {
      enquiries = enquiries.filter((e) => e.status === statusFilter);
    }

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      enquiries = enquiries.filter(
        (e) =>
          e.name.toLowerCase().includes(q) ||
          e.email.toLowerCase().includes(q) ||
          e.phone.toLowerCase().includes(q) ||
          e.location.toLowerCase().includes(q) ||
          e.projectType.toLowerCase().includes(q) ||
          e.message.toLowerCase().includes(q)
      );
    }

    return NextResponse.json({
      success: true,
      enquiries,
      stats,
    });
  } catch (error) {
    console.error("API GET Error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch enquiries" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { name, phone, email, projectType, location, message } = body;

    if (!name || !phone || !email || !location || !message) {
      return NextResponse.json(
        { success: false, error: "Missing required form fields" },
        { status: 400 }
      );
    }

    const created = await addEnquiry({
      name: name.trim(),
      phone: phone.trim(),
      email: email.trim(),
      projectType: projectType || "General Architectural Consultation",
      location: location.trim(),
      message: message.trim(),
    });

    return NextResponse.json({
      success: true,
      enquiry: created,
    });
  } catch (error) {
    console.error("API POST Error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create enquiry" },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const { id, ...updates } = body;

    if (!id) {
      return NextResponse.json(
        { success: false, error: "Enquiry ID required" },
        { status: 400 }
      );
    }

    const updated = await updateEnquiry(id, updates);
    if (!updated) {
      return NextResponse.json(
        { success: false, error: "Enquiry not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      enquiry: updated,
    });
  } catch (error) {
    console.error("API PATCH Error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update enquiry" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { success: false, error: "Enquiry ID required" },
        { status: 400 }
      );
    }

    const deleted = await deleteEnquiry(id);
    if (!deleted) {
      return NextResponse.json(
        { success: false, error: "Enquiry not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Enquiry deleted successfully",
    });
  } catch (error) {
    console.error("API DELETE Error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete enquiry" },
      { status: 500 }
    );
  }
}
