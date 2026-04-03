import MediaPlaceholder from "../../MediaPlaceholder";
import ContentLabel from "../../ContentLabel";
import SimulatedNavbar from "../../SimulatedNavbar";

export default function HeroVideo() {
  return (
    <section className="hero-video hero-section-end relative w-full h-screen flex flex-col overflow-hidden">
      {/* Full-screen video placeholder — fills entire section */}
      <div className="absolute inset-0 z-0 anim-fade-in">
        <MediaPlaceholder
          label="full-screen looping video"
          hint="Video looping 15-30s. Movimento lento e cinematografico. Overlay escuro 60% para legibilidade."
          width="100%"
          height="100%"
          variant="video"
          className="!rounded-none !border-none !shadow-none"
        />
        {/* Cinematic overlay */}
        <div
          className="absolute inset-0 anim-overlay"
          style={{
            background:
              "linear-gradient(180deg, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.35) 40%, rgba(0,0,0,0.6) 100%)",
          }}
        />
      </div>

      {/* Central play icon — fades when content appears */}
      <div className="absolute inset-0 z-[5] flex items-center justify-center pointer-events-none">
        <div
          className="anim-fade-in"
          style={{
            opacity: 0.15,
            animationDelay: "0s",
          }}
        >
          <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
            <circle cx="40" cy="40" r="39" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
            <path d="M32 24L56 40L32 56V24Z" fill="rgba(255,255,255,0.3)" />
          </svg>
        </div>
      </div>

      <SimulatedNavbar />

      <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-center max-w-[900px] mx-auto px-20">
        <div className="content-label-container mb-4">
          <ContentLabel text="Headline principal — o video contextualiza" />
        </div>

        <h1
          className="hero-headline font-serif text-white tracking-[-0.04em] mb-10 anim-headline"
          style={{
            textShadow:
              "0 2px 40px rgba(0,0,0,0.5), 0 0 120px rgba(255,255,255,0.04)",
          }}
        >
          Lorem ipsum dolor sit amet
        </h1>

        <div className="content-label-container mb-2">
          <ContentLabel text="Descricao curta — 1 a 2 frases" />
        </div>

        <p className="font-sans text-[18px] text-[#bbb] leading-[1.75] max-w-[480px] mb-12 anim-sub">
          Curabitur blandit tempus consequat. Donec pede justo, fringilla vel,
          aliquet nec, vulputate eget arcu.
        </p>

        <div className="content-label-container mb-3">
          <ContentLabel text="CTA de acao principal" />
        </div>

        <button
          className="hero-cta-btn font-sans text-[15px] font-medium rounded-full tracking-wide anim-scale-in flex items-center gap-3"
          style={{
            padding: "18px 40px",
            background: "white",
            color: "#0A0A0A",
          }}
        >
          <svg width="14" height="16" viewBox="0 0 14 16" fill="none">
            <path d="M0 0L14 8L0 16V0Z" fill="#0A0A0A" />
          </svg>
          Assistir video
        </button>
      </div>

      {/* Play/Pause corner control */}
      <div className="absolute bottom-8 right-8 z-10 anim-fade-in" style={{ animationDelay: "1s" }}>
        <div
          className="w-11 h-11 rounded-full flex items-center justify-center cursor-default"
          style={{
            border: "1px solid rgba(255,255,255,0.15)",
            background: "rgba(255,255,255,0.03)",
          }}
        >
          <svg width="10" height="12" viewBox="0 0 10 12" fill="none" className="ml-0.5">
            <path d="M0 0L10 6L0 12V0Z" fill="rgba(255,255,255,0.4)" />
          </svg>
        </div>
      </div>
    </section>
  );
}
