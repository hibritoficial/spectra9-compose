import MediaPlaceholder from "../../MediaPlaceholder";
import ContentLabel from "../../ContentLabel";
import SimulatedNavbar from "../../SimulatedNavbar";

export default function HeroStatement() {
  return (
    <section className="hero-statement relative w-full min-h-screen flex flex-col overflow-hidden">
      {/* Background placeholder */}
      <div className="absolute inset-0 z-0 anim-fade-in">
        <MediaPlaceholder
          label="gradient mesh background"
          hint="Gradient mesh sutil em tons escuros. Movimentos organicos lentos, quase imperceptiveis. Cores: #0A0A0A base com ondulacoes em #1A1A1A e #111."
          width="100%"
          height="100%"
          className="!rounded-none !border-none opacity-30"
        />
      </div>

      <SimulatedNavbar />

      <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-center max-w-[1200px] mx-auto px-8 py-32">
        <div className="content-label-container mb-3">
          <ContentLabel text="Headline principal — max 5 palavras, impacto tipografico" />
        </div>

        <h1 className="hero-headline font-serif text-[#e0e0e0] leading-[1.05] tracking-[-0.03em] mb-16 anim-headline">
          Lorem ipsum dolor
        </h1>

        <div className="content-label-container mb-2">
          <ContentLabel text="Descricao do produto em 2 frases" />
        </div>

        <p className="font-sans text-[18px] text-[#888] leading-[1.7] max-w-[560px] mb-8 anim-sub">
          Vestibulum ante ipsum primis in faucibus orci luctus. Curabitur
          blandit tempus consequat viverra.
        </p>

        <div className="hero-spacer" />

        <div className="content-label-container mb-2">
          <ContentLabel text="CTAs — acao principal + acao secundaria" />
        </div>

        <div className="hero-ctas flex gap-4">
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
