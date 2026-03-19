"use client";

import { useEffect, useState } from "react";
import { supabase, type Deal, type Commission } from "@/lib/supabase";

const statusColors: Record<string, string> = {
  lead: "bg-gray-500/20 text-gray-400",
  kontakt: "bg-blue-500/20 text-blue-400",
  angebot: "bg-yellow-500/20 text-yellow-400",
  verhandlung: "bg-orange-500/20 text-orange-400",
  abschluss: "bg-green-500/20 text-green-400",
  verloren: "bg-red-500/20 text-red-400",
};

const statusLabels: Record<string, string> = {
  lead: "Lead",
  kontakt: "Kontakt",
  angebot: "Angebot",
  verhandlung: "Verhandlung",
  abschluss: "Abschluss",
  verloren: "Verloren",
};

const commissionStatusColors: Record<string, string> = {
  pending: "bg-yellow-500/20 text-yellow-400",
  approved: "bg-blue-500/20 text-blue-400",
  paid: "bg-green-500/20 text-green-400",
};

const commissionStatusLabels: Record<string, string> = {
  pending: "Ausstehend",
  approved: "Genehmigt",
  paid: "Ausgezahlt",
};

const commissionTypeLabels: Record<string, string> = {
  direct: "Direkt",
  recurring: "Wiederkehrend",
  "team-bonus": "Team-Bonus",
};

export default function DashboardPage() {
  const [userName, setUserName] = useState("");
  const [openDeals, setOpenDeals] = useState(0);
  const [closedDeals, setClosedDeals] = useState(0);
  const [monthlyCommission, setMonthlyCommission] = useState(0);
  const [totalCommission, setTotalCommission] = useState(0);
  const [recentDeals, setRecentDeals] = useState<Deal[]>([]);
  const [recentCommissions, setRecentCommissions] = useState<Commission[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return;

      // Get partner name
      const { data: partner } = await supabase
        .from("partners")
        .select("full_name")
        .eq("id", user.id)
        .single();

      setUserName(
        partner?.full_name ||
          user.user_metadata?.full_name ||
          "Partner"
      );

      // Fetch deals
      const { data: deals } = await supabase
        .from("deals")
        .select("*")
        .eq("partner_id", user.id)
        .order("created_at", { ascending: false });

      const allDeals = (deals as Deal[]) || [];

      setOpenDeals(
        allDeals.filter(
          (d) => d.status !== "abschluss" && d.status !== "verloren"
        ).length
      );
      setClosedDeals(
        allDeals.filter((d) => d.status === "abschluss").length
      );
      setRecentDeals(allDeals.slice(0, 5));

      // Fetch commissions
      const { data: commissions } = await supabase
        .from("commissions")
        .select("*")
        .eq("partner_id", user.id)
        .order("created_at", { ascending: false });

      const allCommissions = (commissions as Commission[]) || [];

      // Current month
      const now = new Date();
      const currentMonth = now.getMonth();
      const currentYear = now.getFullYear();

      setMonthlyCommission(
        allCommissions
          .filter((c) => {
            const d = new Date(c.created_at);
            return d.getMonth() === currentMonth && d.getFullYear() === currentYear;
          })
          .reduce((sum, c) => sum + c.amount, 0)
      );

      setTotalCommission(
        allCommissions.reduce((sum, c) => sum + c.amount, 0)
      );

      setRecentCommissions(allCommissions.slice(0, 5));
      setLoading(false);
    };

    fetchData();
  }, []);

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat("de-DE", {
      style: "currency",
      currency: "EUR",
    }).format(value);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-[#D4A843] text-lg">Laden...</div>
      </div>
    );
  }

  const kpis = [
    { label: "Offene Deals", value: openDeals.toString() },
    { label: "Abschlüsse", value: closedDeals.toString() },
    { label: "Provision (Monat)", value: formatCurrency(monthlyCommission) },
    { label: "Provision (Gesamt)", value: formatCurrency(totalCommission) },
  ];

  return (
    <div>
      {/* Greeting */}
      <h1 className="text-2xl font-bold text-[#F1F5F9] mb-8">
        Willkommen zurück, {userName}
      </h1>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {kpis.map((kpi) => (
          <div
            key={kpi.label}
            className="bg-[#111D33] border border-[#1E293B] rounded-xl p-6"
          >
            <div className="text-2xl font-bold text-[#D4A843] mb-1">
              {kpi.value}
            </div>
            <div className="text-[#94A3B8] text-sm">{kpi.label}</div>
          </div>
        ))}
      </div>

      {/* Two Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Deals */}
        <div className="bg-[#111D33] border border-[#1E293B] rounded-xl p-6">
          <h2 className="text-lg font-semibold text-[#F1F5F9] mb-4">
            Letzte Deals
          </h2>
          {recentDeals.length === 0 ? (
            <p className="text-[#64748B] text-sm">Noch keine Deals</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-[#64748B] text-left border-b border-[#1E293B]">
                    <th className="pb-2 font-medium">Firma</th>
                    <th className="pb-2 font-medium">Produkt</th>
                    <th className="pb-2 font-medium">Status</th>
                    <th className="pb-2 font-medium text-right">Wert</th>
                  </tr>
                </thead>
                <tbody>
                  {recentDeals.map((deal) => (
                    <tr
                      key={deal.id}
                      className="border-b border-[#1E293B]/50 last:border-0"
                    >
                      <td className="py-3 text-[#F1F5F9]">
                        {deal.company_name}
                      </td>
                      <td className="py-3">
                        <span className="text-[#94A3B8] text-xs bg-[#0A1628] px-2 py-1 rounded">
                          {deal.product}
                        </span>
                      </td>
                      <td className="py-3">
                        <span
                          className={`text-xs px-2 py-1 rounded-full ${
                            statusColors[deal.status]
                          }`}
                        >
                          {statusLabels[deal.status]}
                        </span>
                      </td>
                      <td className="py-3 text-[#F1F5F9] text-right">
                        {formatCurrency(deal.value_monthly + deal.value_onetime)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Recent Commissions */}
        <div className="bg-[#111D33] border border-[#1E293B] rounded-xl p-6">
          <h2 className="text-lg font-semibold text-[#F1F5F9] mb-4">
            Letzte Provisionen
          </h2>
          {recentCommissions.length === 0 ? (
            <p className="text-[#64748B] text-sm">Noch keine Provisionen</p>
          ) : (
            <div className="space-y-3">
              {recentCommissions.map((commission) => (
                <div
                  key={commission.id}
                  className="flex items-center justify-between py-3 border-b border-[#1E293B]/50 last:border-0"
                >
                  <div>
                    <div className="text-[#F1F5F9] font-medium">
                      {formatCurrency(commission.amount)}
                    </div>
                    <div className="text-[#64748B] text-xs mt-1">
                      {commissionTypeLabels[commission.type]}
                    </div>
                  </div>
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      commissionStatusColors[commission.status]
                    }`}
                  >
                    {commissionStatusLabels[commission.status]}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
