import { NextRequest, NextResponse } from "next/server";

/* ── Tipos ── */

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

interface ArchitectContext {
  phase: "architect";
  template?: string;
  blocks?: string[];
  briefing?: string;
}

interface BlocksContext {
  phase?: undefined;
  activeVariant?: string;
  viewport?: string;
}

type ChatContext = ArchitectContext | BlocksContext;

interface ComposeBlock {
  purpose: string;
  variant_hint?: string | null;
}

interface ComposeResult {
  rationale: string;
  blocks: ComposeBlock[];
}

/* ── System prompts ── */

const PAGE_PURPOSES = [
  "hero",
  "overview",
  "feature_showcase",
  "product_demo",
  "social_proof",
  "about",
  "pricing",
  "faq",
  "cta",
  "newsletter",
  "footer",
];

const VARIANT_HINTS = [
  "hero-statement",
  "hero-product",
  "hero-split",
  "hero-video",
  "hero-immersive",
  "overview-carousel",
  "overview-icons",
  "overview-tabs",
  "overview-numbers",
  "feature-alternating",
  "feature-scroll-story",
  "feature-grid",
  "proof-testimonials",
  "proof-logos",
  "proof-stats",
];

const ARCHITECT_SYSTEM = `Você é o guia estratégico do Spectra9 Compose, fase Page Architect.

O usuário é um content strategist. Não é designer, não é desenvolvedor. Está pensando em "que história esta página conta e em que ordem."

Personalidade: diretor criativo sênior. Caloroso, direto, experiente. PT-BR sempre. Frases curtas. Máximo 3 parágrafos por mensagem. Zero emojis.

Você tem 2 modos de resposta:

**Modo 1 — Conversa normal** (quando o usuário faz pergunta, pede conselho, comenta algo):
Responda em texto. Seja proativo: elogie boas decisões, alerte sobre gaps comuns (ex: falta social proof), comente estrutura.

**Modo 2 — Composição (ferramenta compose_page)** (quando o usuário descreve uma página e quer estrutura):
Chame a ferramenta compose_page com a sequência sugerida. Sinais de que é Modo 2:
- "landing para [negócio]"
- "página de [sobre/preços/produto]"
- "quero uma estrutura para..."
- "monta uma página para..."
- "como você organizaria uma landing de..."

Ao compor:
- Use 4-8 blocos (páginas premium respiram; mais que 8 vira supermercado)
- SEMPRE comece com hero
- SEMPRE termine com cta ou footer
- Inclua social_proof em landing de produto/SaaS
- Proponha variant_hint específico quando a escolha importa (ex: hero-immersive para brand, hero-product para SaaS)

Regras invioláveis:
- PT-BR com acentuação correta
- Zero emojis em qualquer resposta
- Frases curtas, direto ao ponto

Estado atual:
Template ativo: {{TEMPLATE}}
Blocos no canvas: {{BLOCKS}}`;

const BLOCKS_SYSTEM = `Você é o guia do Spectra9 Compose, fase Blocks (exploração de variantes).

O usuário está navegando o catálogo de blocos (15 variantes). Ajude-o a escolher.

Personalidade: caloroso mas direto. PT-BR. Frases curtas. Máximo 3 parágrafos. Zero emojis.

Regras:
- Respostas curtas e proativas
- Explique o propósito e quando usar cada bloco
- Sugira combinações para diferentes tipos de página
- Alerte sobre gaps (ex: "você ainda não tem social proof")
- Zero emojis

Estado:
Variante ativa: {{VARIANT}}
Viewport: {{VIEWPORT}}`;

/* ── Handler ── */

export async function POST(req: NextRequest) {
  try {
    const { messages, context } = (await req.json()) as {
      messages: ChatMessage[];
      context: ChatContext;
    };

    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "ANTHROPIC_API_KEY não configurada" },
        { status: 500 },
      );
    }

    const isArchitect = context?.phase === "architect";

    const systemPrompt = isArchitect
      ? ARCHITECT_SYSTEM.replace(
          "{{TEMPLATE}}",
          (context as ArchitectContext).template ?? "nenhum",
        ).replace(
          "{{BLOCKS}}",
          (context as ArchitectContext).blocks?.join(" → ") ?? "nenhum",
        )
      : BLOCKS_SYSTEM.replace(
          "{{VARIANT}}",
          (context as BlocksContext).activeVariant ?? "nenhuma",
        ).replace(
          "{{VIEWPORT}}",
          (context as BlocksContext).viewport ?? "desktop",
        );

    const tools = isArchitect
      ? [
          {
            name: "compose_page",
            description:
              "Compõe uma sequência de blocos para uma página a partir do briefing do usuário. Use SEMPRE que o usuário descrever um tipo de página e pedir estrutura. Não use quando o usuário faz só pergunta conceitual.",
            input_schema: {
              type: "object" as const,
              properties: {
                rationale: {
                  type: "string" as const,
                  description:
                    "Uma frase em PT-BR explicando a escolha da estrutura. Max 180 caracteres.",
                },
                blocks: {
                  type: "array" as const,
                  description:
                    "Sequência ordenada de 4-8 blocos. Sempre começa com hero. Termina com cta ou footer.",
                  items: {
                    type: "object" as const,
                    properties: {
                      purpose: {
                        type: "string" as const,
                        enum: PAGE_PURPOSES,
                        description: "Propósito do bloco.",
                      },
                      variant_hint: {
                        type: "string" as const,
                        enum: VARIANT_HINTS,
                        description:
                          "Variante específica recomendada. Opcional — omita se qualquer variante do purpose serve.",
                      },
                    },
                    required: ["purpose"],
                  },
                },
              },
              required: ["rationale", "blocks"],
            },
          },
        ]
      : undefined;

    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-6",
        max_tokens: 1024,
        system: systemPrompt,
        tools,
        messages: messages.map((m) => ({
          role: m.role,
          content: m.content,
        })),
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error("Anthropic API error:", errText);
      return NextResponse.json(
        { error: "API call failed", detail: errText },
        { status: response.status },
      );
    }

    const data = (await response.json()) as {
      content: Array<
        | { type: "text"; text: string }
        | { type: "tool_use"; id: string; name: string; input: ComposeResult }
      >;
      stop_reason: string;
    };

    let text = "";
    let compose: ComposeResult | null = null;

    for (const block of data.content ?? []) {
      if (block.type === "text") {
        text += block.text;
      } else if (block.type === "tool_use" && block.name === "compose_page") {
        compose = block.input;
      }
    }

    if (compose && !text.trim()) {
      text = compose.rationale ?? "Pronto — estrutura aplicada no canvas.";
    }

    return NextResponse.json({ text, compose });
  } catch (err) {
    console.error("Chat API error:", err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
