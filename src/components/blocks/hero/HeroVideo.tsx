import MediaPlaceholder from "../../MediaPlaceholder";
import AnimLabel from "../../AnimLabel";

export default function HeroVideo() {
  return (
    <section className="relative w-full h-screen flex items-center justify-center overflow-hidden">
      {/* Video background */}
      <div className="absolute inset-0 z-0">
        <MediaPlaceholder
          label="full-screen looping video"
          hint="Vídeo looping 15-30s. Movimento lento e cinematográfico. Overlay escuro 60% para legibilidade do texto. Exemplos: time-lapse de escritório, produto em uso, animação 3D abstrata."
          width="100%"
          height="100%"
          className="!rounded-none !border-none"
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/60" />
      </div>

      <div className="relative z-10 flex flex-col items-center text-center max-w-[900px] px-8">
        <AnimLabel text="↑ fade-in 0.6s" className="mb-8" />

        {/* Headline */}
        <h1
          className="font-serif text-white leading-[1.05] tracking-[-0.03em] mb-8"
          style={{ fontSize: "clamp(48px, 8vw, 96px)" }}
        >
          Lorem ipsum dolor sit amet
        </h1>

        <AnimLabel text="↑ text reveal letter-by-letter 1.5s" className="mb-8" />

        {/* Subheadline */}
        <p className="font-sans text-[18px] text-[#bbb] leading-[1.7] max-w-[500px] mb-12">
          Curabitur blandit tempus consequat. Donec pede justo, fringilla vel,
          aliquet nec, vulputate eget arcu.
        </p>

        <AnimLabel text="↑ fade-up 0.5s delay 0.4s" className="mb-8" />

        {/* CTA */}
        <button className="px-10 py-5 bg-white text-[#0A0A0A] font-sans text-[15px] font-medium rounded-lg tracking-wide">
          Assistir vídeo
        </button>

        <AnimLabel text="↑ scale-in 0.4s delay 0.8s" className="mt-4" />
      </div>

      {/* Play/Pause indicator */}
      <div className="absolute bottom-8 right-8 z-10 flex items-center gap-2">
        <AnimLabel text="play/pause" />
        <div className="w-10 h-10 border border-[#555] rounded-full flex items-center justify-center">
          <svg
            width="12"
            height="14"
            viewBox="0 0 12 14"
            fill="none"
            className="ml-0.5"
          >
            <path d="M0 0L12 7L0 14V0Z" fill="#888" />
          </svg>
        </div>
      </div>
    </section>
  );
}
