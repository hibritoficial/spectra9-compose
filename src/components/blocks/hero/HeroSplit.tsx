import MediaPlaceholder from "../../MediaPlaceholder";
import ContentLabel from "../../ContentLabel";

export default function HeroSplit() {
  return (
    <section className="hero-split relative w-full min-h-screen overflow-hidden">
      {/* Text */}
      <div className="hero-split-text flex flex-col justify-center px-16 py-32">
        <div className="content-label-container mb-2">
          <ContentLabel text="Headline principal — proposta ou manifesto" />
        </div>

        {/* Headline */}
        <h1 className="hero-headline font-serif text-[#e0e0e0] leading-[1.08] tracking-[-0.02em] mb-8 anim-headline">
          Lorem ipsum dolor sit amet cons
        </h1>

        <div className="content-label-container mb-2">
          <ContentLabel text="Descrição complementar em 2 frases" />
        </div>

        {/* Subheadline */}
        <p className="font-sans text-[18px] text-[#888] leading-[1.7] max-w-[440px] mb-12 anim-sub">
          Vestibulum ante ipsum primis in faucibus orci luctus et ultrices
          posuere cubilia curae. Etiam sit amet orci eget eros faucibus.
        </p>

        <div className="content-label-container mb-2">
          <ContentLabel text="CTAs — ação principal + ação secundária" />
        </div>

        {/* CTAs */}
        <div className="hero-ctas flex gap-4">
          <button className="px-8 py-4 bg-[#e0e0e0] text-[#0A0A0A] font-sans text-[15px] font-medium rounded-lg tracking-wide anim-cta-1">
            Explorar
          </button>
          <button className="px-8 py-4 border border-[#444] text-[#aaa] font-sans text-[15px] rounded-lg tracking-wide anim-cta-2">
            Contato
          </button>
        </div>
      </div>

      {/* Visual */}
      <div className="hero-split-visual relative flex items-center justify-center anim-media-parallax">
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
