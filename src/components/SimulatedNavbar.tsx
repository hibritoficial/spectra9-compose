"use client";

/**
 * Responsive simulated navbar.
 * - Desktop: Logo + links + CTA pill
 * - Tablet: Logo + links (tighter gaps) + CTA
 * - Mobile: Logo + hamburger icon (links collapse)
 *
 * When used inside hero-split, should be placed OUTSIDE the grid
 * via absolute positioning spanning the full section width.
 */
export default function SimulatedNavbar({ absolute }: { absolute?: boolean }) {
  const positionClass = absolute
    ? "absolute top-0 left-0 right-0 z-20"
    : "relative z-20";

  return (
    <nav
      className={`${positionClass} w-full h-16 flex items-center justify-between px-10 anim-fade-in`}
      style={{
        background: "rgba(255,255,255,0.02)",
        borderBottom: "1px solid rgba(255,255,255,0.04)",
      }}
    >
      {/* Logo */}
      <div className="flex items-center gap-3 shrink-0">
        <div
          style={{
            width: 28,
            height: 28,
            borderRadius: 8,
            background: "linear-gradient(135deg, #2a2a2a 0%, #1a1a1a 100%)",
            border: "1px solid rgba(255,255,255,0.06)",
            flexShrink: 0,
          }}
        />
        <span
          style={{
            fontFamily: '"Helvetica Neue", sans-serif',
            fontSize: 15,
            fontWeight: 500,
            color: "#888",
            letterSpacing: "0.02em",
          }}
        >
          Brand
        </span>
      </div>

      {/* Desktop links — hidden on small containers */}
      <div className="nav-links-desktop flex items-center gap-10">
        <span className="font-sans text-[14px] text-[#555] cursor-pointer">
          Produto
        </span>
        <span className="font-sans text-[14px] text-[#555] cursor-pointer">
          Sobre
        </span>
        <span className="font-sans text-[14px] text-[#555] cursor-pointer">
          Contato
        </span>
        <button
          className="px-5 py-2 font-sans text-[13px] text-[#999] rounded-full cursor-pointer"
          style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          Acessar
        </button>
      </div>

      {/* Mobile hamburger — shown on small containers */}
      <div className="nav-hamburger hidden">
        <div className="flex flex-col gap-[5px] cursor-pointer">
          <div style={{ width: 20, height: 1.5, background: "rgba(255,255,255,0.4)", borderRadius: 1 }} />
          <div style={{ width: 16, height: 1.5, background: "rgba(255,255,255,0.4)", borderRadius: 1 }} />
        </div>
      </div>
    </nav>
  );
}
