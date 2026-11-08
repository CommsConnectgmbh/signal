"use client";

import type { ReactNode } from "react";

import { trackZiel } from "@/lib/consent/tags";
import { tuerHref, type Ziel } from "@/lib/tuer";

/**
 * Link ueber die Klick-Tuer /start. Sieht aus wie ein gewoehnlicher Link;
 * beim Klick geht (nur mit Einwilligung) das passende Conversion-Ereignis raus.
 */
export function TuerLink({
  ziel,
  className,
  children,
  onClick,
}: {
  ziel: Ziel;
  className?: string;
  children: ReactNode;
  onClick?: () => void;
}) {
  return (
    <a
      href={tuerHref(ziel)}
      className={className}
      onClick={() => {
        trackZiel(ziel);
        onClick?.();
      }}
    >
      {children}
    </a>
  );
}
