import ContentLabel from "../../ContentLabel";

const stats = [
  { number: "2.4M", label: "Paginas criadas", context: "e crescendo" },
  { number: "98%", label: "Uptime", context: "ultimos 12 meses" },
  { number: "47", label: "Paises", context: "com usuarios ativos" },
  { number: "4.9", label: "Avaliacao", context: "media no G2" },
];

export default function ProofStats() {
  return (
    <section className="hero-section-end relative w-full overflow-hidden" style={{ padding: "100px 0" }}>
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(180deg, rgba(255,255,255,0.02) 0%, transparent 30%, transparent 70%, rgba(255,255,255,0.02) 100%)",
        }}
      />

      <div className="relative z-10 max-w-[1200px] mx-auto px-20">
        <div className="content-label-container mb-3 text-center">
          <ContentLabel text="Titulo editorial (opcional)" />
        </div>

        <div className="proof-stats-grid grid grid-cols-4 gap-0">
          {stats.map((s, i) => (
            <div
              key={i}
              className="flex flex-col items-center text-center py-8 anim-sub"
              style={{
                borderLeft: i > 0 ? "1px solid rgba(255,255,255,0.06)" : undefined,
                animationDelay: `${0.2 + i * 0.12}s`,
              }}
            >
              <span
                className="proof-stats-number font-serif text-[#d0d0d0] leading-none tracking-[-0.03em] mb-3"
                style={{
                  fontSize: "clamp(48px, 5vw, 80px)",
                  textShadow: "0 0 40px rgba(255,255,255,0.03)",
                }}
              >
                {s.number}
              </span>

              <span className="font-sans text-[14px] text-[#888] tracking-wide uppercase mb-1">
                {s.label}
              </span>

              <span className="font-sans text-[13px] text-[#555]" style={{ fontStyle: "italic" }}>
                {s.context}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
