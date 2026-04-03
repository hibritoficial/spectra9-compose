"use client";

import Link from "next/link";
import { blockRegistry } from "./blocks/registry";
import type { HintsMode } from "./ComposeContext";

export type ViewportMode = "desktop" | "tablet" | "mobile" | "split";

const viewportButtons: { mode: ViewportMode; label: string }[] = [
  { mode: "desktop", label: "1440" },
  { mode: "tablet", label: "768" },
  { mode: "mobile", label: "375" },
  { mode: "split", label: "Split" },
];

const hintsIcons: Record<HintsMode, { icon: string; title: string }> = {
  clean: { icon: "\u29B8", title: "Clean — sem hints" },
  hover: { icon: "\u25CE", title: "Hover — hints no hover" },
  all: { icon: "\u25C9", title: "All — tudo visível" },
};

interface ControlBarProps {
  activePurpose: string;
  activeVariantIndex: number;
  showJson: boolean;
  showGuide: boolean;
  viewport: ViewportMode;
  hints: HintsMode;
  onPurposeChange: (purposeId: string) => void;
  onVariantChange: (index: number) => void;
  onToggleJson: () => void;
  onToggleGuide: () => void;
  onViewportChange: (mode: ViewportMode) => void;
  onHintsChange: (mode: HintsMode) => void;
}

export default function ControlBar({
  activePurpose,
  activeVariantIndex,
  showJson,
  showGuide,
  viewport,
  hints,
  onPurposeChange,
  onVariantChange,
  onToggleJson,
  onToggleGuide,
  onViewportChange,
  onHintsChange,
}: ControlBarProps) {
  const purpose = blockRegistry.find((p) => p.id === activePurpose);
  const totalVariants = purpose?.variants.length ?? 0;
  const currentVariant = purpose?.variants[activeVariantIndex];

  const cycleHints = () => {
    const order: HintsMode[] = ["hover", "all", "clean"];
    const idx = order.indexOf(hints);
    onHintsChange(order[(idx + 1) % order.length]);
  };

  return (
    <header className="control-bar fixed top-0 left-0 right-0 z-50 h-14 flex items-center px-5 gap-4">
      {/* Logo */}
      <span className="font-mono text-[12px] text-[#666] tracking-[0.2em] uppercase shrink-0">
        COMPOSE
      </span>

      <div className="w-px h-5 bg-[#333]" />

      {/* Page navigation */}
      <Link
        href="/architect"
        className="px-3 py-1.5 rounded font-sans text-[13px] text-[#666] hover:text-[#999] transition-colors duration-150"
      >
        Architect
      </Link>
      <Link
        href="/blocks"
        className="px-3 py-1.5 rounded font-sans text-[13px] bg-[#222] text-[#ddd] transition-colors duration-150"
      >
        Blocks
      </Link>

      <div className="w-px h-5 bg-[#333]" />

      {/* Purpose selector */}
      <div className="flex gap-1">
        {blockRegistry.map((p) => (
          <button
            key={p.id}
            onClick={() => onPurposeChange(p.id)}
            className={`px-3 py-1.5 rounded font-sans text-[13px] transition-colors duration-150 ${
              p.id === activePurpose
                ? "bg-[#222] text-[#ddd]"
                : "text-[#666] hover:text-[#999]"
            }`}
          >
            {p.label}
          </button>
        ))}
      </div>

      <div className="w-px h-5 bg-[#333]" />

      {/* Variant navigation */}
      <div className="flex items-center gap-3">
        <button
          onClick={() =>
            onVariantChange(
              (activeVariantIndex - 1 + totalVariants) % totalVariants
            )
          }
          className="w-7 h-7 flex items-center justify-center rounded border border-[#333] text-[#888] hover:border-[#555] hover:text-[#ccc] transition-colors duration-150 text-[14px]"
          aria-label="Previous variant"
        >
          &larr;
        </button>

        <span className="font-mono text-[12px] text-[#888] min-w-[140px] text-center">
          {currentVariant?.name ?? "\u2014"} ({activeVariantIndex + 1}/
          {totalVariants})
        </span>

        <button
          onClick={() =>
            onVariantChange((activeVariantIndex + 1) % totalVariants)
          }
          className="w-7 h-7 flex items-center justify-center rounded border border-[#333] text-[#888] hover:border-[#555] hover:text-[#ccc] transition-colors duration-150 text-[14px]"
          aria-label="Next variant"
        >
          &rarr;
        </button>
      </div>

      <div className="w-px h-5 bg-[#333]" />

      {/* Viewport toggle */}
      <div className="flex gap-1" data-testid="viewport-toggle">
        {viewportButtons.map(({ mode, label }) => (
          <button
            key={mode}
            onClick={() => onViewportChange(mode)}
            data-viewport={mode}
            className={`px-2.5 py-1 rounded font-mono text-[11px] transition-colors duration-150 ${
              viewport === mode
                ? "bg-[#222] text-[#ddd]"
                : "text-[#555] hover:text-[#888]"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="w-px h-5 bg-[#333]" />

      {/* Hints toggle */}
      <button
        onClick={cycleHints}
        title={hintsIcons[hints].title}
        className={`w-8 h-8 flex items-center justify-center rounded transition-colors duration-150 text-[16px] ${
          hints === "clean"
            ? "text-[#444]"
            : hints === "all"
            ? "text-[#ddd] bg-[#222]"
            : "text-[#888]"
        }`}
      >
        {hintsIcons[hints].icon}
      </button>

      {/* Spacer */}
      <div className="flex-1" />

      {/* JSON toggle */}
      <button
        onClick={onToggleJson}
        className={`px-3 py-1.5 rounded font-mono text-[12px] border transition-colors duration-150 ${
          showJson
            ? "border-[#C75A3A] text-[#C75A3A] bg-[#C75A3A]/10"
            : "border-[#333] text-[#666] hover:border-[#555] hover:text-[#999]"
        }`}
      >
        JSON
      </button>

      {/* Guide sparkle button */}
      <button
        onClick={onToggleGuide}
        className={`w-9 h-9 flex items-center justify-center rounded-lg transition-colors duration-150 text-[16px] ${
          showGuide
            ? "bg-[#C75A3A]/15 text-[#C75A3A] border border-[#C75A3A]/40"
            : "border border-[#333] text-[#666] hover:border-[#555] hover:text-[#C75A3A]"
        }`}
        title="Compose Guide (G)"
      >
        &#x2726;
      </button>
    </header>
  );
}
