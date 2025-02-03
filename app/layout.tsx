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
			<head>
				<meta charSet="utf-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<meta name="theme-color" content="#f97316" />

				<title>
					Tamales Monarca | Authentic Mexican Tamales in Emporia, KS
				</title>
				<meta
					name="description"
					content="Family-owned restaurant in Emporia, Kansas, serving authentic Michoacán-style tamales handmade from generations-old recipes."
				/>

				{/* Open Graph / Facebook */}
				<meta property="og:type" content="website" />
				<meta property="og:url" content="https://tamalesmonarca.com/" />
				<meta
					property="og:title"
					content="Tamales Monarca | Authentic Mexican Tamales"
				/>
				<meta
					property="og:description"
					content="Family-owned restaurant in Emporia, Kansas, serving authentic Michoacán-style tamales handmade from generations-old recipes."
				/>

				{/* Twitter */}
				<meta name="twitter:url" content="https://tamalesmonarca.com/" />
				<meta
					name="twitter:title"
					content="Tamales Monarca | Authentic Mexican Tamales"
				/>
				<meta
					name="twitter:description"
					content="Family-owned restaurant in Emporia, Kansas, serving authentic Michoacán-style tamales handmade from generations-old recipes."
				/>

				{/* Favicon */}
				<link rel="icon" href="/favicon.ico" sizes="any" />
				<link rel="apple-touch-icon" href="/apple-touch-icon.png" />
				<link rel="manifest" href="/site.webmanifest" />

				{/* Additional Meta */}
				<meta
					name="keywords"
					content="tamales, mexican food, emporia, kansas, michoacan, authentic mexican, restaurant"
				/>
				<meta name="geo.region" content="US-KS" />
				<meta name="geo.placename" content="Emporia" />
				<link rel="canonical" href="https://tamalesmonarca.com/" />
			</head>
			<body className="min-h-screen bg-background antialiased">
				<Providers>
					{children}
					<Footer />
				</Providers>
			</body>
		</html>
	);
}
