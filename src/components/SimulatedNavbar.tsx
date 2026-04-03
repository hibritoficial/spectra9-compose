"use client";

import { useCompose } from "./ComposeContext";

export default function SimulatedNavbar() {
  const { hints } = useCompose();
  if (hints === "clean") return null;

  return (
    <nav
      className="relative z-20 w-full h-16 flex items-center justify-between px-8 anim-fade-in"
      style={{
        background: "rgba(255,255,255,0.03)",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      {/* Logo placeholder */}
      <div
        className="flex items-center justify-center"
        style={{
          width: 120,
          height: 32,
          border: "1px dashed rgba(255,255,255,0.12)",
          borderRadius: 6,
          color: "#555",
          fontFamily: '"SF Mono", monospace',
          fontSize: 11,
        }}
      >
        LOGO
      </div>

      {/* Nav links */}
      <div className="flex items-center gap-8">
        <span className="font-sans text-[14px] text-[#666]">Link 1</span>
        <span className="font-sans text-[14px] text-[#666]">Link 2</span>
        <span className="font-sans text-[14px] text-[#666]">Link 3</span>
        <button
          className="px-5 py-2 font-sans text-[14px] text-[#777] rounded-lg"
          style={{ border: "1px solid rgba(255,255,255,0.1)" }}
        >
          CTA
        </button>
      </div>
    </nav>
  );
}
