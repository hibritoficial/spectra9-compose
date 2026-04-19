"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import Link from "next/link";
import { Eye } from "lucide-react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  pageTemplates,
  purposeCatalog,
  purposeDef,
  resolveVariant,
} from "../../components/architect/blockCatalog";
import VariantPicker from "../../components/architect/VariantPicker";
import ComposedPreview, {
  type CanvasBlock,
} from "../../components/architect/ComposedPreview";
import DsSelector from "../../components/ds/DsSelector";

/* ── Canvas block factory ── */

let idCounter = 0;
function makeBlock(
  purpose: string,
  variantHint?: string | null,
): CanvasBlock {
  return {
    id: `block-${++idCounter}`,
    purpose,
    variant: resolveVariant(purpose, variantHint),
  };
}

/* ── Sortable block card ── */

function SortableBlock({
  block,
  index,
  onRemove,
  onVariantChange,
}: {
  block: CanvasBlock;
  index: number;
  onRemove: (id: string) => void;
  onVariantChange: (id: string, variant: string) => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: block.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const def = purposeDef(block.purpose);
  if (!def) return null;
  const Icon = def.icon;

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="flex items-start gap-4 p-5 rounded-xl transition-colors duration-150"
      {...attributes}
    >
      <div
        {...listeners}
        className="mt-1 cursor-grab active:cursor-grabbing text-[#444] hover:text-[#777] transition-colors duration-150 shrink-0"
        style={{ fontSize: 16 }}
      >
        &#x2630;
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-3 mb-1.5">
          <Icon size={16} className="text-[#888] shrink-0" />
          <span className="font-sans text-[16px] font-medium text-[#ddd]">
            {def.label}
          </span>
          <span className="font-mono text-[11px] text-[#444] ml-auto">
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>
        <p className="font-sans text-[13px] italic text-[#666] mb-3">
          Responde: &ldquo;{def.jtbd}&rdquo;
        </p>
        <div className="flex items-center flex-wrap gap-2">
          <VariantPicker
            purpose={block.purpose}
            variant={block.variant}
            onChange={(v) => onVariantChange(block.id, v)}
          />
          <span className="w-px h-4 bg-[#222]" />
          {def.elements.map((el) => (
            <span
              key={el}
              className="px-2 py-0.5 rounded font-mono text-[10px]"
              style={{
                background: "rgba(255,255,255,0.04)",
                color: "#777",
                border: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              {el}
            </span>
          ))}
        </div>
      </div>

      <button
        onClick={() => onRemove(block.id)}
        className="mt-1 cursor-pointer text-[#444] hover:text-[#C75A3A] transition-colors duration-150 shrink-0"
        style={{ fontSize: 18 }}
      >
        &times;
      </button>
    </div>
  );
}

/* ── AI Guide ── */

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface ComposeBlockInput {
  purpose: string;
  variant_hint?: string | null;
}

interface ComposeResult {
  rationale: string;
  blocks: ComposeBlockInput[];
}

function ArchitectGuide({
  blocks,
  template,
  onCompose,
}: {
  blocks: CanvasBlock[];
  template: string;
  onCompose: (compose: ComposeResult) => void;
}) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [welcomed, setWelcomed] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    if (inputRef.current) {
      const t = setTimeout(() => inputRef.current?.focus(), 300);
      return () => clearTimeout(t);
    }
  }, []);

  useEffect(() => {
    if (!welcomed && messages.length === 0) {
      setWelcomed(true);
      setMessages([
        {
          role: "assistant",
          content:
            "Vamos montar a estrutura da sua página.\n\nMe conta em uma frase: que tipo de página? Ex: landing de SaaS B2B para PMs, site institucional de agência regenerativa, página de preços de ferramenta dev. Eu proponho a estrutura e você ajusta.",
        },
      ]);
    }
  }, [welcomed, messages.length]);

  const sendMessage = useCallback(
    async (text: string) => {
      if (!text.trim() || loading) return;
      const userMsg: Message = { role: "user", content: text.trim() };
      const nextMessages = [...messages, userMsg];
      setMessages(nextMessages);
      setInput("");
      setLoading(true);

      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            messages: nextMessages,
            context: {
              phase: "architect",
              template,
              blocks: blocks.map((b) => b.purpose),
            },
          }),
        });
        const data = (await res.json()) as {
          text?: string;
          compose?: ComposeResult | null;
          error?: string;
        };

        if (data.compose) {
          onCompose(data.compose);
        }

        const assistantText =
          data.text ||
          (data.compose
            ? "Estrutura aplicada no canvas."
            : data.error
            ? "Desculpe, algo deu errado."
            : "Sem resposta.");

        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: assistantText },
        ]);
      } catch {
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: "Erro de conexão." },
        ]);
      } finally {
        setLoading(false);
      }
    },
    [messages, loading, template, blocks, onCompose],
  );

  return (
    <div className="flex flex-col h-full">
      <div
        className="flex items-center px-5 shrink-0"
        style={{ height: 52, borderBottom: "1px solid #1a1a1a" }}
      >
        <span className="font-mono text-[12px] text-[#888] tracking-wider">
          <span style={{ color: "#C75A3A" }}>&#x2726;</span> Compose Guide
        </span>
      </div>

      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto px-5 py-4"
        style={{ scrollbarWidth: "thin" }}
      >
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`mb-4 ${msg.role === "user" ? "flex justify-end" : ""}`}
          >
            <div
              style={{
                maxWidth: msg.role === "user" ? "85%" : "100%",
                padding: msg.role === "user" ? "10px 14px" : "0",
                background:
                  msg.role === "user" ? "rgba(199,90,58,0.12)" : "transparent",
                borderRadius: msg.role === "user" ? 12 : 0,
                fontSize: 14,
                lineHeight: 1.65,
                color: msg.role === "user" ? "#ccc" : "#999",
                whiteSpace: "pre-wrap",
              }}
            >
              {msg.content}
            </div>
          </div>
        ))}
        {loading && (
          <div className="mb-4">
            <span className="font-mono text-[12px] text-[#555]">
              compondo...
            </span>
          </div>
        )}
      </div>

      <div
        className="shrink-0 px-4 py-3"
        style={{ borderTop: "1px solid #1a1a1a" }}
      >
        <div className="flex gap-2">
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                sendMessage(input);
              }
            }}
            placeholder="Descreva a página ou pergunte..."
            className="flex-1 px-4 py-2.5 rounded-lg font-sans text-[14px] text-[#ddd] placeholder-[#444] outline-none"
            style={{ background: "#1a1a1a", border: "1px solid #222" }}
          />
          <button
            onClick={() => sendMessage(input)}
            disabled={loading || !input.trim()}
            className="px-3 py-2.5 rounded-lg font-mono text-[12px] cursor-pointer transition-colors duration-150"
            style={{
              background: input.trim() && !loading ? "#C75A3A" : "#222",
              color: input.trim() && !loading ? "#fff" : "#555",
            }}
          >
            &uarr;
          </button>
        </div>
      </div>
    </div>
  );
}

/* ── Main Page ── */

export default function ArchitectPage() {
  const [mounted, setMounted] = useState(false);
  const [activeTemplate, setActiveTemplate] = useState("saas");
  const [blocks, setBlocks] = useState<CanvasBlock[]>(() => {
    const tpl = pageTemplates.find((t) => t.key === "saas");
    return tpl ? tpl.blocks.map((p) => makeBlock(p)) : [];
  });
  const [showAddMenu, setShowAddMenu] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
  );

  const handleTemplateChange = useCallback((key: string) => {
    const tpl = pageTemplates.find((t) => t.key === key);
    if (!tpl) return;
    setActiveTemplate(key);
    setBlocks(tpl.blocks.map((p) => makeBlock(p)));
  }, []);

  const handleDragEnd = useCallback((event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      setBlocks((items) => {
        const oldIndex = items.findIndex((i) => i.id === active.id);
        const newIndex = items.findIndex((i) => i.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  }, []);

  const removeBlock = useCallback((id: string) => {
    setBlocks((prev) => prev.filter((b) => b.id !== id));
  }, []);

  const addBlock = useCallback((purpose: string) => {
    setBlocks((prev) => [...prev, makeBlock(purpose)]);
    setShowAddMenu(false);
  }, []);

  const changeVariant = useCallback((id: string, variant: string) => {
    setBlocks((prev) =>
      prev.map((b) => (b.id === id ? { ...b, variant } : b)),
    );
  }, []);

  const handleCompose = useCallback((compose: ComposeResult) => {
    setActiveTemplate("custom");
    setBlocks(
      compose.blocks.map((b) => makeBlock(b.purpose, b.variant_hint ?? null)),
    );
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setShowAddMenu(false);
      if (e.key === "p" || e.key === "P") {
        if (
          e.target instanceof HTMLInputElement ||
          e.target instanceof HTMLTextAreaElement
        ) {
          return;
        }
        setShowPreview((s) => !s);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      <header className="control-bar fixed top-0 left-0 right-0 z-50 h-14 flex items-center px-5 gap-4">
        <span className="font-mono text-[12px] text-[#666] tracking-[0.2em] uppercase shrink-0">
          COMPOSE
        </span>
        <div className="w-px h-5 bg-[#333]" />
        <Link
          href="/architect"
          className="px-3 py-1.5 rounded font-sans text-[13px] cursor-pointer bg-[#222] text-[#ddd] transition-colors duration-150"
        >
          Architect
        </Link>
        <Link
          href="/blocks"
          className="px-3 py-1.5 rounded font-sans text-[13px] cursor-pointer text-[#666] hover:text-[#999] transition-colors duration-150"
        >
          Blocks
        </Link>
        <div className="flex-1" />
        <DsSelector />
        <div className="w-px h-5 bg-[#333]" />
        <span className="font-mono text-[11px] text-[#444]">
          {blocks.length} seções
        </span>
        <button
          onClick={() => setShowPreview(true)}
          disabled={blocks.length === 0}
          className="flex items-center gap-2 px-3 py-1.5 rounded cursor-pointer transition-colors duration-150"
          style={{
            background: blocks.length > 0 ? "#C75A3A" : "#1a1a1a",
            color: blocks.length > 0 ? "#fff" : "#444",
            border: "1px solid rgba(255,255,255,0.06)",
          }}
          title="Preview (P)"
        >
          <Eye size={14} />
          <span className="font-mono text-[11px]">Preview</span>
        </button>
      </header>

      <div className="flex pt-14" style={{ height: "100vh" }}>
        <div
          className="flex-[3] overflow-y-auto px-8 py-6"
          style={{ borderRight: "1px solid #1a1a1a" }}
        >
          <div className="mb-8">
            <label className="font-mono text-[11px] text-[#555] uppercase tracking-wider block mb-3">
              Tipo de página
            </label>
            <div className="flex gap-2 flex-wrap">
              {pageTemplates.map((t) => {
                const active = activeTemplate === t.key;
                return (
                  <button
                    key={t.key}
                    onClick={() => handleTemplateChange(t.key)}
                    className="px-4 py-2.5 rounded-lg font-sans text-[14px] cursor-pointer transition-colors duration-150"
                    style={{
                      background: active ? "rgba(255,255,255,0.06)" : "transparent",
                      color: active ? "#ddd" : "#555",
                      border: active
                        ? "1px solid rgba(255,255,255,0.08)"
                        : "1px solid rgba(255,255,255,0.04)",
                    }}
                  >
                    {t.label}
                  </button>
                );
              })}
              {activeTemplate === "custom" && (
                <span
                  className="px-4 py-2.5 rounded-lg font-mono text-[11px] text-[#C75A3A]"
                  style={{
                    background: "rgba(199,90,58,0.08)",
                    border: "1px solid rgba(199,90,58,0.2)",
                  }}
                >
                  &#x2726; composição do guia
                </span>
              )}
            </div>
          </div>

          {mounted ? (
            <DndContext
              id="architect-canvas"
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
            >
              <SortableContext
                items={blocks.map((b) => b.id)}
                strategy={verticalListSortingStrategy}
              >
                <div className="flex flex-col gap-3">
                  {blocks.map((block, i) => (
                    <div
                      key={block.id}
                      className="rounded-xl"
                      style={{
                        background: "#111",
                        border: "1px dashed rgba(255,255,255,0.06)",
                      }}
                    >
                      <SortableBlock
                        block={block}
                        index={i}
                        onRemove={removeBlock}
                        onVariantChange={changeVariant}
                      />
                    </div>
                  ))}
                </div>
              </SortableContext>
            </DndContext>
          ) : (
            <div className="flex flex-col gap-3 opacity-50">
              {blocks.map((block) => {
                const def = purposeDef(block.purpose);
                if (!def) return null;
                return (
                  <div
                    key={block.id}
                    className="rounded-xl p-5"
                    style={{
                      background: "#111",
                      border: "1px dashed rgba(255,255,255,0.06)",
                      minHeight: 92,
                    }}
                  >
                    <span className="font-sans text-[14px] text-[#666]">
                      {def.label}
                    </span>
                  </div>
                );
              })}
            </div>
          )}

          <div className="relative mt-6">
            <button
              onClick={() => setShowAddMenu(!showAddMenu)}
              className="w-full py-3 rounded-xl font-sans text-[14px] cursor-pointer text-[#555] hover:text-[#888] transition-colors duration-150"
              style={{
                border: "1px dashed rgba(255,255,255,0.08)",
                background: showAddMenu ? "rgba(255,255,255,0.02)" : "transparent",
              }}
            >
              + Adicionar seção
            </button>

            {showAddMenu && (
              <div
                className="absolute left-0 right-0 mt-2 rounded-xl overflow-hidden z-20"
                style={{ background: "#141414", border: "1px solid #222" }}
              >
                <div className="max-h-[360px] overflow-y-auto py-2">
                  {purposeCatalog.map((def) => {
                    const Icon = def.icon;
                    return (
                      <button
                        key={def.purpose}
                        onClick={() => addBlock(def.purpose)}
                        className="w-full flex items-center gap-3 px-5 py-3 text-left cursor-pointer hover:bg-[#1a1a1a] transition-colors duration-150"
                      >
                        <Icon size={16} className="text-[#777] shrink-0" />
                        <div>
                          <span className="font-sans text-[14px] text-[#ccc]">
                            {def.label}
                          </span>
                          <span className="font-sans text-[12px] text-[#555] ml-3">
                            {def.jtbd}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          <div className="mt-8 mb-8 flex gap-3">
            <button
              onClick={() => setShowPreview(true)}
              disabled={blocks.length === 0}
              className="flex-1 py-4 rounded-xl font-sans text-[16px] font-medium cursor-pointer transition-colors duration-150"
              style={{
                background: blocks.length > 0 ? "#C75A3A" : "#222",
                color: blocks.length > 0 ? "#fff" : "#555",
              }}
            >
              Preview em 4 viewports &rarr;
            </button>
            <Link
              href={`/blocks?sequence=${blocks.map((b) => b.purpose).join(",")}`}
              className="py-4 px-6 rounded-xl font-sans text-[14px] cursor-pointer transition-colors duration-150 flex items-center"
              style={{
                background: "rgba(255,255,255,0.04)",
                color: "#aaa",
                border: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              Explorar blocos
            </Link>
          </div>
        </div>

        <div className="flex-[2]" style={{ background: "#111" }}>
          <ArchitectGuide
            blocks={blocks}
            template={activeTemplate}
            onCompose={handleCompose}
          />
        </div>
      </div>

      {showPreview && (
        <ComposedPreview
          blocks={blocks}
          onClose={() => setShowPreview(false)}
        />
      )}
    </div>
  );
}
