"use client";

import { useState, useCallback, useEffect } from "react";
import ControlBar from "../components/ControlBar";
import { blockRegistry } from "../components/blocks/registry";
import {
  HeroStatement,
  HeroProduct,
  HeroSplit,
  HeroVideo,
  HeroData,
} from "../components/blocks/hero";

const heroComponents: Record<string, React.ComponentType> = {
  "hero-statement": HeroStatement,
  "hero-product": HeroProduct,
  "hero-split": HeroSplit,
  "hero-video": HeroVideo,
  "hero-data": HeroData,
};

export default function Home() {
  const [activePurpose, setActivePurpose] = useState("hero");
  const [activeVariantIndex, setActiveVariantIndex] = useState(0);
  const [showJson, setShowJson] = useState(false);

  const purpose = blockRegistry.find((p) => p.id === activePurpose);
  const currentVariant = purpose?.variants[activeVariantIndex];
  const BlockComponent = currentVariant
    ? heroComponents[currentVariant.id]
    : null;

  const handlePurposeChange = useCallback((purposeId: string) => {
    setActivePurpose(purposeId);
    setActiveVariantIndex(0);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (!purpose) return;
      const total = purpose.variants.length;

      if (e.key === "ArrowLeft") {
        e.preventDefault();
        setActiveVariantIndex((i) => (i - 1 + total) % total);
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        setActiveVariantIndex((i) => (i + 1) % total);
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
        onPurposeChange={handlePurposeChange}
        onVariantChange={setActiveVariantIndex}
        onToggleJson={() => setShowJson((v) => !v)}
      />

      {/* Content area */}
      <div className="flex">
        {/* Block preview */}
        <main
          className={`pt-14 transition-all duration-300 ${
            showJson ? "w-[calc(100%-400px)]" : "w-full"
          }`}
        >
          {BlockComponent ? <BlockComponent /> : null}
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
