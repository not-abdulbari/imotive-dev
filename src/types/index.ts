export interface User {
  id: string;
  email: string;
  name?: string;
  avatar_url?: string;
  created_at: string;
}

export interface Project {
  id: string;
  name: string;
  description?: string;
  status: "active" | "archived" | "completed";
  created_at: string;
  updated_at: string;
}

export interface Metric {
  label: string;
  value: number;
  change: number; // percentage
  trend: "up" | "down" | "neutral";
}

export interface Course {
  id: string;
  title: string;
  progress: number;
  icon_name: string | null;
  created_at: string;
}
