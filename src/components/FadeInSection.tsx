import { ReactNode } from "react";

// Duenner Wrapper um die CSS-Reveal-Klasse. Frueher Framer Motion, das aber
// serverseitig opacity:0 rendert und den Inhalt ohne JS unsichtbar laesst.
// Die Aufrufer bleiben unveraendert. "direction" faellt weg: das Entry-Recipe
// aus DESIGN.md Paragraph 5 sieht ohnehin nur den Aufwaertsversatz vor, und
// keine Aufrufstelle hat es je gesetzt.
export default function FadeInSection({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  /** Sekunden, wie bisher. Wird auf animation-delay abgebildet. */
  delay?: number;
}) {
  return (
    <div
      className={`ss-reveal ${className}`}
      style={delay ? { animationDelay: `${Math.round(delay * 1000)}ms` } : undefined}
    >
      {children}
    </div>
  );
}
