import { ArrowLeft, Phone, UtensilsCrossed } from "lucide-react";
import type { Metadata } from "next";

import { Button } from "@/components/ui/button";
import { sectionIds, site } from "@/lib/site";

export const metadata: Metadata = {
	title: "Page not found · Página no encontrada",
	robots: { index: false },
};

/** Branded, bilingual 404 (exported as out/404.html). */
export default function NotFound() {
	return (
		<main
			id="main"
			className="paper-grain flex min-h-dvh flex-col items-center justify-center gap-6 bg-background px-4 py-16 text-center"
		>
			<a
				href="/"
				aria-label={`${site.name}, home`}
				className="rounded-lg focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
			>
				<img
					src={site.logo.full}
					alt=""
					width={site.logo.width}
					height={site.logo.height}
					className="h-auto w-48"
				/>
				<img
					src={site.logo.fullDark}
					alt=""
					width={site.logo.width}
					height={site.logo.height}
					className="hidden h-auto w-48"
				/>
			</a>
			<p className="font-script text-3xl text-accent">404</p>
			<h1 className="font-heading text-3xl font-semibold sm:text-4xl">
				Page not found
				<span lang="es" className="mt-1 block text-2xl text-muted-foreground">
					Página no encontrada
				</span>
			</h1>
			<p className="max-w-md text-muted-foreground">
				This page flew away like a monarca. Let&rsquo;s get you back to the
				table.{" "}
				<span lang="es">
					Esta página voló como la monarca. Te llevamos de regreso a la mesa.
				</span>
			</p>
			<div className="flex w-full max-w-md flex-col gap-3 sm:flex-row sm:justify-center">
				<Button asChild size="lg" className="h-11">
					<a href="/">
						<ArrowLeft aria-hidden="true" />
						Home · Inicio
					</a>
				</Button>
				<Button asChild size="lg" variant="outline" className="h-11">
					<a href={`/#${sectionIds.menu}`}>
						<UtensilsCrossed aria-hidden="true" />
						Menu · Menú
					</a>
				</Button>
				<Button asChild size="lg" variant="outline" className="h-11">
					<a href={site.phones[0].href}>
						<Phone aria-hidden="true" />
						{site.phones[0].display}
					</a>
				</Button>
			</div>
		</main>
	);
}
