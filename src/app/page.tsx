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

const viewportWidths: Record<ViewportMode, number> = {
  desktop: 1440,
  tablet: 768,
  mobile: 375,
};

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
  const frameWidth = viewportWidths[viewport];

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
        {/* Block preview */}
        <main
          ref={mainRef}
          className={`pt-14 transition-all duration-300 ${
            showJson ? "w-[calc(100%-400px)]" : "w-full"
          } ${isFramed ? "flex justify-center" : ""}`}
        >
          {isFramed ? (
            /* Device frame */
            <div
              className="relative my-8 transition-all duration-300"
              style={{ width: frameWidth, maxWidth: "100%" }}
            >
              {/* Device border */}
              <div
                className="absolute -inset-px rounded-xl pointer-events-none"
                style={{ border: "1px solid #222" }}
              />
              {/* Viewport label */}
              <div className="absolute -top-6 left-1/2 -translate-x-1/2">
                <span className="font-mono text-[10px] text-[#444] uppercase tracking-wider">
                  {viewport} — {frameWidth}px
                </span>
              </div>
              {/* Content */}
              <div
                className="overflow-hidden rounded-xl bg-[#0A0A0A]"
                style={{ width: frameWidth }}
                data-viewport-frame={viewport}
              >
                {BlockComponent ? (
                  <div key={animKey} className="variant-enter">
                    <BlockComponent />
                  </div>
                ) : null}
              </div>
            </div>
          ) : (
            /* Full width */
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
