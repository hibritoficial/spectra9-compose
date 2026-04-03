import ContentLabel from "../../ContentLabel";
import MediaPlaceholder from "../../MediaPlaceholder";

const features = [
  { title: "Deploy rapido", desc: "Push para produção em segundos. CI/CD integrado." },
  { title: "Multi-tenant", desc: "Isolamento completo entre workspaces. Dados nunca cruzam." },
  { title: "Webhooks", desc: "Eventos em tempo real para todas as ações da plataforma." },
  { title: "Auditoria", desc: "Log completo de toda ação. Compliance pronto." },
  { title: "Custom domains", desc: "Dominio proprio por workspace com SSL automatico." },
  { title: "Role-based access", desc: "Controle granular de permissões por funcionalidade." },
];

export default function FeatureGrid() {
  return (
    <section className="hero-section-end relative w-full overflow-hidden" style={{ padding: "120px 0" }}>
      <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 50% 40% at 50% 50%, rgba(255,255,255,0.015) 0%, transparent 50%)" }} />

      <div className="relative z-10 max-w-[1100px] mx-auto px-20 block-container">
        <div className="content-label-container mb-3 text-center">
          <ContentLabel text="Titulo da secao de features" />
        </div>

        <h2
          className="font-serif text-[#ccc] text-center tracking-[-0.02em] mb-4 anim-headline"
          style={{ fontSize: "clamp(28px, 3.5vw, 44px)", lineHeight: 1.2 }}
        >
          Tudo que voce precisa
        </h2>

        <div className="content-label-container mb-16 text-center">
          <ContentLabel text="Subtitulo (opcional)" />
        </div>

        <div className="feature-grid-cards">
          {features.map((feat, i) => (
            <div
              key={i}
              className="flex flex-col p-7 rounded-2xl anim-sub transition-colors duration-200 cursor-default"
              style={{
                background: "#111",
                border: "1px solid rgba(255,255,255,0.04)",
                animationDelay: `${0.2 + i * 0.08}s`,
              }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"; e.currentTarget.style.background = "#141414"; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.04)"; e.currentTarget.style.background = "#111"; }}
            >
              <MediaPlaceholder
                label="icon"
                hint={`Icone que sintetize '${feat.title}'`}
                width="32px"
                height="32px"
                variant="chart"
                className="mb-5 !rounded-lg !border-none !shadow-none !bg-transparent !p-0"
              />

              <h4 className="font-sans text-[18px] font-medium text-[#ddd] mb-2">{feat.title}</h4>
              <p className="font-sans text-[14px] text-[#777] leading-[1.65]">{feat.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
