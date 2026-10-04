"use client";

import {
	ArrowDown,
	MapPin,
	Phone,
	ShoppingBag,
	UtensilsCrossed,
} from "lucide-react";
import { MotionConfig } from "motion/react";
import { type CSSProperties, useEffect, useRef } from "react";

import { useLanguage } from "@/components/language-provider";
import { OpenStatusPill } from "@/components/open-status-pill";
import { BackgroundMedia } from "@/components/ui/bg-media";
import { TextAnimate } from "@/components/ui/text-animate";
import { TextureButton } from "@/components/ui/texture-button";
import type { Localized } from "@/lib/i18n";
import { copy, sectionIds, site } from "@/lib/site";
import { cn } from "@/lib/utils";

/* -------------------------------------------------------------------------- */
/* Butterfly motif                                                            */
/* -------------------------------------------------------------------------- */

/**
 * Deterministic positions (no Math.random in render, so no hydration
 * mismatch). Values are percentages of the hero box.
 */
const BUTTERFLIES = [
	{
		top: 14,
		left: 6,
		size: 44,
		rotate: -18,
		dx: 40,
		dy: -30,
		dur: 16,
		delay: 0,
	},
	{
		top: 70,
		left: 12,
		size: 30,
		rotate: 12,
		dx: 30,
		dy: -40,
		dur: 19,
		delay: 2,
	},
	{
		top: 22,
		left: 88,
		size: 36,
		rotate: 20,
		dx: -36,
		dy: 26,
		dur: 17,
		delay: 1,
	},
	{
		top: 78,
		left: 82,
		size: 52,
		rotate: -10,
		dx: -44,
		dy: -34,
		dur: 21,
		delay: 3,
	},
	{
		top: 46,
		left: 94,
		size: 24,
		rotate: 28,
		dx: -26,
		dy: 32,
		dur: 14,
		delay: 4,
	},
	{ top: 8, left: 52, size: 26, rotate: -6, dx: 24, dy: 28, dur: 18, delay: 5 },
] as const;

/**
 * Decorative butterflies, animated with CSS keyframes only (see
 * .butterfly in app/globals.css): transform-only, no JS animation library,
 * static under prefers-reduced-motion, and paused while off-screen.
 */
function FloatingButterflies() {
	const ref = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const el = ref.current;
		if (!el || typeof IntersectionObserver === "undefined") return;
		const observer = new IntersectionObserver(([entry]) => {
			if (entry.isIntersecting) el.removeAttribute("data-paused");
			else el.setAttribute("data-paused", "");
		});
		observer.observe(el);
		return () => observer.disconnect();
	}, []);

	return (
		<div
			ref={ref}
			aria-hidden="true"
			className="pointer-events-none absolute inset-0 z-[1] overflow-hidden"
		>
			{BUTTERFLIES.map((b, i) => (
				<div
					key={`${b.top}-${b.left}`}
					className={cn(
						"butterfly absolute opacity-80",
						// Keep the small screens calm: only show half of them.
						i % 2 === 1 && "hidden sm:block",
					)}
					style={
						{
							top: `${b.top}%`,
							left: `${b.left}%`,
							width: b.size,
							height: b.size,
							"--b-rotate": `${b.rotate}deg`,
							"--b-dx": `${b.dx}px`,
							"--b-dy": `${b.dy}px`,
							"--b-dur": `${b.dur}s`,
							"--b-delay": `${b.delay}s`,
							// Wing flap: ~1 s flap, then a pause that differs per butterfly.
							"--b-flap": `${(2.4 + (i % 3) * 0.25 + i * 0.6).toFixed(2)}s`,
						} as CSSProperties
					}
				>
					<img
						src={site.logo.mark}
						alt=""
						width={b.size}
						height={b.size}
						loading="lazy"
						decoding="async"
						className="butterfly-wing size-full origin-center"
					/>
				</div>
			))}
		</div>
	);
}

/* -------------------------------------------------------------------------- */
/* Hero                                                                       */
/* -------------------------------------------------------------------------- */

const heroCopy = {
	scroll: { en: "Scroll to the menu", es: "Ir al menú" },
} satisfies Record<string, Localized>;

export function Hero() {
	const { lang, t } = useLanguage();
	const phone = site.phones[0];
	const newTab = t(copy.common.opensInNewTab);

	return (
		<MotionConfig reducedMotion="user">
			<section
				id={sectionIds.hero}
				aria-labelledby="hero-title"
				className="on-chalkboard relative isolate"
			>
				<BackgroundMedia
					src="/images/monarch-butterfly.jpg"
					alt=""
					type="image"
					variant="none"
					className="h-auto max-h-none min-h-[calc(100svh-4rem)] lg:min-h-[640px]"
					mediaClassName="scale-105 object-[65%_40%] blur-[1px]"
				>
					{/* Chalkboard wash: keeps text at AA contrast over the photo */}
					<div
						aria-hidden="true"
						className="absolute inset-0 bg-gradient-to-b from-chalkboard/80 via-chalkboard/85 to-chalkboard lg:bg-gradient-to-r lg:from-chalkboard lg:via-chalkboard/90 lg:to-chalkboard/55"
					/>
					<div
						aria-hidden="true"
						className="absolute inset-0 bg-[radial-gradient(ellipse_at_75%_45%,color-mix(in_oklch,var(--color-marigold-500)_22%,transparent),transparent_60%)]"
					/>
					<FloatingButterflies />

					<div className="relative z-[2] mx-auto grid min-h-[calc(100svh-4rem)] w-full max-w-7xl items-center gap-6 px-4 pt-6 pb-24 sm:gap-10 sm:px-6 sm:pt-10 lg:min-h-[640px] lg:grid-cols-[1.15fr_0.85fr] lg:gap-16 lg:px-8 lg:py-20">
						{/* Logo: first on mobile, right column on desktop */}
						{/* Plain element: visible in the static HTML (LCP), no JS needed. */}
						<div className="order-first mx-auto w-full max-w-[10rem] sm:max-w-xs lg:order-last lg:max-w-md">
							<div className="relative">
								<div
									aria-hidden="true"
									className="absolute inset-[8%] -z-10 rounded-full bg-marigold-500/20 blur-3xl"
								/>
								<img
									src={site.logo.fullDark}
									alt=""
									width={site.logo.width}
									height={site.logo.height}
									fetchPriority="high"
									decoding="async"
									className="h-auto w-full"
								/>
							</div>
						</div>

						{/* Mobile: CTAs come right after the title so they sit above the fold;
						    description, status and contact links follow (max-lg:order-1). */}
						<div className="flex flex-col text-center text-chalkboard-foreground lg:block lg:text-left">
							<p className="text-xs font-semibold tracking-[0.2em] text-marigold-300 uppercase sm:text-sm">
								{t(copy.hero.eyebrow)}
							</p>

							<h1
								id="hero-title"
								className="mt-4 font-display text-[2.6rem] leading-[1.02] font-semibold text-chalkboard-foreground sm:text-6xl lg:text-7xl"
								style={{ fontVariationSettings: '"SOFT" 100, "WONK" 1' }}
							>
								<span className="block text-[0.5em] font-medium tracking-wide text-chalkboard-muted italic">
									Restaurante
								</span>{" "}
								<span className="block">
									El <span className="text-marigold-400">Monarca</span>
								</span>
							</h1>

							{/* Animated script tagline (cult-ui TextAnimate) */}
							<div className="mt-3 flex justify-center lg:justify-start">
								<span className="sr-only">{t(copy.hero.tagline)}</span>
								<TextAnimate
									key={lang}
									text={t(copy.hero.tagline)}
									type="calmInUp"
									aria-hidden="true"
									className="pr-2 font-script text-3xl leading-tight text-marigold-300 sm:text-4xl"
								/>
							</div>

							<p className="mx-auto mt-6 max-w-xl text-base max-lg:order-1 leading-relaxed text-pretty text-chalkboard-foreground/85 sm:text-lg lg:mx-0">
								{t(copy.hero.description)}
							</p>

							<div className="mt-6 flex flex-wrap items-center justify-center gap-2 max-lg:order-1 lg:justify-start">
								<OpenStatusPill />
								<p className="inline-flex h-9 items-center gap-2 rounded-full border border-agave-400/40 bg-agave-700/40 px-4 text-sm font-medium text-chalkboard-foreground backdrop-blur-sm">
									<UtensilsCrossed
										className="size-4 text-agave-300"
										aria-hidden="true"
									/>
									{t(copy.hero.badge)}
								</p>
							</div>

							<div className="mt-6 flex flex-col items-stretch gap-3 lg:mt-8 sm:flex-row sm:items-center sm:justify-center lg:justify-start">
								<TextureButton
									asChild
									variant="brand"
									size="lg"
									className="sm:w-auto"
								>
									<a href={`#${sectionIds.menu}`}>
										<span className="flex h-11 items-center gap-2 px-3 text-base">
											<UtensilsCrossed className="size-5" aria-hidden="true" />
											{t(copy.common.viewMenu)}
										</span>
									</a>
								</TextureButton>
								<TextureButton
									asChild
									variant="accent"
									size="lg"
									className="sm:w-auto"
								>
									{site.links.order ? (
										<a
											href={site.links.order}
											target="_blank"
											rel="noopener noreferrer"
										>
											<span className="flex h-11 items-center gap-2 px-3 text-base font-semibold">
												{t(copy.common.orderPickup)}
												<span className="sr-only"> {newTab}</span>
											</span>
										</a>
									) : (
										<a href={phone.href}>
											<span className="flex h-11 items-center gap-2 px-3 text-base font-semibold">
												<Phone className="size-5" aria-hidden="true" />
												{t(copy.common.callToOrder)}
												<span className="sr-only">: {phone.display}</span>
											</span>
										</a>
									)}
								</TextureButton>
							</div>

							<ul className="mt-6 flex flex-wrap items-center justify-center gap-x-6 max-lg:order-1 gap-y-3 text-sm lg:justify-start">
								{!site.links.order && (
									<li className="inline-flex min-h-11 items-center gap-2 font-medium text-chalkboard-foreground">
										<ShoppingBag
											className="size-4 text-marigold-400"
											aria-hidden="true"
										/>
										{t(copy.common.orderingSoon)}
									</li>
								)}
								<li>
									<a
										href={phone.href}
										className="inline-flex min-h-11 items-center gap-2 rounded-md font-medium text-chalkboard-foreground underline-offset-4 hover:text-marigold-300 hover:underline focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
									>
										<Phone
											className="size-4 text-marigold-400"
											aria-hidden="true"
										/>
										<span>
											{t(copy.common.call)} {phone.display}
										</span>
									</a>
								</li>
								<li>
									<a
										href={site.links.directions}
										target="_blank"
										rel="noopener noreferrer"
										className="inline-flex min-h-11 items-center gap-2 rounded-md font-medium text-chalkboard-foreground underline-offset-4 hover:text-marigold-300 hover:underline focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
									>
										<MapPin
											className="size-4 text-marigold-400"
											aria-hidden="true"
										/>
										<span>
											{t(copy.common.directions)}
											<span className="sr-only"> {newTab}</span>
										</span>
									</a>
								</li>
							</ul>
							<p className="mt-1 text-center text-xs text-chalkboard-muted max-lg:order-1 lg:text-left">
								{site.address.line}
							</p>
						</div>
					</div>

					<a
						href={`#${sectionIds.menu}`}
						aria-label={t(heroCopy.scroll)}
						className="absolute bottom-6 left-1/2 z-[3] hidden size-11 -translate-x-1/2 items-center justify-center rounded-full border border-chalkboard-foreground/20 text-chalkboard-foreground/80 transition-colors hover:border-marigold-400 hover:text-marigold-300 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none sm:flex"
					>
						<ArrowDown
							className="size-5 motion-safe:animate-bounce"
							aria-hidden="true"
						/>
					</a>
				</BackgroundMedia>
			</section>
		</MotionConfig>
	);
}
