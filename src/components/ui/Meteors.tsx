"use client";

export default function Meteors({ count = 12 }: { count?: number }) {
  const meteors = Array.from({ length: count }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    delay: `${Math.random() * 5}s`,
    duration: `${1 + Math.random() * 2}s`,
    size: `${1 + Math.random()}px`,
  }));

  return (
    <>
      {meteors.map((m) => (
        <span
          key={m.id}
          className="absolute pointer-events-none"
          style={{
            left: m.left,
            top: "-5%",
            width: m.size,
            height: m.size,
            background: "linear-gradient(to bottom, #D4A843, transparent)",
            borderRadius: "50%",
            boxShadow: `0 0 6px 1px rgba(212,168,67,0.3)`,
            animation: `meteor ${m.duration} ${m.delay} linear infinite`,
          }}
        />
      ))}
      <style>{`
        @keyframes meteor {
          0% { transform: translateY(0) translateX(0) rotate(215deg); opacity: 1; }
          70% { opacity: 1; }
          100% { transform: translateY(800px) translateX(-300px) rotate(215deg); opacity: 0; }
        }
      `}</style>
    </>
  );
}
