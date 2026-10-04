"use client";

import {
	Clock,
	MapPin,
	Navigation,
	Phone,
	ShoppingBag,
	UtensilsCrossed,
} from "lucide-react";
import type { ReactNode } from "react";

import { useLanguage } from "@/components/language-provider";
import { Badge } from "@/components/ui/badge";
import { TextureButton } from "@/components/ui/texture-button";
import { TextureCard } from "@/components/ui/texture-card";
import { useOpenStatus } from "@/hooks/use-open-status";
import { hoursForDay } from "@/lib/hours";
import type { Localized } from "@/lib/i18n";
import { type DayOfWeek, copy, sectionIds, site } from "@/lib/site";
import { cn } from "@/lib/utils";

const week: { day: DayOfWeek; label: Localized }[] = [
	{ day: "Monday", label: { en: "Monday", es: "Lunes" } },
	{ day: "Tuesday", label: { en: "Tuesday", es: "Martes" } },
	{ day: "Wednesday", label: { en: "Wednesday", es: "Miércoles" } },
	{ day: "Thursday", label: { en: "Thursday", es: "Jueves" } },
	{ day: "Friday", label: { en: "Friday", es: "Viernes" } },
	{ day: "Saturday", label: { en: "Saturday", es: "Sábado" } },
	{ day: "Sunday", label: { en: "Sunday", es: "Domingo" } },
];

/** Section-local bilingual strings. */
const local = {
	description: {
		en: "Dine in, pick up, or take a dozen tamales home. Find us in downtown Emporia.",
		es: "Come aquí, recoge tu orden o llévate una docena de tamales. Estamos en el centro de Emporia.",
	},
	today: { en: "Today", es: "Hoy" },
	closed: { en: "Closed", es: "Cerrado" },
	openNow: { en: "Open now", es: "Abierto ahora" },
	closedNow: { en: "Closed now", es: "Cerrado ahora" },
	day: { en: "Day", es: "Día" },
	time: { en: "Hours", es: "Horario" },
	hoursCaption: {
		en: "Weekly opening hours",
		es: "Horario semanal",
	},
	callNumber: { en: "Call", es: "Llamar al" },
	mapLoading: { en: "Loading map…", es: "Cargando mapa…" },
} satisfies Record<string, Localized>;

function InfoCard({
	icon,
	title,
	children,
	className,
}: {
	icon: ReactNode;
	title: string;
	children: ReactNode;
	className?: string;
}) {
	return (
		<TextureCard className={className}>
			<div className="h-full rounded-[calc(var(--radius)-4px)] bg-card/90 p-5 text-card-foreground sm:p-6">
				<h3 className="flex items-center gap-2.5 font-heading text-xl font-semibold">
					<span
						aria-hidden="true"
						className="flex size-9 items-center justify-center rounded-full bg-primary/15 text-accent"
					>
						{icon}
					</span>
					{title}
				</h3>
				<div className="mt-4">{children}</div>
			</div>
		</TextureCard>
	);
}

export function Visit() {
	const { t } = useLanguage();
	const { visit, common } = copy;
	const openStatus = useOpenStatus();
	const status =
		openStatus.state === "unknown"
			? null
			: { today: openStatus.today, isOpen: openStatus.state === "open" };
	const newTab = t(common.opensInNewTab);

	return (
		<section
			id={sectionIds.visit}
			aria-labelledby="visit-title"
			className="section-y bg-background"
		>
			<div className="container mx-auto px-4">
				<header className="mx-auto max-w-2xl text-center">
					<p className="text-sm font-semibold tracking-[0.2em] text-accent uppercase">
						{t(visit.eyebrow)}
					</p>
					<h2
						id="visit-title"
						className="mt-3 font-heading text-4xl text-foreground sm:text-5xl"
					>
						{t(visit.title)}
					</h2>
					<p className="mt-4 text-lg text-muted-foreground">
						{t(local.description)}
					</p>
				</header>

				<div className="mt-12 grid gap-6 lg:mt-16 lg:grid-cols-2 lg:gap-8">
					{/* Info column */}
					<div className="flex flex-col gap-6">
						<InfoCard
							icon={<Clock className="size-5" />}
							title={t(visit.hours)}
						>
							<div className="mb-3 min-h-6">
								{status && (
									<Badge variant="outline" className="h-6 px-2.5 text-sm">
										<span
											aria-hidden="true"
											className={cn(
												"size-2 rounded-full",
												status.isOpen ? "bg-secondary" : "bg-accent",
											)}
										/>
										{t(status.isOpen ? local.openNow : local.closedNow)}
									</Badge>
								)}
							</div>
							<table className="w-full text-left text-base">
								<caption className="sr-only">{t(local.hoursCaption)}</caption>
								<thead className="sr-only">
									<tr>
										<th scope="col">{t(local.day)}</th>
										<th scope="col">{t(local.time)}</th>
									</tr>
								</thead>
								<tbody>
									{week.map(({ day, label }) => {
										const ranges = hoursForDay(day);
										const isToday = status?.today === day;
										return (
											<tr
												key={day}
												aria-current={isToday ? "date" : undefined}
												className={cn(
													"border-b border-border/70 last:border-b-0",
													isToday &&
														"border-transparent bg-highlight font-semibold text-highlight-foreground",
												)}
											>
												<th
													scope="row"
													className={cn(
														"py-2.5 pl-3 font-medium",
														isToday && "rounded-l-md",
													)}
												>
													{t(label)}
													{isToday && (
														<span className="ml-2 font-script text-lg font-bold">
															· {t(local.today)}
														</span>
													)}
												</th>
												<td
													className={cn(
														"py-2.5 pr-3 text-right tabular-nums",
														isToday && "rounded-r-md",
													)}
												>
													{ranges.length > 0
														? ranges.map((h) => t(h.time)).join(", ")
														: t(local.closed)}
												</td>
											</tr>
										);
									})}
								</tbody>
							</table>
							{site.hoursNotes.length > 0 && (
								<ul className="mt-4 space-y-1.5 text-sm text-muted-foreground">
									{site.hoursNotes.map((note) => (
										<li key={note.en} className="flex items-start gap-2">
											<UtensilsCrossed
												aria-hidden="true"
												className="mt-0.5 size-4 shrink-0 text-secondary"
											/>
											{t(note)}
										</li>
									))}
								</ul>
							)}
						</InfoCard>

						<div className="grid gap-6 sm:grid-cols-2">
							<InfoCard
								icon={<MapPin className="size-5" />}
								title={t(visit.location)}
							>
								<address className="text-base leading-relaxed not-italic">
									{site.address.street}
									<br />
									{site.address.city}, {site.address.region}{" "}
									{site.address.postalCode}
								</address>
								<a
									href={site.links.maps}
									target="_blank"
									rel="noopener noreferrer"
									className="mt-3 inline-flex min-h-11 items-center text-sm font-semibold text-accent underline-offset-4 hover:underline focus-visible:rounded-sm focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
								>
									{t(common.viewMap)}
									<span className="sr-only"> {newTab}</span>
								</a>
							</InfoCard>

							<InfoCard
								icon={<Phone className="size-5" />}
								title={t(visit.phone)}
							>
								<ul className="space-y-1">
									{site.phones.map((p) => (
										<li key={p.e164}>
											<a
												href={p.href}
												className="inline-flex min-h-11 flex-wrap items-baseline gap-x-2 underline-offset-4 hover:text-accent hover:underline focus-visible:rounded-sm focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
											>
												<span className="sr-only">{t(local.callNumber)} </span>
												<span className="text-lg font-semibold tabular-nums">
													{p.display}
												</span>
												<span className="text-sm text-muted-foreground">
													{t(p.label)}
												</span>
											</a>
										</li>
									))}
								</ul>
							</InfoCard>
						</div>

						{/* Primary actions */}
						<div
							className={cn(
								"grid gap-3",
								site.links.order ? "sm:grid-cols-3" : "sm:grid-cols-2",
							)}
						>
							{site.links.order && (
								<TextureButton asChild variant="brand" size="lg">
									<a
										href={site.links.order}
										target="_blank"
										rel="noopener noreferrer"
										className="min-h-12"
									>
										<ShoppingBag aria-hidden="true" className="size-4" />
										{t(common.orderOnline)}
										<span className="sr-only"> {newTab}</span>
									</a>
								</TextureButton>
							)}
							<TextureButton
								asChild
								variant={site.links.order ? "accent" : "brand"}
								size="lg"
							>
								<a href={site.phones[0].href} className="min-h-12">
									<Phone aria-hidden="true" className="size-4" />
									{t(site.links.order ? common.callUs : common.callToOrder)}
									<span className="sr-only">: {site.phones[0].display}</span>
								</a>
							</TextureButton>
							<TextureButton asChild variant="secondary" size="lg">
								<a
									href={site.links.directions}
									target="_blank"
									rel="noopener noreferrer"
									className="min-h-12"
								>
									<Navigation aria-hidden="true" className="size-4" />
									{t(common.directions)}
									<span className="sr-only"> {newTab}</span>
								</a>
							</TextureButton>
						</div>
						{!site.links.order && (
							<p className="-mt-3 flex items-center gap-2 text-sm text-muted-foreground">
								<ShoppingBag aria-hidden="true" className="size-4" />
								{t(common.orderingSoon)}
							</p>
						)}
					</div>

					{/* Map column */}
					<div className="flex flex-col gap-6">
						<div className="relative min-h-80 flex-1 overflow-hidden rounded-[calc(var(--radius)*2)] border border-border bg-muted shadow-xl shadow-carbon-900/10 sm:min-h-96">
							{/* Placeholder visible behind the iframe while it loads */}
							<div
								aria-hidden="true"
								className="absolute inset-0 flex items-center justify-center gap-2 text-sm font-semibold text-muted-foreground"
							>
								<MapPin className="size-5" />
								{t(local.mapLoading)}
							</div>
							<iframe
								src={site.links.mapEmbed}
								title={t(visit.mapTitle)}
								loading="lazy"
								referrerPolicy="no-referrer-when-downgrade"
								allowFullScreen
								className="absolute inset-0 size-full border-0"
							/>
						</div>
						<div className="chalkboard relative overflow-hidden rounded-[calc(var(--radius)*2)] p-6 sm:p-8">
							<p className="font-script text-3xl leading-tight font-bold text-highlight">
								{t(visit.cateringNote)}
							</p>
							<a
								href={site.phones[0].href}
								className="mt-3 inline-flex min-h-11 items-center gap-2 text-base font-semibold text-chalkboard-foreground underline underline-offset-4 hover:text-highlight focus-visible:rounded-sm focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
							>
								<Phone aria-hidden="true" className="size-4" />
								<span className="sr-only">{t(local.callNumber)} </span>
								{site.phones[0].display}
							</a>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
