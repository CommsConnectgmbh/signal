"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function LoginPage() {
  const router = useRouter();
  const [tab, setTab] = useState<"login" | "register">("login");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Login fields
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Register fields
  const [regName, setRegName] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [regExperience, setRegExperience] = useState("");
  const [regRegion, setRegRegion] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const { error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (authError) throw authError;
      router.push("/portal");
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Anmeldung fehlgeschlagen";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const { data, error: signUpError } = await supabase.auth.signUp({
        email: regEmail,
        password: regPassword,
        options: {
          data: { full_name: regName, region: regRegion, experience: regExperience },
          emailRedirectTo: `${window.location.origin}/portal`,
        },
      });

      if (signUpError) throw signUpError;

      // Partner profile is auto-created by DB trigger
      // Update with extra fields
      if (data.user) {
        await supabase
          .from("partners")
          .update({ region: regRegion, experience: regExperience, status: "pending" })
          .eq("id", data.user.id);
      }

      // Check if email confirmation is needed
      if (data.session) {
        router.push("/portal");
      } else {
        setError("Bitte bestätige deine E-Mail-Adresse. Wir haben dir einen Link gesendet.");
      }
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Registrierung fehlgeschlagen";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const inputClasses =
    "w-full bg-[#111D33] border border-[#1E293B] text-[#F1F5F9] placeholder-[#64748B] rounded-lg px-4 py-3 focus:border-[#D4A843] focus:outline-none transition-colors";

  return (
    <div className="min-h-screen bg-[#050A14] flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-[#0A1628] border border-[#1E293B] rounded-xl p-8">
        {/* Logo */}
        <img
          src="/logo.png"
          className="h-10 brightness-0 invert mx-auto mb-8"
          alt="Smart Signals"
        />

        {/* Tab Switcher */}
        <div className="flex mb-8 border-b border-[#1E293B]">
          <button
            onClick={() => {
              setTab("login");
              setError("");
            }}
            className={`flex-1 pb-3 text-sm font-medium transition-colors ${
              tab === "login"
                ? "text-[#D4A843] border-b-2 border-[#D4A843]"
                : "text-[#64748B] hover:text-[#94A3B8]"
            }`}
          >
            Anmelden
          </button>
          <button
            onClick={() => {
              setTab("register");
              setError("");
            }}
            className={`flex-1 pb-3 text-sm font-medium transition-colors ${
              tab === "register"
                ? "text-[#D4A843] border-b-2 border-[#D4A843]"
                : "text-[#64748B] hover:text-[#94A3B8]"
            }`}
          >
            Registrieren
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm">
            {error}
          </div>
        )}

        {/* Login Form */}
        {tab === "login" && (
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-[#94A3B8] text-sm mb-2">
                E-Mail
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="deine@email.de"
                required
                className={inputClasses}
              />
            </div>
            <div>
              <label className="block text-[#94A3B8] text-sm mb-2">
                Passwort
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className={inputClasses}
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-lg font-semibold text-[#050A14] bg-gradient-to-r from-[#D4A843] to-[#B8922E] hover:from-[#E0B84D] hover:to-[#D4A843] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Laden..." : "Anmelden"}
            </button>
          </form>
        )}

        {/* Register Form */}
        {tab === "register" && (
          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <label className="block text-[#94A3B8] text-sm mb-2">Name</label>
              <input
                type="text"
                value={regName}
                onChange={(e) => setRegName(e.target.value)}
                placeholder="Vor- und Nachname"
                required
                className={inputClasses}
              />
            </div>
            <div>
              <label className="block text-[#94A3B8] text-sm mb-2">
                E-Mail
              </label>
              <input
                type="email"
                value={regEmail}
                onChange={(e) => setRegEmail(e.target.value)}
                placeholder="deine@email.de"
                required
                className={inputClasses}
              />
            </div>
            <div>
              <label className="block text-[#94A3B8] text-sm mb-2">
                Passwort
              </label>
              <input
                type="password"
                value={regPassword}
                onChange={(e) => setRegPassword(e.target.value)}
                placeholder="Mindestens 6 Zeichen"
                required
                minLength={6}
                className={inputClasses}
              />
            </div>
            <div>
              <label className="block text-[#94A3B8] text-sm mb-2">
                Erfahrung
              </label>
              <select
                value={regExperience}
                onChange={(e) => setRegExperience(e.target.value)}
                required
                className={inputClasses}
              >
                <option value="" disabled>
                  Bitte auswählen
                </option>
                <option value="keine">Keine Erfahrung</option>
                <option value="1-2">1–2 Jahre</option>
                <option value="3-5">3–5 Jahre</option>
                <option value="5+">5+ Jahre</option>
              </select>
            </div>
            <div>
              <label className="block text-[#94A3B8] text-sm mb-2">
                Region
              </label>
              <input
                type="text"
                value={regRegion}
                onChange={(e) => setRegRegion(e.target.value)}
                placeholder="z.B. München, Berlin..."
                required
                className={inputClasses}
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-lg font-semibold text-[#050A14] bg-gradient-to-r from-[#D4A843] to-[#B8922E] hover:from-[#E0B84D] hover:to-[#D4A843] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Laden..." : "Registrieren"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
