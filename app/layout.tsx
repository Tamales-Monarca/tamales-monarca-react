import "./globals.css";
import { Providers } from "@/components/providers";
import { restaurantJsonLd, site } from "@/lib/site";
import { cn } from "@/lib/utils";
import type { Metadata, Viewport } from "next";
import { Caveat, DM_Sans, Fraunces } from "next/font/google";

const fraunces = Fraunces({
	subsets: ["latin", "latin-ext"],
	variable: "--font-fraunces",
	axes: ["SOFT", "WONK", "opsz"],
	display: "swap",
});

const dmSans = DM_Sans({
	subsets: ["latin", "latin-ext"],
	variable: "--font-dm-sans",
	display: "swap",
});

const caveat = Caveat({
	subsets: ["latin", "latin-ext"],
	variable: "--font-caveat",
	weight: ["500", "700"],
	display: "swap",
});

const title = `${site.name} | Authentic Mexican Food in Emporia, KS`;
const description =
	"Family-owned Mexican restaurant in Emporia, Kansas. Handmade tamales, breakfast all day, tacos, tortas, molcajete, birria, pozole and menudo. Call to order.";

export const metadata: Metadata = {
	metadataBase: new URL(site.url),
	title: { default: title, template: `%s | ${site.name}` },
	description,
	applicationName: site.name,
	// One URL serves both languages (client-side EN/ES switch), so there are
	// no hreflang alternates: only the canonical.
	alternates: { canonical: "/" },
	openGraph: {
		type: "website",
		url: "/",
		siteName: site.name,
		title,
		description,
		locale: site.locale.en,
		alternateLocale: [site.locale.es],
		images: [{ url: site.ogImage, width: 1200, height: 630, alt: site.name }],
	},
	twitter: {
		card: "summary_large_image",
		title,
		description,
		images: [site.ogImage],
	},
	icons: {
		icon: [
			{ url: "/favicon.ico", sizes: "any" },
			{ url: "/logo-mark.svg", type: "image/svg+xml" },
			{ url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
			{ url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
		],
		apple: "/apple-touch-icon.png",
	},
	manifest: "/site.webmanifest",
	other: {
		"geo.region": "US-KS",
		"geo.placename": "Emporia",
		"geo.position": `${site.geo.lat};${site.geo.lng}`,
		ICBM: `${site.geo.lat}, ${site.geo.lng}`,
	},
};

export const viewport: Viewport = {
	// The site defaults to the light theme regardless of OS setting
	// (enableSystem={false}), so the browser chrome uses one brand color.
	themeColor: site.themeColor,
	width: "device-width",
	initialScale: 1,
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html
			lang="en"
			suppressHydrationWarning
			className={cn(fraunces.variable, dmSans.variable, caveat.variable)}
		>
			<body className="min-h-dvh bg-background font-sans text-foreground antialiased">
				<script
					type="application/ld+json"
					dangerouslySetInnerHTML={{
						__html: JSON.stringify(restaurantJsonLd()),
					}}
				/>
				<Providers>{children}</Providers>
			</body>
		</html>
	);
}
