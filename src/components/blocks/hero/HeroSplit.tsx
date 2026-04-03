import MediaPlaceholder from "../../MediaPlaceholder";
import ContentLabel from "../../ContentLabel";
import SimulatedNavbar from "../../SimulatedNavbar";

export default function HeroSplit() {
  return (
    <section className="hero-split hero-section-end relative w-full min-h-screen overflow-hidden">
      {/* Gradient mesh — diagonal, one half lighter */}
      <div className="absolute inset-0 z-0 hero-split-mesh" />

      {/* Navbar — absolute, spanning full width ABOVE both columns */}
      <SimulatedNavbar absolute />

      {/* Text half — push down for navbar */}
      <div className="hero-split-text relative z-10 flex flex-col justify-center" style={{ padding: "96px 80px 80px 80px" }}>
        <div className="content-label-container mb-3">
          <ContentLabel text="Headline principal — proposta ou manifesto" />
        </div>

        <h1
          className="hero-headline font-serif text-[#e8e8e8] tracking-[-0.03em] mb-10 anim-headline"
          style={{ textShadow: "0 0 80px rgba(255,255,255,0.03)" }}
        >
          Lorem ipsum dolor sit amet cons
        </h1>

        <div className="content-label-container mb-2">
          <ContentLabel text="Descrição complementar em 2 frases" />
        </div>

        <p className="font-sans text-[18px] text-[#777] leading-[1.75] max-w-[420px] mb-12 anim-sub">
          Vestibulum ante ipsum primis in faucibus orci luctus et ultrices
          posuere cubilia curae. Etiam sit amet orci eget eros faucibus.
        </p>

        <div className="content-label-container mb-3">
          <ContentLabel text="CTAs — ação principal + ação secundária" />
        </div>

        <div className="hero-ctas flex gap-4">
          <button
            className="font-sans text-[15px] font-medium rounded-full tracking-wide anim-cta-1"
            style={{ padding: "16px 36px", background: "#e0e0e0", color: "#0A0A0A" }}
          >
            Explorar
          </button>
          <button
            className="font-sans text-[15px] rounded-full tracking-wide anim-cta-2"
            style={{ padding: "16px 36px", border: "1px solid rgba(255,255,255,0.12)", color: "#999" }}
          >
            Contato
          </button>
        </div>
      </div>

      {/* Visual half — with subtle border */}
      <div
        className="hero-split-visual relative flex items-center justify-center anim-media-parallax"
        style={{ borderLeft: "1px solid rgba(255,255,255,0.04)" }}
      >
        <MediaPlaceholder
          label="split visual — 50% viewport"
          hint="Imagem, vídeo ou ilustração que ocupa metade exata da viewport. Borda suave com o fundo."
          width="100%"
          height="100%"
          variant="photo"
          className="!rounded-none !border-none !shadow-none"
        />
      </div>
    </section>
  );
}
