/**
 * Minimal i18n primitives (static-export friendly, no routing).
 * Content is authored as `Localized` objects: { en: "...", es: "..." }.
 * React state lives in `components/language-provider.tsx` (useLanguage).
 */

export const languages = ["en", "es"] as const;
export type Lang = (typeof languages)[number];

export type Localized = Record<Lang, string>;

export const defaultLang: Lang = "en";
export const LANG_STORAGE_KEY = "monarca-lang";

export const langLabels: Record<Lang, { short: string; long: string }> = {
	en: { short: "EN", long: "English" },
	es: { short: "ES", long: "Español" },
};

export function isLang(value: unknown): value is Lang {
	return value === "en" || value === "es";
}

/** Resolve a Localized value (or pass through a plain string). */
export function localize(value: Localized | string, lang: Lang): string {
	return typeof value === "string" ? value : value[lang];
}
