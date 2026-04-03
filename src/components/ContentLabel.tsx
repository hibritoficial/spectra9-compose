"use client";

import { useCompose } from "./ComposeContext";

interface ContentLabelProps {
  text: string;
  className?: string;
}

export default function ContentLabel({ text, className = "" }: ContentLabelProps) {
  const { hints } = useCompose();

  if (hints === "clean") return null;

  return (
    <span
      className={className}
      style={{
        fontFamily: '"SF Mono", "Fira Code", "Fira Mono", "Roboto Mono", monospace',
        fontSize: "11px",
        color: "#666",
        opacity: hints === "all" ? 0.7 : 0.4,
        letterSpacing: "0.04em",
        pointerEvents: "none",
        userSelect: "none",
        display: "block",
      }}
    >
      {text}
    </span>
  );
}
