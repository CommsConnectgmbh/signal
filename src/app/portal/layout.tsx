"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { supabase } from "@/lib/supabase";

const navItems = [
  { href: "/portal", label: "Dashboard", icon: "📊" },
  { href: "/portal/pipeline", label: "Pipeline", icon: "🔄" },
  { href: "/portal/provisionen", label: "Provisionen", icon: "💰" },
  { href: "/portal/leaderboard", label: "Leaderboard", icon: "🏆" },
  { href: "/portal/schulungen", label: "Schulungen", icon: "📚" },
];

export default function PortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [loading, setLoading] = useState(true);
  const [userName, setUserName] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.push("/login");
        return;
      }

      // Get partner name
      const { data: partner } = await supabase
        .from("partners")
        .select("full_name")
        .eq("id", user.id)
        .single();

      setUserName(
        partner?.full_name ||
          user.user_metadata?.full_name ||
          user.email ||
          ""
      );
      setLoading(false);
    };

    checkAuth();
  }, [router]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  const isActive = (href: string) => {
    if (href === "/portal") return pathname === "/portal";
    return pathname.startsWith(href);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#050A14] flex items-center justify-center">
        <div className="text-[#D4A843] text-lg">Laden...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050A14]">
      {/* Mobile Hamburger */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="fixed top-4 left-4 z-50 lg:hidden bg-[#0A1628] border border-[#1E293B] rounded-lg p-2 text-[#F1F5F9]"
      >
        {sidebarOpen ? (
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        ) : (
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        )}
      </button>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-[#0A1628] border-r border-[#1E293B] z-40 flex flex-col transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        {/* Logo */}
        <div className="p-6 border-b border-[#1E293B]">
          <img
            src="/logo.png"
            className="h-8 brightness-0 invert"
            alt="Smart Signals"
          />
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-4">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setSidebarOpen(false)}
              className={`flex items-center gap-3 px-6 py-3 text-sm font-medium transition-colors ${
                isActive(item.href)
                  ? "text-[#D4A843] border-l-2 border-[#D4A843] bg-[#D4A843]/5"
                  : "text-[#94A3B8] hover:text-[#F1F5F9] hover:bg-[#111D33] border-l-2 border-transparent"
              }`}
            >
              <span className="text-lg">{item.icon}</span>
              <span>{item.label}</span>
            </a>
          ))}
        </nav>

        {/* User Section */}
        <div className="p-6 border-t border-[#1E293B]">
          <div className="text-[#F1F5F9] text-sm font-medium mb-1 truncate">
            {userName}
          </div>
          <button
            onClick={handleSignOut}
            className="text-[#64748B] text-sm hover:text-red-400 transition-colors"
          >
            Abmelden
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="lg:ml-64 min-h-screen bg-[#050A14] p-4 pt-16 lg:p-8">
        {children}
      </main>
    </div>
  );
}
