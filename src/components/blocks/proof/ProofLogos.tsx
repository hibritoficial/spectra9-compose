import ContentLabel from "../../ContentLabel";
import MediaPlaceholder from "../../MediaPlaceholder";

const logos = Array.from({ length: 12 }, (_, i) => ({
  name: `Empresa ${String(i + 1).padStart(2, "0")}`,
}));

export default function ProofLogos() {
  return (
    <section className="hero-section-end relative w-full overflow-hidden" style={{ padding: "80px 0" }}>
      <div className="relative z-10 max-w-[1100px] mx-auto px-20">
        <div className="content-label-container mb-4 text-center">
          <ContentLabel text="Texto discreto — ex: Empresas que confiam" />
        </div>

        <p className="font-mono text-[12px] text-[#555] text-center tracking-[0.15em] uppercase mb-12 anim-fade-in">
          Empresas que confiam
        </p>

        {/* Logo grid */}
        <div className="grid grid-cols-6 gap-x-12 gap-y-10 items-center justify-items-center">
          {logos.map((logo, i) => (
            <div
              key={i}
              className="flex items-center justify-center anim-sub transition-opacity duration-200 cursor-pointer"
              style={{
                opacity: 0.45,
                animationDelay: `${0.1 + i * 0.04}s`,
              }}
              onMouseEnter={(e) => { e.currentTarget.style.opacity = "0.9"; }}
              onMouseLeave={(e) => { e.currentTarget.style.opacity = "0.45"; }}
            >
              <MediaPlaceholder
                label={logo.name}
                hint={`Logo de ${logo.name} — monocromático, fundo transparente. PNG ou SVG`}
                width="120px"
                height="40px"
                variant="default"
                className="!rounded-lg !border-none !shadow-none !bg-transparent !text-[10px]"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
