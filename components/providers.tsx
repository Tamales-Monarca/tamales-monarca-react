"use client";

import { LanguageProvider } from "@/components/language-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import type { ReactNode } from "react";

export function Providers({ children }: { children: ReactNode }) {
	return (
		<LanguageProvider>
			<TooltipProvider delayDuration={200}>{children}</TooltipProvider>
		</LanguageProvider>
	);
}
