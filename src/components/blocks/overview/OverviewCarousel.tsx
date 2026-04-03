import ContentLabel from "../../ContentLabel";
import MediaPlaceholder from "../../MediaPlaceholder";

const cards = [
  { num: "01", title: "Velocidade real", desc: "Deploy em segundos, não horas. Infraestrutura otimizada.", metric: "0.3s" },
  { num: "02", title: "Escala automática", desc: "Cresce com você sem intervenção manual.", metric: "10x" },
  { num: "03", title: "Analytics nativo", desc: "Dados em tempo real integrados ao fluxo.", metric: "24/7" },
  { num: "04", title: "API-first", desc: "Tudo acessível via API documentada e versionada.", metric: "v3" },
  { num: "05", title: "Segurança", desc: "Criptografia ponta-a-ponta e compliance.", metric: "SOC2" },
];

export default function OverviewCarousel() {
  return (
    <section className="hero-section-end relative w-full overflow-hidden" style={{ padding: "120px 0" }}>
      {/* Subtle mesh */}
      <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 50% 40% at 30% 50%, rgba(255,255,255,0.02) 0%, transparent 60%)" }} />

      <div className="relative z-10 max-w-[1440px] mx-auto px-20">
        <div className="content-label-container mb-3">
          <ContentLabel text="Titulo da secao — max 5 palavras" />
        </div>

        <h2
          className="font-serif text-[#e0e0e0] tracking-[-0.03em] mb-16 anim-headline"
          style={{ fontSize: "clamp(36px, 4vw, 48px)", lineHeight: 1.1 }}
        >
          Conheca o ecossistema
        </h2>

        {/* Horizontal scroll container */}
        <div className="flex gap-6 overflow-x-auto pb-6" style={{ scrollSnapType: "x mandatory", scrollbarWidth: "none" }}>
          {cards.map((card, i) => (
            <div
              key={i}
              className="shrink-0 flex flex-col anim-sub"
              style={{
                width: 280,
                padding: "32px 28px",
                background: "#141414",
                border: "1px solid rgba(255,255,255,0.06)",
                borderRadius: 16,
                scrollSnapAlign: "start",
                animationDelay: `${0.3 + i * 0.08}s`,
                boxShadow: "0 4px 24px rgba(0,0,0,0.3), 0 16px 64px rgba(0,0,0,0.15)",
              }}
            >
              {/* Number watermark */}
              <span className="font-serif text-[#1a1a1a] leading-none mb-4" style={{ fontSize: 80 }}>
                {card.num}
              </span>

              {/* Icon placeholder */}
              <MediaPlaceholder
                label="icon"
                hint={`Icone ou numero que represente visualmente '${card.title}'`}
                width="80px"
                height="80px"
                variant="chart"
                className="mb-6 !rounded-xl"
              />

              <h3 className="font-sans text-[20px] font-medium text-[#ddd] mb-2">{card.title}</h3>
              <p className="font-sans text-[14px] text-[#777] leading-[1.65] mb-4">{card.desc}</p>

              {card.metric && (
                <span className="font-mono text-[13px] text-[#555] tracking-wider">{card.metric}</span>
              )}
            </div>
          ))}

          {/* Peek card — partially visible */}
          <div className="shrink-0 w-[60px]" />
        </div>
      </div>
    </section>
  );
}
