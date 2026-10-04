"use client";

import { useLanguage } from "@/components/language-provider";
import { Badge } from "@/components/ui/badge";
import type { Lang } from "@/lib/i18n";
import {
	type MenuItem,
	type MenuPrice,
	type MenuTag,
	formatPrice,
	menuCopy,
} from "@/lib/menu";
import { cn } from "@/lib/utils";
import {
	CalendarDays,
	Candy,
	CircleHelp,
	Flame,
	Leaf,
	type LucideIcon,
	Sparkles,
	Star,
} from "lucide-react";
import { menuStrings } from "./strings";

const tagStyles: Record<MenuTag, { icon: LucideIcon; className: string }> = {
	"house-favorite": {
		icon: Star,
		className: "border-transparent bg-primary text-primary-foreground",
	},
	spicy: {
		icon: Flame,
		className: "border-chile-200 bg-chile-50 text-chile-700",
	},
	"meatless-filling": {
		icon: Leaf,
		className: "border-agave-300 bg-agave-50 text-agave-800",
	},
	sweet: {
		icon: Candy,
		className: "border-marigold-200 bg-marigold-50 text-marigold-900",
	},
	weekend: {
		icon: CalendarDays,
		className: "border-transparent bg-accent text-accent-foreground",
	},
	"daily-special": {
		icon: Sparkles,
		className: "border-transparent bg-accent text-accent-foreground",
	},
};

export function TagBadge({ tag }: { tag: MenuTag }) {
	const { t } = useLanguage();
	const { icon: Icon, className } = tagStyles[tag];
	return (
		<Badge className={cn("h-6 px-2.5", className)}>
			<Icon aria-hidden data-icon="inline-start" />
			{t(menuCopy.tagLabels[tag])}
		</Badge>
	);
}

/** "1 pc $3 · 6 pc $16 · 12 pc $28" as a description list. */
export function PriceList({
	prices,
	className,
}: {
	prices: MenuPrice[];
	className?: string;
}) {
	const { t } = useLanguage();
	return (
		<dl
			className={cn(
				"flex flex-wrap gap-x-4 gap-y-1 text-sm tabular-nums",
				className,
			)}
		>
			{prices.map((p) => (
				<div key={p.label.en} className="flex items-baseline gap-1.5">
					<dt className="text-muted-foreground">{t(p.label)}</dt>
					<dd className="font-semibold text-foreground">
						{formatPrice(p.amount)}
					</dd>
				</div>
			))}
		</dl>
	);
}

interface MenuItemRowProps {
	item: MenuItem;
	/** Show "Ask our staff" when the item has no price (mixed categories). */
	showAskPrice: boolean;
	/** Hide the per-item price when it equals the category's shared price. */
	hidePrice?: boolean;
	/** Visual surface: default card or the dark chalkboard. */
	surface?: "default" | "chalkboard";
}

export function MenuItemRow({
	item,
	showAskPrice,
	hidePrice = false,
	surface = "default",
}: MenuItemRowProps) {
	const { t, lang } = useLanguage();
	const otherLang: Lang = lang === "en" ? "es" : "en";
	const name = t(item.name);
	const altName = item.name[otherLang];
	const prices = hidePrice ? undefined : item.prices;
	const single = prices?.length === 1 ? prices[0] : undefined;
	const lowest = prices?.length
		? Math.min(...prices.map((p) => p.amount))
		: undefined;
	const onBoard = surface === "chalkboard";
	const mutedText = onBoard ? "text-chalkboard-muted" : "text-muted-foreground";

	let priceNode: React.ReactNode = null;
	if (single) {
		priceNode = (
			<span className="font-heading text-lg font-semibold tabular-nums">
				{formatPrice(single.amount)}
			</span>
		);
	} else if (lowest !== undefined) {
		priceNode = (
			<span className="whitespace-nowrap">
				<span className={cn("text-xs", mutedText)}>{t(menuCopy.from)} </span>
				<span className="font-heading text-lg font-semibold tabular-nums">
					{formatPrice(lowest)}
				</span>
			</span>
		);
	} else if (showAskPrice && !hidePrice) {
		priceNode = (
			<span className={cn("text-xs italic whitespace-nowrap", mutedText)}>
				{t(menuCopy.askPrice)}
			</span>
		);
	}

	return (
		<li
			className={cn(
				"py-4",
				onBoard ? "border-white/10" : "border-border",
				"border-b border-dashed last:border-b-0",
			)}
		>
			<div className="flex items-baseline gap-2">
				<h4
					className={cn(
						"min-w-0 font-heading text-lg leading-snug font-semibold",
						onBoard ? "text-chalkboard-foreground" : "text-foreground",
					)}
				>
					{name}
				</h4>
				{priceNode && (
					<>
						<span
							aria-hidden
							className={cn(
								"min-w-6 flex-1 translate-y-[-0.3em] border-b-2 border-dotted",
								onBoard ? "border-white/25" : "border-border",
							)}
						/>
						<span
							className={cn(
								"shrink-0",
								onBoard ? "text-highlight" : "text-accent",
							)}
						>
							{priceNode}
						</span>
					</>
				)}
			</div>

			{altName !== name && (
				<p lang={otherLang} className={cn("font-script text-lg", mutedText)}>
					{altName}
				</p>
			)}

			{item.description && (
				<p
					className={cn(
						"mt-1 text-sm leading-relaxed text-pretty",
						onBoard ? "text-chalkboard-foreground/85" : "text-foreground/80",
					)}
				>
					{t(item.description)}
				</p>
			)}

			{prices && prices.length > 1 && (
				<PriceList
					prices={prices}
					className={cn(
						"mt-2",
						onBoard &&
							"[&_dd]:text-chalkboard-foreground [&_dt]:text-chalkboard-muted",
					)}
				/>
			)}

			{item.options && item.options.length > 0 && (
				<div className="mt-2 flex flex-wrap items-center gap-1.5">
					<span className={cn("text-xs font-medium", mutedText)}>
						{t(menuCopy.options)}:
					</span>
					<ul className="contents">
						{item.options.map((o) => (
							<li
								key={o.en}
								className={cn(
									"rounded-full border px-2 py-0.5 text-xs",
									onBoard
										? "border-white/20 text-chalkboard-foreground"
										: "border-border bg-background text-foreground/85",
								)}
							>
								{t(o)}
							</li>
						))}
					</ul>
				</div>
			)}

			{(item.tags?.length || item.availability) && (
				<div className="mt-2.5 flex flex-wrap items-center gap-1.5">
					{item.tags?.map((tag) => (
						<TagBadge key={tag} tag={tag} />
					))}
					{item.availability && (
						<span
							className={cn(
								"inline-flex items-center gap-1 text-xs font-semibold",
								onBoard ? "text-highlight" : "text-accent",
							)}
						>
							<CalendarDays aria-hidden className="size-3.5" />
							{t(item.availability)}
						</span>
					)}
				</div>
			)}

			{item.uncertain && (
				<p
					className={cn(
						"mt-2 inline-flex items-center gap-1 text-xs italic",
						mutedText,
					)}
				>
					<CircleHelp aria-hidden className="size-3.5 shrink-0" />
					{t(menuStrings.confirmInStore)}
				</p>
			)}
		</li>
	);
}
