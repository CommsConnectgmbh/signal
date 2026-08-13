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

/**
 * Produkte, die im Partner-Portal auf einen Deal gebucht werden können.
 * Muss zum CHECK-Constraint auf public.deals passen
 * (supabase/migrations/20260813000001_deals_product_smart_signals_portfolio.sql).
 */
export const DEAL_PRODUKTE = [
  "belegify",
  "obacht",
  "obacht-talents",
  "conduit",
  "simvi",
  "swing-and-savor",
  "dealbuddy",
  "mitarbeitervorteile",
  "sonstiges",
] as const;

/** Werte aus der Telko-Phase. Nur noch lesend, nicht mehr auswählbar. */
export const DEAL_PRODUKTE_LEGACY = [
  "5g-koffer",
  "company-phone",
  "mobilfunk",
] as const;

export type DealProduct =
  | (typeof DEAL_PRODUKTE)[number]
  | (typeof DEAL_PRODUKTE_LEGACY)[number];

export const DEAL_PRODUKT_LABELS: Record<DealProduct, string> = {
  belegify: "Belegify",
  obacht: "Obacht",
  "obacht-talents": "Obacht Talents",
  conduit: "Conduit",
  simvi: "Simvi",
  "swing-and-savor": "Swing & Savor",
  dealbuddy: "DealBuddy",
  mitarbeitervorteile: "Mitarbeitervorteile",
  sonstiges: "Sonstiges",
  "5g-koffer": "5G-Koffer (Bestand)",
  "company-phone": "Company Phone (Bestand)",
  mobilfunk: "Mobilfunk (Bestand)",
};

export type Deal = {
  id: string;
  partner_id: string;
  company_name: string;
  contact_name: string | null;
  contact_email: string | null;
  contact_phone: string | null;
  product: DealProduct;
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
