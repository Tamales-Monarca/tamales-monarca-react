/**
 * Opening-hours logic shared by the header, hero and visit sections.
 * Pure functions only; the React hook lives in hooks/use-open-status.ts.
 */

import type { Lang } from "@/lib/i18n";
import { type DayOfWeek, type OpeningHours, site } from "@/lib/site";

/** The restaurant's local time zone (Emporia, KS). */
export const RESTAURANT_TZ = "America/Chicago";

/** Index matches Date#getDay() (0 = Sunday). */
export const DAYS: readonly DayOfWeek[] = [
	"Sunday",
	"Monday",
	"Tuesday",
	"Wednesday",
	"Thursday",
	"Friday",
	"Saturday",
];

export type OpenStatus =
	| { state: "unknown" }
	| { state: "open"; today: DayOfWeek; closes: string }
	| {
			state: "closed";
			today: DayOfWeek;
			/** Next opening time, if any hours are configured. */
			opens?: string;
			when?: "today" | "tomorrow" | "later";
			/** Weekday of the next opening. */
			opensDay?: DayOfWeek;
	  };

export function toMinutes(hhmm: string) {
	const [h, m] = hhmm.split(":").map(Number);
	return h * 60 + m;
}

/** "20:00" -> "8 PM" / "8 p. m."; "10:30" -> "10:30 AM" / "10:30 a. m." */
export function formatClock(hhmm: string, lang: Lang) {
	const [h, m] = hhmm.split(":").map(Number);
	const hour12 = h % 12 === 0 ? 12 : h % 12;
	const mins = m ? `:${String(m).padStart(2, "0")}` : "";
	const pm = h >= 12;
	if (lang === "es") return `${hour12}${mins} ${pm ? "p. m." : "a. m."}`;
	return `${hour12}${mins} ${pm ? "PM" : "AM"}`;
}

/** All opening ranges for a weekday, earliest first (supports split shifts). */
export function hoursForDay(day: DayOfWeek): OpeningHours[] {
	return (site.hours as readonly OpeningHours[])
		.filter((h) => h.days.includes(day))
		.sort((a, b) => toMinutes(a.opens) - toMinutes(b.opens));
}

/** Current weekday + minutes since midnight in the restaurant's time zone. */
export function restaurantNow(date: Date) {
	const parts = new Intl.DateTimeFormat("en-US", {
		timeZone: RESTAURANT_TZ,
		weekday: "long",
		hour: "2-digit",
		minute: "2-digit",
		hourCycle: "h23",
	}).formatToParts(date);
	const get = (type: string) => parts.find((p) => p.type === type)?.value ?? "";
	const found = DAYS.indexOf(get("weekday") as DayOfWeek);
	const dayIndex = found < 0 ? date.getDay() : found;
	return {
		dayIndex,
		day: DAYS[dayIndex],
		minutes: Number(get("hour")) * 60 + Number(get("minute")),
	};
}

export function getOpenStatus(date: Date): OpenStatus {
	const { dayIndex, day, minutes } = restaurantNow(date);
	const today = hoursForDay(day);

	for (const h of today) {
		if (minutes >= toMinutes(h.opens) && minutes < toMinutes(h.closes)) {
			return { state: "open", today: day, closes: h.closes };
		}
	}
	const laterToday = today.find((h) => toMinutes(h.opens) > minutes);
	if (laterToday) {
		return {
			state: "closed",
			today: day,
			opens: laterToday.opens,
			when: "today",
		};
	}
	for (let offset = 1; offset <= 7; offset++) {
		const nextDay = DAYS[(dayIndex + offset) % 7];
		const next = hoursForDay(nextDay)[0];
		if (next) {
			return {
				state: "closed",
				today: day,
				opens: next.opens,
				when: offset === 1 ? "tomorrow" : "later",
				opensDay: nextDay,
			};
		}
	}
	return { state: "closed", today: day };
}
