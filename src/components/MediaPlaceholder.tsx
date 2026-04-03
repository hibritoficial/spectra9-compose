"use client";

import { useCompose } from "./ComposeContext";

interface MediaPlaceholderProps {
  label: string;
  hint: string;
  width?: string;
  height?: string;
  className?: string;
  variant?: "screen" | "photo" | "video" | "chart" | "default";
}

/**
 * Simulated internal content — subtle shapes inside each placeholder
 * so they look like real content in grayscale, not empty boxes.
 */
function PlaceholderContent({ variant }: { variant: string }) {
  if (variant === "screen") {
    // Simulated app UI: sidebar + cards + header
    return (
      <div className="absolute inset-4 flex flex-col" style={{ opacity: 0.1 }}>
        {/* Top bar */}
        <div className="h-3 w-full rounded-sm mb-3 flex gap-2">
          <div className="w-2 h-2 rounded-full bg-white" />
          <div className="w-2 h-2 rounded-full bg-white" />
          <div className="w-2 h-2 rounded-full bg-white" />
          <div className="flex-1" />
          <div className="w-16 h-2 rounded-sm bg-white mt-0.5" />
        </div>
        {/* Body with sidebar */}
        <div className="flex-1 flex gap-3">
          {/* Sidebar */}
          <div className="w-1/5 flex flex-col gap-2">
            <div className="h-2 w-full rounded-sm bg-white" />
            <div className="h-2 w-4/5 rounded-sm bg-white" />
            <div className="h-2 w-3/5 rounded-sm bg-white" />
            <div className="h-2 w-full rounded-sm bg-white mt-4" />
            <div className="h-2 w-4/5 rounded-sm bg-white" />
          </div>
          {/* Main */}
          <div className="flex-1 flex flex-col gap-3">
            <div className="h-3 w-2/5 rounded-sm bg-white" />
            <div className="flex-1 grid grid-cols-3 gap-2">
              <div className="bg-white rounded-md" />
              <div className="bg-white rounded-md" />
              <div className="bg-white rounded-md" />
            </div>
            <div className="h-20 bg-white rounded-md" />
          </div>
        </div>
      </div>
    );
  }

  if (variant === "photo") {
    // Simulated photo composition: horizon + subject
    return (
      <div className="absolute inset-0" style={{ opacity: 0.06 }}>
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 60% 40% at 40% 45%, rgba(255,255,255,0.6) 0%, transparent 70%), linear-gradient(180deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.3) 55%, rgba(255,255,255,0.05) 100%)",
          }}
        />
      </div>
    );
  }

  if (variant === "video") {
    // Simulated video frame: vignette + center brightness
    return (
      <div className="absolute inset-0" style={{ opacity: 0.08 }}>
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 70% 50% at 50% 55%, rgba(255,255,255,0.4) 0%, transparent 60%)",
          }}
        />
        {/* Scan lines effect */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(255,255,255,0.02) 3px, rgba(255,255,255,0.02) 4px)",
          }}
        />
      </div>
    );
  }

  if (variant === "chart") {
    // Simulated mini chart
    return (
      <div className="absolute inset-2 flex items-end justify-center gap-1" style={{ opacity: 0.12 }}>
        <div className="w-2 bg-white rounded-t" style={{ height: "40%" }} />
        <div className="w-2 bg-white rounded-t" style={{ height: "65%" }} />
        <div className="w-2 bg-white rounded-t" style={{ height: "45%" }} />
        <div className="w-2 bg-white rounded-t" style={{ height: "80%" }} />
        <div className="w-2 bg-white rounded-t" style={{ height: "55%" }} />
      </div>
    );
  }

  // Default: subtle diagonal lines
  return (
    <div className="absolute inset-0" style={{ opacity: 0.04 }}>
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 30% 40%, rgba(255,255,255,0.3) 0%, transparent 50%)",
        }}
      />
    </div>
  );
}

export default function MediaPlaceholder({
  label,
  hint,
  width,
  height,
  className = "",
  variant = "default",
}: MediaPlaceholderProps) {
  const { hints } = useCompose();

  const isClean = hints === "clean";
  const showLabel = !isClean;
  const showTooltip = hints === "hover" || hints === "all";

  return (
    <div
      className={`media-placeholder ${isClean ? "media-placeholder--clean" : ""} ${hints === "all" ? "media-placeholder--all" : ""} ${className}`}
      data-hint={showTooltip ? hint : undefined}
      style={{ width: width || "100%", height: height || "300px" }}
    >
      <PlaceholderContent variant={variant} />
      {showLabel && (
        <span className="relative z-10">{label}</span>
      )}
    </div>
  );
}
