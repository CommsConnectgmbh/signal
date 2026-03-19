"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type LeaderboardEntry = {
  id: string;
  full_name: string;
  region: string;
  total_deals: number;
  total_commission: number;
};

const rankColors: Record<number, string> = {
  1: "text-[#D4A843]",
  2: "text-gray-300",
  3: "text-amber-600",
};

const rankBgColors: Record<number, string> = {
  1: "bg-[#D4A843]/10",
  2: "bg-gray-300/5",
  3: "bg-amber-600/5",
};

export default function LeaderboardPage() {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return;
      setCurrentUserId(user.id);

      // Try leaderboard view first, fall back to manual query
      const { data: leaderboardData, error: viewError } = await supabase
        .from("leaderboard")
        .select("*")
        .order("total_commission", { ascending: false });

      if (!viewError && leaderboardData) {
        setEntries(leaderboardData as LeaderboardEntry[]);
      } else {
        // Fallback: build from partners + deals + commissions
        const { data: partners } = await supabase
          .from("partners")
          .select("id, full_name, region")
          .eq("status", "active");

        if (partners) {
          const enriched: LeaderboardEntry[] = [];

          for (const partner of partners) {
            const { count: dealCount } = await supabase
              .from("deals")
              .select("*", { count: "exact", head: true })
              .eq("partner_id", partner.id)
              .eq("status", "abschluss");

            const { data: commissions } = await supabase
              .from("commissions")
              .select("amount")
              .eq("partner_id", partner.id);

            const totalCommission = (commissions || []).reduce(
              (sum, c) => sum + (c as { amount: number }).amount,
              0
            );

            enriched.push({
              id: partner.id,
              full_name: partner.full_name,
              region: partner.region,
              total_deals: dealCount || 0,
              total_commission: totalCommission,
            });
          }

          enriched.sort((a, b) => b.total_commission - a.total_commission);
          setEntries(enriched);
        }
      }

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

  return (
    <div>
      {/* Header */}
      <h1 className="text-2xl font-bold text-[#F1F5F9] mb-8">Leaderboard</h1>

      {/* Table */}
      <div className="bg-[#111D33] border border-[#1E293B] rounded-xl overflow-hidden">
        {entries.length === 0 ? (
          <div className="p-8 text-center text-[#64748B]">
            Noch keine Einträge
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-[#64748B] text-left border-b border-[#1E293B]">
                  <th className="px-6 py-4 font-medium w-16">Rang</th>
                  <th className="px-6 py-4 font-medium">Name</th>
                  <th className="px-6 py-4 font-medium">Region</th>
                  <th className="px-6 py-4 font-medium text-center">Deals</th>
                  <th className="px-6 py-4 font-medium text-right">
                    Provision
                  </th>
                </tr>
              </thead>
              <tbody>
                {entries.map((entry, index) => {
                  const rank = index + 1;
                  const isCurrentUser = entry.id === currentUserId;
                  const isTopThree = rank <= 3;

                  return (
                    <tr
                      key={entry.id}
                      className={`border-b border-[#1E293B]/50 last:border-0 transition-colors ${
                        isCurrentUser
                          ? "border border-[#D4A843]/30 bg-[#D4A843]/5"
                          : isTopThree
                          ? rankBgColors[rank]
                          : "hover:bg-[#0A1628]/50"
                      }`}
                    >
                      <td className="px-6 py-4">
                        <span
                          className={`font-bold text-lg ${
                            rankColors[rank] || "text-[#64748B]"
                          }`}
                        >
                          #{rank}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`font-medium ${
                            isTopThree
                              ? rankColors[rank]
                              : "text-[#F1F5F9]"
                          }`}
                        >
                          {entry.full_name}
                        </span>
                        {isCurrentUser && (
                          <span className="ml-2 text-xs text-[#D4A843] bg-[#D4A843]/10 px-2 py-0.5 rounded-full">
                            Du
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-[#94A3B8]">
                        {entry.region}
                      </td>
                      <td className="px-6 py-4 text-[#F1F5F9] text-center">
                        {entry.total_deals}
                      </td>
                      <td className="px-6 py-4 text-[#D4A843] font-medium text-right">
                        {formatCurrency(entry.total_commission)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
