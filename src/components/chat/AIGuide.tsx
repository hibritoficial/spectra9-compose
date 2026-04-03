"use client";

import { useState, useRef, useEffect, useCallback } from "react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface AIGuideProps {
  open: boolean;
  onClose: () => void;
  activeVariant: string;
  viewport: string;
}

export default function AIGuide({
  open,
  onClose,
  activeVariant,
  viewport,
}: AIGuideProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [welcomed, setWelcomed] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Scroll to bottom on new messages
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  // Focus input when opening
  useEffect(() => {
    if (open && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 200);
    }
  }, [open]);

  // Welcome message on first open
  useEffect(() => {
    if (open && !welcomed && messages.length === 0) {
      setWelcomed(true);
      setMessages([
        {
          role: "assistant",
          content:
            "Oi! Sou o guia do Compose. Estou aqui pra te ajudar a montar a estrutura da sua página.\n\nMe conta: que tipo de página você está construindo? Landing de produto, site institucional, página de serviço? Vou sugerir uma sequência inicial de blocos.",
        },
      ]);
    }
  }, [open, welcomed, messages.length]);

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
            context: { activeVariant, viewport },
          }),
        });

        const data = await res.json();
        if (data.text) {
          setMessages((prev) => [
            ...prev,
            { role: "assistant", content: data.text },
          ]);
        } else {
          setMessages((prev) => [
            ...prev,
            {
              role: "assistant",
              content: "Desculpe, algo deu errado. Tente de novo.",
            },
          ]);
        }
      } catch {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: "Erro de conexão. Verifique se a API key está configurada.",
          },
        ]);
      } finally {
        setLoading(false);
      }
    },
    [messages, loading, activeVariant, viewport]
  );

  return (
    <aside
      className="guide-panel fixed top-14 right-0 z-40 h-[calc(100vh-56px)] flex flex-col transition-transform duration-300"
      style={{
        width: 380,
        transform: open ? "translateX(0)" : "translateX(100%)",
        background: "#111",
        borderLeft: "1px solid #222",
      }}
    >
      {/* Header */}
      <div
        className="flex items-center justify-between px-5 shrink-0"
        style={{ height: 52, borderBottom: "1px solid #1a1a1a" }}
      >
        <span
          style={{
            fontFamily: '"SF Mono", monospace',
            fontSize: 12,
            color: "#888",
            letterSpacing: "0.08em",
          }}
        >
          <span style={{ color: "#C75A3A" }}>&#x2726;</span> Compose Guide
        </span>
        <button
          onClick={onClose}
          className="text-[#555] hover:text-[#999] transition-colors duration-150"
          style={{ fontSize: 18, lineHeight: 1 }}
        >
          &times;
        </button>
      </div>

      {/* Messages */}
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
                fontFamily: '"Helvetica Neue", sans-serif',
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
            <span
              style={{
                fontFamily: '"SF Mono", monospace',
                fontSize: 12,
                color: "#555",
              }}
            >
              pensando...
            </span>
          </div>
        )}
      </div>

      {/* Input */}
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
            placeholder="Pergunte ao guia..."
            className="flex-1 px-4 py-2.5 rounded-lg font-sans text-[14px] text-[#ddd] placeholder-[#444] outline-none"
            style={{
              background: "#1a1a1a",
              border: "1px solid #222",
            }}
          />
          <button
            onClick={() => sendMessage(input)}
            disabled={loading || !input.trim()}
            className="px-3 py-2.5 rounded-lg font-mono text-[12px] transition-colors duration-150"
            style={{
              background: input.trim() && !loading ? "#C75A3A" : "#222",
              color: input.trim() && !loading ? "#fff" : "#555",
            }}
          >
            &uarr;
          </button>
        </div>
        <div
          className="mt-2 text-center"
          style={{
            fontFamily: '"SF Mono", monospace',
            fontSize: 10,
            color: "#333",
          }}
        >
          G para abrir/fechar
        </div>
      </div>
    </aside>
  );
}
