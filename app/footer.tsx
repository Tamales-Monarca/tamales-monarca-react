"use client";

import { Link } from "@heroui/react";
import { Facebook } from "lucide-react";

export default function Footer() {
	return (
		<footer className="bg-orange-600 text-white py-6">
			<div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
				<p className="text-sm">
					&copy; {new Date().getFullYear()} Tamales Monarca. All rights
					reserved.
				</p>
				<div className="flex gap-4">
					<Link
						href="https://www.facebook.com/profile.php/?id=100092309962780"
						isExternal
						className="text-white hover:text-orange-100"
					>
						<Facebook className="h-5 w-5" />
					</Link>
				</div>
			</div>
		</footer>
	);
}
