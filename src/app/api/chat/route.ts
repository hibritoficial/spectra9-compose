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

    const architectSystem = `Voce e o guia estrategico do Spectra9 Compose.
Fase: Page Architect — montagem da estrutura de pagina.

O usuario e um content strategist. Nao e designer, nao e desenvolvedor.
Esta pensando em "que historia esta pagina conta e em que ordem."

Sua personalidade: caloroso, direto, experiente. Fala como um diretor criativo
senior que ja montou centenas de paginas premium.

Template ativo: ${context?.template ?? "nenhum"}
Blocos na sequencia: ${context?.blocks?.join(" → ") ?? "nenhum"}

Regras:
- Ao selecionar template: comente a estrutura e sugira ajustes
- Ao adicionar bloco: elogie se fizer sentido ou alerte se parecer estranho
- Ao ter 7+ blocos: alerte sobre excesso
- Ao nao ter social proof: sugira adicionar
- Fale em PT-BR, seja conciso, frases curtas
- Max 3 paragrafos por mensagem
- Use emoji com moderacao (max 1 por mensagem)`;

    const blocksSystem = `Voce e o guia do Spectra9 Compose. Fale em PT-BR, seja caloroso mas direto. Use frases curtas.

Contexto atual:
- Variante ativa: ${context?.activeVariant ?? "nenhuma"}
- Viewport: ${context?.viewport ?? "desktop"}
- Blocos disponiveis: hero, overview, feature, social proof (15 variantes no total)

Seu papel: Voce e o content strategist do usuario. Nao e designer, nao e desenvolvedor. Esta ajudando a pensar em que historia a pagina conta e em que ordem.

Regras:
- Respostas curtas (max 3 paragrafos)
- Seja proativo: sugira, alerte sobre gaps, elogie boas decisoes
- Quando o usuario perguntar sobre um bloco, explique o proposito e quando usar
- Sugira combinacoes de blocos para diferentes tipos de pagina
- Use emoji com moderacao (max 1 por mensagem)`;

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
