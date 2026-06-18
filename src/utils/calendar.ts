import type { WeddingEvent } from "../data/weddingData";

// ── ICS (iCalendar) file generator ────────────────────────────
// Generates and downloads a .ics calendar file for the given event.
// Timezone: Asia/Kolkata (IST, UTC+5:30)

/**
 * Escape special characters in iCalendar text fields.
 */
function escapeICS(str: string): string {
  return str
    .replace(/\\/g, "\\\\")
    .replace(/;/g, "\\;")
    .replace(/,/g, "\\,")
    .replace(/\n/g, "\\n");
}

/**
 * Build the DTSTART / DTEND strings for a given date + ICS time token.
 * timeISO format: "T180000"
 */
function buildICSDateTime(dateStr: string, timeISO: string): string {
  return dateStr.replace(/-/g, "") + timeISO;
}

/**
 * Download an .ics file for the supplied wedding event.
 * Safe to call from a click handler.
 */
export function generateICSFile(event: WeddingEvent): void {
  const dtStart = buildICSDateTime(event.date, event.timeISO);
  const dtEnd   = buildICSDateTime(event.date, event.endTimeISO);
  const uid     = `${event.id}-${dtStart}@weddingwebsite`;

  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Wedding Website//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `DTSTART;TZID=Asia/Kolkata:${dtStart}`,
    `DTEND;TZID=Asia/Kolkata:${dtEnd}`,
    `SUMMARY:${escapeICS(event.name)}`,
    `DESCRIPTION:${escapeICS(event.description)}`,
    `LOCATION:${escapeICS(event.location)}`,
    `URL:${escapeICS(event.mapUrl)}`,
    "STATUS:CONFIRMED",
    `UID:${uid}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ];

  const icsContent = lines.join("\r\n");

  const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
  const url  = URL.createObjectURL(blob);

  const anchor = document.createElement("a");
  anchor.href     = url;
  anchor.download = `${event.id}-wedding.ics`;
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
  URL.revokeObjectURL(url);
}
