import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { getTimeLeft, type TimeLeft } from "../utils/dates";
import type { WeddingEvent } from "../data/weddingData";

interface CountdownProps {
  event: WeddingEvent;
  light?: boolean; // true = dark text for light backgrounds
}

export default function Countdown({ event, light = true }: CountdownProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(getTimeLeft(event.date, event.timeISO));

  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(getTimeLeft(event.date, event.timeISO)), 1000);
    return () => clearInterval(timer);
  }, [event.date, event.timeISO]);

  const textMain  = light ? "rgba(107,39,55,0.9)"  : "rgba(255,255,255,0.95)";
  const textLabel = light ? "rgba(139,94,40,0.65)"  : "rgba(255,255,255,0.38)";
  const boxBg     = light ? "rgba(107,39,55,0.09)"  : "rgba(255,255,255,0.08)";
  const boxBorder = light ? "rgba(201,150,58,0.30)"  : "rgba(255,255,255,0.12)";
  const sepColor  = light ? "rgba(201,150,58,0.40)"  : "rgba(255,255,255,0.22)";

  if (timeLeft.isPast) {
    return (
      <div className="text-center py-4">
        <p className="font-serif text-2xl italic" style={{ color: textMain }}>The celebration has begun! 🎊</p>
      </div>
    );
  }

  const units = [
    { label: "Days",    value: timeLeft.days    },
    { label: "Hours",   value: timeLeft.hours   },
    { label: "Minutes", value: timeLeft.minutes },
    { label: "Seconds", value: timeLeft.seconds },
  ] as const;

  return (
    <div className="text-center">
      <p className="font-sans text-[11px] tracking-[0.2em] uppercase mb-5 font-medium"
        style={{ color: textLabel }}>
        Counting down to forever
      </p>

      <div className="flex items-end justify-center gap-3 sm:gap-5">
        {units.map(({ label, value }, i) => (
          <div key={label} className="flex items-end">
            <motion.div
              key={`${label}-${value}`}
              initial={{ opacity: 0.5, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
              className="flex flex-col items-center"
            >
              <div
                className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center overflow-hidden"
                style={{ background: boxBg, border: `1px solid ${boxBorder}` }}
              >
                <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent" />
                <span className="font-serif text-2xl sm:text-3xl font-bold tabular-nums relative z-10"
                  style={{ color: textMain }}>
                  {String(value).padStart(2, "0")}
                </span>
              </div>
              <span className="mt-2 font-sans text-[10px] sm:text-xs tracking-widest uppercase font-medium"
                style={{ color: textLabel }}>
                {label}
              </span>
            </motion.div>

            {i < 3 && (
              <span className="font-serif text-xl font-light mb-5 mx-0.5 leading-none select-none"
                style={{ color: sepColor }}>:</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
