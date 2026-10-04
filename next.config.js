/** @type {import('next').NextConfig} */
const nextConfig = {
	images: { unoptimized: true },
	output: "export",
	// Copyright year baked into the static HTML (footer refreshes it on the client).
	env: { BUILD_YEAR: String(new Date().getFullYear()) },
	trailingSlash: false,
	// Pin tracing root to this repo (a stray lockfile in the home dir confuses inference).
	outputFileTracingRoot: __dirname,
};

module.exports = nextConfig;
