"use client";

import { useEffect, useState } from "react";
import { supabase, type Deal } from "@/lib/supabase";

const columns: { key: Deal["status"]; label: string; color: string }[] = [
  { key: "lead", label: "Lead", color: "bg-gray-500" },
  { key: "kontakt", label: "Kontakt", color: "bg-blue-500" },
  { key: "angebot", label: "Angebot", color: "bg-yellow-500" },
  { key: "verhandlung", label: "Verhandlung", color: "bg-orange-500" },
  { key: "abschluss", label: "Abschluss", color: "bg-green-500" },
  { key: "verloren", label: "Verloren", color: "bg-red-500" },
];

const productLabels: Record<string, string> = {
  "5g-koffer": "5G-Koffer",
  "company-phone": "Company Phone",
  mobilfunk: "Mobilfunk",
};

const emptyForm = {
  company_name: "",
  contact_name: "",
  contact_email: "",
  contact_phone: "",
  product: "mobilfunk" as Deal["product"],
  value_monthly: 0,
  value_onetime: 0,
  notes: "",
  status: "lead" as Deal["status"],
};

export default function PipelinePage() {
  const [deals, setDeals] = useState<Deal[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedDeal, setSelectedDeal] = useState<Deal | null>(null);
  const [formData, setFormData] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const fetchDeals = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return;

    const { data } = await supabase
      .from("deals")
      .select("*")
      .eq("partner_id", user.id)
      .order("created_at", { ascending: false });

    setDeals((data as Deal[]) || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchDeals();
  }, []);

  const openNewDeal = () => {
    setSelectedDeal(null);
    setFormData(emptyForm);
    setError("");
    setModalOpen(true);
  };

  const openEditDeal = (deal: Deal) => {
    setSelectedDeal(deal);
    setFormData({
      company_name: deal.company_name,
      contact_name: deal.contact_name || "",
      contact_email: deal.contact_email || "",
      contact_phone: deal.contact_phone || "",
      product: deal.product,
      value_monthly: deal.value_monthly,
      value_onetime: deal.value_onetime,
      notes: deal.notes || "",
      status: deal.status,
    });
    setError("");
    setModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError("");

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error("Nicht authentifiziert");

      if (selectedDeal) {
        // Update existing deal
        const updateData: Record<string, unknown> = {
          ...formData,
          updated_at: new Date().toISOString(),
        };

        if (
          formData.status === "abschluss" &&
          selectedDeal.status !== "abschluss"
        ) {
          updateData.closed_at = new Date().toISOString();
        }

        const { error: updateError } = await supabase
          .from("deals")
          .update(updateData)
          .eq("id", selectedDeal.id);

        if (updateError) throw updateError;
      } else {
        // Insert new deal
        const { error: insertError } = await supabase.from("deals").insert({
          partner_id: user.id,
          company_name: formData.company_name,
          contact_name: formData.contact_name || null,
          contact_email: formData.contact_email || null,
          contact_phone: formData.contact_phone || null,
          product: formData.product,
          status: formData.status,
          value_monthly: formData.value_monthly,
          value_onetime: formData.value_onetime,
          notes: formData.notes || null,
        });

        if (insertError) throw insertError;
      }

      setModalOpen(false);
      await fetchDeals();
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Fehler beim Speichern";
      setError(message);
    } finally {
      setSaving(false);
    }
  };

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat("de-DE", {
      style: "currency",
      currency: "EUR",
    }).format(value);

  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString("de-DE");

  const inputClasses =
    "w-full bg-[#111D33] border border-[#1E293B] text-[#F1F5F9] placeholder-[#64748B] rounded-lg px-4 py-3 focus:border-[#D4A843] focus:outline-none transition-colors";

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-[#D4A843] text-lg">Laden...</div>
      </div>
    );
  }

  const groupedDeals = columns.map((col) => ({
    ...col,
    deals: deals.filter((d) => d.status === col.key),
  }));

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-[#F1F5F9]">Pipeline</h1>
        <button
          onClick={openNewDeal}
          className="px-5 py-2.5 rounded-lg font-semibold text-[#050A14] bg-gradient-to-r from-[#D4A843] to-[#B8922E] hover:from-[#E0B84D] hover:to-[#D4A843] transition-all text-sm"
        >
          + Neuer Deal
        </button>
      </div>

      {/* Kanban Board */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {groupedDeals.map((column) => (
          <div key={column.key} className="min-w-0">
            {/* Column Header */}
            <div className="flex items-center gap-2 mb-3">
              <div className={`w-2 h-2 rounded-full ${column.color}`} />
              <h3 className="text-[#F1F5F9] text-sm font-medium">
                {column.label}
              </h3>
              <span className="text-[#64748B] text-xs bg-[#111D33] px-2 py-0.5 rounded-full">
                {column.deals.length}
              </span>
            </div>

            {/* Deal Cards */}
            <div className="space-y-2 max-h-[calc(100vh-16rem)] overflow-y-auto pr-1">
              {column.deals.length === 0 ? (
                <div className="text-[#64748B] text-xs text-center py-8 bg-[#111D33]/50 rounded-lg border border-dashed border-[#1E293B]">
                  Keine Deals
                </div>
              ) : (
                column.deals.map((deal) => (
                  <button
                    key={deal.id}
                    onClick={() => openEditDeal(deal)}
                    className="w-full text-left bg-[#111D33] border border-[#1E293B] rounded-lg p-4 hover:border-[#D4A843]/30 transition-colors"
                  >
                    <div className="text-[#F1F5F9] text-sm font-medium mb-2 truncate">
                      {deal.company_name}
                    </div>
                    <span className="text-[#94A3B8] text-xs bg-[#0A1628] px-2 py-0.5 rounded inline-block mb-2">
                      {productLabels[deal.product]}
                    </span>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-[#D4A843]">
                        {formatCurrency(deal.value_monthly + deal.value_onetime)}
                      </span>
                      <span className="text-[#64748B]">
                        {formatDate(deal.created_at)}
                      </span>
                    </div>
                  </button>
                ))
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-[#0A1628] border border-[#1E293B] rounded-xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <h2 className="text-lg font-semibold text-[#F1F5F9] mb-6">
              {selectedDeal ? "Deal bearbeiten" : "Neuer Deal"}
            </h2>

            {error && (
              <div className="mb-4 p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-[#94A3B8] text-sm mb-2">
                  Firma *
                </label>
                <input
                  type="text"
                  value={formData.company_name}
                  onChange={(e) =>
                    setFormData({ ...formData, company_name: e.target.value })
                  }
                  required
                  placeholder="Firmenname"
                  className={inputClasses}
                />
              </div>

              <div>
                <label className="block text-[#94A3B8] text-sm mb-2">
                  Kontaktperson
                </label>
                <input
                  type="text"
                  value={formData.contact_name}
                  onChange={(e) =>
                    setFormData({ ...formData, contact_name: e.target.value })
                  }
                  placeholder="Name des Ansprechpartners"
                  className={inputClasses}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#94A3B8] text-sm mb-2">
                    E-Mail
                  </label>
                  <input
                    type="email"
                    value={formData.contact_email}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        contact_email: e.target.value,
                      })
                    }
                    placeholder="email@firma.de"
                    className={inputClasses}
                  />
                </div>
                <div>
                  <label className="block text-[#94A3B8] text-sm mb-2">
                    Telefon
                  </label>
                  <input
                    type="tel"
                    value={formData.contact_phone}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        contact_phone: e.target.value,
                      })
                    }
                    placeholder="+49..."
                    className={inputClasses}
                  />
                </div>
              </div>

              <div>
                <label className="block text-[#94A3B8] text-sm mb-2">
                  Produkt *
                </label>
                <select
                  value={formData.product}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      product: e.target.value as Deal["product"],
                    })
                  }
                  required
                  className={inputClasses}
                >
                  <option value="mobilfunk">Mobilfunk</option>
                  <option value="5g-koffer">5G-Koffer</option>
                  <option value="company-phone">Company Phone</option>
                </select>
              </div>

              {selectedDeal && (
                <div>
                  <label className="block text-[#94A3B8] text-sm mb-2">
                    Status
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        status: e.target.value as Deal["status"],
                      })
                    }
                    className={inputClasses}
                  >
                    <option value="lead">Lead</option>
                    <option value="kontakt">Kontakt</option>
                    <option value="angebot">Angebot</option>
                    <option value="verhandlung">Verhandlung</option>
                    <option value="abschluss">Abschluss</option>
                    <option value="verloren">Verloren</option>
                  </select>
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#94A3B8] text-sm mb-2">
                    Monatlicher Wert
                  </label>
                  <input
                    type="number"
                    value={formData.value_monthly}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        value_monthly: parseFloat(e.target.value) || 0,
                      })
                    }
                    min={0}
                    step={0.01}
                    className={inputClasses}
                  />
                </div>
                <div>
                  <label className="block text-[#94A3B8] text-sm mb-2">
                    Einmaliger Wert
                  </label>
                  <input
                    type="number"
                    value={formData.value_onetime}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        value_onetime: parseFloat(e.target.value) || 0,
                      })
                    }
                    min={0}
                    step={0.01}
                    className={inputClasses}
                  />
                </div>
              </div>

              <div>
                <label className="block text-[#94A3B8] text-sm mb-2">
                  Notizen
                </label>
                <textarea
                  value={formData.notes}
                  onChange={(e) =>
                    setFormData({ ...formData, notes: e.target.value })
                  }
                  rows={3}
                  placeholder="Zusätzliche Informationen..."
                  className={`${inputClasses} resize-none`}
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="submit"
                  disabled={saving}
                  className="flex-1 py-3 rounded-lg font-semibold text-[#050A14] bg-gradient-to-r from-[#D4A843] to-[#B8922E] hover:from-[#E0B84D] hover:to-[#D4A843] transition-all disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                >
                  {saving ? "Speichern..." : "Speichern"}
                </button>
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-6 py-3 rounded-lg font-medium text-[#94A3B8] border border-[#1E293B] hover:bg-[#111D33] transition-colors text-sm"
                >
                  Abbrechen
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
