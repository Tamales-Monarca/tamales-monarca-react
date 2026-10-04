import type { Localized } from "@/lib/i18n";

/** Menu-section UI strings not covered by `menuCopy` (lib/menu.ts). */
export const menuStrings = {
	categoriesNav: {
		en: "Menu categories",
		es: "Categorías del menú",
	},
	confirmInStore: {
		en: "Please confirm details with our staff",
		es: "Confirma los detalles con nuestro personal",
	},
	boardsDescription: {
		en: "The original chalkboards from our dining room. Tap to open full size, or save them for later.",
		es: "Los pizarrones originales de nuestro comedor. Toca para verlos en tamaño completo o guárdalos.",
	},
	openFullSize: {
		en: "Open full size",
		es: "Ver en tamaño completo",
	},
	tamalesPricing: {
		en: "Tamale pricing",
		es: "Precios de tamales",
	},
	flavors: {
		en: "Flavors",
		es: "Sabores",
	},
	readyToOrder: {
		en: "Hungry yet? Order ahead for pickup or give us a call.",
		es: "¿Ya se te antojó? Ordena para recoger o llámanos.",
	},
	readyToCall: {
		en: "Hungry yet? Give us a call and we'll have it ready. Online ordering is coming soon.",
		es: "¿Ya se te antojó? Llámanos y te lo tenemos listo. Pedidos en línea muy pronto.",
	},
} satisfies Record<string, Localized>;
