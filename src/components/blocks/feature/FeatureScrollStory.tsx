"use client";

import { useState } from "react";
import ContentLabel from "../../ContentLabel";
import MediaPlaceholder from "../../MediaPlaceholder";

const steps = [
  { title: "Conecte sua fonte", body: "Importe dados de qualquer lugar. CSV, API, ou integrações nativas.", media: "Tela de importação" },
  { title: "Configure os fluxos", body: "Monte regras visuais. Quando X acontece, faz Y automaticamente.", media: "Editor de automação" },
  { title: "Publique e monitore", body: "Um clique para ir ao ar. Dashboards em tempo real mostram cada metrica.", media: "Dashboard de monitoramento" },
];

export default function FeatureScrollStory() {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section className="hero-section-end relative w-full overflow-hidden" style={{ padding: "120px 0" }}>
      <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 40% 50% at 30% 50%, rgba(255,255,255,0.02) 0%, transparent 50%)" }} />

      <div className="relative z-10 max-w-[1200px] mx-auto px-20 block-container">
        <div className="content-label-container mb-3">
          <ContentLabel text="Headline fixo — pode ter accent em italico" />
        </div>

        <h2
          className="font-serif text-[#ccc] tracking-[-0.02em] mb-20 anim-headline"
          style={{ fontSize: "clamp(28px, 3.5vw, 44px)", lineHeight: 1.2 }}
        >
          Três passos para começar
        </h2>

        <div className="feature-scroll-grid items-start">
          {/* Left — Steps */}
          <div className="flex flex-col gap-0">
            {/* Progress line */}
            <div className="relative">
              {steps.map((step, i) => (
                <button
                  key={i}
                  onClick={() => setActiveStep(i)}
                  className="flex items-start gap-6 text-left w-full cursor-pointer transition-opacity duration-300"
                  style={{
                    padding: "32px 0",
                    borderTop: i > 0 ? "1px solid rgba(255,255,255,0.04)" : undefined,
                    opacity: activeStep === i ? 1 : 0.4,
                  }}
                >
                  {/* Step number */}
                  <span
                    className="font-mono shrink-0 flex items-center justify-center"
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: "50%",
                      fontSize: 13,
                      border: activeStep === i ? "1px solid rgba(255,255,255,0.2)" : "1px solid rgba(255,255,255,0.06)",
                      color: activeStep === i ? "#ddd" : "#555",
                      background: activeStep === i ? "rgba(255,255,255,0.04)" : "transparent",
                    }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  <div>
                    <h4 className="font-sans text-[18px] font-medium mb-2" style={{ color: activeStep === i ? "#ddd" : "#666" }}>
                      {step.title}
                    </h4>
                    <p className="font-sans text-[14px] leading-[1.65]" style={{ color: activeStep === i ? "#888" : "#555" }}>
                      {step.body}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Right — Media (changes per step) */}
          <div className="sticky top-32">
            <div key={activeStep} className="anim-media">
              <MediaPlaceholder
                label={steps[activeStep].media}
                hint={`Visual do step ${activeStep + 1}: '${steps[activeStep].title}'. Muda via crossfade ao navegar steps.`}
                width="100%"
                height="420px"
                variant="screen"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
