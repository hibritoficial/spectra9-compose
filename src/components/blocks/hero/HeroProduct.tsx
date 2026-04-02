import MediaPlaceholder from "../../MediaPlaceholder";
import ContentLabel from "../../ContentLabel";

export default function HeroProduct() {
  return (
    <section className="relative w-full min-h-screen flex items-center overflow-hidden">
      {/* Background placeholder */}
      <div className="absolute inset-0 z-0 anim-fade-in">
        <MediaPlaceholder
          label="gradient mesh background"
          hint="Gradient mesh radial partindo do centro-esquerda. Tons: #0A0A0A a #151515 com halo sutil. Animação: breathing lento 15s."
          width="100%"
          height="100%"
          className="!rounded-none !border-none opacity-20"
        />
      </div>

      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-12 py-32 grid grid-cols-[1fr_0.66fr] gap-16 items-center">
        {/* Left — Text */}
        <div className="flex flex-col">
          <div className="content-label-container mb-2">
            <ContentLabel text="Badge de contexto — ex: Plataforma SaaS, Consultoria, etc." />
          </div>

          {/* Badge */}
          <span className="font-mono text-[12px] text-[#666] tracking-[0.15em] uppercase mb-8 anim-badge">
            Plataforma de inteligência editorial
          </span>

          <div className="content-label-container mb-2">
            <ContentLabel text="Headline principal — proposta de valor" />
          </div>

          {/* Headline */}
          <h1
            className="font-serif text-[#e0e0e0] leading-[1.05] tracking-[-0.03em] mb-8 anim-slide-right"
            style={{ fontSize: "clamp(48px, 7vw, 96px)" }}
          >
            Lorem ipsum dolor sit amet
          </h1>

          <div className="content-label-container mb-2">
            <ContentLabel text="Descrição do produto em 2 frases" />
          </div>

          {/* Subheadline */}
          <p className="font-sans text-[18px] text-[#888] leading-[1.7] max-w-[480px] mb-12 anim-sub">
            Vestibulum ante ipsum primis in faucibus orci luctus et ultrices
            posuere cubilia curae. Sed non velit.
          </p>

          <div className="content-label-container mb-2">
            <ContentLabel text="CTAs — ação principal + ação secundária" />
          </div>

          {/* CTAs */}
          <div className="flex gap-4">
            <button className="px-8 py-4 bg-[#e0e0e0] text-[#0A0A0A] font-sans text-[15px] font-medium rounded-lg tracking-wide anim-cta-1">
              Começar grátis
            </button>
            <button className="px-8 py-4 border border-[#444] text-[#aaa] font-sans text-[15px] rounded-lg tracking-wide anim-cta-2">
              Ver demo
            </button>
          </div>
        </div>

        {/* Right — Product visual */}
        <div className="flex flex-col items-end">
          <MediaPlaceholder
            label="product mini-screen"
            hint="Mini-screen do produto principal em perspectiva isométrica. UI funcional estilizada, não screenshot. Fundo escuro, accent da marca. Animação: elementos internos aparecem com stagger ao entrar no viewport."
            width="100%"
            height="500px"
            className="anim-media"
          />
        </div>
      </div>
    </section>
  );
}
