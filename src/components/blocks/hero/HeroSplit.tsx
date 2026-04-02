import MediaPlaceholder from "../../MediaPlaceholder";
import AnimLabel from "../../AnimLabel";

export default function HeroSplit() {
  return (
    <section className="relative w-full min-h-screen grid grid-cols-2 overflow-hidden">
      {/* Left — Text */}
      <div className="flex flex-col justify-center px-16 py-32">
        <AnimLabel text="↑ fade-in 0.4s" className="mb-6" />

        {/* Headline */}
        <h1
          className="font-serif text-[#e0e0e0] leading-[1.08] tracking-[-0.02em] mb-8"
          style={{ fontSize: "clamp(40px, 5.5vw, 80px)" }}
        >
          Lorem ipsum dolor sit amet cons
        </h1>

        <AnimLabel text="↑ clip-path reveal 1s" className="mb-4" />

        {/* Subheadline */}
        <p className="font-sans text-[18px] text-[#888] leading-[1.7] max-w-[440px] mb-12">
          Vestibulum ante ipsum primis in faucibus orci luctus et ultrices
          posuere cubilia curae. Etiam sit amet orci eget eros faucibus.
        </p>

        <AnimLabel text="↑ fade-up 0.5s delay 0.3s" className="mb-8" />

        {/* CTAs */}
        <div className="flex gap-4">
          <button className="px-8 py-4 bg-[#e0e0e0] text-[#0A0A0A] font-sans text-[15px] font-medium rounded-lg tracking-wide">
            Explorar
          </button>
          <button className="px-8 py-4 border border-[#444] text-[#aaa] font-sans text-[15px] rounded-lg tracking-wide">
            Contato
          </button>
        </div>

        <AnimLabel text="↑ stagger fade-up 0.3s delay 0.5s" className="mt-4" />
      </div>

      {/* Right — Visual */}
      <div className="relative flex items-center justify-center">
        <AnimLabel
          text="↓ parallax-in 1s ease-out"
          className="absolute top-8 left-8 z-10"
        />
        <MediaPlaceholder
          label="split visual — 50% viewport"
          hint="Imagem, vídeo ou ilustração que ocupa metade exata da viewport. Pode ser fotografia de equipe, produto em uso, ou composição visual abstrata. Borda suave com o fundo (sem corte duro)."
          width="100%"
          height="100%"
          className="!rounded-none"
        />
      </div>
    </section>
  );
}
