"use client";

import { MapPin, Menu, Phone, ShoppingBag } from "lucide-react";
import { useEffect, useState } from "react";

import { useLanguage } from "@/components/language-provider";
import { LanguageToggle } from "@/components/language-toggle";
import { OpenStatusPill } from "@/components/open-status-pill";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetDescription,
	SheetFooter,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";
import { TextureButton } from "@/components/ui/texture-button";
import type { Localized } from "@/lib/i18n";
import { copy, nav, sectionIds, site } from "@/lib/site";
import { cn } from "@/lib/utils";

const headerCopy = {
	home: {
		en: "Restaurante El Monarca, back to top",
		es: "Restaurante El Monarca, volver al inicio",
	},
	primaryNav: { en: "Main", es: "Principal" },
	sheetDescription: {
		en: "Browse the site, see our menu or give us a call.",
		es: "Navega el sitio, mira el menú o llámanos.",
	},
} satisfies Record<string, Localized>;

const navIds = nav.map((item) => item.href.slice(1));

/** Highlights the nav link whose section is currently in view. */
function useActiveSection() {
	const [active, setActive] = useState<string | null>(null);

	useEffect(() => {
		const sections = [sectionIds.hero, ...navIds]
			.map((id) => document.getElementById(id))
			.filter((el): el is HTMLElement => el !== null);
		if (sections.length === 0) return;

		const visible = new Map<string, number>();
		const observer = new IntersectionObserver(
			(entries) => {
				for (const entry of entries) {
					visible.set(
						entry.target.id,
						entry.isIntersecting ? entry.intersectionRatio : 0,
					);
				}
				let best: string | null = null;
				let bestRatio = 0;
				for (const [id, ratio] of visible) {
					if (ratio > bestRatio) {
						best = id;
						bestRatio = ratio;
					}
				}
				setActive(best);
			},
			{ rootMargin: "-30% 0px -55% 0px", threshold: [0, 0.25, 0.5, 1] },
		);
		for (const el of sections) observer.observe(el);
		return () => observer.disconnect();
	}, []);

	return active;
}

function useScrolled(offset = 8) {
	const [scrolled, setScrolled] = useState(false);
	useEffect(() => {
		const onScroll = () => setScrolled(window.scrollY > offset);
		onScroll();
		window.addEventListener("scroll", onScroll, { passive: true });
		return () => window.removeEventListener("scroll", onScroll);
	}, [offset]);
	return scrolled;
}

function Brand({ onNavigate }: { onNavigate?: () => void }) {
	const { t } = useLanguage();
	return (
		<a
			href={`#${sectionIds.hero}`}
			onClick={onNavigate}
			aria-label={t(headerCopy.home)}
			className="group flex min-h-11 items-center gap-2.5 rounded-lg focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
		>
			<span className="flex size-11 shrink-0 items-center justify-center rounded-full transition-transform duration-300 group-hover:-rotate-6">
				<img
					src={site.logo.mark}
					alt=""
					width={40}
					height={40}
					className="size-10"
				/>
			</span>
			<span className="flex flex-col leading-none">
				<span className="text-[0.65rem] font-semibold tracking-[0.22em] text-muted-foreground uppercase">
					Restaurante
				</span>
				<span className="font-heading text-xl font-semibold tracking-tight">
					El Monarca
				</span>
			</span>
		</a>
	);
}

export function Header() {
	const { t } = useLanguage();
	const active = useActiveSection();
	const scrolled = useScrolled();
	const [open, setOpen] = useState(false);
	const phone = site.phones[0];
	const newTab = t(copy.common.opensInNewTab);

	return (
		<>
			<a
				href="#main"
				className="sr-only z-[60] rounded-md bg-primary px-4 py-2 font-semibold text-primary-foreground focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:outline-none focus:ring-2 focus:ring-ring"
			>
				{t(copy.common.skipToContent)}
			</a>

			<header
				className={cn(
					"sticky top-0 z-40 h-16 border-b transition-[background-color,border-color,box-shadow] duration-300",
					scrolled
						? "border-border bg-background/90 shadow-[0_1px_12px_-4px_rgb(0_0_0/0.15)] backdrop-blur-md supports-[backdrop-filter]:bg-background/75"
						: "border-transparent bg-background",
				)}
			>
				<div className="mx-auto flex h-full max-w-7xl items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
					<Brand />

					{/* Desktop navigation */}
					<nav
						aria-label={t(headerCopy.primaryNav)}
						className="hidden md:block"
					>
						<ul className="flex items-center gap-1">
							{nav.map((item) => {
								const isActive = active === item.href.slice(1);
								return (
									<li key={item.href}>
										<a
											href={item.href}
											aria-current={isActive ? "location" : undefined}
											className={cn(
												"relative inline-flex h-10 items-center rounded-full px-4 text-sm font-medium transition-colors hover:bg-muted hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none",
												isActive ? "text-foreground" : "text-muted-foreground",
											)}
										>
											{t(item.label)}
											<span
												aria-hidden="true"
												className={cn(
													"absolute inset-x-4 bottom-1 h-0.5 origin-left rounded-full bg-primary transition-transform duration-300",
													isActive ? "scale-x-100" : "scale-x-0",
												)}
											/>
										</a>
									</li>
								);
							})}
						</ul>
					</nav>

					<div className="flex items-center gap-1.5 sm:gap-2">
						<LanguageToggle />

						{site.links.order ? (
							<TextureButton
								asChild
								variant="brand"
								size="sm"
								className="hidden w-auto rounded-full sm:inline-flex"
								innerClassName="rounded-full px-4"
							>
								<a
									href={site.links.order}
									target="_blank"
									rel="noopener noreferrer"
									className="h-10"
								>
									<ShoppingBag className="size-4" aria-hidden="true" />
									<span className="text-sm">{t(copy.common.orderOnline)}</span>
									<span className="sr-only"> {newTab}</span>
								</a>
							</TextureButton>
						) : (
							<TextureButton
								asChild
								variant="brand"
								size="sm"
								className="hidden w-auto rounded-full sm:inline-flex"
								innerClassName="rounded-full px-4"
							>
								<a
									href={phone.href}
									aria-label={`${t(copy.common.callToOrder)}: ${phone.display}`}
									className="h-10"
								>
									<Phone className="size-4" aria-hidden="true" />
									<span className="text-sm">{t(copy.common.callToOrder)}</span>
									<span className="hidden text-sm tabular-nums lg:inline">
										{phone.display}
									</span>
								</a>
							</TextureButton>
						)}

						{/* Mobile: Order / Call / Directions live in the sticky bottom bar. */}
						<Sheet open={open} onOpenChange={setOpen}>
							<SheetTrigger asChild>
								<Button
									type="button"
									variant="ghost"
									size="icon-lg"
									className="size-11 rounded-full md:hidden"
									aria-label={t(copy.common.openMenu)}
								>
									<Menu className="size-6" aria-hidden="true" />
								</Button>
							</SheetTrigger>
							<SheetContent
								side="right"
								className="w-[88vw] max-w-sm gap-0 overflow-y-auto paper-grain"
							>
								<SheetHeader className="border-b pr-12">
									<Brand onNavigate={() => setOpen(false)} />
									<SheetTitle className="sr-only">{site.name}</SheetTitle>
									<SheetDescription className="sr-only">
										{t(headerCopy.sheetDescription)}
									</SheetDescription>
								</SheetHeader>

								<nav
									aria-label={t(headerCopy.primaryNav)}
									className="px-4 py-4"
								>
									<ul className="flex flex-col">
										{nav.map((item) => {
											const isActive = active === item.href.slice(1);
											return (
												<li key={item.href}>
													<SheetClose asChild>
														<a
															href={item.href}
															aria-current={isActive ? "location" : undefined}
															className={cn(
																"flex min-h-12 items-center justify-between rounded-lg px-3 font-heading text-2xl font-medium transition-colors hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none",
																isActive && "text-accent",
															)}
														>
															{t(item.label)}
															<span
																aria-hidden="true"
																className={cn(
																	"size-2 rounded-full bg-primary transition-opacity",
																	isActive ? "opacity-100" : "opacity-0",
																)}
															/>
														</a>
													</SheetClose>
												</li>
											);
										})}
									</ul>
								</nav>

								<Separator />

								<div className="flex flex-col gap-4 px-4 py-5">
									<OpenStatusPill tone="light" className="self-start" />
									<div className="flex items-center justify-between gap-3">
										<span className="text-sm font-medium text-muted-foreground">
											{t(copy.common.language)}
										</span>
										<LanguageToggle />
									</div>
								</div>

								<SheetFooter className="mt-auto gap-3 border-t">
									{site.links.order ? (
										<TextureButton asChild variant="brand" size="lg">
											<a
												href={site.links.order}
												target="_blank"
												rel="noopener noreferrer"
											>
												<span className="flex h-11 items-center gap-2 text-base">
													<ShoppingBag className="size-5" aria-hidden="true" />
													{t(copy.common.orderPickup)}
													<span className="sr-only"> {newTab}</span>
												</span>
											</a>
										</TextureButton>
									) : (
										<p className="text-center text-sm text-muted-foreground">
											{t(copy.common.orderingSoon)}
										</p>
									)}
									<div className="grid grid-cols-2 gap-3">
										<Button
											asChild
											variant="outline"
											size="lg"
											className="h-11"
										>
											<a href={phone.href}>
												<Phone aria-hidden="true" />
												{t(copy.common.call)}
											</a>
										</Button>
										<Button
											asChild
											variant="outline"
											size="lg"
											className="h-11"
										>
											<a
												href={site.links.directions}
												target="_blank"
												rel="noopener noreferrer"
											>
												<MapPin aria-hidden="true" />
												{t(copy.common.directions)}
												<span className="sr-only"> {newTab}</span>
											</a>
										</Button>
									</div>
									<p className="text-center text-xs text-muted-foreground">
										{site.address.line}
									</p>
								</SheetFooter>
							</SheetContent>
						</Sheet>
					</div>
				</div>
			</header>
		</>
	);
}
