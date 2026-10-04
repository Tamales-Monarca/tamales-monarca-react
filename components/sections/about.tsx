"use client";

import { BookHeart, HandHeart, type LucideIcon, Users } from "lucide-react";
import Image from "next/image";

import { useLanguage } from "@/components/language-provider";
import { TextureCard } from "@/components/ui/texture-card";
import { TextureOverlay } from "@/components/ui/texture-overlay";
import type { Localized } from "@/lib/i18n";
import { copy, sectionIds, site } from "@/lib/site";

/** Section-local bilingual strings (not shared elsewhere). */
const local = {
	imageAlt: {
		en: "A bowl of caldo de res with beef, potato and carrot, topped with pickled onion and cilantro",
		es: "Un plato de caldo de res con carne, papa y zanahoria, con cebolla curtida y cilantro",
	},
	imageCaption: {
		en: "Caldo de res, made from scratch in our kitchen.",
		es: "Caldo de res, hecho desde cero en nuestra cocina.",
	},
	stamp: { en: "Hecho a mano", es: "Hecho a mano" },
	pillarsLabel: { en: "What we stand for", es: "Lo que nos define" },
} satisfies Record<string, Localized>;

const pillarIcons: LucideIcon[] = [HandHeart, BookHeart, Users];

export function About() {
	const { t } = useLanguage();
	const { about } = copy;

	return (
		<section
			id={sectionIds.about}
			aria-labelledby="about-title"
			className="section-y paper-grain relative overflow-hidden bg-muted/40"
		>
			<div className="container mx-auto grid items-center gap-12 px-4 lg:grid-cols-12 lg:gap-16">
				{/* Photo */}
				<figure className="relative mx-auto w-full max-w-xl lg:col-span-5 lg:max-w-none">
					<div className="relative aspect-[3/2] overflow-hidden rounded-[calc(var(--radius)*2)] border border-border shadow-xl shadow-carbon-900/10 lg:aspect-[4/5]">
						<Image
							src="/images/dishes/caldo-de-res.webp"
							alt={t(local.imageAlt)}
							fill
							sizes="(min-width: 1024px) 40vw, (min-width: 640px) 576px, 100vw"
							className="object-cover"
						/>
						<TextureOverlay texture="noise" opacity={0.08} />
					</div>
					{/* Hand-lettered stamp, decorative */}
					<div
						aria-hidden="true"
						className="absolute -bottom-6 -right-2 flex size-28 rotate-[-8deg] items-center justify-center rounded-full border-4 border-dashed border-primary/70 bg-background p-2 text-center shadow-lg sm:-right-6 sm:size-32"
					>
						<Image
							src={site.logo.mark}
							alt=""
							width={64}
							height={64}
							className="absolute size-14 opacity-15"
						/>
						<span className="relative font-script text-2xl leading-none font-bold text-accent sm:text-3xl">
							{t(local.stamp)}
						</span>
					</div>
					<figcaption className="mt-4 pr-32 text-sm text-muted-foreground italic sm:pr-40">
						{t(local.imageCaption)}
					</figcaption>
				</figure>

				{/* Story */}
				<div className="lg:col-span-7">
					<p className="text-sm font-semibold tracking-[0.2em] text-accent uppercase">
						{t(about.eyebrow)}
					</p>
					<h2
						id="about-title"
						className="mt-3 font-heading text-4xl text-foreground sm:text-5xl"
					>
						{t(about.title)}
					</h2>
					<div className="mt-6 space-y-5 text-lg leading-relaxed text-foreground/85">
						{about.paragraphs.map((p) => (
							<p key={p.en}>{t(p)}</p>
						))}
					</div>

					<h3 className="sr-only">{t(local.pillarsLabel)}</h3>
					<ul className="mt-10 grid gap-4 sm:grid-cols-3">
						{about.pillars.map((pillar, i) => {
							const Icon = pillarIcons[i % pillarIcons.length];
							return (
								<li key={pillar.title.en} className="h-full">
									<TextureCard className="h-full">
										<div className="flex h-full flex-col gap-3 rounded-[calc(var(--radius)-4px)] bg-card/90 p-5 text-card-foreground">
											<span
												aria-hidden="true"
												className="flex size-10 items-center justify-center rounded-full bg-primary/15 text-accent"
											>
												<Icon className="size-5" />
											</span>
											<p className="font-heading text-lg leading-snug font-semibold">
												{t(pillar.title)}
											</p>
											<p className="text-sm leading-relaxed text-muted-foreground">
												{t(pillar.body)}
											</p>
										</div>
									</TextureCard>
								</li>
							);
						})}
					</ul>
				</div>
			</div>
		</section>
	);
}
