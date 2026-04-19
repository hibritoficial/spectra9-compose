/* Tipos do contrato v1 do endpoint /api/ds-registry/[dsId]/tokens do hbt-spectra9.
   Shape validado em 2026-04-19 · api_version "1". */

export interface DerivedTokens {
  surfBase: string;
  surfRaised: string;
  surfOverlay: string;
  surfSunken: string;
  textPrimary: string;
  textSecondary: string;
  textTertiary: string;
  textDisabled: string;
  borderDefault: string;
  borderSubtle: string;
  borderStrong: string;
}

export interface BrandTokens {
  accent: string;
  accentLight: string;
  accentDeep: string;
  accentGlow: string;
  accentBorder: string;
  secondary: string;
  secondaryLight: string;
  secondaryDeep: string;
}

export interface SignalTokens {
  green: string;
  amber: string;
  rose: string;
  info: string;
}

export interface GradientStop {
  hex: string;
  pos: number;
}

export interface DsTokensPayload {
  api_version: "1";
  ds_id: string;
  name: string;
  version: string;
  description: string | null;
  updated_at: string;
  input: {
    primary: string;
    accent: string;
    radius_base: number;
  };
  brand: BrandTokens;
  tokens: {
    dark: DerivedTokens;
    light: DerivedTokens;
  };
  signal: {
    dark: SignalTokens;
    light: SignalTokens;
  };
  gradient: GradientStop[];
  fonts: {
    heading: string;
    body: string;
    mono: string | null;
  };
  typography: {
    display_size?: number;
    h1_size?: number;
    h2_size?: number;
    body_size?: number;
    caption_size?: number;
    mono_font?: string;
  } | null;
}

export interface DsListItem {
  id: string;
  ds_id: string;
  name: string;
  version: string;
  description: string | null;
  primary_color: string;
  accent_color: string;
}

export interface DsListResponse {
  count: number;
  items: DsListItem[];
}
