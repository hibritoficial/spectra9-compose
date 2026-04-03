"use client";

import { useState } from "react";
import ContentLabel from "../../ContentLabel";
import MediaPlaceholder from "../../MediaPlaceholder";

const tabs = [
  { label: "Dashboards", headline: "Visualize dados em tempo real", body: "Paineis customizaveis com widgets drag-and-drop. Atualizacao automatica sem refresh.", media: "Dashboard com graficos e KPIs" },
  { label: "Automacao", headline: "Fluxos que trabalham por voce", body: "Crie regras visuais. Quando X acontece, faz Y. Zero codigo necessario.", media: "Editor visual de automacoes" },
  { label: "Integracao", headline: "Conecte tudo em um lugar", body: "Mais de 200 integracoes nativas. Zapier, webhooks, e API completa.", media: "Marketplace de integracoes" },
];

export default function OverviewTabs() {
  const [active, setActive] = useState(0);

  return (
    <section className="hero-section-end relative w-full overflow-hidden" style={{ padding: "120px 0" }}>
      <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 40% 40% at 60% 40%, rgba(255,255,255,0.02) 0%, transparent 50%)" }} />

      <div className="relative z-10 max-w-[1200px] mx-auto px-20">
        <div className="content-label-container mb-3">
          <ContentLabel text="Titulo da secao (opcional)" />
        </div>

        {/* Tab bar */}
        <div className="flex gap-1 mb-16 anim-fade-in">
          {tabs.map((tab, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className="font-sans text-[15px] px-6 py-3 rounded-full transition-colors duration-200 cursor-default"
              style={{
                background: active === i ? "rgba(255,255,255,0.06)" : "transparent",
                color: active === i ? "#ddd" : "#555",
                border: active === i ? "1px solid rgba(255,255,255,0.08)" : "1px solid transparent",
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab content — 50/50 grid */}
        <div className="grid grid-cols-2 gap-16 items-center">
          {/* Text */}
          <div key={`text-${active}`} className="anim-sub" style={{ animationDelay: "0.1s" }}>
            <div className="content-label-container mb-2">
              <ContentLabel text="Headline da tab ativa" />
            </div>

            <h3
              className="font-serif text-[#e0e0e0] tracking-[-0.02em] mb-6"
              style={{ fontSize: "clamp(28px, 3vw, 36px)", lineHeight: 1.15 }}
            >
              {tabs[active].headline}
            </h3>

            <p className="font-sans text-[16px] text-[#888] leading-[1.75] max-w-[400px]">
              {tabs[active].body}
            </p>
          </div>

          {/* Media */}
          <div key={`media-${active}`} className="anim-media">
            <MediaPlaceholder
              label={tabs[active].media}
              hint={`Visual que muda a cada tab — mini-screen, screenshot ou composicao visual de '${tabs[active].label}'`}
              width="100%"
              height="360px"
              variant="screen"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
