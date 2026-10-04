"use client";

import { useLanguage } from "@/components/language-provider";
import { type CategoryLink, CategoryNav } from "@/components/menu/category-nav";
import { FeaturedDishes } from "@/components/menu/featured-dishes";
import { MenuItemRow } from "@/components/menu/menu-item";
import { menuStrings } from "@/components/menu/strings";
import { TamalesBoard } from "@/components/menu/tamales-board";
import { TextureButton } from "@/components/ui/texture-button";
import {
	type MenuCategory,
	type MenuCategoryId,
	getCategory,
	menu,
	menuCopy,
	menuTabs,
} from "@/lib/menu";
import { copy, sectionIds, site } from "@/lib/site";
import { Info, Phone, ShoppingBag } from "lucide-react";

/**
 * Category order follows the tab grouping in lib/menu.ts; any category not in
 * a tab is appended so every item in the data always renders.
 */
const tabOrder: MenuCategoryId[] = menuTabs.flatMap((tab) => tab.categories);
const orderedCategories: MenuCategory[] = [
	...tabOrder
		.filter((id, i) => tabOrder.indexOf(id) === i)
		.map((id) => getCategory(id)),
	...menu.filter((c) => !tabOrder.includes(c.id)),
];

const anchorFor = (id: MenuCategoryId) => `menu-${id}`;

const categoryLinks: CategoryLink[] = orderedCategories.map((c) => ({
	anchor: anchorFor(c.id),
	label: c.name,
}));

function CategoryBlock({
	category,
	index,
}: {
	category: MenuCategory;
	index: number;
}) {
	const { t } = useLanguage();
	const anchor = anchorFor(category.id);
	const pricedCount = category.items.filter((i) => i.prices?.length).length;
	const nonePriced = pricedCount === 0 && !category.sharedPrices;
	const isTamales = category.id === "tamales";

	return (
		<section
			id={anchor}
			aria-labelledby={`${anchor}-title`}
			className="scroll-mt-20 pt-14 first:pt-10"
		>
			<header className="mb-5 flex flex-wrap items-end justify-between gap-x-6 gap-y-2">
				<div className="flex items-baseline gap-3">
					<span
						aria-hidden
						className="font-heading text-sm font-semibold text-muted-foreground tabular-nums"
					>
						{String(index + 1).padStart(2, "0")}
					</span>
					<div>
						<h3
							id={`${anchor}-title`}
							className="text-3xl font-semibold sm:text-4xl"
						>
							{t(category.name)}
						</h3>
						{category.tagline && (
							<p className="mt-1 font-script text-xl text-accent">
								{t(category.tagline)}
							</p>
						)}
					</div>
				</div>
				{nonePriced && (
					<p className="inline-flex items-center gap-1.5 rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">
						<Info aria-hidden className="size-3.5" />
						{t(menuCopy.askPrice)}
					</p>
				)}
			</header>

			{isTamales ? (
				<TamalesBoard category={category} />
			) : (
				<div className="paper-grain rounded-2xl border border-border bg-card px-5 py-1 shadow-sm sm:px-8">
					<ul className="grid md:grid-cols-2 md:gap-x-12">
						{category.items.map((item) => (
							<MenuItemRow
								key={item.id}
								item={item}
								showAskPrice={!nonePriced}
								hidePrice={
									!!category.sharedPrices &&
									item.prices === category.sharedPrices
								}
							/>
						))}
					</ul>
				</div>
			)}
		</section>
	);
}

export function MenuSection() {
	const { t } = useLanguage();

	return (
		<section
			id={sectionIds.menu}
			aria-labelledby="menu-title"
			className="section-y bg-background"
		>
			<div className="container mx-auto max-w-6xl px-4">
				<header className="mx-auto max-w-2xl text-center">
					<p className="font-script text-2xl text-accent">
						{t(copy.menu.eyebrow)}
					</p>
					<h2
						id="menu-title"
						className="mt-1 text-4xl font-semibold sm:text-5xl"
					>
						{t(copy.menu.title)}
					</h2>
					<p className="mt-4 text-lg text-pretty text-muted-foreground">
						{t(copy.menu.description)}
					</p>
				</header>

				<FeaturedDishes />

				<div className="mt-10">
					<CategoryNav links={categoryLinks} />
				</div>

				{orderedCategories.map((category, i) => (
					<CategoryBlock key={category.id} category={category} index={i} />
				))}

				<p className="mt-10 flex items-start gap-2 text-sm text-muted-foreground">
					<Info aria-hidden className="mt-0.5 size-4 shrink-0" />
					{t(menuCopy.pricesNote)}
				</p>

				<div className="mt-12 flex flex-col items-center gap-5 rounded-2xl border border-border bg-muted/60 px-5 py-8 text-center sm:px-10">
					<p className="font-heading text-xl font-semibold text-balance sm:text-2xl">
						{t(
							site.links.order
								? menuStrings.readyToOrder
								: menuStrings.readyToCall,
						)}
					</p>
					<div className="flex w-full max-w-md flex-col justify-center gap-3 sm:flex-row">
						{site.links.order && (
							<TextureButton asChild variant="brand" size="lg">
								<a
									href={site.links.order}
									target="_blank"
									rel="noreferrer noopener"
								>
									<ShoppingBag aria-hidden className="size-4" />
									{t(copy.common.orderPickup)}
									<span className="sr-only">
										{" "}
										{t(copy.common.opensInNewTab)}
									</span>
								</a>
							</TextureButton>
						)}
						<TextureButton
							asChild
							variant={site.links.order ? "accent" : "brand"}
							size="lg"
						>
							<a href={site.phones[0].href}>
								<Phone aria-hidden className="size-4" />
								{t(
									site.links.order
										? copy.common.callUs
										: copy.common.callToOrder,
								)}
								<span className="sr-only">: {site.phones[0].display}</span>
							</a>
						</TextureButton>
					</div>
				</div>
			</div>
		</section>
	);
}
