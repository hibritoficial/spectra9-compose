"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown, Check, Sun, Moon, X } from "lucide-react";
import { useDsTokens } from "./DsTokensContext";

export default function DsSelector() {
  const {
    list,
    listLoading,
    listError,
    refreshList,
    activeDsId,
    tokens,
    tokensLoading,
    tokensError,
    setActiveDs,
    mode,
    setMode,
  } = useDsTokens();

  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const esc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("mousedown", handler);
    window.addEventListener("keydown", esc);
    return () => {
      window.removeEventListener("mousedown", handler);
      window.removeEventListener("keydown", esc);
    };
  }, [open]);

  const active = list.find((d) => d.ds_id === activeDsId) ?? null;
  const accentForButton = tokens?.brand?.accent ?? active?.accent_color;

  return (
    <div ref={ref} className="relative flex items-center gap-2">
      <button
        onClick={() => {
          if (!open && list.length === 0) {
            void refreshList();
          }
          setOpen((o) => !o);
        }}
        className="flex items-center gap-2 px-3 py-1.5 rounded cursor-pointer transition-colors duration-150"
        style={{
          background: active ? "rgba(255,255,255,0.05)" : "transparent",
          border: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        {active && accentForButton ? (
          <span
            className="w-3 h-3 rounded-full shrink-0"
            style={{ background: accentForButton }}
          />
        ) : (
          <span
            className="w-3 h-3 rounded-full shrink-0"
            style={{
              background: "transparent",
              border: "1px dashed rgba(255,255,255,0.2)",
            }}
          />
        )}
        <span className="font-mono text-[11px] text-[#aaa]">
          {tokensLoading
            ? "carregando..."
            : active
            ? `DS: ${active.name}`
            : "DS: nenhum"}
        </span>
        <ChevronDown size={12} className="text-[#666]" />
      </button>

      {active && (
        <button
          onClick={() => setMode(mode === "dark" ? "light" : "dark")}
          className="flex items-center gap-1 px-2 py-1.5 rounded cursor-pointer text-[#888] hover:text-[#ddd] transition-colors duration-150"
          style={{ border: "1px solid rgba(255,255,255,0.06)" }}
          title={`Modo: ${mode}`}
        >
          {mode === "dark" ? <Moon size={12} /> : <Sun size={12} />}
          <span className="font-mono text-[10px]">{mode}</span>
        </button>
      )}

      {open && (
        <div
          className="absolute top-full right-0 mt-2 rounded-lg overflow-hidden z-[60]"
          style={{
            background: "#141414",
            border: "1px solid #222",
            minWidth: 320,
            boxShadow: "0 12px 32px rgba(0,0,0,0.5)",
          }}
        >
          <div
            className="px-3 py-2 flex items-center justify-between"
            style={{ borderBottom: "1px solid #1f1f1f" }}
          >
            <span className="font-mono text-[10px] text-[#666] uppercase tracking-wider">
              Design Systems
            </span>
            <button
              onClick={() => void refreshList()}
              disabled={listLoading}
              className="font-mono text-[10px] text-[#666] hover:text-[#ddd] cursor-pointer disabled:opacity-40"
            >
              {listLoading ? "..." : "atualizar"}
            </button>
          </div>

          {listError && (
            <div className="px-3 py-2 font-mono text-[10px] text-[#C75A3A]">
              {listError}
            </div>
          )}
          {tokensError && (
            <div className="px-3 py-2 font-mono text-[10px] text-[#C75A3A]">
              {tokensError}
            </div>
          )}

          <div className="max-h-[340px] overflow-y-auto py-1">
            <button
              onClick={() => {
                setActiveDs(null);
                setOpen(false);
              }}
              className="w-full flex items-center gap-2 px-3 py-2 text-left cursor-pointer hover:bg-[#1a1a1a] transition-colors duration-150"
            >
              <div style={{ width: 14 }}>
                {!activeDsId && <Check size={12} className="text-[#C75A3A]" />}
              </div>
              <X size={12} className="text-[#555]" />
              <span className="font-mono text-[11px] text-[#aaa]">
                Nenhum (default)
              </span>
            </button>

            {list.length === 0 && !listLoading && !listError && (
              <div className="px-3 py-3 font-mono text-[10px] text-[#555]">
                Nenhum DS publicado ainda.
              </div>
            )}

            {list.map((ds) => {
              const isActive = ds.ds_id === activeDsId;
              return (
                <button
                  key={ds.ds_id}
                  onClick={() => {
                    setActiveDs(ds.ds_id);
                    setOpen(false);
                  }}
                  className="w-full flex items-start gap-2 px-3 py-2.5 text-left cursor-pointer hover:bg-[#1a1a1a] transition-colors duration-150"
                >
                  <div style={{ width: 14, marginTop: 3 }}>
                    {isActive && (
                      <Check size={12} className="text-[#C75A3A]" />
                    )}
                  </div>
                  <div className="flex gap-1.5 shrink-0 mt-1">
                    <span
                      className="w-3 h-3 rounded-full"
                      style={{ background: ds.primary_color }}
                    />
                    <span
                      className="w-3 h-3 rounded-full"
                      style={{ background: ds.accent_color }}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-mono text-[11px] text-[#ddd] truncate">
                      {ds.name}{" "}
                      <span className="text-[#555]">{ds.version}</span>
                    </div>
                    {ds.description && (
                      <div className="font-sans text-[11px] text-[#666] mt-0.5 leading-snug line-clamp-2">
                        {ds.description}
                      </div>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
