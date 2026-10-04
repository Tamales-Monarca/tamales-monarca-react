"use client";

import { Clock } from "lucide-react";

import { useLanguage } from "@/components/language-provider";
import { useOpenStatus } from "@/hooks/use-open-status";
import { formatClock } from "@/lib/hours";
import type { Localized } from "@/lib/i18n";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

const statusCopy = {
	open: { en: "Open now", es: "Abierto ahora" },
	closed: { en: "Closed now", es: "Cerrado ahora" },
	until: { en: "until", es: "hasta las" },
	opens: { en: "opens", es: "abre" },
	today: { en: "today", es: "hoy" },
	tomorrow: { en: "tomorrow", es: "mañana" },
	checking: { en: "Today's hours", es: "Horario de hoy" },
} satisfies Record<string, Localized>;

/**
 * Pill showing "Open now · until 8 PM" or "Closed now · opens 10 AM tomorrow".
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
			const when =
				status.when && status.when !== "later"
					? ` ${t(statusCopy[status.when])}`
					: "";
			label += ` · ${t(statusCopy.opens)} ${formatClock(status.opens, lang)}${when}`;
		}
	} else {
		label = `${t(statusCopy.checking)}: ${t(site.hours[0].time)}`;
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
