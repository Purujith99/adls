import fs from "fs";
import path from "path";
import { Enquiry } from "@/types/enquiry";

const DATA_FILE_PATH = path.join(process.cwd(), "src", "data", "enquiries.json");

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
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(), // 3 hours ago
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
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 1.5).toISOString(), // 1.5 days ago
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
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString(), // 3 days ago
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
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 4).toISOString(), // 4 days ago
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
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7).toISOString(), // 7 days ago
  },
];

export function getEnquiries(): Enquiry[] {
  try {
    if (!fs.existsSync(DATA_FILE_PATH)) {
      // Ensure directory exists and write initial seed data
      const dir = path.dirname(DATA_FILE_PATH);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      fs.writeFileSync(DATA_FILE_PATH, JSON.stringify(SEED_ENQUIRIES, null, 2), "utf-8");
      return SEED_ENQUIRIES;
    }
    const data = fs.readFileSync(DATA_FILE_PATH, "utf-8");
    return JSON.parse(data);
  } catch (err) {
    console.error("Error reading enquiries store:", err);
    return SEED_ENQUIRIES;
  }
}

export function saveEnquiries(enquiries: Enquiry[]): boolean {
  try {
    const dir = path.dirname(DATA_FILE_PATH);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(DATA_FILE_PATH, JSON.stringify(enquiries, null, 2), "utf-8");
    return true;
  } catch (err) {
    console.error("Error saving enquiries store:", err);
    return false;
  }
}

export function addEnquiry(newEnquiryData: Omit<Enquiry, "id" | "status" | "createdAt">): Enquiry {
  const enquiries = getEnquiries();
  const newEnquiry: Enquiry = {
    ...newEnquiryData,
    id: "enq_" + Date.now().toString(36) + Math.random().toString(36).substr(2, 4),
    status: "New",
    createdAt: new Date().toISOString(),
    flagged: false,
  };
  enquiries.unshift(newEnquiry);
  saveEnquiries(enquiries);
  return newEnquiry;
}

export function updateEnquiry(id: string, updates: Partial<Enquiry>): Enquiry | null {
  const enquiries = getEnquiries();
  const index = enquiries.findIndex((e) => e.id === id);
  if (index === -1) return null;

  enquiries[index] = { ...enquiries[index], ...updates };
  saveEnquiries(enquiries);
  return enquiries[index];
}

export function deleteEnquiry(id: string): boolean {
  const enquiries = getEnquiries();
  const filtered = enquiries.filter((e) => e.id !== id);
  if (filtered.length === enquiries.length) return false;
  saveEnquiries(filtered);
  return true;
}
