// ── Decorative SVG & animated elements ───────────────────────
// Import and drop these into any section for visual flair.

import { motion } from "framer-motion";

// ── Lotus Flower SVG ─────────────────────────────────────────
export function LotusIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Inner petals */}
      <ellipse cx="40" cy="52" rx="6" ry="16" fill="currentColor" opacity="0.9" transform="rotate(-30 40 40)" />
      <ellipse cx="40" cy="52" rx="6" ry="16" fill="currentColor" opacity="0.9" transform="rotate(0 40 40)" />
      <ellipse cx="40" cy="52" rx="6" ry="16" fill="currentColor" opacity="0.9" transform="rotate(30 40 40)" />
      {/* Outer petals */}
      <ellipse cx="40" cy="55" rx="5" ry="18" fill="currentColor" opacity="0.55" transform="rotate(-60 40 40)" />
      <ellipse cx="40" cy="55" rx="5" ry="18" fill="currentColor" opacity="0.55" transform="rotate(60 40 40)" />
      <ellipse cx="40" cy="55" rx="5" ry="18" fill="currentColor" opacity="0.55" transform="rotate(90 40 40)" />
      <ellipse cx="40" cy="55" rx="5" ry="18" fill="currentColor" opacity="0.55" transform="rotate(-90 40 40)" />
      {/* Center */}
      <circle cx="40" cy="40" r="7" fill="currentColor" />
      <circle cx="40" cy="40" r="4" fill="white" opacity="0.3" />
    </svg>
  );
}

// ── Mandala Corner Ornament ───────────────────────────────────
export function MandalaCorner({
  className = "",
  rotate = 0,
}: {
  className?: string;
  rotate?: 0 | 90 | 180 | 270;
}) {
  return (
    <svg
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ transform: `rotate(${rotate}deg)` }}
      aria-hidden="true"
    >
      {/* Concentric arcs */}
      <path d="M0 120 Q60 60 120 0" stroke="currentColor" strokeWidth="0.8" fill="none" opacity="0.8"/>
      <path d="M0 95  Q47 47 95  0" stroke="currentColor" strokeWidth="0.8" fill="none" opacity="0.6"/>
      <path d="M0 70  Q35 35 70  0" stroke="currentColor" strokeWidth="0.8" fill="none" opacity="0.5"/>
      <path d="M0 45  Q22 22 45  0" stroke="currentColor" strokeWidth="0.8" fill="none" opacity="0.4"/>
      <path d="M0 20  Q10 10 20  0" stroke="currentColor" strokeWidth="0.8" fill="none" opacity="0.3"/>
      {/* Dots on curve intersections */}
      <circle cx="20" cy="100" r="2" fill="currentColor" opacity="0.7"/>
      <circle cx="42" cy="78"  r="2" fill="currentColor" opacity="0.7"/>
      <circle cx="65" cy="55"  r="2" fill="currentColor" opacity="0.7"/>
      <circle cx="88" cy="32"  r="2" fill="currentColor" opacity="0.7"/>
      {/* Corner petal curves */}
      <path d="M5 115 Q28 68 8 35"  stroke="currentColor" strokeWidth="0.6" fill="none" opacity="0.5"/>
      <path d="M115 5 Q68 28 35 8"  stroke="currentColor" strokeWidth="0.6" fill="none" opacity="0.5"/>
      {/* Tiny diamond accent */}
      <path d="M10 110 L14 106 L18 110 L14 114 Z" fill="currentColor" opacity="0.6"/>
      <path d="M110 10 L114 6 L118 10 L114 14 Z" fill="currentColor" opacity="0.6"/>
    </svg>
  );
}

// ── Floral Horizontal Divider ─────────────────────────────────
export function FloralDivider({ className = "", light = false }: { className?: string; light?: boolean }) {
  const color = light ? "rgba(255,245,200,0.5)" : "rgba(212,175,55,0.5)";
  const accent = light ? "rgba(255,245,200,0.8)" : "rgba(212,175,55,0.9)";
  return (
    <svg
      viewBox="0 0 400 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      preserveAspectRatio="xMidYMid meet"
      aria-hidden="true"
    >
      {/* Left line */}
      <line x1="0" y1="12" x2="155" y2="12" stroke={color} strokeWidth="0.8"/>
      {/* Left small diamond */}
      <path d="M158 12 L163 7 L168 12 L163 17 Z" fill={color}/>
      {/* Center lotus */}
      <ellipse cx="200" cy="8"  rx="5" ry="9" fill={accent} opacity="0.8" transform="rotate(-20 200 12)"/>
      <ellipse cx="200" cy="8"  rx="5" ry="9" fill={accent} opacity="0.8" transform="rotate(0  200 12)"/>
      <ellipse cx="200" cy="8"  rx="5" ry="9" fill={accent} opacity="0.8" transform="rotate(20 200 12)"/>
      <circle cx="200" cy="12" r="4" fill={accent}/>
      {/* Right small diamond */}
      <path d="M232 12 L237 7 L242 12 L237 17 Z" fill={color}/>
      {/* Right line */}
      <line x1="245" y1="12" x2="400" y2="12" stroke={color} strokeWidth="0.8"/>
    </svg>
  );
}

// ── Floating Petal (animated) ─────────────────────────────────
interface FloatingPetalProps {
  style?: React.CSSProperties;
  color?: string;
  size?: number;
  duration?: number;
  delay?: number;
}

export function FloatingPetal({
  style,
  color = "rgba(212,175,55,0.18)",
  size = 48,
  duration = 7,
  delay = 0,
}: FloatingPetalProps) {
  return (
    <motion.div
      style={{ width: size, height: size, ...style }}
      animate={{
        y:      [0, -22, 0],
        x:      [0, 10,  0],
        rotate: [0, 15,  0],
        opacity:[0.6, 1, 0.6],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      aria-hidden="true"
    >
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="24" cy="34" rx="8" ry="18" fill={color} transform="rotate(-20 24 24)"/>
        <ellipse cx="24" cy="34" rx="8" ry="18" fill={color} transform="rotate(0  24 24)"/>
        <ellipse cx="24" cy="34" rx="8" ry="18" fill={color} transform="rotate(20 24 24)"/>
        <circle  cx="24" cy="24" r="6"  fill={color}/>
      </svg>
    </motion.div>
  );
}

// ── Diya (oil lamp) icon ──────────────────────────────────────
export function DiyaIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
      {/* Flame */}
      <ellipse cx="24" cy="10" rx="4" ry="8" fill="#FFC300" opacity="0.9"/>
      <ellipse cx="24" cy="13" rx="2.5" ry="5" fill="#FF6F00" opacity="0.8"/>
      {/* Wick */}
      <rect x="23" y="17" width="2" height="4" fill="#8B4513" rx="1"/>
      {/* Lamp body */}
      <path d="M10 28 Q12 22 24 22 Q36 22 38 28 Q36 36 24 36 Q12 36 10 28Z" fill="#D4AF37"/>
      <path d="M10 28 Q12 24 24 24 Q36 24 38 28" stroke="#B8960C" strokeWidth="1" fill="none"/>
      {/* Handle */}
      <path d="M38 28 Q44 26 42 32 Q40 35 36 33" stroke="#D4AF37" strokeWidth="2" fill="none" strokeLinecap="round"/>
    </svg>
  );
}

// ── Kolam dot-grid background pattern ────────────────────────
export function KolamBackground({ className = "" }: { className?: string }) {
  return (
    <div
      className={className}
      style={{
        backgroundImage: "radial-gradient(circle, rgba(212,175,55,0.12) 1.5px, transparent 1.5px)",
        backgroundSize: "28px 28px",
      }}
      aria-hidden="true"
    />
  );
}
