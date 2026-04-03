"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import ControlBar, { type ViewportMode } from "../../components/ControlBar";
import { ComposeProvider, type HintsMode } from "../../components/ComposeContext";
import { blockRegistry } from "../../components/blocks/registry";
import AIGuide from "../../components/chat/AIGuide";
import {
  HeroStatement,
  HeroProduct,
  HeroSplit,
  HeroVideo,
  HeroImmersive,
} from "../../components/blocks/hero";
import {
  OverviewCarousel,
  OverviewIcons,
  OverviewTabs,
  OverviewNumbers,
} from "../../components/blocks/overview";
import {
  FeatureAlternating,
  FeatureScrollStory,
  FeatureGrid,
} from "../../components/blocks/feature";
import {
  ProofTestimonials,
  ProofLogos,
  ProofStats,
} from "../../components/blocks/proof";

const allComponents: Record<string, React.ComponentType> = {
  "hero-statement": HeroStatement,
  "hero-product": HeroProduct,
  "hero-split": HeroSplit,
  "hero-video": HeroVideo,
  "hero-immersive": HeroImmersive,
  "overview-carousel": OverviewCarousel,
  "overview-icons": OverviewIcons,
  "overview-tabs": OverviewTabs,
  "overview-numbers": OverviewNumbers,
  "feature-alternating": FeatureAlternating,
  "feature-scroll-story": FeatureScrollStory,
  "feature-grid": FeatureGrid,
  "proof-testimonials": ProofTestimonials,
  "proof-logos": ProofLogos,
  "proof-stats": ProofStats,
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
      style={{ width: width * (scale ?? 1) }}
    >
      <div
        className="absolute -inset-px rounded-xl pointer-events-none"
        style={{ border: "1px solid #222" }}
      />
      <div className="absolute -top-6 left-1/2 -translate-x-1/2">
        <span className="font-mono text-[10px] text-[#444] uppercase tracking-wider whitespace-nowrap">
          {label}
        </span>
      </div>
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
  const [showGuide, setShowGuide] = useState(false);
  const [viewport, setViewport] = useState<ViewportMode>("desktop");
  const [hints, setHints] = useState<HintsMode>("hover");
  const [animKey, setAnimKey] = useState(0);
  const mainRef = useRef<HTMLDivElement>(null);

  const purpose = blockRegistry.find((p) => p.id === activePurpose);
  const currentVariant = purpose?.variants[activeVariantIndex];
  const BlockComponent = currentVariant
    ? allComponents[currentVariant.id]
    : null;

  const isFramed = viewport !== "desktop";
  const isSplit = viewport === "split";

  // Compute main width accounting for sidebars
  const rightPanelWidth = showJson ? 400 : showGuide ? 380 : 0;

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

  // Close one panel when opening the other
  const toggleJson = useCallback(() => {
    setShowJson((v) => {
      if (!v) setShowGuide(false);
      return !v;
    });
  }, []);

  const toggleGuide = useCallback(() => {
    setShowGuide((v) => {
      if (!v) setShowJson(false);
      return !v;
    });
  }, []);

  // Keyboard shortcuts
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      // Ignore when typing in input fields
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      )
        return;

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
        toggleJson();
      } else if (e.key === "g" || e.key === "G") {
        toggleGuide();
      } else if (e.key === "h" || e.key === "H") {
        setHints((h) => {
          const order: HintsMode[] = ["hover", "all", "clean"];
          const idx = order.indexOf(h);
          return order[(idx + 1) % order.length];
        });
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [purpose, toggleJson, toggleGuide]);

  return (
    <ComposeProvider hints={hints}>
      <div className="min-h-screen bg-[#0A0A0A]">
        <ControlBar
          activePurpose={activePurpose}
          activeVariantIndex={activeVariantIndex}
          showJson={showJson}
          showGuide={showGuide}
          viewport={viewport}
          hints={hints}
          onPurposeChange={handlePurposeChange}
          onVariantChange={handleVariantChange}
          onToggleJson={toggleJson}
          onToggleGuide={toggleGuide}
          onViewportChange={handleViewportChange}
          onHintsChange={setHints}
        />

        {/* Content area */}
        <div className="flex">
          <main
            ref={mainRef}
            className={`pt-14 transition-all duration-300 ${
              isFramed ? "flex justify-center" : ""
            } ${isSplit ? "items-start gap-8 px-8 py-8 overflow-x-auto" : ""}`}
            style={{
              width: rightPanelWidth
                ? `calc(100% - ${rightPanelWidth}px)`
                : "100%",
            }}
          >
            {isSplit && BlockComponent ? (
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
              <DeviceFrame
                width={
                  viewportWidths[viewport as Exclude<ViewportMode, "split">]
                }
                label={`${viewport} — ${viewportWidths[viewport as Exclude<ViewportMode, "split">]}px`}
                viewport={viewport}
                animKey={animKey}
              >
                {BlockComponent ? <BlockComponent /> : <div />}
              </DeviceFrame>
            ) : BlockComponent ? (
              <div key={animKey} className="variant-enter">
                <BlockComponent />
              </div>
            ) : null}
          </main>

          {/* JSON panel */}
          {showJson && currentVariant && (
            <aside className="json-viewer fixed top-14 right-0 w-[400px] h-[calc(100vh-56px)] p-6 z-40">
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-[11px] text-[#555] uppercase tracking-wider">
                  Schema — {currentVariant.name}
                </span>
                <button
                  onClick={toggleJson}
                  className="text-[#555] hover:text-[#999] transition-colors duration-150 text-[16px]"
                >
                  &times;
                </button>
              </div>
              <pre>{JSON.stringify(currentVariant.schema, null, 2)}</pre>
            </aside>
          )}

          {/* AI Guide panel */}
          <AIGuide
            open={showGuide}
            onClose={toggleGuide}
            activeVariant={currentVariant?.name ?? ""}
            viewport={viewport}
          />
        </div>
      </div>
    </ComposeProvider>
  );
}
