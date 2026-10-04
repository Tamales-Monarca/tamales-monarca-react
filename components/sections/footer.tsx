"use client";

import { Clock, MapPin, Phone, ShoppingBag } from "lucide-react";
import Image from "next/image";
import { type SVGProps, useEffect, useState } from "react";

import { useLanguage } from "@/components/language-provider";
import { Separator } from "@/components/ui/separator";
import type { Localized } from "@/lib/i18n";
import { copy, nav, sectionIds, site } from "@/lib/site";

const local = {
	explore: { en: "Explore", es: "Explora" },
	contact: { en: "Contact", es: "Contacto" },
	home: { en: "Home", es: "Inicio" },
	backToTop: { en: "Back to top", es: "Volver arriba" },
	homeLink: {
		en: "Restaurante El Monarca, back to top",
		es: "Restaurante El Monarca, volver arriba",
	},
	callNumber: { en: "Call", es: "Llamar al" },
} satisfies Record<string, Localized>;

function FacebookIcon(props: SVGProps<SVGSVGElement>) {
	return (
		<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
			<path d="M24 12.07C24 5.41 18.63 0 12 0S0 5.41 0 12.07C0 18.1 4.39 23.1 10.13 24v-8.44H7.08v-3.49h3.05V9.41c0-3.02 1.79-4.69 4.53-4.69 1.31 0 2.68.24 2.68.24v2.97h-1.51c-1.49 0-1.96.93-1.96 1.89v2.26h3.33l-.53 3.49h-2.8V24C19.61 23.1 24 18.1 24 12.07Z" />
		</svg>
	);
}

/** Inlined at build time (next.config.js `env`), so server and client agree. */
const BUILD_YEAR = Number(process.env.BUILD_YEAR) || 2026;

const linkClass =
	"inline-flex min-h-11 items-center gap-2 underline-offset-4 transition-colors hover:text-highlight hover:underline focus-visible:rounded-sm focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-chalkboard focus-visible:outline-none";

export function Footer() {
	const { t } = useLanguage();
	const { common, footer } = copy;
	const newTab = t(common.opensInNewTab);
	// Build-time year in the static HTML, refreshed to the visitor's year after
	// hydration so the copyright never goes stale between deploys.
	const [year, setYear] = useState(BUILD_YEAR);
	useEffect(() => setYear(new Date().getFullYear()), []);

	return (
		<footer className="chalkboard relative overflow-hidden">
			{/* Marigold ribbon echoing the papel picado accent */}
			<div
				aria-hidden="true"
				className="h-1.5 bg-gradient-to-r from-marigold-500 via-chile-600 to-agave-500"
			/>
			<div className="container mx-auto px-4 pt-16 pb-8">
				<div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8">
					{/* Brand */}
					<div className="sm:col-span-2 lg:col-span-4">
						<a
							href={`#${sectionIds.hero}`}
							aria-label={t(local.homeLink)}
							className="inline-block rounded-md focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-chalkboard focus-visible:outline-none"
						>
							<Image
								src={site.logo.fullDark}
								alt=""
								width={site.logo.width}
								height={site.logo.height}
								className="h-auto w-44 sm:w-52"
							/>
						</a>
						<p className="mt-5 max-w-xs text-base leading-relaxed text-chalkboard-foreground/90">
							{t(footer.tagline)}
						</p>
						<div className="mt-6 flex flex-wrap items-center gap-3">
							{site.links.order ? (
								<a
									href={site.links.order}
									target="_blank"
									rel="noopener noreferrer"
									className="inline-flex min-h-11 items-center gap-2 rounded-full bg-highlight px-5 text-sm font-semibold text-highlight-foreground transition-colors hover:bg-marigold-300 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-chalkboard focus-visible:outline-none"
								>
									<ShoppingBag aria-hidden="true" className="size-4" />
									{t(common.orderOnline)}
									<span className="sr-only"> {newTab}</span>
								</a>
							) : (
								<p className="inline-flex min-h-11 items-center gap-2 rounded-full border border-dashed border-chalkboard-foreground/30 px-5 text-sm font-medium text-chalkboard-foreground/90">
									<ShoppingBag aria-hidden="true" className="size-4" />
									{t(common.orderingSoon)}
								</p>
							)}
							{site.links.facebook && (
								<a
									href={site.links.facebook}
									target="_blank"
									rel="noopener noreferrer"
									className="inline-flex size-11 items-center justify-center rounded-full border border-chalkboard-foreground/25 transition-colors hover:border-highlight hover:text-highlight focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-chalkboard focus-visible:outline-none"
								>
									<FacebookIcon className="size-5" />
									<span className="sr-only">
										{t(common.followUs)}: Facebook {newTab}
									</span>
								</a>
							)}
						</div>
					</div>

					{/* Quick links */}
					<nav aria-labelledby="footer-explore" className="lg:col-span-2">
						<h2
							id="footer-explore"
							className="font-heading text-lg font-semibold text-highlight"
						>
							{t(local.explore)}
						</h2>
						<ul className="mt-3 text-chalkboard-foreground/90">
							<li>
								<a href={`#${sectionIds.hero}`} className={linkClass}>
									{t(local.home)}
								</a>
							</li>
							{nav.map((item) => (
								<li key={item.href}>
									<a href={item.href} className={linkClass}>
										{t(item.label)}
									</a>
								</li>
							))}
						</ul>
					</nav>

					{/* Contact */}
					<div className="lg:col-span-3">
						<h2 className="font-heading text-lg font-semibold text-highlight">
							{t(local.contact)}
						</h2>
						<ul className="mt-3 space-y-1 text-chalkboard-foreground/90">
							<li>
								<a
									href={site.links.maps}
									target="_blank"
									rel="noopener noreferrer"
									className={`${linkClass} items-start py-2`}
								>
									<MapPin
										aria-hidden="true"
										className="mt-0.5 size-4 shrink-0 text-highlight"
									/>
									<address className="not-italic">
										{site.address.street}
										<br />
										{site.address.city}, {site.address.region}{" "}
										{site.address.postalCode}
									</address>
									<span className="sr-only"> {newTab}</span>
								</a>
							</li>
							{site.phones.map((p) => (
								<li key={p.e164}>
									<a href={p.href} className={`${linkClass} tabular-nums`}>
										<Phone
											aria-hidden="true"
											className="size-4 shrink-0 text-highlight"
										/>
										<span className="sr-only">{t(local.callNumber)} </span>
										{p.display}
										<span className="text-chalkboard-muted">
											· {t(p.label)}
										</span>
									</a>
								</li>
							))}
						</ul>
					</div>

					{/* Hours */}
					<div className="lg:col-span-3">
						<h2 className="font-heading text-lg font-semibold text-highlight">
							{t(copy.visit.hours)}
						</h2>
						<ul className="mt-3 space-y-3 text-chalkboard-foreground/90">
							{site.hours.map((h) => (
								<li key={h.label.en} className="flex items-start gap-2">
									<Clock
										aria-hidden="true"
										className="mt-1 size-4 shrink-0 text-highlight"
									/>
									<span>
										<span className="block font-medium">{t(h.label)}</span>
										<span className="tabular-nums">{t(h.time)}</span>
									</span>
								</li>
							))}
						</ul>
						{site.hoursNotes.length > 0 && (
							<ul className="mt-4 space-y-1 font-script text-xl text-chalkboard-muted">
								{site.hoursNotes.map((note) => (
									<li key={note.en}>{t(note)}</li>
								))}
							</ul>
						)}
					</div>
				</div>

				<Separator className="mt-12 bg-chalkboard-foreground/15" />

				<div className="mt-6 flex flex-col-reverse items-start gap-4 text-sm text-chalkboard-muted sm:flex-row sm:items-center sm:justify-between">
					<p>
						&copy; {year} {site.name}. {t(footer.rights)}
					</p>
					<a href={`#${sectionIds.hero}`} className={linkClass}>
						{t(local.backToTop)}
						<span aria-hidden="true">↑</span>
					</a>
				</div>
			</div>
		</footer>
	);
}
