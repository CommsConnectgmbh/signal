import { ImageResponse } from "next/og";
import { produkte, produkteBetrieb } from "@/lib/produkte";

export const runtime = "edge";
export const alt =
  "Smart Signals: Software für Betriebe, die keine Zeit für Software haben";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Hex statt Design-Token: Satori rendert ausserhalb des CSS-Kontexts und kennt
// keine Custom Properties (siehe DESIGN.md Paragraph 2, dokumentierte Ausnahme).
const BRAND = "#2D7FF9";
const TEXT = "#0F172A";
const MUTED = "#475569";
const BORDER = "#E2E8F0";

export default async function OG() {
  const live = produkte.filter((p) => p.status === "live").length;
  const betrieb = produkteBetrieb.map((p) => p.name).join("  ·  ");

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background: "#FFFFFF",
          color: TEXT,
          padding: "64px 80px",
          fontFamily: "Inter, system-ui, sans-serif",
        }}
      >
        {/* Kopfzeile */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 44,
                height: 44,
                borderRadius: 12,
                background: BRAND,
                color: "#FFFFFF",
                fontWeight: 700,
                fontSize: 24,
              }}
            >
              S
            </div>
            <div style={{ fontSize: 24, fontWeight: 700, letterSpacing: "-0.01em" }}>
              Smart Signals
            </div>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              padding: "10px 18px",
              borderRadius: 999,
              background: "#EFF6FF",
              boxShadow: `inset 0 0 0 1px ${BORDER}`,
              color: BRAND,
              fontSize: 18,
              fontWeight: 600,
            }}
          >
            <div style={{ width: 10, height: 10, borderRadius: 5, background: "#16A34A" }} />
            {live} Produkte live
          </div>
        </div>

        {/* Aussage */}
        <div style={{ display: "flex", flexDirection: "column", marginTop: 52 }}>
          <div
            style={{
              fontSize: 64,
              lineHeight: 1.06,
              letterSpacing: "-0.03em",
              fontWeight: 800,
              maxWidth: 1000,
              display: "flex",
            }}
          >
            Software für Betriebe, die keine Zeit für Software haben.
          </div>
          <div
            style={{
              marginTop: 22,
              fontSize: 28,
              lineHeight: 1.35,
              color: MUTED,
              maxWidth: 960,
              display: "flex",
            }}
          >
            Buchhaltung, Personaleinsatz, Personalvermittlung. Selbst entwickelt,
            einzeln buchbar, ein Ansprechpartner.
          </div>
        </div>

        {/* Fusszeile: Produktnamen aus produkte.ts, damit sie nicht veralten */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: "auto",
            paddingTop: 28,
            borderTop: `1px solid ${BORDER}`,
            fontSize: 20,
            color: MUTED,
          }}
        >
          <div style={{ display: "flex" }}>{betrieb}</div>
          <div style={{ color: BRAND, fontWeight: 600 }}>smart-signals.de</div>
        </div>
      </div>
    ),
    { ...size }
  );
}
