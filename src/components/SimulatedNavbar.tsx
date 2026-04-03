"use client";

export default function SimulatedNavbar() {
  return (
    <nav
      className="relative z-20 w-full h-16 flex items-center justify-between px-10 anim-fade-in"
      style={{
        background: "rgba(255,255,255,0.02)",
        borderBottom: "1px solid rgba(255,255,255,0.04)",
      }}
    >
      {/* Logo — refined */}
      <div className="flex items-center gap-2">
        <div
          style={{
            width: 28,
            height: 28,
            borderRadius: 8,
            background: "linear-gradient(135deg, #2a2a2a 0%, #1a1a1a 100%)",
            border: "1px solid rgba(255,255,255,0.06)",
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

      {/* Nav links */}
      <div className="flex items-center gap-10">
        <span className="font-sans text-[14px] text-[#555] hover:text-[#888] transition-colors duration-200 cursor-default">
          Produto
        </span>
        <span className="font-sans text-[14px] text-[#555] hover:text-[#888] transition-colors duration-200 cursor-default">
          Sobre
        </span>
        <span className="font-sans text-[14px] text-[#555] hover:text-[#888] transition-colors duration-200 cursor-default">
          Contato
        </span>
        <button
          className="px-5 py-2 font-sans text-[13px] text-[#999] rounded-full cursor-default"
          style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          Acessar
        </button>
      </div>
    </nav>
  );
}
