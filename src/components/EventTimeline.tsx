import { useState } from "react";
import type { CSSProperties } from "react";
import { motion } from "framer-motion";
import { CalendarPlus } from "lucide-react";
import SectionTitle from "./SectionTitle";
import { weddingEvents } from "../data/weddingData";
import { generateICSFile } from "../utils/calendar";
import {
  MehndiIllustration,
  HaldiIllustration,
  SangeetIllustration,
  WeddingIllustration,
  ReceptionIllustration,
} from "./EventIllustrations";

const ILLUSTRATIONS: Record<string, React.ComponentType> = {
  "mehendi":             MehndiIllustration,
  "haldi":               HaldiIllustration,
  "engagement-sangeet":  SangeetIllustration,
  "wedding":             WeddingIllustration,
  "reception":           ReceptionIllustration,
};

const DRESS_CODE_GROUPS: Record<string, { label: string; swatches: string[] }[]> = {
  "haldi":              [{ label: "Sunny yellows & white",       swatches: ["#F9C74F", "#FFD166", "#FFF176", "#FFFFFF"] }],
  "mehendi":            [{ label: "Florals", swatches: ["#F5F5DC", "#EAE0C8", "#D8CAB0", "#FFFFF0"] }],
  "engagement-sangeet": [
    { label: "Bling & glittery", swatches: ["#7B1FA2", "#0D2B6E", "#212121", "#1B5E20"] },
  ],
  "wedding": [
    { label: "Women: pastel pinks", swatches: ["#F8BBD9", "#F48FB1"] },
    { label: "Men: light green",    swatches: ["#A5D6A7", "#C8E6C9"] },
  ],
  "reception":          [{ label: "Evening glam", swatches: ["#C0C0C0", "#9E9E9E", "#212121", "#8D6E63"] }],
};

const EVENT_ACCENT: Record<string, { circle: string; name: string; date: string }> = {
  "haldi":              { circle: "#FFF9C4", name: "#7A5200",  date: "#B8850A" },
  "mehendi":            { circle: "#DCEDC8", name: "#1B5E20",  date: "#3D8B37" },
  "engagement-sangeet": { circle: "#FCE4EC", name: "#8B2241",  date: "#C2185B" },
  "wedding":            { circle: "#FFCDD2", name: "#6B2737",  date: "#9B2C45" },
  "reception":          { circle: "#BBDEFB", name: "#1E3A8A",  date: "#1E3A8A" },
};

function formatEventDate(isoDate: string) {
  const d = new Date(isoDate + "T00:00:00");
  return { day: d.getDate(), month: d.toLocaleString("en-US", { month: "long" }).toUpperCase() };
}

function WeddingCalendarButton() {
  const [clicked, setClicked] = useState(false);
  const weddingEvent = weddingEvents.find((e) => e.id === "wedding");
  return (
    <button
      onClick={() => { if (!weddingEvent) return; generateICSFile(weddingEvent); setClicked(true); setTimeout(() => setClicked(false), 2500); }}
      className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-semibold border transition-all duration-200 hover:-translate-y-0.5"
      style={clicked
        ? { background: "#f0fdf4", borderColor: "#86efac", color: "#15803d" }
        : { background: "white", borderColor: "#C9963A55", color: "#6B2737" }}
    >
      <CalendarPlus size={14} />
      {clicked ? "Added to Calendar ✓" : "Add Wedding Day to Calendar"}
    </button>
  );
}

function EventRow({ event, index }: { event: typeof weddingEvents[0]; index: number }) {
  const accent  = EVENT_ACCENT[event.id]  ?? EVENT_ACCENT["wedding"];
  const dressGroups = DRESS_CODE_GROUPS[event.id] ?? [];
  const Illustration = ILLUSTRATIONS[event.id];
  const { day, month } = formatEventDate(event.date);
  const imageLeft = index % 2 === 0;

  const circleSz = "clamp(130px, 22vw, 190px)";

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-16px" }}
      transition={{ duration: 0.5, delay: index * 0.07 }}
    >
      {/* Single layout — direction flips for alternating, works at every width */}
      <div style={{
        display: "flex",
        flexDirection: imageLeft ? "row" : "row-reverse",
        alignItems: "center",
        gap: "clamp(14px, 3.5vw, 36px)",
        padding: "clamp(18px, 4vw, 36px) 0",
      }}>

        {/* ── Circular illustration ── */}
        <div style={{ flexShrink: 0, display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
          <div style={{
            width: circleSz,
            height: circleSz,
            borderRadius: "50%",
            overflow: "hidden",
            position: "relative",
            flexShrink: 0,
            background: accent.circle,
            border: `1.5px solid ${accent.date}22`,
            boxShadow: `0 6px 24px ${accent.date}28, 0 2px 8px rgba(0,0,0,0.08)`,
          }}>
            {Illustration && <Illustration />}
          </div>
          <p style={{
            fontSize: "clamp(8px, 1.8vw, 10px)",
            color: accent.date,
            fontFamily: "inherit",
            fontWeight: 600,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            textAlign: "center",
            whiteSpace: "nowrap",
          }}>
            {event.theme}
          </p>
        </div>

        {/* ── Text block ── */}
        <div style={{
          flex: 1,
          minWidth: 0,
          textAlign: imageLeft ? "left" : "right",
        }}>
          {/* Event name */}
          <p style={{
            fontFamily: "var(--font-accent, Georgia, serif)",
            fontStyle: "italic",
            fontSize: "clamp(1rem, 3.8vw, 2.2rem)",
            color: accent.name,
            lineHeight: 1.1,
            marginBottom: "clamp(4px, 1vw, 8px)",
          }}>
            {event.name}
          </p>

          {/* Date */}
          <div style={{
            display: "flex",
            alignItems: "baseline",
            gap: "clamp(4px, 1vw, 8px)",
            justifyContent: imageLeft ? "flex-start" : "flex-end",
            marginBottom: "clamp(2px, 0.5vw, 6px)",
          }}>
            <span style={{
              fontWeight: 700,
              fontSize: "clamp(1.3rem, 4.5vw, 2.8rem)",
              color: accent.date,
              lineHeight: 1,
            }}>{day}</span>
            <span style={{
              fontWeight: 600,
              fontSize: "clamp(9px, 2vw, 13px)",
              color: accent.date,
              letterSpacing: "0.18em",
            }}>{month}</span>
          </div>

          {/* Location */}
          <p style={{
            fontSize: "clamp(8px, 1.8vw, 11px)",
            color: "#A1A1AA",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            fontWeight: 500,
            marginBottom: "clamp(4px, 1vw, 8px)",
          }}>
            {event.location}
          </p>

          {/* Description */}
          <p style={{
            fontFamily: "var(--font-accent, Georgia, serif)",
            fontSize: "clamp(0.75rem, 2.2vw, 0.95rem)",
            color: "#6B5A4E",
            lineHeight: 1.55,
            marginBottom: "clamp(4px, 1vw, 10px)",
            ...(imageLeft ? {} : { marginLeft: "auto" }),
            maxWidth: "clamp(140px, 40vw, 320px)",
          }}>
            {event.description}
          </p>

          {/* Dress code */}
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "4px 10px", justifyContent: imageLeft ? "flex-start" : "flex-end" }}>
            <span style={{ fontFamily: "var(--font-accent, Georgia, serif)", fontSize: "clamp(9px, 1.8vw, 11px)", fontWeight: 600, color: accent.date }}>Wear:</span>
            {dressGroups.map((group) => (
              <div key={group.label} style={{ display: "flex", alignItems: "center", gap: 4, flexWrap: "nowrap" }}>
                <span style={{ fontFamily: "var(--font-accent, Georgia, serif)", fontSize: "clamp(9px, 1.8vw, 11px)", color: "#6B5A4E", whiteSpace: "nowrap" }}>{group.label}</span>
                <div style={{ display: "flex", gap: 3 }}>
                  {group.swatches.map((c) => (
                    <span key={c} style={{
                      display: "inline-block",
                      width: "clamp(9px, 2vw, 12px)",
                      height: "clamp(9px, 2vw, 12px)",
                      borderRadius: "50%",
                      background: c,
                      border: "1px solid rgba(255,255,255,0.6)",
                      boxShadow: "0 1px 3px rgba(0,0,0,0.12)",
                      flexShrink: 0,
                    }} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Divider */}
      {index < weddingEvents.length - 1 && (
        <div style={{ height: 1, background: "linear-gradient(90deg, transparent, rgba(201,150,58,0.25), transparent)" }} />
      )}
    </motion.div>
  );
}

export default function EventTimeline() {
  return (
    <section id="events" className="relative overflow-hidden" style={{ padding: "clamp(40px, 8vw, 80px) 0", background: "#FAF7F4" }}>

      {/* Background — always visible at every size */}
      <div
        className="responsive-art-bg absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          "--bg-mobile": "url('/assets/background/bg-mobile.png')",
          "--bg-desktop": "url('/assets/background/bg-mobile.png')",
          "--bg-mobile-position": "center top",
          "--bg-desktop-position": "center top",
          "--bg-desktop-size": "cover",
        } as CSSProperties}
      >
        <div className="absolute inset-0" style={{ background: "rgba(255,248,240,0.25)" }} />
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: "radial-gradient(circle, #C9963A 1px, transparent 1px)",
          backgroundSize: "40px 40px",
          opacity: 0.025,
        }} />
        {/* Fade top */}
        <div className="absolute top-0 left-0 right-0 h-32 pointer-events-none"
          style={{ background: "linear-gradient(to bottom, #FAF7F4, transparent)" }} />
        {/* Fade bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none"
          style={{ background: "linear-gradient(to top, #FAF7F4, transparent)" }} />
      </div>

      <div className="relative" style={{ maxWidth: 760, margin: "0 auto", padding: "0 clamp(16px, 5vw, 40px)" }}>
        <div className="[&_h2]:text-maroon">
          <SectionTitle
            eyebrow="Save the Dates"
            title="The Wedding Week"
          />
        </div>
        <p className="text-center font-accent italic text-sm -mt-10 mb-2" style={{ color: "#6B5A4E" }}>
          The story started with us. The celebration starts with you.
        </p>

        <div style={{ marginTop: "clamp(12px, 3vw, 24px)" }}>
          {weddingEvents.map((event, index) => (
            <EventRow key={event.id} event={event} index={index} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12, marginTop: "clamp(24px, 5vw, 40px)" }}
        >
          <WeddingCalendarButton />
          <p className="font-sans text-xs text-ink-subtle">All times in Indian Standard Time (IST, UTC+5:30)</p>
        </motion.div>
      </div>
    </section>
  );
}
