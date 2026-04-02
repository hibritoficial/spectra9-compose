"use client";

import { blockRegistry } from "./blocks/registry";

export type ViewportMode = "desktop" | "tablet" | "mobile";

const viewportConfig: Record<ViewportMode, { width: number; label: string }> = {
  desktop: { width: 1440, label: "Desktop" },
  tablet: { width: 768, label: "Tablet" },
  mobile: { width: 375, label: "Mobile" },
};

interface ControlBarProps {
  activePurpose: string;
  activeVariantIndex: number;
  showJson: boolean;
  viewport: ViewportMode;
  onPurposeChange: (purposeId: string) => void;
  onVariantChange: (index: number) => void;
  onToggleJson: () => void;
  onViewportChange: (mode: ViewportMode) => void;
}

export default function ControlBar({
  activePurpose,
  activeVariantIndex,
  showJson,
  viewport,
  onPurposeChange,
  onVariantChange,
  onToggleJson,
  onViewportChange,
}: ControlBarProps) {
  const purpose = blockRegistry.find((p) => p.id === activePurpose);
  const totalVariants = purpose?.variants.length ?? 0;
  const currentVariant = purpose?.variants[activeVariantIndex];

  return (
    <header className="control-bar fixed top-0 left-0 right-0 z-50 h-14 flex items-center px-5 gap-4">
      {/* Logo */}
      <span className="font-mono text-[12px] text-[#666] tracking-[0.2em] uppercase shrink-0">
        COMPOSE
      </span>

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
          ←
        </button>

        <span className="font-mono text-[12px] text-[#888] min-w-[140px] text-center">
          {currentVariant?.name ?? "—"} ({activeVariantIndex + 1}/{totalVariants})
        </span>

        <button
          onClick={() =>
            onVariantChange((activeVariantIndex + 1) % totalVariants)
          }
          className="w-7 h-7 flex items-center justify-center rounded border border-[#333] text-[#888] hover:border-[#555] hover:text-[#ccc] transition-colors duration-150 text-[14px]"
          aria-label="Next variant"
        >
          →
        </button>
      </div>

      <div className="w-px h-5 bg-[#333]" />

      {/* Viewport toggle */}
      <div className="flex gap-1" data-testid="viewport-toggle">
        {(Object.keys(viewportConfig) as ViewportMode[]).map((mode) => (
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
            {viewportConfig[mode].width}
          </button>
        ))}
      </div>

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
    </header>
  );
}
