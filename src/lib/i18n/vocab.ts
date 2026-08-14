import type { Locale } from "./locale";

/**
 * Controlled vocabulary for the catalogue. Slugs are the stable values used
 * for filtering/storage; labels are resolved per-locale for display.
 */

export const REGIONS = [
  "kumanovo",
  "ohrid",
  "miyak-debar",
  "skopska-blatija",
  "mariovo",
  "strumica",
] as const;
export type RegionSlug = (typeof REGIONS)[number];

export const CATEGORIES = ["garment", "carpet-rug", "ornament", "textile-fragment"] as const;
export type CategorySlug = (typeof CATEGORIES)[number];

export const MATERIALS = ["linen", "wool", "cotton", "silk", "metal-thread"] as const;
export type MaterialSlug = (typeof MATERIALS)[number];

export const TECHNIQUES = ["cross-stitch", "satin-stitch", "kilim-weave", "gold-couching"] as const;
export type TechniqueSlug = (typeof TECHNIQUES)[number];

const REGION_LABELS: Record<RegionSlug, Record<Locale, string>> = {
  kumanovo: { en: "Kumanovo", mk: "Куманово", sq: "Kumanovë" },
  ohrid: { en: "Ohrid", mk: "Охрид", sq: "Ohër" },
  "miyak-debar": { en: "Miyak (Debar)", mk: "Мијак (Дебар)", sq: "Mijak (Dibër)" },
  "skopska-blatija": { en: "Skopska Blatija", mk: "Скопска Блатија", sq: "Blatia e Shkupit" },
  mariovo: { en: "Mariovo", mk: "Мариово", sq: "Mariovë" },
  strumica: { en: "Strumica", mk: "Струмица", sq: "Strumicë" },
};

const CATEGORY_LABELS: Record<CategorySlug, Record<Locale, string>> = {
  garment: { en: "Garment", mk: "Облека", sq: "Veshje" },
  "carpet-rug": { en: "Carpet / Rug", mk: "Килим / черга", sq: "Qilim / Tapet" },
  ornament: { en: "Ornament", mk: "Орнамент", sq: "Ornament" },
  "textile-fragment": {
    en: "Textile fragment",
    mk: "Текстилен фрагмент",
    sq: "Fragment tekstili",
  },
};

const MATERIAL_LABELS: Record<MaterialSlug, Record<Locale, string>> = {
  linen: { en: "Linen", mk: "Лен", sq: "Li" },
  wool: { en: "Wool", mk: "Волна", sq: "Lesh" },
  cotton: { en: "Cotton", mk: "Памук", sq: "Pambuk" },
  silk: { en: "Silk", mk: "Свила", sq: "Mëndafsh" },
  "metal-thread": { en: "Metal thread", mk: "Метален конец", sq: "Fill metalik" },
};

const TECHNIQUE_LABELS: Record<TechniqueSlug, Record<Locale, string>> = {
  "cross-stitch": { en: "Cross-stitch", mk: "Крстест бод", sq: "Qëndisje me pikë kryq" },
  "satin-stitch": { en: "Satin stitch", mk: "Сатенски бод", sq: "Qëndisje sateni" },
  "kilim-weave": { en: "Kilim weave", mk: "Килимско ткаење", sq: "Endje qilimi" },
  "gold-couching": { en: "Gold couching", mk: "Златовез", sq: "Qëndisje me fill ari" },
};

export function regionLabel(slug: RegionSlug, locale: Locale): string {
  return REGION_LABELS[slug][locale];
}
export function categoryLabel(slug: CategorySlug, locale: Locale): string {
  return CATEGORY_LABELS[slug][locale];
}
export function materialLabel(slug: MaterialSlug, locale: Locale): string {
  return MATERIAL_LABELS[slug][locale];
}
export function techniqueLabel(slug: TechniqueSlug, locale: Locale): string {
  return TECHNIQUE_LABELS[slug][locale];
}
