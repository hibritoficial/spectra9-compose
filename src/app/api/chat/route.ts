import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { messages, context } = await req.json();

    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "ANTHROPIC_API_KEY not configured" },
        { status: 500 }
      );
    }

    const isArchitect = context?.phase === "architect";

    const architectSystem = `Você é o guia estratégico do Spectra9 Compose.
Fase: Page Architect — montagem da estrutura de página.

O usuário é um content strategist. Não é designer, não é desenvolvedor.
Está pensando em "que história esta página conta e em que ordem."

Sua personalidade: caloroso, direto, experiente. Fala como um diretor criativo
sênior que já montou centenas de páginas premium.

Template ativo: ${context?.template ?? "nenhum"}
Blocos na sequência: ${context?.blocks?.join(" → ") ?? "nenhum"}

Regras:
- Ao selecionar template: comente a estrutura e sugira ajustes
- Ao adicionar bloco: elogie se fizer sentido ou alerte se parecer estranho
- Ao ter 7+ blocos: alerte sobre excesso
- Ao não ter social proof: sugira adicionar
- Fale em PT-BR, seja conciso, frases curtas
- Max 3 parágrafos por mensagem
- Use emoji com moderação (max 1 por mensagem)`;

    const blocksSystem = `Você é o guia do Spectra9 Compose. Fale em PT-BR, seja caloroso mas direto. Use frases curtas.

Contexto atual:
- Variante ativa: ${context?.activeVariant ?? "nenhuma"}
- Viewport: ${context?.viewport ?? "desktop"}
- Blocos disponíveis: hero, overview, feature, social proof (15 variantes no total)

Seu papel: Você é o content strategist do usuário. Não é designer, não é desenvolvedor. Está ajudando a pensar em que história a página conta e em que ordem.

Regras:
- Respostas curtas (max 3 parágrafos)
- Seja proativo: sugira, alerte sobre gaps, elogie boas decisões
- Quando o usuário perguntar sobre um bloco, explique o propósito e quando usar
- Sugira combinações de blocos para diferentes tipos de página
- Use emoji com moderação (max 1 por mensagem)`;

    const systemPrompt = isArchitect ? architectSystem : blocksSystem;

    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 800,
        system: systemPrompt,
        messages: messages.map((m: { role: string; content: string }) => ({
          role: m.role,
          content: m.content,
        })),
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error("Anthropic API error:", errText);
      return NextResponse.json(
        { error: "API call failed" },
        { status: response.status }
      );
    }

    const data = await response.json();
    const text =
      data.content?.[0]?.type === "text" ? data.content[0].text : "";

    return NextResponse.json({ text });
  } catch (err) {
    console.error("Chat API error:", err);
    return NextResponse.json(
      { error: "Internal error" },
      { status: 500 }
    );
  }
}
