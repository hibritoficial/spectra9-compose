"use client";

import { useEffect } from "react";
import { X } from "lucide-react";
import {
  blockComponents,
  purposeDef,
  variantsForPurpose,
} from "./blockCatalog";
import PlaceholderBlock from "./PlaceholderBlock";

export interface CanvasBlock {
  id: string;
  purpose: string;
  variant: string | null;
}

interface Viewport {
  id: string;
  label: string;
  width: number;
  scale: number;
}

const VIEWPORTS: Viewport[] = [
  { id: "desktop", label: "Desktop", width: 1440, scale: 0.24 },
  { id: "laptop", label: "Laptop", width: 1280, scale: 0.26 },
  { id: "tablet", label: "Tablet", width: 768, scale: 0.42 },
  { id: "mobile", label: "Mobile", width: 375, scale: 0.82 },
];

function RenderedBlock({ block }: { block: CanvasBlock }) {
  const def = purposeDef(block.purpose);
  if (!def) return null;

  if (!block.variant) {
    return (
      <PlaceholderBlock label={def.label} jtbd={def.jtbd} icon={def.icon} />
    );
  }

  const Component = blockComponents[block.variant];
  if (!Component) {
    return (
      <PlaceholderBlock label={def.label} jtbd={def.jtbd} icon={def.icon} />
    );
  }

  return <Component />;
}

function ViewportFrame({
  viewport,
  blocks,
}: {
  viewport: Viewport;
  blocks: CanvasBlock[];
}) {
  const scaledWidth = viewport.width * viewport.scale;

  return (
    <div
      className="shrink-0 flex flex-col items-center"
      style={{ width: scaledWidth + 16 }}
    >
      <div className="flex items-baseline gap-2 mb-3">
        <span className="font-mono text-[10px] text-[#666] uppercase tracking-wider">
          {viewport.label}
        </span>
        <span className="font-mono text-[10px] text-[#333]">
          {viewport.width}px
        </span>
      </div>
      <div
        className="rounded-xl overflow-hidden bg-[#0A0A0A]"
        style={{
          width: scaledWidth,
          maxHeight: "calc(100vh - 180px)",
          overflowY: "auto",
          border: "1px solid #1a1a1a",
          scrollbarWidth: "thin",
        }}
      >
        <div
          style={{
            width: viewport.width,
            transform: `scale(${viewport.scale})`,
            transformOrigin: "top left",
          }}
        >
          {blocks.length === 0 ? (
            <div
              className="flex items-center justify-center font-sans text-[14px] italic text-[#444]"
              style={{ width: viewport.width, height: 400 }}
            >
              Adicione blocos ao canvas para visualizar
            </div>
          ) : (
            blocks.map((block) => (
              <RenderedBlock key={block.id} block={block} />
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default function ComposedPreview({
  blocks,
  onClose,
}: {
  blocks: CanvasBlock[];
  onClose: () => void;
}) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  const variantCount = blocks.filter((b) => {
    return b.variant && variantsForPurpose(b.purpose).length > 0;
  }).length;

  return (
    <div
      className="fixed inset-0 z-[100] flex flex-col"
      style={{ background: "#050505" }}
    >
      {/* Header */}
      <header
        className="h-14 shrink-0 flex items-center px-6 gap-4"
        style={{ borderBottom: "1px solid #1a1a1a" }}
      >
        <span className="font-mono text-[12px] text-[#888] tracking-wider uppercase">
          Preview
        </span>
        <div className="w-px h-4 bg-[#333]" />
        <span className="font-mono text-[11px] text-[#555]">
          {blocks.length} seções · {variantCount} renderizadas · {VIEWPORTS.length} viewports
        </span>
        <div className="flex-1" />
        <button
          onClick={onClose}
          className="flex items-center gap-2 px-3 py-1.5 rounded cursor-pointer text-[#888] hover:text-[#ddd] transition-colors duration-150"
          style={{ border: "1px solid #222" }}
        >
          <span className="font-mono text-[11px]">Fechar</span>
          <X size={14} />
        </button>
      </header>

      {/* Viewports */}
      <div
        className="flex-1 overflow-x-auto overflow-y-hidden p-8 flex items-start gap-6"
        style={{ scrollbarWidth: "thin" }}
      >
        {VIEWPORTS.map((vp) => (
          <ViewportFrame key={vp.id} viewport={vp} blocks={blocks} />
        ))}
      </div>
    </div>
  );
}
