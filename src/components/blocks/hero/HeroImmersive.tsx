import MediaPlaceholder from "../../MediaPlaceholder";
import ContentLabel from "../../ContentLabel";

export default function HeroImmersive() {
  return (
    <section className="relative w-full h-screen flex items-center justify-center overflow-hidden">
      {/* Full-screen visual background */}
      <div className="absolute inset-0 z-0 anim-fade-in">
        <MediaPlaceholder
          label="imagem ou vídeo full-bleed"
          hint="Fotografia premium full-bleed, vídeo slow-motion, ou composição 3D. A imagem deve comunicar a essência da marca antes de qualquer texto ser lido. Overlay gradient escuro (60-70% opacity) garante legibilidade."
          width="100%"
          height="100%"
          className="!rounded-none !border-none"
        />
        {/* Gradient overlay for legibility */}
        <div
          className="absolute inset-0 anim-overlay"
          style={{
            background:
              "linear-gradient(180deg, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.7) 60%, rgba(0,0,0,0.85) 100%)",
          }}
        />
      </div>

      {/* Text content overlay */}
      <div className="relative z-10 flex flex-col items-center text-center max-w-[900px] px-8">
        <div className="content-label-container mb-3">
          <ContentLabel text="Seu headline principal — a imagem fala primeiro" />
        </div>

        {/* Headline */}
        <h1
          className="font-serif text-white leading-[1.05] tracking-[-0.03em] mb-8 anim-headline"
          style={{
            fontSize: "clamp(48px, 8vw, 96px)",
            textShadow: "0 2px 40px rgba(0,0,0,0.5)",
          }}
        >
          Lorem ipsum dolor sit amet
        </h1>

        <div className="content-label-container mb-2">
          <ContentLabel text="Descrição curta — 1 a 2 frases de apoio" />
        </div>

        {/* Subheadline */}
        <p className="font-sans text-[18px] text-[#ccc] leading-[1.7] max-w-[520px] mb-12 anim-sub">
          Curabitur blandit tempus consequat. Donec pede justo, fringilla vel,
          aliquet nec, vulputate eget arcu.
        </p>

        {/* CTA */}
        <div className="content-label-container mb-2">
          <ContentLabel text="CTA de ação principal" />
        </div>
        <button className="px-10 py-5 bg-white text-[#0A0A0A] font-sans text-[15px] font-medium rounded-lg tracking-wide anim-scale-in">
          Descobrir mais
        </button>
      </div>
    </section>
  );
}
