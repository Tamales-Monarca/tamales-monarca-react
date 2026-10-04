"use client";

import { useLanguage } from "@/components/language-provider";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { type Lang, isLang, langLabels, languages } from "@/lib/i18n";
import { cn } from "@/lib/utils";

/** Compact EN | ES switch. Each item is a 44px touch target (WCAG 2.5.5). */
export function LanguageToggle({ className }: { className?: string }) {
	const { lang, setLang, t } = useLanguage();

	return (
		<ToggleGroup
			type="single"
			variant="outline"
			value={lang}
			onValueChange={(v) => {
				if (isLang(v)) setLang(v);
			}}
			aria-label={t({ en: "Language", es: "Idioma" })}
			className={cn("gap-1 rounded-full", className)}
		>
			{languages.map((l: Lang) => (
				<ToggleGroupItem
					key={l}
					value={l}
					lang={l}
					aria-label={langLabels[l].long}
					className="h-11 min-w-11 rounded-full px-3 text-xs font-semibold tracking-wide data-[state=on]:bg-primary data-[state=on]:text-primary-foreground"
				>
					{langLabels[l].short}
				</ToggleGroupItem>
			))}
		</ToggleGroup>
	);
}
