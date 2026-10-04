import { MobileActionBar } from "@/components/mobile-action-bar";
import { About } from "@/components/sections/about";
import { Footer } from "@/components/sections/footer";
import { Header } from "@/components/sections/header";
import { Hero } from "@/components/sections/hero";
import { MenuSection } from "@/components/sections/menu";
import { Visit } from "@/components/sections/visit";

export default function HomePage() {
	return (
		<>
			<Header />
			<main id="main">
				<Hero />
				<MenuSection />
				<About />
				<Visit />
			</main>
			<Footer />
			<MobileActionBar />
		</>
	);
}
