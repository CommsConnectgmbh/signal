"use client";

import { useEffect, useState } from "react";
import { supabase, type Commission } from "@/lib/supabase";

const typeColors: Record<string, string> = {
  direct: "bg-blue-500/20 text-blue-400",
  recurring: "bg-green-500/20 text-green-400",
  "team-bonus": "bg-[#D4A843]/20 text-[#D4A843]",
};

const typeLabels: Record<string, string> = {
  direct: "Direkt",
  recurring: "Wiederkehrend",
  "team-bonus": "Team-Bonus",
};

const statusColors: Record<string, string> = {
  pending: "bg-yellow-500/20 text-yellow-400",
  approved: "bg-blue-500/20 text-blue-400",
  paid: "bg-green-500/20 text-green-400",
};

const statusLabels: Record<string, string> = {
  pending: "Ausstehend",
  approved: "Genehmigt",
  paid: "Ausgezahlt",
};

type CommissionWithDeal = Commission & { deal?: { company_name: string } | null };

export default function ProvisionenPage() {
  const [commissions, setCommissions] = useState<CommissionWithDeal[]>([]);
  const [loading, setLoading] = useState(true);

  const [pendingTotal, setPendingTotal] = useState(0);
  const [approvedTotal, setApprovedTotal] = useState(0);
  const [paidTotal, setPaidTotal] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return;

      const { data } = await supabase
        .from("commissions")
        .select("*, deal:deals(company_name)")
        .eq("partner_id", user.id)
        .order("created_at", { ascending: false });

      const all = (data as CommissionWithDeal[]) || [];

      setCommissions(all);

      setPendingTotal(
        all
          .filter((c) => c.status === "pending")
          .reduce((sum, c) => sum + c.amount, 0)
      );
      setApprovedTotal(
        all
          .filter((c) => c.status === "approved")
          .reduce((sum, c) => sum + c.amount, 0)
      );
      setPaidTotal(
        all
          .filter((c) => c.status === "paid")
          .reduce((sum, c) => sum + c.amount, 0)
      );

      setLoading(false);
    };

    fetchData();
  }, []);

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat("de-DE", {
      style: "currency",
      currency: "EUR",
    }).format(value);

  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString("de-DE");

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-[#D4A843] text-lg">Laden...</div>
      </div>
    );
  }

  const summaryCards = [
    { label: "Ausstehend", value: pendingTotal, color: "text-yellow-400" },
    { label: "Genehmigt", value: approvedTotal, color: "text-blue-400" },
    { label: "Ausgezahlt", value: paidTotal, color: "text-green-400" },
  ];

  return (
    <div>
      {/* Header */}
      <h1 className="text-2xl font-bold text-[#F1F5F9] mb-8">Provisionen</h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        {summaryCards.map((card) => (
          <div
            key={card.label}
            className="bg-[#111D33] border border-[#1E293B] rounded-xl p-6"
          >
            <div className={`text-2xl font-bold mb-1 ${card.color}`}>
              {formatCurrency(card.value)}
            </div>
            <div className="text-[#94A3B8] text-sm">{card.label}</div>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="bg-[#111D33] border border-[#1E293B] rounded-xl overflow-hidden">
        {commissions.length === 0 ? (
          <div className="p-8 text-center text-[#64748B]">
            Noch keine Provisionen
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-[#64748B] text-left border-b border-[#1E293B]">
                  <th className="px-6 py-4 font-medium">Datum</th>
                  <th className="px-6 py-4 font-medium">Deal</th>
                  <th className="px-6 py-4 font-medium">Betrag</th>
                  <th className="px-6 py-4 font-medium">Typ</th>
                  <th className="px-6 py-4 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {commissions.map((commission) => (
                  <tr
                    key={commission.id}
                    className="border-b border-[#1E293B]/50 last:border-0 hover:bg-[#0A1628]/50"
                  >
                    <td className="px-6 py-4 text-[#94A3B8]">
                      {formatDate(commission.created_at)}
                    </td>
                    <td className="px-6 py-4 text-[#F1F5F9]">
                      {commission.deal?.company_name || "–"}
                    </td>
                    <td className="px-6 py-4 text-[#D4A843] font-medium">
                      {formatCurrency(commission.amount)}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`text-xs px-2 py-1 rounded-full ${
                          typeColors[commission.type]
                        }`}
                      >
                        {typeLabels[commission.type]}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`text-xs px-2 py-1 rounded-full ${
                          statusColors[commission.status]
                        }`}
                      >
                        {statusLabels[commission.status]}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
