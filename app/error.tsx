"use client";

import { Button } from "@/components/ui/button";

export default function ErrorPage({
	reset,
}: {
	error: Error & { digest?: string };
	reset: () => void;
}) {
	return (
		<main className="flex min-h-dvh flex-col items-center justify-center gap-6 bg-background px-6 text-center">
			<img src="/logo-mark.svg" alt="" width={96} height={96} />
			<h1 className="font-heading text-3xl">
				Something went wrong · Algo salió mal
			</h1>
			<Button onClick={() => reset()}>Try again · Intentar de nuevo</Button>
		</main>
	);
}
