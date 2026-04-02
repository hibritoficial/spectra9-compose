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
            "headline: clip-path reveal 1.2s",
            "subheadline: fade-up 0.6s delay 0.4s",
            "ctas: stagger fade-up 0.4s delay 0.6s",
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
            "badge: fade-in 0.4s",
            "headline: slide-right 0.6s",
            "media: scale-in 0.8s + internal stagger",
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
            "media: parallax-in 1s ease-out",
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
          headline: { text: "string", size: "96px", font: "serif", color: "white" },
          subheadline: { text: "string", size: "18px", font: "sans" },
          cta: { label: "string", style: "primary" },
          video: {
            duration: "15-30s",
            style: "looping, slow, cinematic",
            overlay: "60% dark",
          },
          controls: { playPause: true, position: "bottom-right" },
          animations: [
            "headline: text reveal letter-by-letter 1.5s",
            "cta: scale-in 0.4s delay 0.8s",
          ],
        },
      },
      {
        id: "hero-data",
        name: "hero-data",
        description:
          "3 métricas oversized (120px serif) como visual dominante. Mini-visualizações acima de cada número.",
        schema: {
          type: "hero-data",
          headline: {
            text: "string (editorial)",
            size: "48px",
            font: "serif",
          },
          metrics: [
            {
              value: "string",
              label: "string",
              chart: "sparkline | bar-chart | ring-gauge",
              chartSize: "80x40px",
            },
          ],
          subheadline: { text: "string", size: "18px", font: "sans" },
          cta: { label: "string", style: "primary" },
          animations: [
            "metrics: counter animation 2s + stagger 0.2s",
            "charts: draw-in 0.6s synchronized",
          ],
        },
      },
    ],
  },
];
