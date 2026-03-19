"use client";

import { useState, useMemo } from "react";

const steuerklassen = [
  { label: "I", rate: 0.19 },
  { label: "III", rate: 0.15 },
  { label: "V", rate: 0.25 },
];

const device = {
  name: "Apple iPhone 17, 256 GB",
  price: 922,
  months: 24,
};

export default function VorteilsRechner() {
  const [gehalt, setGehalt] = useState(3500);
  const [activeKlasse, setActiveKlasse] = useState(0);

  const results = useMemo(() => {
    const taxRate = steuerklassen[activeKlasse].rate;
    const monthlyRate = device.price / device.months;
    const taxBenefit = monthlyRate * taxRate;
    const netBelastung = monthlyRate - taxBenefit;
    const totalSavings = taxBenefit * device.months;

    return {
      taxRate: Math.round(taxRate * 100),
      ersparnis: totalSavings.toFixed(2),
      netBelastung: netBelastung.toFixed(2),
      monthlyRate: monthlyRate.toFixed(2),
    };
  }, [gehalt, activeKlasse]);

  return (
    <section id="rechner" className="bg-[#0A1628] py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-[#F1F5F9] md:text-5xl">
            Wie viel spart Ihr Mitarbeiter?
          </h2>
          <p className="mt-4 text-lg text-[#94A3B8]">
            Einfach Gehalt und Steuerklasse einstellen – das Ergebnis sehen Sie
            sofort.
          </p>
        </div>

        {/* Calculator card */}
        <div className="mx-auto mt-16 max-w-3xl rounded-2xl border border-[#1E293B] bg-[#050A14] p-8 shadow-sm md:p-12">
          {/* Gehalt slider */}
          <div>
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-[#F1F5F9]">
                Monatliches Bruttogehalt
              </label>
              <span className="text-lg font-semibold text-[#D4A843]">
                {gehalt.toLocaleString("de-DE")} €
              </span>
            </div>
            <input
              type="range"
              min={1500}
              max={10000}
              step={100}
              value={gehalt}
              onChange={(e) => setGehalt(Number(e.target.value))}
              className="mt-4 h-2 w-full cursor-pointer appearance-none rounded-full bg-[#1E293B] accent-[#D4A843] [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#D4A843]"
            />
            <div className="mt-1 flex justify-between text-xs text-[#64748B]">
              <span>1.500 €</span>
              <span>10.000 €</span>
            </div>
          </div>

          {/* Steuerklasse */}
          <div className="mt-8">
            <label className="text-sm font-medium text-[#F1F5F9]">
              Steuerklasse
            </label>
            <div className="mt-3 flex gap-3">
              {steuerklassen.map((sk, i) => (
                <button
                  key={sk.label}
                  onClick={() => setActiveKlasse(i)}
                  className={`rounded-xl px-6 py-3 text-sm font-medium transition-all duration-200 ${
                    activeKlasse === i
                      ? "bg-gradient-to-r from-[#D4A843] to-[#F59E0B] text-white shadow-md"
                      : "bg-[#0A1628] text-[#94A3B8] hover:bg-[#1E293B]"
                  }`}
                >
                  Klasse {sk.label}
                </button>
              ))}
            </div>
          </div>

          {/* Device info */}
          <div className="mt-8 rounded-xl bg-[#0A1628] p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-[#64748B]">
                  Gewähltes Gerät
                </p>
                <p className="mt-1 text-base font-semibold text-[#F1F5F9]">
                  {device.name}
                </p>
              </div>
              <p className="text-lg font-semibold text-[#F1F5F9]">
                {device.price.toLocaleString("de-DE")} €
              </p>
            </div>
          </div>

          {/* Results */}
          <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
            <div className="rounded-xl bg-[#0A1628] p-5">
              <p className="text-xs font-medium text-[#64748B]">
                Gesch. Steuersatz
              </p>
              <p className="mt-2 text-2xl font-bold text-[#F1F5F9]">
                {results.taxRate}%
              </p>
            </div>
            <div className="rounded-xl bg-[#0A1628] p-5">
              <p className="text-xs font-medium text-[#64748B]">
                Ersparnis gg. Privatkauf
              </p>
              <p className="mt-2 text-2xl font-bold text-[#D4A843]">
                {results.ersparnis} €
              </p>
            </div>
            <div className="rounded-xl bg-[#0A1628] p-5">
              <p className="text-xs font-medium text-[#64748B]">
                Nettobelastung / Monat
              </p>
              <p className="mt-2 text-2xl font-bold text-[#F1F5F9]">
                {results.netBelastung} €
              </p>
            </div>
            <div className="rounded-xl bg-[#0A1628] p-5">
              <p className="text-xs font-medium text-[#64748B]">
                Mehrkosten Arbeitgeber
              </p>
              <p className="mt-2 text-2xl font-bold text-[#F1F5F9]">0,00 €</p>
            </div>
          </div>

          {/* Disclaimer */}
          <p className="mt-8 text-center text-xs text-[#64748B]">
            Diese Berechnung dient der Veranschaulichung.
          </p>
        </div>
      </div>
    </section>
  );
}
