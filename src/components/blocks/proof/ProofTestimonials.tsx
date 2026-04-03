import ContentLabel from "../../ContentLabel";
import MediaPlaceholder from "../../MediaPlaceholder";

const testimonials = [
  { quote: "Transformou completamente nossa operacao. O que levava dias agora acontece em minutos. A equipe nao volta mais ao processo antigo.", name: "Ana Oliveira", role: "Head de Produto", company: "TechCo" },
  { quote: "A melhor decisao que tomamos em 2025. ROI positivo no primeiro mes. Suporte excepcional quando precisamos.", name: "Carlos Santos", role: "CEO", company: "StartupXYZ" },
  { quote: "Interface intuitiva e resultados consistentes. Nosso time de 40 pessoas adotou sem treinamento formal.", name: "Marina Costa", role: "Diretora de Ops", company: "AgencyPlus" },
];

export default function ProofTestimonials() {
  return (
    <section className="hero-section-end relative w-full overflow-hidden" style={{ padding: "120px 0" }}>
      <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 60% 40% at 50% 50%, rgba(255,255,255,0.015) 0%, transparent 60%)" }} />

      <div className="relative z-10 max-w-[1200px] mx-auto px-20">
        <div className="content-label-container mb-3 text-center">
          <ContentLabel text="Titulo da secao (opcional)" />
        </div>

        <h2
          className="font-serif text-[#ccc] text-center tracking-[-0.02em] mb-16 anim-headline"
          style={{ fontSize: "clamp(28px, 3.5vw, 44px)", lineHeight: 1.2 }}
        >
          Quem usa, recomenda
        </h2>

        <div className="grid grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="flex flex-col p-8 rounded-2xl anim-sub"
              style={{
                background: "rgba(255,255,255,0.02)",
                border: "1px solid rgba(255,255,255,0.05)",
                backdropFilter: "blur(8px)",
                animationDelay: `${0.2 + i * 0.1}s`,
              }}
            >
              {/* Quote */}
              <p className="font-serif text-[16px] text-[#bbb] leading-[1.75] mb-8" style={{ fontStyle: "italic" }}>
                &ldquo;{t.quote}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center gap-4 mt-auto">
                <MediaPlaceholder
                  label="foto"
                  hint={`Foto profissional de ${t.name} — rosto, fundo neutro, boa iluminacao`}
                  width="48px"
                  height="48px"
                  variant="photo"
                  className="!rounded-full shrink-0"
                />

                <div>
                  <span className="font-sans text-[15px] text-[#ddd] block">{t.name}</span>
                  <span className="font-sans text-[13px] text-[#666]">{t.role}, {t.company}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
