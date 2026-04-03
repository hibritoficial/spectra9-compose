import MediaPlaceholder from "../../MediaPlaceholder";
import ContentLabel from "../../ContentLabel";
import SimulatedNavbar from "../../SimulatedNavbar";

export default function HeroProduct() {
  return (
    <section className="hero-product hero-section-end relative w-full min-h-screen flex flex-col overflow-hidden">
      {/* Gradient mesh — off-center, aligned with headline */}
      <div className="absolute inset-0 z-0 hero-product-mesh" />

      <SimulatedNavbar />

      <div className="hero-product-grid relative z-10 w-full mx-auto flex-1 items-center py-20"
        style={{ maxWidth: 1440, paddingLeft: 80, paddingRight: 80 }}>

        {/* Text column */}
        <div className="flex flex-col">
          <div className="content-label-container mb-2">
            <ContentLabel text="Badge de contexto — ex: Plataforma SaaS, Consultoria, etc." />
          </div>

          <span className="font-mono text-[12px] text-[#555] tracking-[0.15em] uppercase mb-3 anim-badge">
            Plataforma de inteligência editorial
          </span>

          {/* Separator under badge */}
          <div className="editorial-line mb-10 anim-fade-in" style={{ animationDelay: "0.1s" }} />

          <div className="content-label-container mb-2">
            <ContentLabel text="Headline principal — proposta de valor" />
          </div>

          <h1
            className="hero-headline font-serif text-[#e8e8e8] tracking-[-0.04em] mb-10 anim-slide-right"
            style={{
              textShadow: "0 0 80px rgba(255,255,255,0.03)",
            }}
          >
            Lorem ipsum dolor sit amet
          </h1>

          <div className="content-label-container mb-2">
            <ContentLabel text="Descrição do produto em 2 frases" />
          </div>

          <p className="font-sans text-[18px] text-[#777] leading-[1.75] max-w-[460px] mb-12 anim-sub">
            Vestibulum ante ipsum primis in faucibus orci luctus et ultrices
            posuere cubilia curae. Sed non velit.
          </p>

          <div className="content-label-container mb-3">
            <ContentLabel text="CTAs — ação principal + ação secundária" />
          </div>

          <div className="hero-ctas flex gap-4">
            <button
              className="font-sans text-[15px] font-medium rounded-full tracking-wide anim-cta-1"
              style={{ padding: "16px 36px", background: "#e0e0e0", color: "#0A0A0A" }}
            >
              Começar grátis
            </button>
            <button
              className="font-sans text-[15px] rounded-full tracking-wide anim-cta-2"
              style={{ padding: "16px 36px", border: "1px solid rgba(255,255,255,0.12)", color: "#999" }}
            >
              Ver demo
            </button>
          </div>
        </div>

        {/* Product mini-screen — with perspective and simulated UI */}
        <div className="hero-product-media flex flex-col items-center justify-center">
          <div
            className="anim-media"
            style={{
              transform: "perspective(1200px) rotateY(-5deg) rotateX(2deg)",
              width: "100%",
            }}
          >
            <MediaPlaceholder
              label="product mini-screen"
              hint="Mini-screen do produto em perspectiva isométrica. UI funcional estilizada, fundo escuro, accent da marca."
              width="100%"
              height="480px"
              variant="screen"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
