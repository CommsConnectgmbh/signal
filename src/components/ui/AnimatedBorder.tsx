"use client";

export default function AnimatedBorder({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`relative rounded-xl p-px overflow-hidden ${className}`}>
      {/* Rotating gradient border */}
      <div
        className="absolute inset-0 rounded-xl"
        style={{
          background: "conic-gradient(from 0deg, #D4A843, #3B82F6, #D4A843, transparent, #D4A843)",
          animation: "spin 4s linear infinite",
        }}
      />
      <div className="relative rounded-xl bg-[#111D33] h-full">
        {children}
      </div>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
