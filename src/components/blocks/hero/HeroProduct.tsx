import MediaPlaceholder from "../../MediaPlaceholder";
import AnimLabel from "../../AnimLabel";

export default function HeroProduct() {
  return (
    <section className="relative w-full min-h-screen flex items-center overflow-hidden">
      {/* Background placeholder */}
      <div className="absolute inset-0 z-0">
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
          <AnimLabel text="↑ fade-in 0.4s" className="mb-4" />

          {/* Badge */}
          <span className="font-mono text-[12px] text-[#666] tracking-[0.15em] uppercase mb-8">
            Plataforma de inteligência editorial
          </span>

          <AnimLabel text="↑ slide-right 0.6s" className="mb-3" />

          {/* Headline */}
          <h1
            className="font-serif text-[#e0e0e0] leading-[1.05] tracking-[-0.03em] mb-8"
            style={{ fontSize: "clamp(48px, 7vw, 96px)" }}
          >
            Lorem ipsum dolor sit amet
          </h1>

          <AnimLabel text="↑ clip-path reveal 1s" className="mb-6" />

          {/* Subheadline */}
          <p className="font-sans text-[18px] text-[#888] leading-[1.7] max-w-[480px] mb-12">
            Vestibulum ante ipsum primis in faucibus orci luctus et ultrices
            posuere cubilia curae. Sed non velit.
          </p>

          <AnimLabel text="↑ fade-up 0.5s delay 0.3s" className="mb-8" />

          {/* CTAs */}
          <div className="flex gap-4">
            <button className="px-8 py-4 bg-[#e0e0e0] text-[#0A0A0A] font-sans text-[15px] font-medium rounded-lg tracking-wide">
              Começar grátis
            </button>
            <button className="px-8 py-4 border border-[#444] text-[#aaa] font-sans text-[15px] rounded-lg tracking-wide">
              Ver demo
            </button>
          </div>

          <AnimLabel text="↑ stagger fade-up 0.3s delay 0.5s" className="mt-4" />
        </div>

        {/* Right — Product visual */}
        <div className="flex flex-col items-end">
          <AnimLabel text="↓ scale-in 0.8s + internal stagger" className="mb-4" />
          <MediaPlaceholder
            label="product mini-screen"
            hint="Mini-screen do produto principal em perspectiva isométrica. UI funcional estilizada, não screenshot. Fundo escuro, accent da marca. Animação: elementos internos aparecem com stagger ao entrar no viewport."
            width="100%"
            height="500px"
          />
        </div>
      </div>
    </section>
  );
}
