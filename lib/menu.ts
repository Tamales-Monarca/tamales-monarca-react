/**
 * Restaurante El Monarca: bilingual menu data.
 *
 * Source of truth: the two in-store menu boards. Only what is on the boards is
 * listed: item names, options and prices. No invented descriptions or dietary badges.
 * The boards only price tamales; every other item shows "Ask our staff".
 * Most of the main board is in English, so many Spanish names are translations.
 */

import type { Localized } from "@/lib/i18n";

export type MenuCategoryId =
	| "breakfast"
	| "tamales"
	| "lunch-dinner"
	| "tacos"
	| "tortas"
	| "soups"
	| "sides"
	| "specials";

export type MenuTag =
	/** Filling has no meat. NOT a vegetarian claim: masa may contain lard. */
	| "meatless-filling"
	| "sweet"
	| "house-favorite"
	| "spicy"
	| "weekend"
	| "daily-special";

export interface MenuPrice {
	/** e.g. { en: "1 tamale", es: "1 tamal" } */
	label: Localized;
	/** Price in USD, e.g. 3 */
	amount: number;
}

export interface MenuItem {
	/** Stable slug, unique across the whole menu. */
	id: string;
	name: Localized;
	description?: Localized;
	/** Choices such as fillings or sauces. */
	options?: Localized[];
	/** Undefined means no price on the board: show "Ask our staff". */
	prices?: MenuPrice[];
	tags?: MenuTag[];
	/** Short availability note, e.g. Saturdays only. */
	availability?: Localized;
	/** True when the board text was hard to read or ambiguous. */
	uncertain?: boolean;
	/** Optional dish photo under /public, shown in the menu's photo strip. */
	image?: string;
}

export interface MenuCategory {
	id: MenuCategoryId;
	name: Localized;
	/** Short line under the heading. */
	tagline?: Localized;
	/** Prices shared by all items in the category (e.g. tamales). */
	sharedPrices?: MenuPrice[];
	items: MenuItem[];
}

const L = (en: string, es: string = en): Localized => ({ en, es });

/** Tamales are sold by the piece, half dozen, or dozen (mix and match). */
export const tamalePrices: MenuPrice[] = [
	{ label: L("1 tamale", "1 tamal"), amount: 3 },
	{ label: L("Half dozen", "Media docena"), amount: 16 },
	{ label: L("Dozen", "Docena"), amount: 28 },
];

export const menu: MenuCategory[] = [
	{
		id: "breakfast",
		name: L("Breakfast", "Desayuno"),
		tagline: L("Served all day", "Servido todo el día"),
		items: [
			{
				id: "huevos-rancheros",
				name: L("Huevos Rancheros"),
			},
			{
				id: "chilaquiles",
				name: L("Chilaquiles"),
				image: "/images/dishes/chilaquiles.webp",
				options: [L("Monarca"), L("Green Chile", "Chile Verde")],
			},
			{
				id: "breakfast-burritos",
				name: L("Breakfast Burritos", "Burritos de Desayuno"),
				options: [L("Ham", "Jamón"), L("Bacon", "Tocino")],
			},
			{
				id: "breakfast-tamales",
				name: L("Breakfast Tamales", "Tamales de Desayuno"),
				options: [
					L("Pork", "Puerco"),
					L("Chicken", "Pollo"),
					L("Cheese & Jalapeño", "Queso y Jalapeño"),
					L("A la Mexicana (no meat)", "A la Mexicana (sin carne)"),
				],
				prices: [
					{ label: L("1 pc", "1 pza"), amount: 3 },
					{ label: L("6 pc", "6 pzas"), amount: 16 },
					{ label: L("12 pc", "12 pzas"), amount: 28 },
				],
			},
			{
				id: "chicharron-salsa-verde",
				name: L("Chicharrón in Green Salsa", "Chicharrón en Salsa Verde"),
			},
			{
				id: "machaca",
				name: L("Machaca"),
			},
		],
	},
	{
		id: "tamales",
		name: L("Tamales"),
		tagline: L(
			"By the piece, half dozen or dozen",
			"Por pieza, media docena o docena",
		),
		sharedPrices: tamalePrices,
		items: [
			{
				id: "tamal-puerco-rojo",
				name: L("Pork with Red Sauce", "Puerco en Salsa Roja"),
				prices: tamalePrices,
			},
			{
				id: "tamal-pollo-verde",
				name: L("Chicken with Green Sauce", "Pollo en Salsa Verde"),
				prices: tamalePrices,
			},
			{
				id: "tamal-rajas-queso",
				name: L("Cheese with Jalapeño", "Rajas de Jalapeño con Queso"),
				prices: tamalePrices,
			},
			{
				id: "tamal-fresa",
				name: L("Strawberry (sweet)", "Dulce con Fresa"),
				prices: tamalePrices,
			},
			{
				id: "tamal-pina",
				name: L("Pineapple (sweet)", "Dulce con Piña"),
				prices: tamalePrices,
			},
		],
	},
	{
		id: "lunch-dinner",
		name: L("Lunch & Dinner", "Comida y Cena"),
		items: [
			{
				id: "chiles-rellenos",
				name: L("Chiles Rellenos"),
			},
			{
				id: "enchiladas",
				name: L("Enchiladas"),
				options: [
					L("Chicken or Cheese", "Pollo o Queso"),
					L("Red (rojas) or Green (verdes)", "Rojas o Verdes"),
				],
			},
			{
				id: "adobo-plate",
				name: L("Adobo Plate", "Plato de Adobo"),
				image: "/images/dishes/adobo-plate.webp",
			},
			{
				id: "tamale-plate",
				name: L("Tamale Plate", "Plato de Tamales"),
			},
			{
				id: "carne-asada",
				name: L("Carne Asada"),
				image: "/images/dishes/carne-asada.webp",
			},
			{
				id: "fajitas",
				name: L("Fajitas"),
				options: [
					L("Pork", "Puerco"),
					L("Chicken", "Pollo"),
					L("Mixed", "Mixtas"),
				],
			},
			{
				id: "lengua-salsa-verde",
				name: L("Beef Tongue in Green Salsa", "Lengua en Salsa Verde"),
			},
			{
				id: "asada-fries",
				name: L("Asada Fries", "Papas con Asada"),
			},
			{
				id: "quesadillas-sincronizadas",
				name: L("Quesadillas Sincronizadas"),
				image: "/images/dishes/quesadillas.webp",
				options: [L("Chicken", "Pollo"), L("Ham", "Jamón"), L("Asada")],
			},
			{
				id: "molcajete",
				name: L("Molcajete"),
				image: "/images/dishes/molcajete.webp",
			},
			{
				id: "hamburguesa",
				name: L("Hamburger", "Hamburguesa"),
			},
			{
				id: "monarca-especial",
				name: L("Monarca Special", "Monarca Especial"),
			},
		],
	},
	{
		id: "tacos",
		name: L("Tacos"),
		items: [
			{ id: "taco-lengua", name: L("Lengua (Beef Tongue)", "Lengua") },
			{ id: "taco-asada", name: L("Asada (Grilled Steak)", "Asada") },
			{ id: "taco-pork", name: L("Pork", "Puerco") },
			{
				id: "taco-chicharron",
				name: L("Chicharrón (Pork Rinds)", "Chicharrón"),
			},
			{
				id: "quesabirria",
				name: L("Quesabirria"),
			},
			{
				id: "quesatacos",
				name: L("Quesatacos"),
				options: [L("Chicken", "Pollo"), L("Asada")],
			},
			{
				id: "taco-birria",
				name: L("Birria"),
			},
		],
	},
	{
		id: "tortas",
		name: L("Tortas"),
		tagline: L("Mexican sandwiches", "Sándwiches mexicanos"),
		items: [
			{ id: "torta-ham", name: L("Ham", "Jamón") },
			{ id: "torta-chicken", name: L("Chicken", "Pollo") },
			{
				id: "torta-cochinita",
				name: L("Cochinita (Achiote Pulled Pork)", "Cochinita"),
			},
			{ id: "torta-asada", name: L("Asada (Grilled Steak)", "Asada") },
			{ id: "torta-lengua", name: L("Lengua (Beef Tongue)", "Lengua") },
		],
	},
	{
		id: "soups",
		name: L("Soups", "Sopas"),
		items: [
			{
				id: "pozole",
				name: L("Pozole"),
			},
			{
				id: "menudo",
				name: L("Menudo"),
			},
			{
				id: "sopa-de-mariscos",
				name: L("Seafood Soup", "Sopa de Mariscos"),
				options: [
					L("Shrimp", "Camarón"),
					L("Fish", "Pescado"),
					L("Both", "Ambos"),
				],
			},
			{
				id: "birria-soup",
				name: L("Birria"),
			},
		],
	},
	{
		id: "sides",
		name: L("Sides", "Acompañantes"),
		items: [
			{ id: "arroz", name: L("Rice", "Arroz") },
			{ id: "frijol", name: L("Beans", "Frijoles") },
			{
				id: "chiles-toreados",
				name: L("Chiles Toreados (Blistered Chiles)", "Chiles Toreados"),
			},
			{ id: "french-toast", name: L("French Toast", "Pan Francés") },
		],
	},
	{
		id: "specials",
		name: L("Specials", "Especiales"),
		items: [
			{
				id: "gorditas",
				name: L("Gorditas"),
				options: [
					L("Asada"),
					L("Rajas (roasted peppers)", "Rajas"),
					L("Pork", "Puerco"),
					L("Ground beef", "Molida"),
					L("Chorizo"),
					L("Chicharrón"),
					L("Nopales (cactus)", "Nopales"),
				],
				availability: L("Special", "Especial"),
			},
			{
				id: "menudo-rojo",
				name: L("Red Menudo", "Menudo Rojo"),
				availability: L("Saturdays only", "Solo los sábados"),
			},
		],
	},
];

/** Tab grouping for the menu section (audit recommendation). */
export interface MenuTab {
	id: string;
	label: Localized;
	categories: MenuCategoryId[];
}

export const menuTabs: MenuTab[] = [
	{
		id: "desayuno",
		label: L("Breakfast", "Desayuno"),
		categories: ["breakfast"],
	},
	{ id: "tamales", label: L("Tamales"), categories: ["tamales"] },
	{
		id: "tacos-tortas",
		label: L("Tacos & Tortas", "Tacos y Tortas"),
		categories: ["tacos", "tortas"],
	},
	{
		id: "platillos",
		label: L("Plates", "Platillos"),
		categories: ["lunch-dinner"],
	},
	{ id: "sopas", label: L("Soups", "Sopas"), categories: ["soups"] },
	{
		id: "extras",
		label: L("Sides & Specials", "Extras y Especiales"),
		categories: ["sides", "specials"],
	},
];

/** Items with a photo, in menu order, for the menu's photo strip. */
export const featuredDishes = menu.flatMap((category) =>
	category.items
		.filter((item) => item.image)
		.map((item) => ({ item, category })),
);

/** UI strings specific to the menu section. */
export const menuCopy = {
	askPrice: L("Ask our staff", "Pregunta en el restaurante"),
	from: L("from", "desde"),
	options: L("Options", "Opciones"),
	mixAndMatch: L("Prices", "Precios"),
	pricesNote: L(
		"Prices and availability may change. Ask our team about today's specials.",
		"Precios y disponibilidad pueden cambiar. Pregunta por los especiales del día.",
	),
	tagLabels: {
		"meatless-filling": L("Meatless filling", "Relleno sin carne"),
		sweet: L("Sweet", "Dulce"),
		"house-favorite": L("House favorite", "Favorito de la casa"),
		spicy: L("Spicy", "Picante"),
		weekend: L("Weekend", "Fin de semana"),
		"daily-special": L("Daily special", "Especial del día"),
	} satisfies Record<MenuTag, Localized>,
};

/** Format a USD price: formatPrice(3) -> "$3", formatPrice(16.5) -> "$16.50". */
export function formatPrice(amount: number): string {
	return Number.isInteger(amount) ? `$${amount}` : `$${amount.toFixed(2)}`;
}

export function getCategory(id: MenuCategoryId): MenuCategory {
	const c = menu.find((cat) => cat.id === id);
	if (!c) throw new Error(`Unknown menu category: ${id}`);
	return c;
}
