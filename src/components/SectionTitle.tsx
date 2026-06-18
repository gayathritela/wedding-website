import { motion } from "framer-motion";

interface SectionTitleProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  center?: boolean;
  light?: boolean;
}

export default function SectionTitle({
  eyebrow,
  title,
  subtitle,
  center = true,
  light = false,
}: SectionTitleProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.65, ease: "easeOut" }}
      className={`mb-14 ${center ? "text-center" : ""}`}
    >
      {eyebrow && (
        <div className={`inline-flex items-center gap-3 mb-4 ${center ? "justify-center" : ""}`}>
          <div className={`h-px w-6 ${light ? "bg-rose-300/60" : "bg-rose-400/60"}`} />
          <p className={`font-sans text-[11px] tracking-[0.22em] uppercase font-semibold ${light ? "text-rose-300" : "text-rose-500"}`}>
            {eyebrow}
          </p>
          <div className={`h-px w-6 ${light ? "bg-rose-300/60" : "bg-rose-400/60"}`} />
        </div>
      )}

      {title && (
        <h2
          className={`font-serif font-bold leading-[1.08] tracking-tight ${
            light ? "text-white" : "text-ink"
          }`}
          style={{ fontSize: "clamp(2.4rem, 5vw, 4rem)" }}
        >
          {title}
        </h2>
      )}

      {subtitle && (
        <p
          className={`mt-4 font-sans text-base sm:text-lg leading-relaxed max-w-2xl ${
            center ? "mx-auto" : ""
          } ${light ? "text-white/65" : "text-ink-muted"}`}
        >
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
