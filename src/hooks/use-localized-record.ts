import { useI18n } from "@/lib/i18n/context";
import { categoryLabel, materialLabel, regionLabel, techniqueLabel } from "@/lib/i18n/vocab";
import { localize, type EtnoRecord } from "@/lib/records";

export function useLocalizedRecord(record: EtnoRecord) {
  const { locale } = useI18n();
  return {
    title: localize(record.title, locale),
    description: localize(record.description, locale),
    period: localize(record.period, locale),
    regionLabel: regionLabel(record.region, locale),
    categoryLabel: categoryLabel(record.category, locale),
    materialLabel: materialLabel(record.material, locale),
    techniqueLabel: techniqueLabel(record.technique, locale),
  };
}
