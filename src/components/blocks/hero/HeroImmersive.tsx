import MediaPlaceholder from "../../MediaPlaceholder";
import ContentLabel from "../../ContentLabel";
import SimulatedNavbar from "../../SimulatedNavbar";

export default function HeroImmersive() {
  return (
    <section className="hero-immersive hero-section-end relative w-full h-screen flex flex-col overflow-hidden">
      {/* Full-bleed visual background */}
      <div className="absolute inset-0 z-0 anim-fade-in">
        <MediaPlaceholder
          label="imagem ou video full-bleed"
          hint="Fotografia premium full-bleed, video slow-motion, ou composicao 3D. A imagem deve comunicar a essencia da marca."
          width="100%"
          height="100%"
          variant="photo"
          className="!rounded-none !border-none !shadow-none"
        />
      </div>

      {/* Dramatic multi-point gradient overlay */}
      <div
        className="absolute inset-0 z-[1] anim-overlay"
        style={{
          background:
            "linear-gradient(180deg, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.55) 40%, rgba(0,0,0,0.75) 70%, rgba(0,0,0,0.88) 100%)",
        }}
      />

      {/* Extra dramatic mesh — most visual of all heroes */}
      <div className="absolute inset-0 z-[2] hero-immersive-mesh" />

      {/* Subtle particle dots — CSS pseudo */}
      <div
        className="absolute inset-0 z-[2] pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10">
        <SimulatedNavbar />
      </div>

      <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-center max-w-[900px] mx-auto px-20">
        <div className="content-label-container mb-4">
          <ContentLabel text="Seu headline principal — a imagem fala primeiro" />
        </div>

        {/* Headline — strong z-separation via shadow */}
        <h1
          className="hero-headline font-serif text-white tracking-[-0.04em] mb-10 anim-headline"
          style={{
            textShadow:
              "0 4px 60px rgba(0,0,0,0.6), 0 0 120px rgba(255,255,255,0.05), 0 1px 3px rgba(0,0,0,0.4)",
          }}
        >
          Lorem ipsum dolor sit amet
        </h1>

        <div className="content-label-container mb-2">
          <ContentLabel text="Descricao curta — 1 a 2 frases de apoio" />
        </div>

        <p
          className="font-sans text-[18px] leading-[1.75] max-w-[500px] mb-12 anim-sub"
          style={{ color: "rgba(255,255,255,0.75)" }}
        >
          Curabitur blandit tempus consequat. Donec pede justo, fringilla vel,
          aliquet nec, vulputate eget arcu.
        </p>

        <div className="content-label-container mb-3">
          <ContentLabel text="CTA de acao principal" />
        </div>

        <button
          className="hero-cta-btn font-sans text-[15px] font-medium rounded-full tracking-wide anim-scale-in"
          style={{
            padding: "18px 44px",
            background: "white",
            color: "#0A0A0A",
            boxShadow: "0 4px 32px rgba(0,0,0,0.3)",
          }}
        >
          Descobrir mais
        </button>
      </div>
    </section>
  );
}
