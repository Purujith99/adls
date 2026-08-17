import fs from "fs";
import path from "path";
import { Enquiry } from "@/types/enquiry";
import { Redis } from "@upstash/redis";

// Local file paths
const DATA_FILE_PATH = path.join(process.cwd(), "src", "data", "enquiries.json");
const TMP_FILE_PATH = path.join("/tmp", "enquiries.json");

const SEED_ENQUIRIES: Enquiry[] = [];

// Initialize Upstash Redis SDK client if env vars present
export function getRedisClient(): Redis | null {
  const url =
    process.env.KV_REST_API_URL ||
    process.env.UPSTASH_REDIS_REST_URL ||
    process.env.REDIS_REST_URL ||
    process.env.VERCEL_KV_REST_API_URL ||
    process.env.UPSTASH_REST_URL;

  const token =
    process.env.KV_REST_API_TOKEN ||
    process.env.UPSTASH_REDIS_REST_TOKEN ||
    process.env.REDIS_REST_TOKEN ||
    process.env.VERCEL_KV_REST_API_TOKEN ||
    process.env.UPSTASH_REST_TOKEN;

  if (url && token) {
    try {
      return new Redis({ url, token });
    } catch (err) {
      console.error("Redis init error:", err);
    }
  }
  return null;
}

export async function getEnquiries(): Promise<Enquiry[]> {
  const redis = getRedisClient();
  if (redis) {
    try {
      const data = await redis.get<Enquiry[] | string>("athreya_enquiries");
      if (data) {
        const parsed = typeof data === "string" ? JSON.parse(data) : data;
        if (Array.isArray(parsed)) return parsed;
      }
    } catch (e) {
      console.error("Redis SDK fetch error:", e);
    }
  }

  // Local filesystem fallback
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
  const redis = getRedisClient();
  if (redis) {
    try {
      await redis.set("athreya_enquiries", JSON.stringify(enquiries));
      return true;
    } catch (e) {
      console.error("Redis SDK save error:", e);
    }
  }

  // Local file system write
  try {
    const targetDir = path.dirname(DATA_FILE_PATH);
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
    }
    fs.writeFileSync(DATA_FILE_PATH, JSON.stringify(enquiries, null, 2), "utf-8");
    return true;
  } catch (err) {
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
