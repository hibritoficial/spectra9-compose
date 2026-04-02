import MediaPlaceholder from "../../MediaPlaceholder";
import AnimLabel from "../../AnimLabel";

function MetricCard({
  number,
  label,
  chartType,
}: {
  number: string;
  label: string;
  chartType: string;
}) {
  return (
    <div className="flex flex-col items-center">
      <MediaPlaceholder
        label={chartType}
        hint="Mini-gráfico contextual acima de cada métrica. Sparkline para tendência, bar chart para distribuição, ring gauge para percentual. 80×40px, monocromático."
        width="80px"
        height="40px"
        className="!text-[10px] !p-1 mb-4"
      />
      <span
        className="font-serif text-[#d0d0d0] leading-none tracking-[-0.04em]"
        style={{ fontSize: "clamp(60px, 9vw, 120px)" }}
      >
        {number}
      </span>
      <span className="font-sans text-[14px] text-[#666] mt-3 tracking-wide uppercase">
        {label}
      </span>
    </div>
  );
}

export default function HeroData() {
  return (
    <section className="relative w-full min-h-screen flex flex-col items-center justify-center px-8 py-32 overflow-hidden">
      <div className="max-w-[1200px] w-full flex flex-col items-center">
        <AnimLabel text="↑ fade-in 0.4s" className="mb-6" />

        {/* Editorial headline */}
        <h2
          className="font-serif text-[#ccc] text-center leading-[1.2] tracking-[-0.02em] mb-6"
          style={{ fontSize: "clamp(32px, 4vw, 48px)" }}
        >
          Lorem ipsum dolor sit amet consectetur
        </h2>

        <AnimLabel text="↑ clip-path reveal 0.8s" className="mb-20" />

        {/* Metrics row */}
        <div className="grid grid-cols-3 gap-20 w-full max-w-[960px] mb-20">
          <MetricCard number="847" label="Lorem ipsum" chartType="sparkline" />
          <MetricCard number="92%" label="Dolor sit" chartType="bar chart" />
          <MetricCard number="3.4x" label="Amet cons" chartType="ring gauge" />
        </div>

        <AnimLabel
          text="↑ counter animation 2s + stagger 0.2s each"
          className="mb-12"
        />

        {/* Subheadline */}
        <p className="font-sans text-[18px] text-[#888] leading-[1.7] max-w-[500px] text-center mb-10">
          Vestibulum ante ipsum primis in faucibus orci luctus et ultrices
          posuere cubilia.
        </p>

        {/* CTA */}
        <button className="px-8 py-4 bg-[#e0e0e0] text-[#0A0A0A] font-sans text-[15px] font-medium rounded-lg tracking-wide">
          Ver relatório completo
        </button>

        <AnimLabel text="↑ fade-up 0.4s delay 0.6s" className="mt-4" />
      </div>
    </section>
  );
}
