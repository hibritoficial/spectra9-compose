import MediaPlaceholder from "../../MediaPlaceholder";
import ContentLabel from "../../ContentLabel";
import SimulatedNavbar from "../../SimulatedNavbar";

export default function HeroStatement() {
  return (
    <section className="hero-statement hero-section-end relative w-full min-h-screen flex flex-col overflow-hidden">
      {/* Gradient mesh — centered radial, symmetric like the layout */}
      <div className="absolute inset-0 z-0 hero-statement-mesh" />

      {/* Background atmosphere */}
      <div className="absolute inset-0 z-0 anim-fade-in">
        <MediaPlaceholder
          label="gradient mesh background"
          hint="Gradient mesh sutil em tons escuros. Movimentos organicos lentos, quase imperceptiveis."
          width="100%"
          height="100%"
          className="!rounded-none !border-none !shadow-none opacity-20"
        />
      </div>

      <SimulatedNavbar />

      <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-20 py-32"
        style={{ maxWidth: 1200, margin: "0 auto", width: "100%" }}>

        <div className="content-label-container mb-4">
          <ContentLabel text="Headline principal — max 5 palavras, impacto tipografico" />
        </div>

        {/* Editorial separator above headline */}
        <div className="editorial-line mb-10 anim-fade-in" />

        {/* Headline — MASSIVE, the only visual element */}
        <h1
          className="hero-headline font-serif text-[#e8e8e8] tracking-[-0.04em] anim-headline"
          style={{
            textShadow: "0 0 120px rgba(255,255,255,0.04), 0 0 40px rgba(255,255,255,0.02)",
          }}
        >
          Lorem ipsum dolor
        </h1>

        {/* Gap: headline to sub */}
        <div style={{ height: 40 }} />

        <div className="content-label-container mb-3">
          <ContentLabel text="Descricao do produto em 2 frases" />
        </div>

        <p className="font-sans text-[18px] text-[#777] leading-[1.75] max-w-[520px] anim-sub">
          Vestibulum ante ipsum primis in faucibus orci luctus. Curabitur
          blandit tempus consequat viverra.
        </p>

        {/* Gap: sub to CTAs */}
        <div style={{ height: 56 }} />

        <div className="content-label-container mb-3">
          <ContentLabel text="CTAs — acao principal + acao secundaria" />
        </div>

        <div className="hero-ctas flex gap-5">
          <button
            className="font-sans text-[15px] font-medium rounded-full tracking-wide anim-cta-1"
            style={{
              padding: "18px 40px",
              background: "#e0e0e0",
              color: "#0A0A0A",
            }}
          >
            Iniciar agora
          </button>
          <button
            className="font-sans text-[15px] rounded-full tracking-wide anim-cta-2"
            style={{
              padding: "18px 40px",
              border: "1px solid rgba(255,255,255,0.12)",
              color: "#999",
            }}
          >
            Saiba mais
          </button>
        </div>
      </div>
    </section>
  );
}
