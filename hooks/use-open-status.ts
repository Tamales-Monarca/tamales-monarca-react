"use client";

import { type OpenStatus, getOpenStatus } from "@/lib/hours";
import { useSyncExternalStore } from "react";

/**
 * One shared clock for every open-status display on the page: a single
 * 60-second interval runs while at least one component is subscribed.
 */
const UNKNOWN: OpenStatus = { state: "unknown" };
const listeners = new Set<() => void>();
let snapshot: OpenStatus | null = null;
let timer: number | undefined;

function refresh() {
	const next = getOpenStatus(new Date());
	// Keep the same object when nothing changed so React can skip re-renders.
	if (JSON.stringify(next) !== JSON.stringify(snapshot)) snapshot = next;
	for (const listener of listeners) listener();
}

function subscribe(listener: () => void) {
	listeners.add(listener);
	if (timer === undefined) timer = window.setInterval(refresh, 60_000);
	return () => {
		listeners.delete(listener);
		if (listeners.size === 0 && timer !== undefined) {
			window.clearInterval(timer);
			timer = undefined;
		}
	};
}

function getSnapshot(): OpenStatus {
	if (snapshot === null) snapshot = getOpenStatus(new Date());
	return snapshot;
}

/** The static prerender has no clock, so it renders "unknown". */
function getServerSnapshot(): OpenStatus {
	return UNKNOWN;
}

/** Live open/closed status in the restaurant's time zone. */
export function useOpenStatus(): OpenStatus {
	return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
