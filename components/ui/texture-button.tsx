"use client";

import { cva } from "class-variance-authority";
import { Slot } from "radix-ui";
import * as React from "react";

import { cn } from "@/lib/utils";

const buttonVariantsOuter = cva("", {
	variants: {
		variant: {
			primary:
				"w-full border border-[1px] border-black/10 bg-gradient-to-b from-black/70 to-black p-[1px] transition duration-300 ease-in-out",
			accent:
				"w-full border-[1px] border-black/10 bg-gradient-to-b from-chile-300/90 to-chile-600 p-[1px] transition duration-300 ease-in-out",
			brand:
				"w-full border-[1px] border-black/10 bg-gradient-to-b from-marigold-200 to-marigold-600 p-[1px] transition duration-300 ease-in-out",
			destructive:
				"w-full border-[1px] border-black/10 bg-gradient-to-b from-red-300/90 to-red-500 p-[1px] transition duration-300 ease-in-out",
			secondary:
				"w-full border-[1px] border-black/20 bg-white/50 p-[1px] transition duration-300 ease-in-out",
			minimal:
				"group/texture-button w-full border-[1px] border-black/20 bg-white/50 to-white p-[1px] hover:bg-gradient-to-t hover:from-neutral-100 active:bg-neutral-200",
			icon: "group/texture-button rounded-full border border-black/10 bg-white/50 to-white p-[1px] hover:bg-gradient-to-t hover:from-neutral-100 active:bg-neutral-200",
		},
		size: {
			sm: "rounded-[6px]",
			default: "rounded-[12px]",
			lg: "rounded-[12px]",
			icon: "rounded-full",
		},
	},
	defaultVariants: {
		variant: "primary",
		size: "default",
	},
});

const innerDivVariants = cva(
	"text-muted-foreground flex h-full w-full items-center justify-center",
	{
		variants: {
			variant: {
				primary:
					"gap-2 bg-gradient-to-b from-neutral-800 to-black text-sm text-white/90 transition duration-300 ease-in-out hover:from-stone-800 hover:to-neutral-800/70 active:bg-gradient-to-b active:from-black active:to-black",
				accent:
					"gap-2 bg-gradient-to-b from-chile-500 to-chile-700 text-sm text-white transition duration-300 ease-in-out hover:bg-gradient-to-b hover:from-chile-500/90 hover:to-chile-700/90 active:bg-gradient-to-b active:from-chile-600 active:to-chile-800",
				brand:
					"gap-2 bg-gradient-to-b from-marigold-400 to-marigold-500 text-sm font-semibold text-carbon-900 transition duration-300 ease-in-out hover:bg-gradient-to-b hover:from-marigold-300 hover:to-marigold-500 active:bg-gradient-to-b active:from-marigold-500 active:to-marigold-600",
				destructive:
					"gap-2 bg-gradient-to-b from-red-400/60 to-red-500/60 text-sm text-white/90 transition duration-300 ease-in-out hover:bg-gradient-to-b hover:from-red-400/70 hover:to-red-600/70 active:bg-gradient-to-b active:from-red-400/80 active:to-red-600/80",
				secondary:
					"gap-2 bg-gradient-to-b from-neutral-100/80 to-neutral-200/50 text-sm transition duration-300 ease-in-out hover:bg-gradient-to-b hover:from-neutral-200/40 hover:to-neutral-300/60 active:bg-gradient-to-b active:from-neutral-200/60 active:to-neutral-300/70",
				minimal:
					"gap-2 bg-gradient-to-b from-white to-neutral-50/50 text-sm transition duration-300 ease-in-out group-hover/texture-button:bg-gradient-to-b group-hover/texture-button:from-neutral-50/50 group-hover/texture-button:to-neutral-100/60 group-active/texture-button:bg-gradient-to-b group-active/texture-button:from-neutral-100/60 group-active/texture-button:to-neutral-100/90",
				icon: "rounded-full bg-gradient-to-b from-white to-neutral-50/50 group-active/texture-button:bg-neutral-200",
			},
			size: {
				sm: "rounded-[4px] px-4 py-1 text-xs",
				default: "rounded-[10px] px-4 py-2 text-sm",
				lg: "rounded-[10px] px-4 py-2 text-base",
				icon: "rounded-full p-1",
			},
		},
		defaultVariants: {
			variant: "primary",
			size: "default",
		},
	},
);

export interface UnifiedButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	variant?:
		| "primary"
		| "secondary"
		| "accent"
		| "brand"
		| "destructive"
		| "minimal"
		| "icon";
	size?: "default" | "sm" | "lg" | "icon";
	asChild?: boolean;
	/** Classes for the inner texture face, e.g. "rounded-full" to match a pill shell. */
	innerClassName?: string;
}

const TextureButton = React.forwardRef<HTMLButtonElement, UnifiedButtonProps>(
	(
		{
			children,
			variant = "primary",
			size = "default",
			asChild = false,
			className,
			innerClassName,
			...props
		},
		ref,
	) => {
		const outer = cn(
			"inline-flex focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none",
			buttonVariantsOuter({ variant, size }),
			className,
		);
		const inner = cn(innerDivVariants({ variant, size }), innerClassName);

		// asChild: render the child element (e.g. <a>) as the outer shell and
		// wrap the child's own children with the inner texture span.
		if (asChild && React.isValidElement(children)) {
			const child = children as React.ReactElement<{
				children?: React.ReactNode;
			}>;
			return (
				<Slot.Root
					className={outer}
					ref={ref as React.Ref<HTMLElement>}
					{...(props as React.HTMLAttributes<HTMLElement>)}
				>
					{React.cloneElement(
						child,
						undefined,
						<span className={inner}>{child.props.children}</span>,
					)}
				</Slot.Root>
			);
		}

		return (
			<button className={outer} ref={ref} {...props}>
				<span className={inner}>{children}</span>
			</button>
		);
	},
);

TextureButton.displayName = "TextureButton";

export { TextureButton };

// export default TextureButton
