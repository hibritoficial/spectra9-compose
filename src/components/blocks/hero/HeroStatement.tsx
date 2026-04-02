import MediaPlaceholder from "../../MediaPlaceholder";
import ContentLabel from "../../ContentLabel";

export default function HeroStatement() {
  return (
    <section className="relative w-full min-h-screen flex flex-col items-center justify-center px-8 py-32 overflow-hidden">
      {/* Background placeholder */}
      <div className="absolute inset-0 z-0 anim-fade-in">
        <MediaPlaceholder
          label="gradient mesh background"
          hint="Gradient mesh sutil em tons escuros. Movimentos orgânicos lentos, quase imperceptíveis. Cores: #0A0A0A base com ondulações em #1A1A1A e #111. Animação: morph contínuo de 20s loop."
          width="100%"
          height="100%"
          className="!rounded-none !border-none opacity-30"
        />
      </div>

      <div className="relative z-10 flex flex-col items-center text-center max-w-[1200px]">
        <div className="content-label-container mb-3">
          <ContentLabel text="Headline principal — max 5 palavras, impacto tipográfico" />
        </div>

        {/* Headline */}
        <h1
          className="font-serif text-[#e0e0e0] leading-[1.05] tracking-[-0.03em] mb-16 anim-headline"
          style={{ fontSize: "clamp(64px, 10vw, 120px)" }}
        >
          Lorem ipsum dolor
        </h1>

        <div className="content-label-container mb-2">
          <ContentLabel text="Descrição do produto em 2 frases" />
        </div>

        {/* Subheadline */}
        <p className="font-sans text-[18px] text-[#888] leading-[1.7] max-w-[560px] mb-8 anim-sub">
          Vestibulum ante ipsum primis in faucibus orci luctus. Curabitur
          blandit tempus consequat viverra.
        </p>

        {/* Spacer — extreme vertical generosity */}
        <div className="h-[200px]" />

        <div className="content-label-container mb-2">
          <ContentLabel text="CTAs — ação principal + ação secundária" />
        </div>

        {/* CTAs */}
        <div className="flex gap-4">
          <button className="px-8 py-4 bg-[#e0e0e0] text-[#0A0A0A] font-sans text-[15px] font-medium rounded-lg tracking-wide anim-cta-1">
            Iniciar agora
          </button>
          <button className="px-8 py-4 border border-[#444] text-[#aaa] font-sans text-[15px] rounded-lg tracking-wide anim-cta-2">
            Saiba mais
          </button>
        </div>
      </div>
    </section>
  );
}
