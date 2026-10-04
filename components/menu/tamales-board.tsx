"use client";

import { useLanguage } from "@/components/language-provider";
import { TextureOverlay } from "@/components/ui/texture-overlay";
import { type MenuCategory, formatPrice, menuCopy } from "@/lib/menu";
import { MenuItemRow } from "./menu-item";
import { menuStrings } from "./strings";

/**
 * Tamales get the "pizarrón" treatment: a chalkboard panel echoing the
 * in-store board, with the shared mix-and-match price ladder up top.
 */
export function TamalesBoard({ category }: { category: MenuCategory }) {
	const { t } = useLanguage();
	const shared = category.sharedPrices ?? [];

	return (
		<div className="chalkboard relative isolate overflow-hidden rounded-2xl p-5 shadow-xl ring-1 ring-black/20 sm:p-8">
			<TextureOverlay
				texture="noise"
				opacity={0.25}
				className="pointer-events-none -z-10 invert"
			/>

			<div className="grid gap-8 lg:grid-cols-[minmax(0,20rem)_minmax(0,1fr)] lg:gap-12">
				<div>
					<p className="font-script text-2xl text-highlight">
						{t(menuCopy.mixAndMatch)}
					</p>
					<p className="sr-only">{t(menuStrings.tamalesPricing)}</p>
					<dl className="mt-4 grid grid-cols-3 gap-2 sm:gap-3">
						{shared.map((p) => (
							<div
								key={p.label.en}
								className="flex flex-col-reverse items-center rounded-xl border border-white/15 bg-white/5 px-2 py-4 text-center"
							>
								<dt className="mt-1 text-xs leading-tight text-chalkboard-muted sm:text-sm">
									{t(p.label)}
								</dt>
								<dd className="font-heading text-3xl font-semibold text-highlight tabular-nums sm:text-4xl">
									{formatPrice(p.amount)}
								</dd>
							</div>
						))}
					</dl>
				</div>

				<div>
					<p className="text-xs font-semibold tracking-[0.2em] text-chalkboard-muted uppercase">
						{t(menuStrings.flavors)}
					</p>
					<ul className="mt-1 grid sm:grid-cols-2 sm:gap-x-8">
						{category.items.map((item) => (
							<MenuItemRow
								key={item.id}
								item={item}
								surface="chalkboard"
								showAskPrice={false}
								hidePrice={item.prices === category.sharedPrices}
							/>
						))}
					</ul>
				</div>
			</div>
		</div>
	);
}
