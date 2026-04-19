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
  type LucideIcon,
} from "lucide-react";
import {
  HeroStatement,
  HeroProduct,
  HeroSplit,
  HeroVideo,
  HeroImmersive,
} from "../blocks/hero";
import {
  OverviewCarousel,
  OverviewIcons,
  OverviewTabs,
  OverviewNumbers,
} from "../blocks/overview";
import {
  FeatureAlternating,
  FeatureScrollStory,
  FeatureGrid,
} from "../blocks/feature";
import { ProofTestimonials, ProofLogos, ProofStats } from "../blocks/proof";
import { blockRegistry } from "../blocks/registry";

export interface PurposeDef {
  purpose: string;
  label: string;
  jtbd: string;
  icon: LucideIcon;
  elements: string[];
  registryId: string | null;
}

export const purposeCatalog: PurposeDef[] = [
  {
    purpose: "hero",
    label: "Hero",
    jtbd: "Isso é para mim?",
    icon: Crosshair,
    elements: ["Headline", "Sub", "CTA", "Media"],
    registryId: "hero",
  },
  {
    purpose: "overview",
    label: "Overview",
    jtbd: "O que faz?",
    icon: Zap,
    elements: ["Headline", "Items", "Media"],
    registryId: "overview",
  },
  {
    purpose: "feature_showcase",
    label: "Feature Showcase",
    jtbd: "Como funciona?",
    icon: Wrench,
    elements: ["Headline", "Steps", "Media"],
    registryId: "feature",
  },
  {
    purpose: "product_demo",
    label: "Product Demo",
    jtbd: "Mostra na prática",
    icon: Monitor,
    elements: ["Screen", "Headline", "Body"],
    registryId: null,
  },
  {
    purpose: "social_proof",
    label: "Social Proof",
    jtbd: "Quem mais confia?",
    icon: MessageCircle,
    elements: ["Testimonials", "Logos"],
    registryId: "proof",
  },
  {
    purpose: "about",
    label: "About / Quem Somos",
    jtbd: "Quem está por trás?",
    icon: Users,
    elements: ["Headline", "Body", "Media"],
    registryId: null,
  },
  {
    purpose: "pricing",
    label: "Pricing",
    jtbd: "Quanto custa?",
    icon: DollarSign,
    elements: ["Plans", "CTA", "FAQ"],
    registryId: null,
  },
  {
    purpose: "faq",
    label: "FAQ",
    jtbd: "E se eu tiver dúvidas?",
    icon: HelpCircle,
    elements: ["Questions", "Answers"],
    registryId: null,
  },
  {
    purpose: "cta",
    label: "CTA Final",
    jtbd: "O que faço agora?",
    icon: Rocket,
    elements: ["Headline", "CTA", "Sub"],
    registryId: null,
  },
  {
    purpose: "newsletter",
    label: "Newsletter",
    jtbd: "Quero ficar por dentro",
    icon: Mail,
    elements: ["Headline", "Input", "CTA"],
    registryId: null,
  },
  {
    purpose: "footer",
    label: "Footer",
    jtbd: "Links e contato",
    icon: Minus,
    elements: ["Links", "Social", "Copyright"],
    registryId: null,
  },
];

export interface PageTemplate {
  key: string;
  label: string;
  blocks: string[];
}

export const pageTemplates: PageTemplate[] = [
  {
    key: "saas",
    label: "SaaS Landing",
    blocks: [
      "hero",
      "overview",
      "feature_showcase",
      "feature_showcase",
      "social_proof",
      "pricing",
      "cta",
    ],
  },
  {
    key: "institutional",
    label: "Site Institucional",
    blocks: ["hero", "about", "feature_showcase", "social_proof", "cta"],
  },
  {
    key: "product",
    label: "Produto / Serviço",
    blocks: [
      "hero",
      "feature_showcase",
      "product_demo",
      "social_proof",
      "pricing",
      "faq",
      "cta",
    ],
  },
  {
    key: "brand",
    label: "Manifesto / Brand",
    blocks: ["hero", "about", "feature_showcase", "cta"],
  },
  {
    key: "pricing_page",
    label: "Página de Preços",
    blocks: ["hero", "pricing", "faq", "social_proof", "cta"],
  },
  {
    key: "feature_page",
    label: "Página de Feature",
    blocks: [
      "hero",
      "feature_showcase",
      "overview",
      "social_proof",
      "cta",
    ],
  },
  {
    key: "about_page",
    label: "Sobre / Quem Somos",
    blocks: ["hero", "about", "social_proof", "newsletter"],
  },
  {
    key: "blank",
    label: "Em branco",
    blocks: [],
  },
];

export const blockComponents: Record<string, React.ComponentType> = {
  "hero-statement": HeroStatement,
  "hero-product": HeroProduct,
  "hero-split": HeroSplit,
  "hero-video": HeroVideo,
  "hero-immersive": HeroImmersive,
  "overview-carousel": OverviewCarousel,
  "overview-icons": OverviewIcons,
  "overview-tabs": OverviewTabs,
  "overview-numbers": OverviewNumbers,
  "feature-alternating": FeatureAlternating,
  "feature-scroll-story": FeatureScrollStory,
  "feature-grid": FeatureGrid,
  "proof-testimonials": ProofTestimonials,
  "proof-logos": ProofLogos,
  "proof-stats": ProofStats,
};

export function variantsForPurpose(purpose: string) {
  const def = purposeCatalog.find((p) => p.purpose === purpose);
  if (!def?.registryId) return [];
  return (
    blockRegistry.find((p) => p.id === def.registryId)?.variants ?? []
  );
}

export function defaultVariantFor(purpose: string): string | null {
  const variants = variantsForPurpose(purpose);
  return variants[0]?.id ?? null;
}

export function resolveVariant(
  purpose: string,
  variantHint: string | null | undefined,
): string | null {
  const variants = variantsForPurpose(purpose);
  if (variants.length === 0) return null;
  if (variantHint && variants.find((v) => v.id === variantHint)) {
    return variantHint;
  }
  return variants[0].id;
}

export function purposeDef(purpose: string): PurposeDef | undefined {
  return purposeCatalog.find((p) => p.purpose === purpose);
}
