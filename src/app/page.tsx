"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import ControlBar, { type ViewportMode } from "../components/ControlBar";
import { blockRegistry } from "../components/blocks/registry";
import {
  HeroStatement,
  HeroProduct,
  HeroSplit,
  HeroVideo,
  HeroImmersive,
} from "../components/blocks/hero";

const heroComponents: Record<string, React.ComponentType> = {
  "hero-statement": HeroStatement,
  "hero-product": HeroProduct,
  "hero-split": HeroSplit,
  "hero-video": HeroVideo,
  "hero-immersive": HeroImmersive,
};

const viewportWidths: Record<Exclude<ViewportMode, "split">, number> = {
  desktop: 1440,
  tablet: 768,
  mobile: 375,
};

function DeviceFrame({
  width,
  label,
  scale,
  viewport,
  animKey,
  children,
}: {
  width: number;
  label: string;
  scale?: number;
  viewport: string;
  animKey: number;
  children: React.ReactNode;
}) {
  return (
    <div
      className="relative transition-all duration-300 shrink-0"
      style={{
        width: width * (scale ?? 1),
      }}
    >
      {/* Device border */}
      <div
        className="absolute -inset-px rounded-xl pointer-events-none"
        style={{ border: "1px solid #222" }}
      />
      {/* Viewport label */}
      <div className="absolute -top-6 left-1/2 -translate-x-1/2">
        <span className="font-mono text-[10px] text-[#444] uppercase tracking-wider whitespace-nowrap">
          {label}
        </span>
      </div>
      {/* Content — scaled */}
      <div
        className="overflow-hidden rounded-xl bg-[#0A0A0A]"
        style={{
          width,
          transform: scale && scale !== 1 ? `scale(${scale})` : undefined,
          transformOrigin: "top left",
        }}
        data-viewport-frame={viewport}
      >
        <div key={animKey} className="variant-enter">
          {children}
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const [activePurpose, setActivePurpose] = useState("hero");
  const [activeVariantIndex, setActiveVariantIndex] = useState(0);
  const [showJson, setShowJson] = useState(false);
  const [viewport, setViewport] = useState<ViewportMode>("desktop");
  const [animKey, setAnimKey] = useState(0);
  const mainRef = useRef<HTMLDivElement>(null);

  const purpose = blockRegistry.find((p) => p.id === activePurpose);
  const currentVariant = purpose?.variants[activeVariantIndex];
  const BlockComponent = currentVariant
    ? heroComponents[currentVariant.id]
    : null;

  const isFramed = viewport !== "desktop";
  const isSplit = viewport === "split";

  const handlePurposeChange = useCallback((purposeId: string) => {
    setActivePurpose(purposeId);
    setActiveVariantIndex(0);
    setAnimKey((k) => k + 1);
  }, []);

  const handleVariantChange = useCallback((index: number) => {
    setActiveVariantIndex(index);
    setAnimKey((k) => k + 1);
  }, []);

  const handleViewportChange = useCallback((mode: ViewportMode) => {
    setViewport(mode);
    setAnimKey((k) => k + 1);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (!purpose) return;
      const total = purpose.variants.length;

      if (e.key === "ArrowLeft") {
        e.preventDefault();
        setActiveVariantIndex((i) => {
          const next = (i - 1 + total) % total;
          setAnimKey((k) => k + 1);
          return next;
        });
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        setActiveVariantIndex((i) => {
          const next = (i + 1) % total;
          setAnimKey((k) => k + 1);
          return next;
        });
      } else if (e.key === "j" || e.key === "J") {
        setShowJson((v) => !v);
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [purpose]);

  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      <ControlBar
        activePurpose={activePurpose}
        activeVariantIndex={activeVariantIndex}
        showJson={showJson}
        viewport={viewport}
        onPurposeChange={handlePurposeChange}
        onVariantChange={handleVariantChange}
        onToggleJson={() => setShowJson((v) => !v)}
        onViewportChange={handleViewportChange}
      />

      {/* Content area */}
      <div className="flex">
        <main
          ref={mainRef}
          className={`pt-14 transition-all duration-300 ${
            showJson ? "w-[calc(100%-400px)]" : "w-full"
          } ${isFramed ? "flex justify-center" : ""} ${
            isSplit ? "items-start gap-8 px-8 py-8 overflow-x-auto" : ""
          }`}
        >
          {isSplit && BlockComponent ? (
            /* Split view — desktop + mobile side by side */
            <>
              <DeviceFrame
                width={960}
                label="Desktop — 960px"
                scale={0.65}
                viewport="desktop"
                animKey={animKey}
              >
                <BlockComponent />
              </DeviceFrame>
              <DeviceFrame
                width={375}
                label="Mobile — 375px"
                scale={0.65}
                viewport="mobile"
                animKey={animKey + 1000}
              >
                <BlockComponent />
              </DeviceFrame>
            </>
          ) : isFramed && !isSplit ? (
            /* Single device frame (tablet/mobile) */
            <DeviceFrame
              width={viewportWidths[viewport as Exclude<ViewportMode, "split">]}
              label={`${viewport} — ${viewportWidths[viewport as Exclude<ViewportMode, "split">]}px`}
              viewport={viewport}
              animKey={animKey}
            >
              {BlockComponent ? <BlockComponent /> : <div />}
            </DeviceFrame>
          ) : (
            /* Full width desktop */
            BlockComponent ? (
              <div key={animKey} className="variant-enter">
                <BlockComponent />
              </div>
            ) : null
          )}
        </main>

        {/* JSON panel */}
        {showJson && currentVariant && (
          <aside className="json-viewer fixed top-14 right-0 w-[400px] h-[calc(100vh-56px)] p-6 z-40">
            <div className="flex items-center justify-between mb-4">
              <span className="font-mono text-[11px] text-[#555] uppercase tracking-wider">
                Schema — {currentVariant.name}
              </span>
            </div>
            <pre>{JSON.stringify(currentVariant.schema, null, 2)}</pre>
          </aside>
        )}
      </div>
    </div>
  );
}
