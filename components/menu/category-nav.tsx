"use client";

import { useLanguage } from "@/components/language-provider";
import type { Localized } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";
import { menuStrings } from "./strings";

export interface CategoryLink {
	/** DOM id of the category block. */
	anchor: string;
	label: Localized;
}

/**
 * Sticky, horizontally scrollable category chips with scroll-spy.
 * Plain in-page anchors, so it works without JS and with the keyboard.
 */
export function CategoryNav({ links }: { links: CategoryLink[] }) {
	const { t } = useLanguage();
	const [active, setActive] = useState(links[0]?.anchor);
	const scrollerRef = useRef<HTMLUListElement>(null);

	// Scroll-spy: the category crossing the upper-middle band is "current".
	useEffect(() => {
		const targets = links
			.map((l) => document.getElementById(l.anchor))
			.filter((el): el is HTMLElement => el !== null);
		if (!targets.length || typeof IntersectionObserver === "undefined") return;

		const observer = new IntersectionObserver(
			(entries) => {
				const hit = entries
					.filter((e) => e.isIntersecting)
					.sort(
						(a, b) => a.boundingClientRect.top - b.boundingClientRect.top,
					)[0];
				if (hit) setActive(hit.target.id);
			},
			{ rootMargin: "-30% 0px -65% 0px" },
		);
		for (const el of targets) observer.observe(el);
		return () => observer.disconnect();
	}, [links]);

	// Keep the active chip visible inside the horizontal scroller
	// (without scrolling the page vertically, unlike scrollIntoView).
	useEffect(() => {
		const scroller = scrollerRef.current;
		if (!scroller || !active) return;
		const chip = scroller.querySelector<HTMLElement>(
			`[data-anchor="${active}"]`,
		);
		if (!chip) return;
		const reduce = window.matchMedia(
			"(prefers-reduced-motion: reduce)",
		).matches;
		scroller.scrollTo({
			left: chip.offsetLeft - scroller.clientWidth / 2 + chip.clientWidth / 2,
			behavior: reduce ? "auto" : "smooth",
		});
	}, [active]);

	return (
		<nav
			aria-label={t(menuStrings.categoriesNav)}
			className="sticky top-16 z-30 -mx-4 border-y border-border bg-background/90 backdrop-blur supports-[backdrop-filter]:bg-background/75 sm:mx-0 sm:rounded-full sm:border"
		>
			<ul
				ref={scrollerRef}
				className="relative flex snap-x gap-1.5 overflow-x-auto px-4 py-2 [scrollbar-width:none] sm:px-2 [&::-webkit-scrollbar]:hidden"
			>
				{links.map((l) => {
					const isActive = l.anchor === active;
					return (
						<li key={l.anchor} className="shrink-0 snap-start">
							<a
								href={`#${l.anchor}`}
								data-anchor={l.anchor}
								aria-current={isActive ? "location" : undefined}
								onClick={() => setActive(l.anchor)}
								className={cn(
									"inline-flex min-h-10 items-center rounded-full px-4 text-sm font-medium whitespace-nowrap transition-colors outline-none focus-visible:ring-3 focus-visible:ring-ring",
									isActive
										? "bg-primary text-primary-foreground shadow-sm"
										: "text-foreground/80 hover:bg-muted hover:text-foreground",
								)}
							>
								{t(l.label)}
							</a>
						</li>
					);
				})}
			</ul>
		</nav>
	);
}
