"use client";

import type { LucideIcon } from "lucide-react";

export default function PlaceholderBlock({
  label,
  jtbd,
  icon: Icon,
}: {
  label: string;
  jtbd: string;
  icon: LucideIcon;
}) {
  return (
    <section
      className="w-full flex items-center justify-center"
      style={{
        minHeight: 320,
        background: "#0A0A0A",
        borderTop: "1px dashed rgba(255,255,255,0.05)",
        borderBottom: "1px dashed rgba(255,255,255,0.05)",
      }}
    >
      <div className="flex flex-col items-center gap-4 px-8 text-center">
        <Icon size={28} className="text-[#444]" />
        <span className="font-mono text-[11px] text-[#555] uppercase tracking-[0.25em]">
          {label}
        </span>
        <p className="font-sans text-[14px] italic text-[#666] max-w-xs">
          {jtbd}
        </p>
        <span className="font-mono text-[10px] text-[#333]">
          Variantes deste bloco ainda não foram implementadas
        </span>
      </div>
    </section>
  );
}
