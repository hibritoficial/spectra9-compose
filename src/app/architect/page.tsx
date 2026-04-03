"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import Link from "next/link";
import {
  Crosshair,
  Zap,
  Wrench,
  Monitor,
  MessageCircle,
  Users,
  DollarSign,
  HelpCircle,
  Rocket,
  Mail,
  Minus,
} from "lucide-react";
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

/* ── Block catalog ── */

interface BlockDef {
  purpose: string;
  label: string;
  jtbd: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  elements: string[];
}

const blockCatalog: BlockDef[] = [
  { purpose: "hero", label: "Hero", jtbd: "Isso é para mim?", icon: Crosshair, elements: ["Headline", "Sub", "CTA", "Media"] },
  { purpose: "overview", label: "Overview", jtbd: "O que faz?", icon: Zap, elements: ["Headline", "Items", "Media"] },
  { purpose: "feature_showcase", label: "Feature Showcase", jtbd: "Como funciona?", icon: Wrench, elements: ["Headline", "Steps", "Media"] },
  { purpose: "product_demo", label: "Product Demo", jtbd: "Mostra na prática", icon: Monitor, elements: ["Screen", "Headline", "Body"] },
  { purpose: "social_proof", label: "Social Proof", jtbd: "Quem mais confia?", icon: MessageCircle, elements: ["Testimonials", "Logos"] },
  { purpose: "about", label: "About / Quem Somos", jtbd: "Quem está por trás?", icon: Users, elements: ["Headline", "Body", "Media"] },
  { purpose: "pricing", label: "Pricing", jtbd: "Quanto custa?", icon: DollarSign, elements: ["Plans", "CTA", "FAQ"] },
  { purpose: "faq", label: "FAQ", jtbd: "E se eu tiver dúvidas?", icon: HelpCircle, elements: ["Questions", "Answers"] },
  { purpose: "cta", label: "CTA Final", jtbd: "O que faço agora?", icon: Rocket, elements: ["Headline", "CTA", "Sub"] },
  { purpose: "newsletter", label: "Newsletter", jtbd: "Quero ficar por dentro", icon: Mail, elements: ["Headline", "Input", "CTA"] },
  { purpose: "footer", label: "Footer", jtbd: "Links e contato", icon: Minus, elements: ["Links", "Social", "Copyright"] },
];

/* ── Templates ── */

const templates: Record<string, { label: string; blocks: string[] }> = {
  saas: { label: "SaaS Landing", blocks: ["hero", "overview", "feature_showcase", "feature_showcase", "social_proof", "pricing", "cta"] },
  institutional: { label: "Site Institucional", blocks: ["hero", "about", "feature_showcase", "social_proof", "cta"] },
  product: { label: "Produto / Serviço", blocks: ["hero", "feature_showcase", "product_demo", "social_proof", "pricing", "faq", "cta"] },
  brand: { label: "Manifesto / Brand", blocks: ["hero", "about", "feature_showcase", "cta"] },
};

/* ── Sortable block card ── */

interface CanvasBlock {
  id: string;
  purpose: string;
}

function SortableBlock({
  block,
  index,
  onRemove,
}: {
  block: CanvasBlock;
  index: number;
  onRemove: (id: string) => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: block.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const def = blockCatalog.find((b) => b.purpose === block.purpose);
  if (!def) return null;

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="flex items-start gap-4 p-5 rounded-xl transition-colors duration-150"
      {...attributes}
    >
      {/* Drag handle */}
      <div
        {...listeners}
        className="mt-1 cursor-grab active:cursor-grabbing text-[#444] hover:text-[#777] transition-colors duration-150 shrink-0"
        style={{ fontSize: 16 }}
      >
        &#x2630;
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-3 mb-1.5">
          <def.icon size={16} className="text-[#888] shrink-0" />
          <span className="font-sans text-[16px] font-medium text-[#ddd]">{def.label}</span>
          <span className="font-mono text-[11px] text-[#444] ml-auto">
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>
        <p className="font-sans text-[13px] italic text-[#666] mb-3">
          Responde: &ldquo;{def.jtbd}&rdquo;
        </p>
        <div className="flex flex-wrap gap-1.5">
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

      {/* Remove button */}
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

/* ── AI Guide (architect-specific) ── */

interface Message {
  role: "user" | "assistant";
  content: string;
}

function ArchitectGuide({
  blocks,
  template,
}: {
  blocks: CanvasBlock[];
  template: string;
}) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [welcomed, setWelcomed] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages]);

  useEffect(() => {
    if (inputRef.current) setTimeout(() => inputRef.current?.focus(), 300);
  }, []);

  useEffect(() => {
    if (!welcomed && messages.length === 0) {
      setWelcomed(true);
      setMessages([
        {
          role: "assistant",
          content:
            "Vamos montar a estrutura da sua página.\n\nMe conta: é uma landing de produto, site institucional, página de serviço, ou algo diferente? Posso sugerir uma estrutura inicial que você ajusta.",
        },
      ]);
    }
  }, [welcomed, messages.length]);

  const sendMessage = useCallback(
    async (text: string) => {
      if (!text.trim() || loading) return;
      const userMsg: Message = { role: "user", content: text.trim() };
      const newMessages = [...messages, userMsg];
      setMessages(newMessages);
      setInput("");
      setLoading(true);

      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            messages: newMessages,
            context: {
              phase: "architect",
              template,
              blocks: blocks.map((b) => b.purpose),
            },
          }),
        });
        const data = await res.json();
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: data.text || "Desculpe, algo deu errado." },
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
    [messages, loading, template, blocks]
  );

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div
        className="flex items-center px-5 shrink-0"
        style={{ height: 52, borderBottom: "1px solid #1a1a1a" }}
      >
        <span className="font-mono text-[12px] text-[#888] tracking-wider">
          <span style={{ color: "#C75A3A" }}>&#x2726;</span> Compose Guide
        </span>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto px-5 py-4" style={{ scrollbarWidth: "thin" }}>
        {messages.map((msg, i) => (
          <div key={i} className={`mb-4 ${msg.role === "user" ? "flex justify-end" : ""}`}>
            <div
              style={{
                maxWidth: msg.role === "user" ? "85%" : "100%",
                padding: msg.role === "user" ? "10px 14px" : "0",
                background: msg.role === "user" ? "rgba(199,90,58,0.12)" : "transparent",
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
            <span className="font-mono text-[12px] text-[#555]">pensando...</span>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="shrink-0 px-4 py-3" style={{ borderTop: "1px solid #1a1a1a" }}>
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
            placeholder="Pergunte ao guia..."
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

let idCounter = 0;
function makeBlock(purpose: string): CanvasBlock {
  return { id: `block-${++idCounter}-${Date.now()}`, purpose };
}

export default function ArchitectPage() {
  const [activeTemplate, setActiveTemplate] = useState("saas");
  const [blocks, setBlocks] = useState<CanvasBlock[]>(() =>
    templates.saas.blocks.map(makeBlock)
  );
  const [showAddMenu, setShowAddMenu] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const handleTemplateChange = useCallback((key: string) => {
    setActiveTemplate(key);
    setBlocks(templates[key].blocks.map(makeBlock));
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

  // Close add menu on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setShowAddMenu(false);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      {/* Top bar */}
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
        <span className="font-mono text-[11px] text-[#444]">
          {blocks.length} seções
        </span>
      </header>

      {/* Content — 60/40 split */}
      <div className="flex pt-14" style={{ height: "100vh" }}>
        {/* Left — Canvas (60%) */}
        <div className="flex-[3] overflow-y-auto px-8 py-6" style={{ borderRight: "1px solid #1a1a1a" }}>
          {/* Template selector */}
          <div className="mb-8">
            <label className="font-mono text-[11px] text-[#555] uppercase tracking-wider block mb-3">
              Template
            </label>
            <div className="flex gap-2">
              {Object.entries(templates).map(([key, t]) => (
                <button
                  key={key}
                  onClick={() => handleTemplateChange(key)}
                  className="px-4 py-2.5 rounded-lg font-sans text-[14px] cursor-pointer transition-colors duration-150"
                  style={{
                    background: activeTemplate === key ? "rgba(255,255,255,0.06)" : "transparent",
                    color: activeTemplate === key ? "#ddd" : "#555",
                    border: activeTemplate === key ? "1px solid rgba(255,255,255,0.08)" : "1px solid rgba(255,255,255,0.04)",
                  }}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          {/* Sortable blocks */}
          <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <SortableContext items={blocks.map((b) => b.id)} strategy={verticalListSortingStrategy}>
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
                    <SortableBlock block={block} index={i} onRemove={removeBlock} />
                  </div>
                ))}
              </div>
            </SortableContext>
          </DndContext>

          {/* Add section button */}
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
                  {blockCatalog.map((def) => (
                    <button
                      key={def.purpose}
                      onClick={() => addBlock(def.purpose)}
                      className="w-full flex items-center gap-3 px-5 py-3 text-left cursor-pointer hover:bg-[#1a1a1a] transition-colors duration-150"
                    >
                      <def.icon size={16} className="text-[#777] shrink-0" />
                      <div>
                        <span className="font-sans text-[14px] text-[#ccc]">{def.label}</span>
                        <span className="font-sans text-[12px] text-[#555] ml-3">{def.jtbd}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Choose molds button */}
          <div className="mt-8 mb-8">
            <Link
              href={`/blocks?sequence=${blocks.map((b) => b.purpose).join(",")}`}
              className="block w-full py-4 rounded-xl font-sans text-[16px] font-medium text-center cursor-pointer transition-colors duration-150"
              style={{
                background: blocks.length > 0 ? "#C75A3A" : "#222",
                color: blocks.length > 0 ? "#fff" : "#555",
              }}
            >
              Escolher moldes &rarr;
            </Link>
          </div>
        </div>

        {/* Right — AI Guide (40%) */}
        <div className="flex-[2]" style={{ background: "#111" }}>
          <ArchitectGuide blocks={blocks} template={activeTemplate} />
        </div>
      </div>
    </div>
  );
}
