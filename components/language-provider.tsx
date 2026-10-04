"use client";

import {
	LANG_STORAGE_KEY,
	type Lang,
	type Localized,
	defaultLang,
	isLang,
	localize,
} from "@/lib/i18n";
import {
	type ReactNode,
	createContext,
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useState,
} from "react";

interface LanguageContextValue {
	/** Current language ("en" | "es"). Always "en" during static prerender. */
	lang: Lang;
	setLang: (lang: Lang) => void;
	toggleLang: () => void;
	/** Translate a Localized value: t({ en: "Hi", es: "Hola"}) */
	t: (value: Localized | string) => string;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

function detectInitialLang(): Lang {
	try {
		const stored = window.localStorage.getItem(LANG_STORAGE_KEY);
		if (isLang(stored)) return stored;
	} catch {
		// storage unavailable (private mode, blocked): fall through
	}
	const nav = window.navigator.language?.slice(0, 2).toLowerCase();
	return isLang(nav) ? nav : defaultLang;
}

export function LanguageProvider({ children }: { children: ReactNode }) {
	const [lang, setLangState] = useState<Lang>(defaultLang);

	// Pick up stored / browser language after hydration (static export safe).
	useEffect(() => {
		const initial = detectInitialLang();
		if (initial !== defaultLang) setLangState(initial);
	}, []);

	// Keep <html lang> in sync for screen readers and SEO.
	useEffect(() => {
		document.documentElement.lang = lang;
	}, [lang]);

	const setLang = useCallback((next: Lang) => {
		setLangState(next);
		try {
			window.localStorage.setItem(LANG_STORAGE_KEY, next);
		} catch {
			// ignore
		}
	}, []);

	const toggleLang = useCallback(() => {
		setLang(lang === "en" ? "es" : "en");
	}, [lang, setLang]);

	const value = useMemo<LanguageContextValue>(
		() => ({
			lang,
			setLang,
			toggleLang,
			t: (v) => localize(v, lang),
		}),
		[lang, setLang, toggleLang],
	);

	return (
		<LanguageContext.Provider value={value}>
			{children}
		</LanguageContext.Provider>
	);
}

export function useLanguage(): LanguageContextValue {
	const ctx = useContext(LanguageContext);
	if (!ctx) {
		throw new Error("useLanguage must be used inside <LanguageProvider>");
	}
	return ctx;
}
