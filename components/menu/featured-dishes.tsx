"use client";

import Image from "next/image";

import { useLanguage } from "@/components/language-provider";
import { featuredDishes } from "@/lib/menu";

/**
 * Photo strip of real plates from the kitchen (menu items with an `image`).
 * Swipeable row on phones and tablets; a single row of cards on desktop.
 */
export function FeaturedDishes() {
	const { t } = useLanguage();
	if (featuredDishes.length === 0) return null;

	return (
		<ul className="-mx-4 mt-10 flex snap-x snap-mandatory scroll-px-4 gap-4 overflow-x-auto px-4 pb-2 [scrollbar-width:none] lg:mx-0 lg:grid lg:grid-cols-5 lg:overflow-visible lg:px-0 lg:pb-0 [&::-webkit-scrollbar]:hidden">
			{featuredDishes.map(({ item, category }) => (
				<li
					key={item.id}
					className="w-[42%] shrink-0 snap-start sm:w-[28%] lg:w-auto"
				>
					<figure className="group relative overflow-hidden rounded-[calc(var(--radius)*2)] border border-border bg-muted shadow-lg shadow-carbon-900/10">
						<div className="relative aspect-[4/5]">
							<Image
								src={item.image as string}
								alt={t(item.name)}
								fill
								sizes="(min-width: 1024px) 220px, (min-width: 640px) 28vw, 42vw"
								className="object-cover transition-transform duration-500 motion-safe:group-hover:scale-105"
							/>
						</div>
						<figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-carbon-900/85 via-carbon-900/40 to-transparent px-3 pt-10 pb-3 text-chalkboard-foreground sm:px-4 sm:pb-4">
							<span className="block font-heading text-base leading-tight font-semibold sm:text-lg">
								{t(item.name)}
							</span>
							<span className="mt-0.5 block text-xs text-chalkboard-foreground/80">
								{t(category.name)}
							</span>
						</figcaption>
					</figure>
				</li>
			))}
		</ul>
	);
}
