"use client";

import { Clock } from "lucide-react";

import { useLanguage } from "@/components/language-provider";
import { useOpenStatus } from "@/hooks/use-open-status";
import { formatClock } from "@/lib/hours";
import type { Localized } from "@/lib/i18n";
import type { DayOfWeek } from "@/lib/site";
import { cn } from "@/lib/utils";

const statusCopy = {
	open: { en: "Open now", es: "Abierto ahora" },
	closed: { en: "Closed now", es: "Cerrado ahora" },
	until: { en: "until", es: "hasta las" },
	opens: { en: "opens", es: "abre" },
	today: { en: "today", es: "hoy" },
	tomorrow: { en: "tomorrow", es: "mañana" },
	checking: { en: "Open Tuesday – Sunday", es: "Abierto de martes a domingo" },
} satisfies Record<string, Localized>;

const dayNames: Record<DayOfWeek, Localized> = {
	Monday: { en: "Monday", es: "el lunes" },
	Tuesday: { en: "Tuesday", es: "el martes" },
	Wednesday: { en: "Wednesday", es: "el miércoles" },
	Thursday: { en: "Thursday", es: "el jueves" },
	Friday: { en: "Friday", es: "el viernes" },
	Saturday: { en: "Saturday", es: "el sábado" },
	Sunday: { en: "Sunday", es: "el domingo" },
};

/**
 * Pill showing "Open now · until 7 PM" or "Closed now · opens 9 AM Tuesday".
 * Fixed height so the late-arriving status never shifts layout. Passive
 * display: deliberately not a live region, so it never interrupts
 * screen-reader users on load or when the minute ticks over.
 */
export function OpenStatusPill({
	className,
	tone = "dark",
}: {
	className?: string;
	/** "dark" for use on the chalkboard hero, "light" for page surfaces. */
	tone?: "dark" | "light";
}) {
	const { lang, t } = useLanguage();
	const status = useOpenStatus();

	let dot = "bg-carbon-400";
	let label: string;
	if (status.state === "open") {
		dot = "bg-agave-400";
		label = `${t(statusCopy.open)} · ${t(statusCopy.until)} ${formatClock(status.closes, lang)}`;
	} else if (status.state === "closed") {
		dot = "bg-chile-400";
		label = t(statusCopy.closed);
		if (status.opens) {
			let when = "";
			if (status.when === "later") {
				if (status.opensDay) when = ` ${t(dayNames[status.opensDay])}`;
			} else if (status.when) {
				when = ` ${t(statusCopy[status.when])}`;
			}
			label += ` · ${t(statusCopy.opens)} ${formatClock(status.opens, lang)}${when}`;
		}
	} else {
		label = t(statusCopy.checking);
	}

	return (
		<p
			className={cn(
				"inline-flex h-9 items-center gap-2.5 rounded-full border px-4 text-sm font-medium backdrop-blur-sm",
				tone === "dark"
					? "border-chalkboard-foreground/15 bg-chalkboard/60 text-chalkboard-foreground"
					: "border-border bg-card text-card-foreground",
				className,
			)}
		>
			<span className="relative flex size-2.5" aria-hidden="true">
				{status.state === "open" ? (
					<span
						className={cn(
							"absolute inline-flex size-full animate-ping rounded-full opacity-60 motion-reduce:animate-none",
							dot,
						)}
					/>
				) : null}
				<span
					className={cn("relative inline-flex size-2.5 rounded-full", dot)}
				/>
			</span>
			<Clock className="size-4 opacity-70" aria-hidden="true" />
			<span>{label}</span>
		</p>
	);
}
