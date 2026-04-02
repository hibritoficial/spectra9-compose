import MediaPlaceholder from "../../MediaPlaceholder";
import ContentLabel from "../../ContentLabel";

export default function HeroVideo() {
  return (
    <section className="hero-video relative w-full h-screen flex items-center justify-center overflow-hidden">
      {/* Video background */}
      <div className="absolute inset-0 z-0 anim-fade-in">
        <MediaPlaceholder
          label="full-screen looping video"
          hint="Vídeo looping 15-30s. Movimento lento e cinematográfico. Overlay escuro 60% para legibilidade do texto. Exemplos: time-lapse de escritório, produto em uso, animação 3D abstrata."
          width="100%"
          height="100%"
          className="!rounded-none !border-none"
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/60 anim-overlay" />
      </div>

      <div className="relative z-10 flex flex-col items-center text-center max-w-[900px] px-8">
        <div className="content-label-container mb-3">
          <ContentLabel text="Headline principal — o vídeo contextualiza" />
        </div>

        {/* Headline */}
        <h1 className="hero-headline font-serif text-white leading-[1.05] tracking-[-0.03em] mb-8 anim-headline">
          Lorem ipsum dolor sit amet
        </h1>

        <div className="content-label-container mb-2">
          <ContentLabel text="Descrição curta — 1 a 2 frases" />
        </div>

        {/* Subheadline */}
        <p className="font-sans text-[18px] text-[#bbb] leading-[1.7] max-w-[500px] mb-12 anim-sub">
          Curabitur blandit tempus consequat. Donec pede justo, fringilla vel,
          aliquet nec, vulputate eget arcu.
        </p>

        <div className="content-label-container mb-2">
          <ContentLabel text="CTA de ação principal" />
        </div>

        {/* CTA */}
        <button className="hero-cta-btn px-10 py-5 bg-white text-[#0A0A0A] font-sans text-[15px] font-medium rounded-lg tracking-wide anim-scale-in">
          Assistir vídeo
        </button>
      </div>

      {/* Play/Pause indicator */}
      <div className="absolute bottom-8 right-8 z-10 flex items-center gap-2 anim-fade-in" style={{ animationDelay: "1s" }}>
        <div className="w-10 h-10 border border-[#555] rounded-full flex items-center justify-center hover:border-[#888] transition-colors duration-150">
          <svg width="12" height="14" viewBox="0 0 12 14" fill="none" className="ml-0.5">
            <path d="M0 0L12 7L0 14V0Z" fill="#888" />
          </svg>
        </div>
      </div>
    </section>
  );
}
