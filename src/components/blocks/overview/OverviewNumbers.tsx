import ContentLabel from "../../ContentLabel";
import MediaPlaceholder from "../../MediaPlaceholder";

const metrics = [
  { number: "847", label: "Empresas ativas", viz: "sparkline" },
  { number: "92%", label: "Satisfacao", viz: "ring gauge" },
  { number: "3.4x", label: "ROI medio", viz: "bar chart" },
];

export default function OverviewNumbers() {
  return (
    <section className="hero-section-end relative w-full overflow-hidden" style={{ padding: "120px 0" }}>
      <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 50% 50% at 50% 50%, rgba(255,255,255,0.02) 0%, transparent 60%)" }} />

      <div className="relative z-10 max-w-[1100px] mx-auto px-20">
        <div className="content-label-container mb-3 text-center">
          <ContentLabel text="Titulo editorial (opcional)" />
        </div>

        <h2
          className="font-serif text-[#ccc] text-center tracking-[-0.02em] mb-20 anim-headline"
          style={{ fontSize: "clamp(28px, 3.5vw, 44px)", lineHeight: 1.2 }}
        >
          Numeros que falam por si
        </h2>

        <div className="overview-numbers-grid grid grid-cols-3 gap-20">
          {metrics.map((m, i) => (
            <div
              key={i}
              className="flex flex-col items-center text-center anim-sub"
              style={{ animationDelay: `${0.3 + i * 0.15}s` }}
            >
              {/* Mini-viz placeholder */}
              <MediaPlaceholder
                label={m.viz}
                hint={`Mini-grafico contextual: ${m.viz} para visualizar '${m.label}'`}
                width="80px"
                height="40px"
                variant="chart"
                className="mb-6 !rounded-lg !text-[10px] !p-1 !border-none !shadow-none !bg-transparent"
              />

              {/* Oversized number */}
              <span
                className="font-serif text-[#d0d0d0] leading-none tracking-[-0.04em]"
                style={{
                  fontSize: "clamp(72px, 9vw, 120px)",
                  textShadow: "0 0 60px rgba(255,255,255,0.03)",
                }}
              >
                {m.number}
              </span>

              <span className="font-sans text-[14px] text-[#666] mt-4 tracking-wide uppercase">
                {m.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
