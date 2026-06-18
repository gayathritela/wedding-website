// ── Date formatting utilities ─────────────────────────────────

/**
 * Format an ISO date string to a long human-readable format.
 * e.g. "2026-06-15" → "Monday, 15 June 2026"
 */
export function formatDate(dateStr: string): string {
  const date = new Date(dateStr + "T00:00:00");
  return date.toLocaleDateString("en-IN", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

/**
 * Format an ISO date string to a short month-day format.
 * e.g. "2026-06-15" → "June 15"
 */
export function formatShortDate(dateStr: string): string {
  const date = new Date(dateStr + "T00:00:00");
  return date.toLocaleDateString("en-IN", {
    month: "long",
    day: "numeric",
  });
}

/**
 * Format an ISO date to a compact card-header format.
 * e.g. "2026-06-15" → "15 Jun"
 */
export function formatCardDate(dateStr: string): string {
  const date = new Date(dateStr + "T00:00:00");
  return date.toLocaleDateString("en-IN", { day: "2-digit", month: "short" });
}

// ── Countdown helpers ─────────────────────────────────────────

export interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isPast: boolean;
}

/**
 * Calculate the time remaining until a given date + ISO time string.
 * timeISO format: "T200000" (T + HHMMSS)
 */
export function getTimeLeft(dateStr: string, timeISO: string): TimeLeft {
  const raw = timeISO.replace("T", "");
  const h = parseInt(raw.slice(0, 2), 10);
  const m = parseInt(raw.slice(2, 4), 10);
  const s = parseInt(raw.slice(4, 6), 10);

  // Build target as a local date (browser uses system/local timezone for date parsing)
  const target = new Date(dateStr + "T00:00:00");
  target.setHours(h, m, s, 0);

  const diff = target.getTime() - Date.now();

  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true };
  }

  return {
    days: Math.floor(diff / 86_400_000),
    hours: Math.floor((diff % 86_400_000) / 3_600_000),
    minutes: Math.floor((diff % 3_600_000) / 60_000),
    seconds: Math.floor((diff % 60_000) / 1_000),
    isPast: false,
  };
}

// ── Next-event helper ─────────────────────────────────────────

import type { WeddingEvent } from "../data/weddingData";

/**
 * Return the next upcoming event from the list, or null if all are past.
 */
export function getNextEvent(events: WeddingEvent[]): WeddingEvent | null {
  const now = new Date();
  const upcoming = events
    .filter((e) => new Date(e.date + "T00:00:00") >= now)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  return upcoming[0] ?? null;
}
