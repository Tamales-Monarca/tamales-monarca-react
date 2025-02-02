"use client";

// app/layout.tsx
import "@/styles/globals.css";
import { Providers } from "./providers";
import Footer from "./footer";

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en" className="light">
			<head></head>
			<body className="min-h-screen bg-background antialiased">
				<Providers>
					{children}
					<Footer />
				</Providers>
			</body>
		</html>
	);
}
