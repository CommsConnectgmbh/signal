import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Partner = {
  id: string;
  full_name: string;
  email: string;
  phone: string | null;
  region: string;
  experience: string;
  status: "active" | "inactive" | "pending";
  team_leader_id: string | null;
  created_at: string;
};

export type Deal = {
  id: string;
  partner_id: string;
  company_name: string;
  contact_name: string | null;
  contact_email: string | null;
  contact_phone: string | null;
  product: "5g-koffer" | "company-phone" | "mobilfunk";
  status: "lead" | "kontakt" | "angebot" | "verhandlung" | "abschluss" | "verloren";
  value_monthly: number;
  value_onetime: number;
  notes: string | null;
  created_at: string;
  updated_at: string;
  closed_at: string | null;
};

export type Commission = {
  id: string;
  partner_id: string;
  deal_id: string | null;
  amount: number;
  type: "direct" | "recurring" | "team-bonus";
  status: "pending" | "approved" | "paid";
  period: string | null;
  created_at: string;
  paid_at: string | null;
};
