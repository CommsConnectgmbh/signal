// Widerruf der Einwilligung in Produktinfos per Mail.
//
// Warum POST und nicht einfach ein Link, der direkt widerruft: Mailclients
// und Sicherheitsscanner (Outlook Safe Links, Virenfilter) rufen Links in
// Mails vorab auf. Ein Widerruf per GET waere damit ausgeloest, ohne dass
// der Empfaenger je geklickt hat. Deshalb zeigt /widerruf erst eine Seite
// mit Knopf, und erst der Knopf schickt diesen POST.
//
// Als Schluessel dient die UUID des Kontakts. Sie ist zufaellig und steht in
// keiner oeffentlichen Liste. Der schlimmste Missbrauch waere, jemanden
// fremden von Werbung abzumelden: kein Datenabfluss, keine Kosten.

import { NextResponse } from "next/server";

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export async function POST(request: Request) {
  let key = "";
  try {
    const body = (await request.json()) as { k?: unknown };
    key = typeof body.k === "string" ? body.k.trim() : "";
  } catch {
    return NextResponse.json({ error: "ungueltig" }, { status: 400 });
  }

  if (!UUID.test(key)) {
    return NextResponse.json({ error: "ungueltig" }, { status: 400 });
  }

  if (!process.env.SUPABASE_URL_CRM || !process.env.SUPABASE_SERVICE_ROLE_KEY_CRM) {
    // Ohne CRM-Zugang koennen wir den Widerruf nicht vermerken. Dann lieber
    // ehrlich scheitern, als dem Empfaenger Erfolg zu melden.
    return NextResponse.json({ error: "nicht verfuegbar" }, { status: 503 });
  }

  const { createClient } = await import("@supabase/supabase-js");
  const crm = createClient(
    process.env.SUPABASE_URL_CRM,
    process.env.SUPABASE_SERVICE_ROLE_KEY_CRM,
    { auth: { persistSession: false } }
  );

  const { error } = await crm
    .from("account_contacts")
    .update({
      marketing_optin: false,
      marketing_optin_widerruf_at: new Date().toISOString(),
    })
    .eq("id", key);

  if (error) {
    console.error("Widerruf nicht gespeichert", error);
    return NextResponse.json({ error: "fehlgeschlagen" }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
