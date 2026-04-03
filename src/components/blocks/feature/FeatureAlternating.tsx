import ContentLabel from "../../ContentLabel";
import MediaPlaceholder from "../../MediaPlaceholder";

const features = [
  { headline: "Editor visual inteligente", body: "Arraste, solte, personalize. Cada componente se adapta ao contexto. Zero codigo, resultado profissional.", cta: "Ver em acao" },
  { headline: "Colaboracao em tempo real", body: "Trabalhe em equipe simultaneamente. Comentarios, versoes, aprovacoes — tudo no mesmo lugar.", cta: "Saiba mais" },
  { headline: "Analytics integrado", body: "Cada pagina, cada bloco, cada CTA rastreado automaticamente. Dashboards que geram insight, nao so dados.", cta: null },
];

export default function FeatureAlternating() {
  return (
    <section className="hero-section-end relative w-full overflow-hidden" style={{ padding: "120px 0" }}>
      <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, transparent 0%, rgba(255,255,255,0.01) 50%, transparent 100%)" }} />

      <div className="relative z-10 max-w-[1200px] mx-auto px-20">
        <div className="content-label-container mb-3">
          <ContentLabel text="Titulo da secao (opcional)" />
        </div>

        <h2
          className="font-serif text-[#ccc] tracking-[-0.02em] mb-6 anim-headline"
          style={{ fontSize: "clamp(28px, 3.5vw, 44px)", lineHeight: 1.2 }}
        >
          Como funciona
        </h2>

        <div className="content-label-container mb-16">
          <ContentLabel text="Subtitulo da secao (opcional)" />
        </div>

        {/* Feature rows — alternating sides */}
        <div className="flex flex-col" style={{ gap: 120 }}>
          {features.map((feat, i) => {
            const reversed = i % 2 === 1;
            return (
              <div
                key={i}
                className="grid items-center anim-sub"
                style={{
                  gridTemplateColumns: "55% 45%",
                  direction: reversed ? "rtl" : "ltr",
                  animationDelay: `${0.2 + i * 0.15}s`,
                  gap: 64,
                }}
              >
                {/* Text side */}
                <div style={{ direction: "ltr" }}>
                  <div className="content-label-container mb-2">
                    <ContentLabel text={`Feature ${i + 1} — headline + body + CTA`} />
                  </div>

                  <h3
                    className="font-serif text-[#e0e0e0] tracking-[-0.02em] mb-5"
                    style={{ fontSize: "clamp(24px, 2.5vw, 32px)", lineHeight: 1.15 }}
                  >
                    {feat.headline}
                  </h3>

                  <p className="font-sans text-[16px] text-[#888] leading-[1.75] max-w-[420px] mb-6">
                    {feat.body}
                  </p>

                  {feat.cta && (
                    <span className="font-sans text-[14px] text-[#999] cursor-default" style={{ borderBottom: "1px solid rgba(255,255,255,0.15)", paddingBottom: 2 }}>
                      {feat.cta} &rarr;
                    </span>
                  )}
                </div>

                {/* Media side */}
                <div style={{ direction: "ltr" }}>
                  <MediaPlaceholder
                    label={`feature ${i + 1} visual`}
                    hint={`Mini-screen do produto mostrando '${feat.headline}' em acao, ou imagem demonstrando o conceito`}
                    width="100%"
                    height="340px"
                    variant="screen"
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
