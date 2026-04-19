"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import type { DsTokensPayload, DsListItem } from "./types";

const DS_BASE_URL =
  process.env.NEXT_PUBLIC_SPECTRA9_DS_BASE_URL ??
  "https://spectra9.hibrit.com.br";

const STORAGE_KEY_DS = "spectra9-compose.active-ds";
const STORAGE_KEY_MODE = "spectra9-compose.ds-mode";

type ThemeMode = "dark" | "light";

interface DsContextValue {
  list: DsListItem[];
  listLoading: boolean;
  listError: string | null;
  refreshList: () => Promise<void>;

  activeDsId: string | null;
  tokens: DsTokensPayload | null;
  tokensLoading: boolean;
  tokensError: string | null;
  setActiveDs: (dsId: string | null) => void;

  mode: ThemeMode;
  setMode: (mode: ThemeMode) => void;
}

const DsContext = createContext<DsContextValue | null>(null);

export function useDsTokens(): DsContextValue {
  const ctx = useContext(DsContext);
  if (!ctx) {
    throw new Error("useDsTokens must be used inside DsTokensProvider");
  }
  return ctx;
}

export function DsTokensProvider({ children }: { children: React.ReactNode }) {
  const [list, setList] = useState<DsListItem[]>([]);
  const [listLoading, setListLoading] = useState(false);
  const [listError, setListError] = useState<string | null>(null);

  const [activeDsId, setActiveDsIdState] = useState<string | null>(null);
  const [tokens, setTokens] = useState<DsTokensPayload | null>(null);
  const [tokensLoading, setTokensLoading] = useState(false);
  const [tokensError, setTokensError] = useState<string | null>(null);

  const [mode, setModeState] = useState<ThemeMode>("dark");

  const mountedRef = useRef(false);

  useEffect(() => {
    mountedRef.current = true;
    try {
      const savedDs = localStorage.getItem(STORAGE_KEY_DS);
      if (savedDs) setActiveDsIdState(savedDs);
      const savedMode = localStorage.getItem(STORAGE_KEY_MODE);
      if (savedMode === "light" || savedMode === "dark") {
        setModeState(savedMode);
      }
    } catch {
      /* noop */
    }
    return () => {
      mountedRef.current = false;
    };
  }, []);

  const refreshList = useCallback(async () => {
    setListLoading(true);
    setListError(null);
    try {
      const res = await fetch(`${DS_BASE_URL}/api/ds-registry`, {
        cache: "no-store",
      });
      if (!res.ok) {
        throw new Error(`list ds falhou (${res.status})`);
      }
      const data = (await res.json()) as { items: DsListItem[] };
      if (mountedRef.current) {
        setList(data.items ?? []);
      }
    } catch (err) {
      if (mountedRef.current) {
        setListError((err as Error).message);
      }
    } finally {
      if (mountedRef.current) {
        setListLoading(false);
      }
    }
  }, []);

  useEffect(() => {
    void refreshList();
  }, [refreshList]);

  useEffect(() => {
    if (!activeDsId) {
      setTokens(null);
      setTokensError(null);
      return;
    }

    let cancelled = false;
    setTokensLoading(true);
    setTokensError(null);

    fetch(`${DS_BASE_URL}/api/ds-registry/${activeDsId}/tokens`, {
      cache: "no-store",
    })
      .then(async (res) => {
        if (!res.ok) {
          throw new Error(`tokens ${activeDsId} (${res.status})`);
        }
        const data = (await res.json()) as DsTokensPayload;
        if (!cancelled && mountedRef.current) {
          setTokens(data);
        }
      })
      .catch((err: Error) => {
        if (!cancelled && mountedRef.current) {
          setTokens(null);
          setTokensError(err.message);
        }
      })
      .finally(() => {
        if (!cancelled && mountedRef.current) {
          setTokensLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [activeDsId]);

  useEffect(() => {
    if (typeof document === "undefined") return;
    const root = document.documentElement;
    if (!tokens) {
      root.removeAttribute("data-ds-active");
      root.removeAttribute("data-ds-mode");
      const clearKeys = [
        "--ds-primary",
        "--ds-accent",
        "--ds-radius",
        "--ds-font-heading",
        "--ds-font-body",
        "--ds-font-mono",
        "--ds-surf-base",
        "--ds-surf-raised",
        "--ds-surf-overlay",
        "--ds-surf-sunken",
        "--ds-text-primary",
        "--ds-text-secondary",
        "--ds-text-tertiary",
        "--ds-text-disabled",
        "--ds-border-default",
        "--ds-border-subtle",
        "--ds-border-strong",
        "--ds-brand-accent",
        "--ds-brand-accent-light",
        "--ds-brand-accent-deep",
        "--ds-brand-accent-glow",
        "--ds-brand-secondary",
        "--ds-signal-green",
        "--ds-signal-amber",
        "--ds-signal-rose",
        "--ds-signal-info",
        "--ds-gradient",
      ];
      clearKeys.forEach((k) => root.style.removeProperty(k));
      return;
    }

    const t = mode === "dark" ? tokens.tokens.dark : tokens.tokens.light;
    const s = mode === "dark" ? tokens.signal.dark : tokens.signal.light;

    root.setAttribute("data-ds-active", tokens.ds_id);
    root.setAttribute("data-ds-mode", mode);

    root.style.setProperty("--ds-primary", tokens.input.primary);
    root.style.setProperty("--ds-accent", tokens.input.accent);
    root.style.setProperty("--ds-radius", `${tokens.input.radius_base}px`);

    root.style.setProperty("--ds-font-heading", tokens.fonts.heading);
    root.style.setProperty("--ds-font-body", tokens.fonts.body);
    if (tokens.fonts.mono) {
      root.style.setProperty("--ds-font-mono", tokens.fonts.mono);
    }

    root.style.setProperty("--ds-surf-base", t.surfBase);
    root.style.setProperty("--ds-surf-raised", t.surfRaised);
    root.style.setProperty("--ds-surf-overlay", t.surfOverlay);
    root.style.setProperty("--ds-surf-sunken", t.surfSunken);
    root.style.setProperty("--ds-text-primary", t.textPrimary);
    root.style.setProperty("--ds-text-secondary", t.textSecondary);
    root.style.setProperty("--ds-text-tertiary", t.textTertiary);
    root.style.setProperty("--ds-text-disabled", t.textDisabled);
    root.style.setProperty("--ds-border-default", t.borderDefault);
    root.style.setProperty("--ds-border-subtle", t.borderSubtle);
    root.style.setProperty("--ds-border-strong", t.borderStrong);

    root.style.setProperty("--ds-brand-accent", tokens.brand.accent);
    root.style.setProperty("--ds-brand-accent-light", tokens.brand.accentLight);
    root.style.setProperty("--ds-brand-accent-deep", tokens.brand.accentDeep);
    root.style.setProperty("--ds-brand-accent-glow", tokens.brand.accentGlow);
    root.style.setProperty("--ds-brand-secondary", tokens.brand.secondary);

    root.style.setProperty("--ds-signal-green", s.green);
    root.style.setProperty("--ds-signal-amber", s.amber);
    root.style.setProperty("--ds-signal-rose", s.rose);
    root.style.setProperty("--ds-signal-info", s.info);

    if (tokens.gradient?.length > 0) {
      const stops = tokens.gradient
        .map((g) => `${g.hex} ${Math.round(g.pos * 100)}%`)
        .join(", ");
      root.style.setProperty(
        "--ds-gradient",
        `linear-gradient(135deg, ${stops})`,
      );
    }
  }, [tokens, mode]);

  const setActiveDs = useCallback((dsId: string | null) => {
    setActiveDsIdState(dsId);
    try {
      if (dsId) {
        localStorage.setItem(STORAGE_KEY_DS, dsId);
      } else {
        localStorage.removeItem(STORAGE_KEY_DS);
      }
    } catch {
      /* noop */
    }
  }, []);

  const setMode = useCallback((m: ThemeMode) => {
    setModeState(m);
    try {
      localStorage.setItem(STORAGE_KEY_MODE, m);
    } catch {
      /* noop */
    }
  }, []);

  const value = useMemo<DsContextValue>(
    () => ({
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
    }),
    [
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
    ],
  );

  return <DsContext.Provider value={value}>{children}</DsContext.Provider>;
}
