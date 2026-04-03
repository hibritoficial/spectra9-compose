import ContentLabel from "../../ContentLabel";
import MediaPlaceholder from "../../MediaPlaceholder";

const items = [
  { title: "Velocidade", desc: "Deploys instantâneos. Zero downtime. Infraestrutura global distribuída." },
  { title: "Simplicidade", desc: "Interface intuitiva que não exige treinamento. Comece em minutos." },
  { title: "Integração", desc: "Conecte com suas ferramentas favoritas. API aberta e documentada." },
];

export default function OverviewIcons() {
  return (
    <section className="hero-section-end relative w-full overflow-hidden" style={{ padding: "120px 0" }}>
      <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(255,255,255,0.015) 0%, transparent 60%)" }} />

      <div className="relative z-10 max-w-[1100px] mx-auto px-20">
        <div className="content-label-container mb-3 text-center">
          <ContentLabel text="Título da seção (opcional)" />
        </div>

        <div className="overview-icons-grid grid grid-cols-3 gap-12">
          {items.map((item, i) => (
            <div
              key={i}
              className="flex flex-col items-center text-center anim-sub"
              style={{ animationDelay: `${0.2 + i * 0.1}s` }}
            >
              <MediaPlaceholder
                label="icon"
                hint={`Ícone que sintetize '${item.title}'. Custom SVG preferível a genérico`}
                width="48px"
                height="48px"
                variant="chart"
                className="mb-8 !rounded-xl !border-none !shadow-none !bg-transparent"
              />

              <h3 className="font-sans text-[20px] font-medium text-[#ddd] mb-3">{item.title}</h3>
              <p className="font-sans text-[14px] text-[#777] leading-[1.7] max-w-[280px]">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
