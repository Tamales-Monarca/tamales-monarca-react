"use client";

import { Navigation, Phone, ShoppingBag } from "lucide-react";

import { useLanguage } from "@/components/language-provider";
import type { Localized } from "@/lib/i18n";
import { copy, site } from "@/lib/site";

const local = {
	label: { en: "Quick actions", es: "Acciones rápidas" },
	order: { en: "Order", es: "Ordenar" },
	directions: { en: "Directions", es: "Llegar" },
} satisfies Record<string, Localized>;

const itemClass =
	"flex min-h-14 flex-1 flex-col items-center justify-center gap-0.5 rounded-xl text-xs font-semibold transition-colors focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none";

/**
 * Phone-only sticky action bar (< 640px): the restaurant's conversion
 * actions (order or call, directions) stay one thumb-tap away while scrolling. Hidden from sm up, where
 * the header shows Order Online.
 */
export function MobileActionBar() {
	const { t } = useLanguage();
	const phone = site.phones[0];
	const newTab = t(copy.common.opensInNewTab);

	return (
		<>
			{/* Spacer so the bar never covers the end of the footer. */}
			<div
				aria-hidden="true"
				className="h-[calc(4.5rem+env(safe-area-inset-bottom))] bg-chalkboard sm:hidden"
			/>
			<nav
				aria-label={t(local.label)}
				className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/95 px-3 pt-2 pb-[calc(0.5rem+env(safe-area-inset-bottom))] shadow-[0_-4px_16px_-6px_rgb(0_0_0/0.2)] backdrop-blur-md sm:hidden"
			>
				<ul className="flex gap-2">
					{site.links.order && (
						<li className="flex flex-[1.4]">
							<a
								href={site.links.order}
								target="_blank"
								rel="noopener noreferrer"
								className={`${itemClass} bg-primary text-primary-foreground`}
							>
								<ShoppingBag aria-hidden="true" className="size-5" />
								{t(local.order)}
								<span className="sr-only"> {newTab}</span>
							</a>
						</li>
					)}
					<li className={site.links.order ? "flex flex-1" : "flex flex-[1.4]"}>
						<a
							href={phone.href}
							className={
								site.links.order
									? `${itemClass} border border-border bg-card text-foreground`
									: `${itemClass} bg-primary text-primary-foreground`
							}
						>
							<Phone aria-hidden="true" className="size-5" />
							{t(site.links.order ? copy.common.call : copy.common.callToOrder)}
							<span className="sr-only"> {phone.display}</span>
						</a>
					</li>
					<li className="flex flex-1">
						<a
							href={site.links.directions}
							target="_blank"
							rel="noopener noreferrer"
							className={`${itemClass} border border-border bg-card text-foreground`}
						>
							<Navigation aria-hidden="true" className="size-5" />
							{t(local.directions)}
							<span className="sr-only"> {newTab}</span>
						</a>
					</li>
				</ul>
			</nav>
		</>
	);
}
