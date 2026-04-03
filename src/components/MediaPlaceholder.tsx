"use client";

import { useCompose } from "./ComposeContext";

interface MediaPlaceholderProps {
  label: string;
  hint: string;
  width?: string;
  height?: string;
  className?: string;
}

export default function MediaPlaceholder({
  label,
  hint,
  width,
  height,
  className = "",
}: MediaPlaceholderProps) {
  const { hints } = useCompose();

  const showLabel = hints !== "clean";
  const showTooltip = hints === "hover" || hints === "all";

  return (
    <div
      className={`media-placeholder ${hints === "clean" ? "media-placeholder--clean" : ""} ${hints === "all" ? "media-placeholder--all" : ""} ${className}`}
      data-hint={showTooltip ? hint : undefined}
      style={{ width: width || "100%", height: height || "300px" }}
    >
      {showLabel && <span>{label}</span>}
    </div>
  );
}
