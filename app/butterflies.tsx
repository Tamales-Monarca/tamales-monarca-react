import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const FloatingButterfly = ({ x, y }: { x: number; y: number }) => (
	<motion.div
		className="fixed text-2xl pointer-events-none"
		initial={{ x, y }}
		animate={{
			x: x + Math.random() * 400 - 200,
			y: y + Math.random() * 400 - 200,
			rotate: Math.random() * 45 - 22.5,
		}}
		transition={{
			duration: 20,
			repeat: Infinity,
			repeatType: "reverse",
			ease: "easeInOut",
		}}
	>
		🦋
	</motion.div>
);

export const Butterflies = () => {
	const [positions, setPositions] = useState<{ x: number; y: number }[]>([]);

	useEffect(() => {
		// Initialize butterfly positions after component mounts
		setPositions(
			[...Array(4)].map(() => ({
				x: Math.random() * window.innerWidth,
				y: Math.random() * window.innerHeight,
			})),
		);
	}, []);

	return (
		<div className="fixed inset-0 pointer-events-none overflow-hidden z-10">
			{positions.map((pos, i) => (
				<FloatingButterfly key={i} x={pos.x} y={pos.y} />
			))}
		</div>
	);
};
