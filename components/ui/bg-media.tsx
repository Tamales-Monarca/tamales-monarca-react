"use client";

import { cva } from "class-variance-authority";
import React, { useRef, useState } from "react";

import { cn } from "@/lib/utils";

// Make sure this utility exists in your project for combining class names

// Define the type for the variant and type props
type OverlayVariant = "none" | "light" | "dark";
type MediaType = "image" | "video";

// Update the cva call with these types
const backgroundVariants = cva(
	"relative h-screen max-h-[1000px] min-h-[500px] w-full lg:min-h-[600px]",
	{
		variants: {
			overlay: {
				none: "",
				light:
					"before:absolute before:inset-0 before:bg-white before:opacity-30",
				dark: "before:absolute before:inset-0 before:bg-black before:opacity-30",
			},
			type: {
				image: "",
				video: "z-10",
			},
		},
		defaultVariants: {
			overlay: "none",
			type: "image",
		},
	},
);

interface BackgroundMediaProps {
	variant?: OverlayVariant;
	type?: MediaType;
	src: string;
	alt?: string;
	/** Poster image for video backgrounds (also shown under reduced motion). */
	poster?: string;
	/** Extra classes for the outer wrapper (e.g. height overrides). */
	className?: string;
	/** Extra classes for the <img>/<video> element. */
	mediaClassName?: string;
	/** Foreground content rendered above the media and overlay. */
	children?: React.ReactNode;
}

export const BackgroundMedia: React.FC<BackgroundMediaProps> = ({
	variant = "light",
	type = "image",
	src,
	alt = "",
	poster,
	className,
	mediaClassName,
	children,
}) => {
	const [isPlaying, setIsPlaying] = useState(true);
	const mediaRef = useRef<HTMLVideoElement | null>(null);

	const toggleMediaPlay = () => {
		if (type === "video" && mediaRef.current) {
			if (isPlaying) {
				mediaRef.current.pause();
			} else {
				mediaRef.current.play();
			}
			setIsPlaying(!isPlaying);
		}
	};

	const mediaClasses = cn(
		backgroundVariants({ overlay: variant, type }),
		"overflow-hidden before:z-[1]",
		className,
	);

	const renderMedia = () => {
		if (type === "video") {
			return (
				<video
					ref={mediaRef}
					aria-hidden="true"
					muted
					className={cn(
						"pointer-events-none absolute inset-0 h-full w-full object-cover transition-opacity duration-300",
						mediaClassName,
					)}
					poster={poster}
					autoPlay
					loop
					playsInline
				>
					<source src={src} type="video/mp4" />
					Your browser does not support the video tag.
				</video>
			);
		} else {
			return (
				<img
					src={src}
					alt={alt}
					className={cn(
						"absolute inset-0 h-full w-full object-cover",
						mediaClassName,
					)}
					loading="eager"
				/>
			);
		}
	};

	return (
		<div className={mediaClasses}>
			{renderMedia()}
			{children ? (
				<div className="relative z-[2] h-full w-full">{children}</div>
			) : null}
			{type === "video" && (
				<button
					type="button"
					aria-label={isPlaying ? "Pause video" : "Play video"}
					className="absolute right-4 bottom-4 z-[3] rounded-full bg-black/60 px-4 py-2 text-sm text-white backdrop-blur hover:bg-black/75 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
					onClick={toggleMediaPlay}
				>
					{isPlaying ? "Pause" : "Play"}
				</button>
			)}
		</div>
	);
};

export default BackgroundMedia;
