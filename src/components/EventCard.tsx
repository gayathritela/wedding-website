import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, CalendarPlus, Map, Shirt, Clock } from "lucide-react";
import { generateICSFile } from "../utils/calendar";
import { formatDate } from "../utils/dates";
import type { WeddingEvent } from "../data/weddingData";

const EVENT_CONFIG: Record<string, {
  bg: string;
  headerBg: string;
  border: string;
  titleColor: string;
  accentPill: string;
  tilt: number;
}> = {
  "haldi-mehendi":      { bg: "#FFFDF5", headerBg: "linear-gradient(135deg,#FFF9E0,#FCEFC2)", border: "#E8C84A", titleColor: "#7A5C00", accentPill: "bg-amber-100 text-amber-800 border-amber-200",    tilt: -1.5 },
  "engagement-sangeet": { bg: "#FFF5F8", headerBg: "linear-gradient(135deg,#FFE8EF,#FFCCD8)", border: "#D4637A", titleColor: "#8B2241", accentPill: "bg-rose-100 text-rose-800 border-rose-200",        tilt:  1.2 },
  "wedding":            { bg: "#FDF5F0", headerBg: "linear-gradient(135deg,#F9E5DA,#F0C8B5)", border: "#B05030", titleColor: "#6B2737", accentPill: "bg-orange-100 text-orange-900 border-orange-200",   tilt: -1.0 },
  "reception":          { bg: "#F5F8FF", headerBg: "linear-gradient(135deg,#DDE8FF,#BFCFFF)", border: "#5B7AE5", titleColor: "#1E3A8A", accentPill: "bg-indigo-100 text-indigo-800 border-indigo-200",  tilt:  1.5 },
};

const fallback = { bg: "#FAFAF8", headerBg: "linear-gradient(135deg,#F5F0E8,#EDE0C8)", border: "#C9963A", titleColor: "#18181B", accentPill: "bg-gold-100 text-gold-800 border-gold-200", tilt: 0 };

interface EventCardProps {
  event: WeddingEvent;
  index: number;
}

export default function EventCard({ event, index }: EventCardProps) {
  const [calClicked, setCalClicked] = useState(false);
  const cfg = EVENT_CONFIG[event.id] ?? fallback;

  const handleAddToCalendar = () => {
    generateICSFile(event);
    setCalClicked(true);
    setTimeout(() => setCalClicked(false), 2500);
  };

  const isStreamActive =
    event.livestreamUrl &&
    event.livestreamUrl !== "YOUTUBE_LIVE_URL" &&
    event.livestreamUrl !== "ZOOM_OR_STREAM_URL";

  return (
    <motion.div
      initial={{ opacity: 0, y: 28, rotate: 0 }}
      whileInView={{ opacity: 1, y: 0, rotate: cfg.tilt }}
      whileHover={{ rotate: 0, scale: 1.02 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.55, delay: index * 0.08, ease: "easeOut" }}
      className="relative overflow-hidden rounded-2xl group cursor-default"
      style={{
        background: cfg.bg,
        border: `2px solid ${cfg.border}`,
        boxShadow: `0 4px 20px rgba(0,0,0,0.08), 0 1px 3px rgba(0,0,0,0.06), 0 0 0 1px ${cfg.border}22`,
      }}
    >
      {/* Decorative corner top-right */}
      <div
        className="absolute top-0 right-0 w-16 h-16 opacity-30 pointer-events-none"
        style={{
          background: `radial-gradient(circle at top right, ${cfg.border}55, transparent 70%)`,
        }}
        aria-hidden="true"
      />

      {/* Illustrated header band */}
      <div
        className="relative px-5 pt-5 pb-4 flex items-center gap-4"
        style={{ background: cfg.headerBg }}
      >
        <span
          className="text-5xl shrink-0 group-hover:scale-110 transition-transform duration-300 drop-shadow-sm"
          role="img"
          aria-label={event.shortName}
        >
          {event.icon}
        </span>
        <div className="min-w-0">
          <p
            className="font-sans text-[10px] tracking-[0.2em] uppercase font-semibold mb-0.5 opacity-60"
            style={{ color: cfg.titleColor }}
          >
            {event.theme}
          </p>
          <h3
            className="font-serif text-xl sm:text-2xl font-bold leading-tight"
            style={{ color: cfg.titleColor }}
          >
            {event.name}
          </h3>
        </div>

        {/* Gold accent top-right corner stamp */}
        <div
          className="absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center text-[10px] font-bold font-sans shrink-0"
          style={{ background: cfg.border, color: cfg.bg }}
        >
          {String(index + 1).padStart(2, "0")}
        </div>
      </div>

      {/* Gold divider */}
      <div className="h-px mx-5" style={{ background: `linear-gradient(90deg, ${cfg.border}60, ${cfg.border}20)` }} />

      {/* Body */}
      <div className="px-5 py-4">
        <p className="font-sans text-sm text-ink-muted leading-relaxed mb-4">
          {event.description}
        </p>

        {/* Info chips */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          <span className="inline-flex items-center gap-1.5 text-[11px] font-medium px-2.5 py-1 rounded-full bg-white border border-gray-100 text-ink-muted">
            <Clock size={10} className="shrink-0" />
            {formatDate(event.date).split(",")[1]?.trim() ?? formatDate(event.date)}
          </span>
          <span className="inline-flex items-center gap-1.5 text-[11px] font-medium px-2.5 py-1 rounded-full bg-white border border-gray-100 text-ink-muted">
            <MapPin size={10} className="shrink-0" />
            {event.location}
          </span>
          <span className={`inline-flex items-center gap-1.5 text-[11px] font-semibold px-2.5 py-1 rounded-full border ${cfg.accentPill}`}>
            <Shirt size={10} className="shrink-0" />
            {event.dressCode}
          </span>
        </div>

        {/* Divider */}
        <div className="h-px bg-gray-100 mb-3" />

        {/* Actions */}
        <div className="flex flex-wrap gap-2">
          <a
            href={event.mapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[11px] font-semibold text-white hover:-translate-y-px transition-all duration-200 focus:outline-none"
            style={{ background: cfg.border }}
          >
            <Map size={11} />
            Open Map
          </a>

          <button
            onClick={handleAddToCalendar}
            className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[11px] font-semibold border transition-all duration-200 hover:-translate-y-px focus:outline-none ${
              calClicked
                ? "bg-green-50 border-green-200 text-green-700"
                : "bg-white border-gray-200 text-ink-muted hover:border-gray-300 hover:text-ink"
            }`}
          >
            <CalendarPlus size={11} />
            {calClicked ? "Added ✓" : "Add to Calendar"}
          </button>

          {isStreamActive && (
            <a
              href={event.livestreamUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-rose-50 border border-rose-200 text-rose-700 text-[11px] font-semibold hover:bg-rose-500 hover:text-white hover:border-rose-500 hover:-translate-y-px transition-all duration-200"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
              Watch Live
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}
