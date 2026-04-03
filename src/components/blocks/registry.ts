export interface BlockVariant {
  id: string;
  name: string;
  description: string;
  schema: Record<string, unknown>;
}

export interface BlockPurpose {
  id: string;
  label: string;
  variants: BlockVariant[];
}

export const blockRegistry: BlockPurpose[] = [
  {
    id: "hero",
    label: "Hero",
    variants: [
      {
        id: "hero-statement",
        name: "hero-statement",
        description:
          "Tipografia pura. Headline 120px centralizado, sem visual lateral. Espaçamento vertical extremamente generoso.",
        schema: {
          type: "hero-statement",
          headline: {
            text: "string (max 5 palavras)",
            size: "120px",
            font: "serif",
            align: "center",
          },
          subheadline: {
            text: "string (2 frases)",
            size: "18px",
            font: "sans",
          },
          ctas: [
            { label: "string", style: "primary" },
            { label: "string", style: "secondary" },
          ],
          background: { type: "gradient-mesh", opacity: 0.3 },
          animations: [
            "headline: clip-path reveal 1s",
            "subheadline: fade-up 0.7s delay 0.4s",
            "ctas: stagger fade-up 0.5s delay 0.6s/0.75s",
          ],
        },
      },
      {
        id: "hero-product",
        name: "hero-product",
        description:
          "Grid 60:40. Badge + headline + CTAs à esquerda, mini-screen do produto à direita.",
        schema: {
          type: "hero-product",
          badge: { text: "string", size: "12px", font: "mono" },
          headline: { text: "string", size: "96px", font: "serif" },
          subheadline: { text: "string", size: "18px", font: "sans" },
          ctas: [
            { label: "string", style: "primary" },
            { label: "string", style: "secondary" },
          ],
          media: {
            type: "product-screen",
            size: "400x500px",
            hint: "Mini-screen do produto em perspectiva isométrica",
          },
          background: { type: "gradient-mesh", opacity: 0.2 },
          animations: [
            "badge: fade-in 0.6s",
            "headline: slide-right 0.8s",
            "subheadline: fade-up 0.7s delay 0.4s",
            "media: scale-in-perspective 0.9s delay 0.3s",
          ],
        },
      },
      {
        id: "hero-split",
        name: "hero-split",
        description:
          "Grid 50:50 exato. Texto à esquerda, visual grande à direita. Divisão limpa sem overlap.",
        schema: {
          type: "hero-split",
          headline: { text: "string", size: "80px", font: "serif" },
          subheadline: { text: "string", size: "18px", font: "sans" },
          ctas: [
            { label: "string", style: "primary" },
            { label: "string", style: "secondary" },
          ],
          media: {
            type: "image-or-video",
            size: "50vw x 100vh",
            hint: "Imagem, vídeo ou ilustração que ocupa metade da viewport",
          },
          animations: [
            "headline: clip-path reveal 1s",
            "subheadline: fade-up 0.7s delay 0.4s",
            "media: parallax-in 1.1s",
          ],
        },
      },
      {
        id: "hero-video",
        name: "hero-video",
        description:
          "Full viewport com vídeo de fundo. Headline centralizado em overlay branco. Play/pause no canto.",
        schema: {
          type: "hero-video",
          headline: {
            text: "string",
            size: "96px",
            font: "serif",
            color: "white",
          },
          subheadline: { text: "string", size: "18px", font: "sans" },
          cta: { label: "string", style: "primary" },
          video: {
            duration: "15-30s",
            style: "looping, slow, cinematic",
            overlay: "60% dark",
          },
          controls: { playPause: true, position: "bottom-right" },
          animations: [
            "background: fade-in 0.8s",
            "headline: clip-path reveal 1s",
            "subheadline: fade-up 0.7s delay 0.4s",
            "cta: scale-in 0.6s delay 0.8s",
          ],
        },
      },
      {
        id: "hero-immersive",
        name: "hero-immersive",
        description:
          "Visual full-screen como fundo. A imagem É o argumento. Headline 96px em overlay branco com gradient de legibilidade. O hero mais visual de todos.",
        schema: {
          type: "hero-immersive",
          headline: {
            text: "string",
            size: "96px",
            font: "serif",
            color: "white",
            textShadow: "0 2px 40px rgba(0,0,0,0.5)",
          },
          subheadline: { text: "string", size: "18px", font: "sans" },
          cta: { label: "string", style: "primary" },
          background: {
            type: "full-bleed-image-or-video",
            overlay: "gradient 60-70% dark",
            hint: "Fotografia premium full-bleed, vídeo slow-motion, ou composição 3D",
          },
          parallax: {
            enabled: true,
            note: "Fundo move mais lento que texto ao scrollar",
          },
          animations: [
            "background: fade-in 0.8s",
            "headline: clip-path reveal 1s delay 0.1s",
            "subheadline: fade-up 0.7s delay 0.4s",
            "cta: scale-in 0.6s delay 0.8s",
          ],
        },
      },
    ],
  },
  {
    id: "overview",
    label: "Overview",
    variants: [
      {
        id: "overview-carousel",
        name: "overview-carousel",
        description: "Scroll horizontal de cards com número watermark + título + descrição. 3-8 cards com peek do próximo.",
        schema: { type: "overview-carousel", section_headline: { max_words: 5, size: "48px" }, items: { min: 3, max: 8, fields: ["visual", "title", "description", "metric"] }, layout: "horizontal-scroll", animations: ["headline: clip-path-reveal", "cards: stagger-fade-up 0.08s"] },
      },
      {
        id: "overview-icons",
        name: "overview-icons",
        description: "3-4 colunas com icone + titulo + 1 frase. Grid simetrico, o bloco mais rapido de consumir.",
        schema: { type: "overview-icons", items: { min: 3, max: 4, fields: ["icon", "title", "description"] }, layout: "3col|4col", animations: ["items: stagger-fade-up 0.1s"] },
      },
      {
        id: "overview-tabs",
        name: "overview-tabs",
        description: "Tabs horizontais no topo. Cada tab: headline + body + media. Crossfade ao trocar.",
        schema: { type: "overview-tabs", tabs: { min: 3, max: 5, fields: ["tab_label", "headline", "body", "media"] }, layout: "tabs-top, content 50-50", animations: ["tab_switch: crossfade 0.3s", "media: scale-in 0.4s"] },
      },
      {
        id: "overview-numbers",
        name: "overview-numbers",
        description: "3-5 numeros oversized (120px) em linha. Counter animation. Mini-viz acima de cada numero.",
        schema: { type: "overview-numbers", metrics: { min: 3, max: 5, fields: ["number", "label", "mini_viz"] }, layout: "3col|4col|5col", animations: ["numbers: counter 2s stagger 0.15s", "mini_viz: draw-in 1s"] },
      },
    ],
  },
  {
    id: "feature",
    label: "Feature",
    variants: [
      {
        id: "feature-alternating",
        name: "feature-alternating",
        description: "Blocos alternando texto/visual: esquerda+direita, depois invertido. 2-4 features com scroll reveal.",
        schema: { type: "feature-alternating", features: { min: 2, max: 4, fields: ["headline", "body", "cta", "media"] }, layout: "55-45 alternating", gap: "120px", animations: ["features: scroll-reveal-stagger", "media: scale-in-perspective"] },
      },
      {
        id: "feature-scroll-story",
        name: "feature-scroll-story",
        description: "Scroll storytelling: headline fixo, steps com crossfade. Progress indicator vertical. Padrao Apple.",
        schema: { type: "feature-scroll-story", steps: { min: 2, max: 5, fields: ["step_number", "title", "body", "media"] }, layout: "50-40 pinned", animations: ["steps: crossfade-scroll", "media: crossfade-scale", "progress: fill-with-scroll"] },
      },
      {
        id: "feature-grid",
        name: "feature-grid",
        description: "Grid 2x2 ou 3x2 de mini-features. Cada célula: ícone + título + descrição. Hover highlight.",
        schema: { type: "feature-grid", features: { min: 4, max: 9, fields: ["icon", "title", "description"] }, layout: "2x2|3x2|3x3", animations: ["features: stagger-fade-scale 0.08s"] },
      },
    ],
  },
  {
    id: "proof",
    label: "Social Proof",
    variants: [
      {
        id: "proof-testimonials",
        name: "proof-testimonials",
        description: "Grid de depoimentos. Cada card: foto + quote italico + nome + cargo + empresa.",
        schema: { type: "proof-testimonials", testimonials: { min: 2, max: 6, fields: ["photo", "quote", "name", "role", "company"] }, layout: "grid-3col", animations: ["cards: stagger-fade-up 0.1s"] },
      },
      {
        id: "proof-logos",
        name: "proof-logos",
        description: "Grid de logos monocromaticos. 6-16 logos, opacity 0.5 com hover 1.0.",
        schema: { type: "proof-logos", logos: { min: 6, max: 16, fields: ["logo", "name"] }, layout: "grid-responsive", opacity: "0.5 hover 1.0", animations: ["logos: fade-in-stagger"] },
      },
      {
        id: "proof-stats",
        name: "proof-stats",
        description: "3-4 metricas impactantes com numero oversized + label + contexto. Divisores verticais entre colunas.",
        schema: { type: "proof-stats", stats: { min: 3, max: 4, fields: ["number", "label", "context"] }, layout: "3col|4col with dividers", animations: ["numbers: counter 1.5s stagger 0.2s"] },
      },
    ],
  },
];
