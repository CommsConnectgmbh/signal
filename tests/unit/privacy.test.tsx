import { describe, expect, it } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";

import { DseMessung, DseZweckSatz } from "@/components/DseMessung";
import type { WerbeIds } from "@/lib/consent/ids";

function text(ids: WerbeIds) {
  return renderToStaticMarkup(
    <>
      <DseZweckSatz ids={ids} />
      <DseMessung ids={ids} />
    </>,
  );
}

const OHNE_DRITTE = "Analyse-, Tracking- oder Marketing-Dienste von Drittanbietern und Tracking-Cookies setzt diese Website nicht ein.";

describe("Datenschutzerklaerung", () => {
  it("ohne IDs: Reichweitenmessung ja, keine Dienste, Aussage stimmt", () => {
    const t = text({});
    expect(t).toContain("Serverseitige Reichweitenmessung");
    expect(t).toContain("Die Daten werden nach 25 Monaten gelöscht.");
    expect(t).toContain("im Auftrag der Comms Connect GmbH");
    expect(t).toContain(OHNE_DRITTE);
    for (const s of ["cc_consent", "Google Analytics", "Meta Pixel", "LinkedIn Insight", "Google Ads"]) {
      expect(t).not.toContain(s);
    }
  });

  it("mit GA4: Einwilligungsverwaltung und GA4, sonst nichts", () => {
    const t = text({ ga4: "G-TEST000000" });
    expect(t).toContain("cc_consent");
    expect(t).toContain("Google Analytics 4");
    expect(t).not.toContain(OHNE_DRITTE);
    expect(t).toContain("nur mit Ihrer Einwilligung");
    expect(t).not.toContain("Meta Pixel");
    expect(t).not.toContain("Google Ads Conversion");
  });

  it("mit allen IDs: alle Abschnitte", () => {
    const t = text({ ga4: "G-TEST000000", gads: "AW-1234567890", metaPixel: "1234567890123", linkedin: "1234567" });
    for (const s of ["Google Analytics 4", "Google Ads Conversion-Tracking", "Meta Pixel", "LinkedIn Insight Tag", "Art. 26 DSGVO", "die Comms Connect GmbH und Meta Platforms Ireland Limited"]) {
      expect(t).toContain(s);
    }
  });

  it("keine Gedankenstriche im sichtbaren Text", () => {
    expect(text({ ga4: "G-TEST000000", gads: "AW-1234567890", metaPixel: "1234567890123", linkedin: "1234567" })).not.toContain("—");
  });
});
