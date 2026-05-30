import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt =
  "Smart Signals — Konnektivität, Mobilität & Mitarbeiter-Benefits für den Mittelstand";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OG() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background:
            "radial-gradient(900px 700px at 82% -12%, rgba(45,127,249,0.16), transparent 60%), radial-gradient(700px 520px at -8% 92%, rgba(240,138,58,0.14), transparent 60%), #FFFFFF",
          color: "#0F172A",
          padding: "72px 88px",
          fontFamily: "Inter, system-ui, sans-serif",
        }}
      >
        {/* Top row */}
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
                background: "linear-gradient(135deg, #2D7FF9 0%, #5B9DFB 100%)",
                color: "#FFFFFF",
                fontWeight: 700,
                fontSize: 24,
              }}
            >
              S
            </div>
            <div
              style={{ fontSize: 24, fontWeight: 700, letterSpacing: "-0.01em" }}
            >
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
              background: "rgba(45,127,249,0.08)",
              boxShadow: "inset 0 0 0 1px rgba(45,127,249,0.30)",
              color: "#2D7FF9",
              fontSize: 18,
              fontWeight: 600,
            }}
          >
            <div
              style={{
                width: 10,
                height: 10,
                borderRadius: 5,
                background: "#16A34A",
              }}
            />
            B2B · Mittelstand
          </div>
        </div>

        {/* Headline */}
        <div
          style={{ display: "flex", flexDirection: "column", marginTop: 86 }}
        >
          <div
            style={{
              fontSize: 76,
              lineHeight: 1.05,
              letterSpacing: "-0.03em",
              fontWeight: 800,
              maxWidth: 1000,
              display: "flex",
            }}
          >
            Klare Signale aus Ihrem Telco-Stack.
          </div>
          <div
            style={{
              marginTop: 22,
              fontSize: 32,
              lineHeight: 1.3,
              color: "#475569",
              maxWidth: 940,
              display: "flex",
            }}
          >
            Mobilfunk, 5G-Konnektivität und Mitarbeiter-Benefits – neutral,
            gebündelt, ausgelagert.
          </div>
        </div>

        {/* Bottom row */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: "auto",
            paddingTop: 30,
            borderTop: "1px solid #E2E8F0",
            fontSize: 20,
            color: "#475569",
          }}
        >
          <div style={{ display: "flex", gap: 24 }}>
            <span>Mitarbeiter-Benefits</span>
            <span style={{ color: "#CBD5E1" }}>·</span>
            <span>Mobilfunkkosten</span>
            <span style={{ color: "#CBD5E1" }}>·</span>
            <span>5G Koffer</span>
          </div>
          <div style={{ color: "#2D7FF9", fontWeight: 600 }}>
            smart-signals.de
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
