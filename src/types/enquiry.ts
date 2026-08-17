export type EnquiryStatus =
  | "New"
  | "In Contact"
  | "Consultation Scheduled"
  | "Proposal Sent"
  | "Completed"
  | "Archived";

export interface Enquiry {
  id: string;
  name: string;
  phone: string;
  email: string;
  projectType: string;
  location: string;
  message: string;
  status: EnquiryStatus;
  adminNotes?: string;
  flagged?: boolean;
  createdAt: string; // ISO string
}

export interface EnquiryStats {
  total: number;
  newCount: number;
  inContactCount: number;
  scheduledCount: number;
  proposalCount: number;
  completedCount: number;
  archivedCount: number;
  byProjectType: Record<string, number>;
  byLocation: Record<string, number>;
}
