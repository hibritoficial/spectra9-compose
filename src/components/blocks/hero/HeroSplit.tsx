import MediaPlaceholder from "../../MediaPlaceholder";
import ContentLabel from "../../ContentLabel";
import SimulatedNavbar from "../../SimulatedNavbar";

export default function HeroSplit() {
  return (
    <section className="hero-split relative w-full min-h-screen overflow-hidden">
      <div className="hero-split-text flex flex-col justify-center px-16 py-32">
        <SimulatedNavbar />

        <div className="content-label-container mb-2 mt-8">
          <ContentLabel text="Headline principal — proposta ou manifesto" />
        </div>

        <h1 className="hero-headline font-serif text-[#e0e0e0] leading-[1.08] tracking-[-0.02em] mb-8 anim-headline">
          Lorem ipsum dolor sit amet cons
        </h1>

        <div className="content-label-container mb-2">
          <ContentLabel text="Descricao complementar em 2 frases" />
        </div>

        <p className="font-sans text-[18px] text-[#888] leading-[1.7] max-w-[440px] mb-12 anim-sub">
          Vestibulum ante ipsum primis in faucibus orci luctus et ultrices
          posuere cubilia curae. Etiam sit amet orci eget eros faucibus.
        </p>

        <div className="content-label-container mb-2">
          <ContentLabel text="CTAs — acao principal + acao secundaria" />
        </div>

        <div className="hero-ctas flex gap-4">
          <button className="px-8 py-4 bg-[#e0e0e0] text-[#0A0A0A] font-sans text-[15px] font-medium rounded-lg tracking-wide anim-cta-1">
            Explorar
          </button>
          <button className="px-8 py-4 border border-[#444] text-[#aaa] font-sans text-[15px] rounded-lg tracking-wide anim-cta-2">
            Contato
          </button>
        </div>
      </div>

      <div className="hero-split-visual relative flex items-center justify-center anim-media-parallax">
        <MediaPlaceholder
          label="split visual — 50% viewport"
          hint="Imagem, video ou ilustracao que ocupa metade exata da viewport. Borda suave com o fundo."
          width="100%"
          height="100%"
          className="!rounded-none"
        />
      </div>
    </section>
  );
}
