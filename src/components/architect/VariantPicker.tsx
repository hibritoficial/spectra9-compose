"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown, Check } from "lucide-react";
import { variantsForPurpose } from "./blockCatalog";

interface Props {
  purpose: string;
  variant: string | null;
  onChange: (variantId: string) => void;
}

export default function VariantPicker({ purpose, variant, onChange }: Props) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const variants = variantsForPurpose(purpose);

  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const esc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("mousedown", handler);
    window.addEventListener("keydown", esc);
    return () => {
      window.removeEventListener("mousedown", handler);
      window.removeEventListener("keydown", esc);
    };
  }, [open]);

  if (variants.length === 0) {
    return (
      <span className="font-mono text-[10px] text-[#444] italic">
        sem variantes
      </span>
    );
  }

  const current = variants.find((v) => v.id === variant) ?? variants[0];

  return (
    <div ref={ref} className="relative">
      <button
        onClick={(e) => {
          e.stopPropagation();
          setOpen((o) => !o);
        }}
        className="flex items-center gap-1.5 px-2 py-1 rounded cursor-pointer transition-colors duration-150"
        style={{
          background: open ? "rgba(255,255,255,0.06)" : "rgba(255,255,255,0.03)",
          border: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <span className="font-mono text-[10px] text-[#aaa]">{current.name}</span>
        <ChevronDown size={12} className="text-[#666]" />
      </button>

      {open && (
        <div
          className="absolute top-full left-0 mt-1 rounded-lg overflow-hidden z-30"
          style={{
            background: "#141414",
            border: "1px solid #222",
            minWidth: 280,
            boxShadow: "0 8px 24px rgba(0,0,0,0.5)",
          }}
        >
          {variants.map((v) => {
            const active = v.id === current.id;
            return (
              <button
                key={v.id}
                onClick={(e) => {
                  e.stopPropagation();
                  onChange(v.id);
                  setOpen(false);
                }}
                className="w-full flex items-start gap-2 px-3 py-2.5 text-left cursor-pointer hover:bg-[#1a1a1a] transition-colors duration-150"
              >
                <div style={{ width: 14, marginTop: 2 }}>
                  {active && <Check size={12} className="text-[#C75A3A]" />}
                </div>
                <div className="flex-1">
                  <div className="font-mono text-[11px] text-[#ddd]">
                    {v.name}
                  </div>
                  <div className="font-sans text-[11px] text-[#666] mt-0.5 leading-snug">
                    {v.description}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
