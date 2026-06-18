import { useMemo } from "react";
import type { CSSProperties } from "react";
import { motion } from "framer-motion";
import { Calendar, PlayCircle } from "lucide-react";
import Countdown from "./Countdown";
import { coupleConfig, weddingEvents } from "../data/weddingData";

// ── Floating petals ────────────────────────────────────────────
function FloatingPetals() {
  const petals = useMemo(() =>
    Array.from({ length: 22 }, (_, i) => ({
      id: i,
      left: `${3 + Math.random() * 94}%`,
      delay: `${Math.random() * 12}s`,
      duration: `${10 + Math.random() * 10}s`,
      size: 7 + Math.random() * 10,
      color: ["#F5C5CB", "#F0A8B0", "#E8899A", "#FAD4DC", "#EC9AAA", "#F2B8C4"][i % 6],
      rotate: Math.random() * 360,
    })), []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-10" aria-hidden="true">
      {petals.map((p) => (
        <div key={p.id} style={{ position: "absolute", left: p.left, top: "-30px" }}>
          <div style={{
            animation: `petal-sway ${(parseFloat(p.duration) * 0.6).toFixed(1)}s ease-in-out infinite, petal-fall ${p.duration} ${p.delay} linear infinite`,
          }}>
            <svg width={p.size} height={p.size * 1.5} viewBox="0 0 10 15">
              <ellipse cx="5" cy="7.5" rx="4.5" ry="7" fill={p.color} opacity="0.8"
                transform={`rotate(${p.rotate} 5 7.5)`} />
            </svg>
          </div>
        </div>
      ))}
    </div>
  );
}

// ── Animated bokeh blobs ───────────────────────────────────────
function BokehBlobs() {
  const blobs = useMemo(() => [
    { x: "10%",  y: "15%", size: 220, color: "rgba(139,26,58,0.10)",  dur: 7  },
    { x: "80%",  y: "10%", size: 180, color: "rgba(196,154,58,0.09)", dur: 9  },
    { x: "70%",  y: "70%", size: 260, color: "rgba(139,26,58,0.07)",  dur: 11 },
    { x: "15%",  y: "65%", size: 200, color: "rgba(240,168,176,0.12)",dur: 8  },
    { x: "50%",  y: "40%", size: 150, color: "rgba(196,154,58,0.06)", dur: 13 },
  ], []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-[2] max-w-full" aria-hidden="true">
      {blobs.map((b, i) => (
        <motion.div
          key={i}
          style={{
            position: "absolute",
            left: b.x,
            top: b.y,
            width: b.size,
            height: b.size,
            borderRadius: "50%",
            background: `radial-gradient(circle, ${b.color} 0%, transparent 70%)`,
            transform: "translate(-50%, -50%)",
          }}
          animate={{ scale: [1, 1.25, 1], opacity: [0.6, 1, 0.6] }}
          transition={{ duration: b.dur, repeat: Infinity, ease: "easeInOut", delay: i * 1.2 }}
        />
      ))}
    </div>
  );
}

// ── Kolam dot overlay ──────────────────────────────────────────
function KolamPattern() {
  return (
    <div className="absolute inset-0 pointer-events-none z-[1]" aria-hidden="true"
      style={{
        backgroundImage: "radial-gradient(circle, #8B1A3A 1px, transparent 1px)",
        backgroundSize: "32px 32px",
        opacity: 0.04,
      }} />
  );
}

// ── Gold ornamental rule ───────────────────────────────────────
function GoldRule() {
  return (
    <div className="flex items-center justify-center gap-2 my-3" aria-hidden="true">
      <div className="w-2 h-2 rounded-full" style={{ background: "#C49A3A" }} />
      <div className="h-px w-20 sm:w-32" style={{ background: "linear-gradient(90deg, transparent, #C49A3A, transparent)" }} />
      <div className="w-1.5 h-1.5 rounded-full" style={{ background: "#C49A3A", opacity: 0.5 }} />
      <div className="h-px w-20 sm:w-32" style={{ background: "linear-gradient(90deg, transparent, #C49A3A, transparent)" }} />
      <div className="w-2 h-2 rounded-full" style={{ background: "#C49A3A" }} />
    </div>
  );
}

// ── Main Hero ──────────────────────────────────────────────────
export default function Hero() {
  const weddingEvent = weddingEvents.find((e) => e.id === "wedding") ?? null;
  const handleScroll = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });

  return (
    <section
      id="hero"
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden"
      style={{ minHeight: "100dvh" }}
    >

      {/* ── Background image ── */}
      <div
        className="responsive-art-bg absolute inset-0 z-0 overflow-hidden"
        aria-hidden="true"
        style={{
          "--bg-mobile": "url('/assets/background/hero-bg-mobile.png')",
          "--bg-desktop": "url('/assets/background/hero-bg.png')",
          "--bg-mobile-position": "center top",
          "--bg-desktop-position": "center top",
          "--bg-desktop-size": "contain",
        } as CSSProperties}
      >
        {/* Base cream wash */}
        <div className="absolute inset-0 sm:hidden" style={{ background: "rgba(255,248,240,0.32)" }} />
        <div className="absolute inset-0 hidden sm:block" style={{ background: "rgba(255,248,240,0.45)" }} />
        {/* Top vignette — darkens edges so centre text pops */}
        <div className="absolute inset-0" style={{
          background: "radial-gradient(ellipse 80% 70% at 50% 50%, transparent 30%, rgba(120,40,60,0.12) 100%)",
        }} />
        {/* Bottom gradient fade to page bg */}
        <div className="absolute bottom-0 left-0 right-0 h-56"
          style={{ background: "linear-gradient(to bottom, transparent 0%, rgba(250,247,244,0.7) 60%, #FAF7F4 100%)" }} />
      </div>

      <KolamPattern />
      <BokehBlobs />
      <FloatingPetals />

      {/* ── Frosted glass content card ── */}
      <div className="relative z-20 text-center px-6 sm:px-10 max-w-2xl mx-auto w-full pt-32 pb-14 sm:pt-40 sm:pb-16">


        {/* Tagline */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
          className="relative font-accent italic mt-10 mb-5 tracking-wide mx-auto flex flex-wrap items-center justify-center gap-x-2 gap-y-1 font-semibold"
          style={{ fontSize: "clamp(1rem, 2.2vw, 1.2rem)", color: "#3D2B1F", maxWidth: "480px" }}
        >
          <span>Dosa found Biryani, and now we are getting married. ❤️</span>
        </motion.div>

        {/* Names */}
        <div className="relative">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 0.8, 0.36, 1] }}
            className="font-display font-semibold leading-tight"
            style={{
              fontSize: "clamp(3.5rem, 11vw, 6.5rem)",
              color: "#8B1A3A",
              textShadow: "0 2px 20px rgba(139,26,58,0.20), 0 0 60px rgba(139,26,58,0.08)",
            }}
          >
            {coupleConfig.groom.name}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 16, delay: 0.7 }}
            className="font-accent italic"
            style={{ fontSize: "clamp(1.8rem, 5vw, 3rem)", color: "#C49A3A", lineHeight: 1.1 }}
          >
            &amp;
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: [0.22, 0.8, 0.36, 1] }}
            className="font-display font-semibold leading-tight"
            style={{
              fontSize: "clamp(3.5rem, 11vw, 6.5rem)",
              color: "#8B1A3A",
              textShadow: "0 2px 20px rgba(139,26,58,0.20), 0 0 60px rgba(139,26,58,0.08)",
            }}
          >
            {coupleConfig.bride.name}
          </motion.h1>

          {/* Animated glow ring behind names */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: "radial-gradient(ellipse 60% 40% at 50% 50%, rgba(196,154,58,0.12) 0%, transparent 70%)",
            }}
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            aria-hidden="true"
          />
        </div>

        {/* Gold rule */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0.2 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.9, delay: 0.9, ease: "easeOut" }}
        >
          <GoldRule />
        </motion.div>

        {/* Date */}
        <motion.p
          initial={{ opacity: 0, letterSpacing: "0.05em" }}
          animate={{ opacity: 1, letterSpacing: "0.25em" }}
          transition={{ duration: 0.9, delay: 1.0 }}
          className="font-body tracking-[0.25em] uppercase text-xs sm:text-sm font-light mb-5"
          style={{ color: "#6B5A4E" }}
        >
          16.07.2026
        </motion.p>

        {/* Countdown */}
        {weddingEvent && (
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.15 }}
            className="mb-8"
          >
            <Countdown event={weddingEvent} light={true} />
          </motion.div>
        )}

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.35 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-4"
        >
          <motion.button
            onClick={() => handleScroll("events")}
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full font-body font-semibold text-xs text-white transition-all duration-300"
            style={{ background: "#8B1A3A", boxShadow: "0 4px 24px rgba(139,26,58,0.40)" }}
          >
            <Calendar size={11} />View Events
          </motion.button>
          <motion.button
            onClick={() => handleScroll("livestream")}
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full font-body font-semibold text-xs transition-all duration-300"
            style={{
              border: "1.5px solid #C49A3A",
              color: "#8B1A3A",
              background: "rgba(255,255,255,0.55)",
              backdropFilter: "blur(8px)",
            }}
          >
            <PlayCircle size={11} />Watch Live
          </motion.button>
        </motion.div>

        {/* Invite line */}
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.55 }}
          className="relative font-accent italic text-center mx-auto"
          style={{ fontSize: "clamp(0.95rem, 2.2vw, 1.2rem)", color: "#6B5A4E", lineHeight: 1.65, maxWidth: "380px" }}
        >
          From our favourite memories to this beautiful new beginning,<br />we would love for you to celebrate with us.
        </motion.p>

      </div>

    </section>
  );
}
