import fs from "fs";
import path from "path";
import { Enquiry } from "@/types/enquiry";

// Local file path
const DATA_FILE_PATH = path.join(process.cwd(), "src", "data", "enquiries.json");
// Vercel /tmp fallback path
const TMP_FILE_PATH = path.join("/tmp", "enquiries.json");

const SEED_ENQUIRIES: Enquiry[] = [
  {
    id: "enq_101",
    name: "Rahul Sharma",
    phone: "+91 98765 43210",
    email: "rahul.sharma@example.com",
    projectType: "Luxury Villa Architecture",
    location: "Jubilee Hills, Hyderabad",
    message: "We are planning a modern 6,500 sq ft luxury 4BHK villa on a corner plot. Looking for complete architectural design, elevation concept, and site planning.",
    status: "New",
    adminNotes: "Client called regarding architectural design for Jubilee Hills plot. Follow up on Saturday morning.",
    flagged: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(),
  },
  {
    id: "enq_102",
    name: "Priya Varma",
    phone: "+91 94401 88234",
    email: "priya.v@techcorp.io",
    projectType: "Landscape Architecture & Garden",
    location: "Indiranagar, Bengaluru",
    message: "Seeking a tropical modern landscape design for our 2,500 sq ft rooftop garden & courtyard with water features and outdoor seating.",
    status: "Consultation Scheduled",
    adminNotes: "Virtual consultation fixed for Thursday at 4 PM via Google Meet.",
    flagged: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 1.5).toISOString(),
  },
  {
    id: "enq_103",
    name: "Dr. K. S. Rao",
    phone: "+91 98480 12345",
    email: "drksrao@healthclinic.org",
    projectType: "Commercial & Office Architecture",
    location: "Visakhapatnam, AP",
    message: "Requirement for a 4-storey specialty clinic & corporate space (12,000 sq ft total build-up). Need eco-friendly sustainable design.",
    status: "Proposal Sent",
    adminNotes: "Detailed design proposal & fee structure emailed on Monday. Awaiting feedback from executive board.",
    flagged: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString(),
  },
  {
    id: "enq_104",
    name: "Ananya Reddy",
    phone: "+91 97012 34567",
    email: "ananya.reddy@gmail.com",
    projectType: "Turnkey Interior & Architecture",
    location: "Gachibowli, Hyderabad",
    message: "Looking for comprehensive interior architecture and elevation redesign for a triplex penthouse in Financial District.",
    status: "In Contact",
    adminNotes: "Initial call done. Client requested portfolio deck of recent high-end residential projects.",
    flagged: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 4).toISOString(),
  },
  {
    id: "enq_105",
    name: "Siddharth Mehta",
    phone: "+91 91234 56789",
    email: "siddharth@mehtagroup.in",
    projectType: "Farmhouse & Resort Masterplanning",
    location: "Shadnagar / Chevella, Telangana",
    message: "Developing a 3-acre private eco-farmhouse retreat with infinity pool, gazebo, and organic landscaping.",
    status: "Completed",
    adminNotes: "Project signed & initial site survey completed successfully.",
    flagged: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7).toISOString(),
  },
];

// Upstash / Vercel KV REST helpers
function getKvConfig() {
  const url = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;
  if (url && token) {
    return { url, token };
  }
  return null;
}

export async function getEnquiries(): Promise<Enquiry[]> {
  const kv = getKvConfig();
  if (kv) {
    try {
      const res = await fetch(`${kv.url}/get/athreya_enquiries`, {
        headers: { Authorization: `Bearer ${kv.token}` },
        cache: "no-store",
      });
      if (res.ok) {
        const json = await res.json();
        if (json.result) {
          const parsed = typeof json.result === "string" ? JSON.parse(json.result) : json.result;
          if (Array.isArray(parsed)) return parsed;
        }
      }
    } catch (e) {
      console.error("KV fetch error:", e);
    }
  }

  // File system fallback (Local or Vercel /tmp)
  try {
    const filePath = fs.existsSync(DATA_FILE_PATH)
      ? DATA_FILE_PATH
      : fs.existsSync(TMP_FILE_PATH)
      ? TMP_FILE_PATH
      : null;

    if (!filePath) {
      return SEED_ENQUIRIES;
    }
    const data = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(data);
  } catch (err) {
    console.error("Error reading enquiries store:", err);
    return SEED_ENQUIRIES;
  }
}

export async function saveEnquiries(enquiries: Enquiry[]): Promise<boolean> {
  const kv = getKvConfig();
  if (kv) {
    try {
      const res = await fetch(`${kv.url}/set/athreya_enquiries`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${kv.token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(JSON.stringify(enquiries)),
      });
      if (res.ok) return true;
    } catch (e) {
      console.error("KV save error:", e);
    }
  }

  // Try saving to local file system first, fallback to /tmp on Vercel read-only
  try {
    const targetDir = path.dirname(DATA_FILE_PATH);
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
    }
    fs.writeFileSync(DATA_FILE_PATH, JSON.stringify(enquiries, null, 2), "utf-8");
    return true;
  } catch (err) {
    // Read-only filesystem error on Vercel Lambda
    try {
      fs.writeFileSync(TMP_FILE_PATH, JSON.stringify(enquiries, null, 2), "utf-8");
      return true;
    } catch (tmpErr) {
      console.error("Error saving to /tmp:", tmpErr);
      return false;
    }
  }
}

export async function addEnquiry(
  newEnquiryData: Omit<Enquiry, "id" | "status" | "createdAt">
): Promise<Enquiry> {
  const enquiries = await getEnquiries();
  const newEnquiry: Enquiry = {
    ...newEnquiryData,
    id: "enq_" + Date.now().toString(36) + Math.random().toString(36).substr(2, 4),
    status: "New",
    createdAt: new Date().toISOString(),
    flagged: false,
  };
  enquiries.unshift(newEnquiry);
  await saveEnquiries(enquiries);
  return newEnquiry;
}

export async function updateEnquiry(
  id: string,
  updates: Partial<Enquiry>
): Promise<Enquiry | null> {
  const enquiries = await getEnquiries();
  const index = enquiries.findIndex((e) => e.id === id);
  if (index === -1) return null;

  enquiries[index] = { ...enquiries[index], ...updates };
  await saveEnquiries(enquiries);
  return enquiries[index];
}

export async function deleteEnquiry(id: string): Promise<boolean> {
  const enquiries = await getEnquiries();
  const filtered = enquiries.filter((e) => e.id !== id);
  if (filtered.length === enquiries.length) return false;
  await saveEnquiries(filtered);
  return true;
}
