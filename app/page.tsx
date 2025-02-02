"use client";

import { translations } from "@/config/translations";
import {
	Card,
	CardBody,
	CardHeader,
	Button,
	Divider,
	Link,
} from "@heroui/react";
import { Clock, MapPin, Menu, Globe, Facebook } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { Butterflies } from "./butterflies";

type Language = "en" | "es";

const fadeIn = {
	initial: { opacity: 0, y: 20 },
	animate: { opacity: 1, y: 0 },
	transition: { duration: 0.5 },
};

const stagger = {
	animate: {
		transition: {
			staggerChildren: 0.1,
		},
	},
};

export default function HomePage() {
	const [language, setLanguage] = useState<Language>("en");

	return (
		<motion.div
			className="min-h-screen bg-background"
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 0.5 }}
		>
			<Butterflies />
			{/* Hero Section */}
			<div className="container mx-auto px-4 py-12">
				<motion.div
					initial={{ opacity: 0, y: 30 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, ease: "easeOut" }}
				>
					<Card className="bg-gradient-to-br from-orange-600 to-red-600 text-white border-none shadow-lg overflow-hidden">
						<CardBody className="py-16 relative">
							<div className="flex justify-between items-start relative">
								<div className="max-w-2xl">
									<motion.h1
										className="text-5xl md:text-6xl font-display font-bold mb-6 tracking-tight"
										initial={{ opacity: 0, x: -20 }}
										animate={{ opacity: 1, x: 0 }}
										transition={{ duration: 0.6, delay: 0.2 }}
									>
										Tamales Monarca
									</motion.h1>
									<motion.p
										className="text-lg md:text-xl mb-8 text-white/90 leading-relaxed"
										initial={{ opacity: 0 }}
										animate={{ opacity: 1 }}
										transition={{ duration: 0.6, delay: 0.3 }}
									>
										{translations.description[language]}
									</motion.p>
									<motion.div
										className="flex gap-4 flex-col sm:flex-row"
										initial={{ opacity: 0, y: 20 }}
										animate={{ opacity: 1, y: 0 }}
										transition={{ duration: 0.6, delay: 0.4 }}
									>
										<Button
											as={Link}
											className="bg-white text-orange-600 hover:bg-orange-50 transition-all duration-300 transform hover:scale-105"
											href="https://order.online/store/tamales-monarca-emporia-25077918/?hideModal=true&pickup=true&rwg_token=AAiGsoa_HD6ceaPNpro30KtDaDVI7xY0694T696WrP_z4XlenJUvxNLa7bWahZJdR92dYMQJsqHN0qbqNobQqa3uu-iTvqAC1g=="
											isExternal
										>
											{translations.orderNow[language]}
										</Button>
										<Button
											as={Link}
											href="https://www.facebook.com/profile.php/?id=100092309962780"
											variant="bordered"
											className="text-white border-white hover:bg-white/10 transition-all duration-300"
											isExternal
										>
											<Facebook className="h-4 w-4 mr-2" />
											Facebook
										</Button>
									</motion.div>
								</div>
							</div>
						</CardBody>
					</Card>
				</motion.div>
			</div>

			{/* Info Section */}
			<motion.div
				className="container mx-auto px-4 py-8"
				variants={fadeIn}
				initial="initial"
				whileInView="animate"
				viewport={{ once: true }}
			>
				<Card className="backdrop-blur-sm bg-white/90">
					<CardBody className="py-6">
						<div className="flex flex-col md:flex-row justify-between gap-6">
							<div className="flex items-center gap-4 group">
								<Clock className="h-6 w-6 text-orange-600 group-hover:scale-110 transition-transform duration-300" />
								<div>
									<h3 className="font-display font-semibold text-foreground">
										{translations.hours[language]}
									</h3>
									<p className="text-sm text-default-500">
										Mon-Sun: 10 AM - 8 PM
									</p>
								</div>
							</div>
							<Divider orientation="vertical" className="hidden md:block" />
							<div className="flex items-center gap-4 group">
								<MapPin className="h-6 w-6 text-orange-600 group-hover:scale-110 transition-transform duration-300" />
								<div>
									<h3 className="font-display font-semibold text-foreground">
										{translations.location[language]}
									</h3>
									<Link
										href="https://maps.app.goo.gl/zVM8i9mFzk1PKuSj9"
										size="sm"
										color="primary"
										isExternal
										showAnchorIcon
									>
										{translations.viewMap[language]}
									</Link>
								</div>
							</div>
						</div>
					</CardBody>
				</Card>
			</motion.div>

			{/* Menu Section */}
			<motion.div
				id="menu"
				className="container mx-auto px-4 py-12"
				variants={stagger}
				initial="initial"
				whileInView="animate"
				viewport={{ once: true }}
			>
				<Card>
					<CardHeader className="flex gap-3">
						<Menu className="h-8 w-8 text-orange-600" />
						<div>
							<h2 className="text-3xl font-display font-bold text-foreground">
								{translations.menu[language]}
							</h2>
							<p className="text-sm text-default-500">
								{translations.menuDescription[language]}
							</p>
						</div>
					</CardHeader>
					<Divider />
					<CardBody>
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
							{translations.menuItems.map((item, index) => (
								<motion.div
									key={index}
									variants={fadeIn}
									whileHover={{ scale: 1.02 }}
									transition={{ duration: 0.2 }}
								>
									<Card className="h-full shadow-sm group transition-all duration-300 hover:shadow-lg">
										<CardBody className="p-6">
											<div className="flex justify-between items-start gap-4">
												<div>
													<h3 className="text-xl font-display font-semibold text-foreground mb-2">
														{item[language]}
													</h3>
													<p className="text-sm text-default-500 leading-relaxed">
														{item.description[language]}
													</p>
												</div>
											</div>
										</CardBody>
									</Card>
								</motion.div>
							))}
						</div>
					</CardBody>
				</Card>
			</motion.div>

			{/* Map Section */}
			<motion.div
				className="container mx-auto px-4 pb-12"
				variants={fadeIn}
				initial="initial"
				whileInView="animate"
				viewport={{ once: true }}
			>
				<Card className="overflow-hidden transition-transform duration-300 hover:shadow-xl">
					<CardBody className="p-0">
						<iframe
							title="Google Maps"
							src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3126.783294517172!2d-96.18313782354714!3d38.40025937588336!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x87b94fdc765bdc4d%3A0x3a0f30f161d97bb6!2sTamales%20Monarca!5e0!3m2!1sen!2sus!4v1738483629506!5m2!1sen!2sus"
							className="w-full h-[450px] transition-opacity duration-300"
							style={{ border: 0 }}
							allowFullScreen
							loading="lazy"
							referrerPolicy="no-referrer-when-downgrade"
						/>
					</CardBody>
				</Card>
			</motion.div>

			{/* Language Toggle */}
			<motion.div
				initial={{ opacity: 0, scale: 0.8 }}
				animate={{ opacity: 1, scale: 1 }}
				transition={{ delay: 0.5, duration: 0.3 }}
			>
				<Button
					isIconOnly
					variant="shadow"
					className="fixed bottom-6 right-6 z-50 bg-orange-600 text-white hover:bg-orange-500 
            transition-all duration-300 hover:scale-110 hover:rotate-12
            shadow-lg hover:shadow-xl"
					onPress={() => setLanguage(language === "en" ? "es" : "en")}
					size="lg"
					radius="full"
				>
					<Globe className="h-5 w-5" />
				</Button>
			</motion.div>
		</motion.div>
	);
}
