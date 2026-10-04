/**
 * Restaurante El Monarca: business facts and bilingual site copy.
 * Replaces the old config/translations.ts.
 *
 * NEEDS OWNER CONFIRMATION (see `site.unverified`): the street address comes
 * from 2023 git history.
 */

import type { Localized } from "@/lib/i18n";
import { menu } from "@/lib/menu";

const L = (en: string, es: string = en): Localized => ({ en, es });

export type DayOfWeek =
	| "Monday"
	| "Tuesday"
	| "Wednesday"
	| "Thursday"
	| "Friday"
	| "Saturday"
	| "Sunday";

export interface OpeningHours {
	days: DayOfWeek[];
	/** 24h "HH:MM" */
	opens: string;
	closes: string;
	/** Human label, e.g. "Mon – Sun" / "Lun – Dom" */
	label: Localized;
	/** Human time range, e.g. "8 AM – 8 PM" */
	time: Localized;
}

export interface Phone {
	/** Who answers, e.g. "Restaurant" / "Owner" */
	label: Localized;
	/** Display format: "(620) 208-7017" */
	display: string;
	/** tel: href */
	href: string;
	/** E.164 for schema.org */
	e164: string;
}

export const site = {
	name: "Restaurante El Monarca",
	shortName: "El Monarca",
	/** Production domain: canonical, Open Graph, sitemap and JSON-LD URLs. */
	url: "https://elmonarcaemporia.com",
	locale: { en: "en_US", es: "es_MX" },
	themeColor: "#E8913A",
	cuisine: ["Mexican", "Tamales"],
	priceRange: "$",

	logo: {
		/** Full lockup (butterfly + MONARCA wordmark), transparent, light bg. */
		full: "/logo.svg",
		/** Same lockup recolored for dark backgrounds. */
		fullDark: "/logo-dark.svg",
		/** Butterfly mark only (square), works at small sizes. */
		mark: "/logo-mark.svg",
		/** Intrinsic ratio of logo.svg / logo-dark.svg (1900 x 1300). */
		width: 1900,
		height: 1300,
	},
	ogImage: "/og-image.jpg",

	address: {
		street: "201 Commercial St",
		city: "Emporia",
		region: "KS",
		postalCode: "66801",
		country: "US",
		/** One-line display */
		line: "201 Commercial St, Emporia, KS 66801",
	},
	geo: { lat: 38.40026, lng: -96.18314 },

	/** phones[0] is the restaurant line used for every "Call" button. */
	phones: [
		{
			label: L("Restaurant", "Restaurante"),
			display: "(620) 208-7017",
			href: "tel:+16202087017",
			e164: "+16202087017",
		},
		{
			label: L("Owner", "Propietario"),
			display: "(702) 712-5457",
			href: "tel:+17027125457",
			e164: "+17027125457",
		},
		{
			label: L("Owner", "Propietario"),
			display: "(702) 813-3093",
			href: "tel:+17028133093",
			e164: "+17028133093",
		},
	] satisfies Phone[],

	hours: [
		{
			days: [
				"Monday",
				"Tuesday",
				"Wednesday",
				"Thursday",
				"Friday",
				"Saturday",
				"Sunday",
			],
			opens: "08:00",
			closes: "20:00",
			label: L("Monday – Sunday", "Lunes – Domingo"),
			time: L("8 AM – 8 PM", "8 a. m. – 8 p. m."),
		},
	] satisfies OpeningHours[],

	hoursNotes: [
		L("Breakfast served all day", "Desayuno todo el día"),
		L("Red menudo on Saturdays", "Menudo rojo los sábados"),
	],

	links: {
		/**
		 * Online ordering is paused during the rebrand. Set to the new ordering
		 * URL to turn every "Order Online" button back on; while null, the site
		 * shows "Call to Order" plus an "Online ordering coming soon" note.
		 */
		order: null as string | null,
		facebook: "https://www.facebook.com/share/1G6RhJokNX/" as string | null,
		/** Google Maps search by street address (no place name). */
		maps: "https://www.google.com/maps/search/?api=1&query=201+Commercial+St%2C+Emporia%2C+KS+66801",
		directions:
			"https://www.google.com/maps/dir/?api=1&destination=38.40026,-96.18314",
		/**
		 * <iframe src> for the embedded Google map, by street address. Swap for a
		 * place embed once the restaurant's Google Business Profile is set up.
		 */
		mapEmbed:
			"https://maps.google.com/maps?q=201%20Commercial%20St%2C%20Emporia%2C%20KS%2066801&z=16&output=embed",
	},

	/** Facts that must be confirmed with the owner before launch. */
	unverified: ["address"],
} as const;

/** In-page anchor ids. Each section component renders the matching id. */
export const sectionIds = {
	hero: "inicio",
	menu: "menu",
	about: "nosotros",
	visit: "visitanos",
} as const;

export const nav: { href: `#${string}`; label: Localized }[] = [
	{ href: `#${sectionIds.menu}`, label: L("Menu", "Menú") },
	{ href: `#${sectionIds.about}`, label: L("Our Story", "Nosotros") },
	{ href: `#${sectionIds.visit}`, label: L("Visit", "Visítanos") },
];

/** Bilingual UI copy, grouped by section. */
export const copy = {
	common: {
		orderOnline: L("Order Online", "Ordenar en Línea"),
		orderPickup: L("Order for Pickup", "Ordenar para Recoger"),
		callToOrder: L("Call to Order", "Llama para Ordenar"),
		orderingSoon: L(
			"Online ordering coming soon",
			"Pedidos en línea muy pronto",
		),
		call: L("Call", "Llamar"),
		callUs: L("Call Us", "Llámanos"),
		directions: L("Get Directions", "Cómo Llegar"),
		viewMenu: L("View Menu", "Ver Menú"),
		viewMap: L("View Map", "Ver Mapa"),
		followUs: L("Follow us", "Síguenos"),
		openMenu: L("Open menu", "Abrir menú"),
		closeMenu: L("Close menu", "Cerrar menú"),
		skipToContent: L("Skip to content", "Saltar al contenido"),
		language: L("Language", "Idioma"),
		opensInNewTab: L("(opens in a new tab)", "(se abre en una pestaña nueva)"),
	},
	hero: {
		eyebrow: L(
			"Cocina Mexicana · Emporia, Kansas",
			"Cocina Mexicana · Emporia, Kansas",
		),
		title: L("Restaurante El Monarca"),
		tagline: L("Sabor casero", "Sabor casero"),
		description: L(
			"A family-owned Mexican kitchen serving handmade tamales, breakfast all day, tacos, tortas, hearty plates and comforting soups.",
			"Cocina mexicana familiar con tamales hechos a mano, desayuno todo el día, tacos, tortas, platillos y caldos caseros.",
		),
		badge: L("Breakfast served all day", "Desayuno todo el día"),
	},
	menu: {
		eyebrow: L("Nuestro Menú", "Nuestro Menú"),
		title: L("Made fresh, every day", "Hecho al momento, todos los días"),
		description: L(
			"From breakfast tamales to molcajete, birria and pozole: our full menu, now in your pocket.",
			"De tamales de desayuno a molcajete, birria y pozole: todo nuestro menú, ahora en tu bolsillo.",
		),
	},
	about: {
		eyebrow: L("Nuestra Historia", "Nuestra Historia"),
		title: L("A family table in Emporia", "Una mesa familiar en Emporia"),
		paragraphs: [
			L(
				"Restaurante El Monarca is a family-owned Mexican restaurant in downtown Emporia. We cook breakfast all day, lunch and dinner plates, tacos, tortas and soups, plus handmade tamales by the piece or by the dozen.",
				"Restaurante El Monarca es un restaurante mexicano familiar en el centro de Emporia. Preparamos desayuno todo el día, platillos para la comida y la cena, tacos, tortas y caldos, además de tamales hechos a mano por pieza o por docena.",
			),
			L(
				"Our name honors the monarch butterfly. Every fall, monarchs pass through Kansas on their long journey to Mexico, a reminder that good things bring people together across any distance. Pull up a chair: at our table, you're family.",
				"Nuestro nombre honra a la mariposa monarca. Cada otoño, las monarcas cruzan Kansas en su largo viaje a México, un recordatorio de que lo bueno une a la gente sin importar la distancia. Toma asiento: en nuestra mesa, eres familia.",
			),
		],
		pillars: [
			{
				title: L("Handmade daily", "Hecho a mano cada día"),
				body: L(
					"Masa, salsas and fillings made in our kitchen.",
					"Masa, salsas y guisos preparados en nuestra cocina.",
				),
			},
			{
				title: L("Family recipes", "Recetas de familia"),
				body: L(
					"Home-style Mexican cooking, made the way we cook for our own.",
					"Cocina mexicana casera, como la preparamos para los nuestros.",
				),
			},
			{
				title: L("Made for sharing", "Para compartir"),
				body: L(
					"Tamales by the dozen for parties, holidays and Sunday mornings.",
					"Tamales por docena para fiestas, posadas y domingos en familia.",
				),
			},
		],
	},
	visit: {
		eyebrow: L("Visítanos", "Visítanos"),
		title: L("We saved you a seat", "Te guardamos un lugar"),
		hours: L("Hours", "Horario"),
		location: L("Location", "Ubicación"),
		phone: L("Phone", "Teléfono"),
		mapTitle: L(
			"Map showing Restaurante El Monarca in Emporia, Kansas",
			"Mapa de Restaurante El Monarca en Emporia, Kansas",
		),
		cateringNote: L(
			"Ordering tamales for a party? Call ahead for dozens.",
			"¿Tamales para tu fiesta? Llama con anticipación para pedir por docena.",
		),
	},
	footer: {
		tagline: L(
			"Family-owned Mexican restaurant in Emporia, Kansas.",
			"Restaurante mexicano familiar en Emporia, Kansas.",
		),
		rights: L("All rights reserved.", "Todos los derechos reservados."),
	},
	error: {
		title: L("Something went wrong", "Algo salió mal"),
		retry: L("Try again", "Intentar de nuevo"),
	},
};

/** Join a list of Localized hours into a single display string. */
export function formatHours(lang: "en" | "es"): string {
	return site.hours.map((h) => `${h.label[lang]}: ${h.time[lang]}`).join(" · ");
}

/** schema.org Restaurant JSON-LD (rendered in app/layout.tsx). */
export function restaurantJsonLd() {
	return {
		"@context": "https://schema.org",
		"@type": "Restaurant",
		name: site.name,
		url: `${site.url}/`,
		logo: `${site.url}${site.logo.full}`,
		image: `${site.url}${site.ogImage}`,
		telephone: site.phones[0].e164,
		priceRange: site.priceRange,
		servesCuisine: site.cuisine,
		hasMenu: {
			"@type": "Menu",
			name: `${site.name} Menu`,
			url: `${site.url}/#menu`,
			inLanguage: ["en", "es"],
			hasMenuSection: menu.map((category) => ({
				"@type": "MenuSection",
				name: category.name.en,
				...(category.tagline && { description: category.tagline.en }),
				hasMenuItem: category.items.map((item) => {
					const prices = item.prices ?? category.sharedPrices;
					return {
						"@type": "MenuItem",
						name: item.name.en,
						...(item.description && { description: item.description.en }),
						// No suitableForDiet: dietary claims are unverified (lard in masa).
						// Items flagged uncertain publish no Offer until prices are confirmed.
						...(prices &&
							!item.uncertain && {
								offers: prices.map((p) => ({
									"@type": "Offer",
									name: p.label.en,
									price: p.amount.toFixed(2),
									priceCurrency: "USD",
								})),
							}),
					};
				}),
			})),
		},
		acceptsReservations: false,
		currenciesAccepted: "USD",
		address: {
			"@type": "PostalAddress",
			streetAddress: site.address.street,
			addressLocality: site.address.city,
			addressRegion: site.address.region,
			postalCode: site.address.postalCode,
			addressCountry: site.address.country,
		},
		geo: {
			"@type": "GeoCoordinates",
			latitude: site.geo.lat,
			longitude: site.geo.lng,
		},
		openingHoursSpecification: site.hours.map((h) => ({
			"@type": "OpeningHoursSpecification",
			dayOfWeek: h.days,
			opens: h.opens,
			closes: h.closes,
		})),
		...(site.links.facebook && { sameAs: [site.links.facebook] }),
		...(site.links.order && {
			potentialAction: {
				"@type": "OrderAction",
				target: {
					"@type": "EntryPoint",
					urlTemplate: site.links.order,
					inLanguage: "en-US",
					actionPlatform: [
						"https://schema.org/DesktopWebPlatform",
						"https://schema.org/MobileWebPlatform",
					],
				},
				deliveryMethod: ["http://purl.org/goodrelations/v1#DeliveryModePickUp"],
			},
		}),
	};
}
