import { useState } from "react";
import { motion } from "framer-motion";
import { coupleConfig } from "../data/weddingData";


function CouplePhoto() {
  const [imgError, setImgError] = useState(false);

  return (
    <div className="relative">
      {/* Decorative frame blobs */}
      <div
        className="absolute -top-4 -left-4 w-full h-full rounded-3xl pointer-events-none"
        style={{ background: "linear-gradient(135deg, #F9D0D8, #FAE8C8)", opacity: 0.4 }}
        aria-hidden="true"
      />
      <div
        className="relative rounded-3xl overflow-hidden shadow-card-hover"
        style={{ aspectRatio: "3/4" }}
      >
        {imgError ? (
          <div
            className="w-full h-full flex flex-col items-center justify-center gap-4 min-h-[420px]"
            style={{ background: "linear-gradient(155deg, #F9D0D8, #FAE8C8)" }}
          >
            <span className="text-6xl opacity-50">🪷</span>
            <div className="text-center px-6">
              <p className="font-serif italic text-white/70 text-lg">Our photo</p>
              <p className="font-sans text-xs text-white/50 mt-1">
                Add a couple photo to<br />
                <code className="bg-white/20 px-1 rounded text-[11px]">/public/assets/couple/hero.jpg</code>
              </p>
            </div>
          </div>
        ) : (
          <img
            src="/assets/events/wedding.png"
            alt={`${coupleConfig.bride.name} & ${coupleConfig.groom.name}`}
            className="w-full h-full object-cover object-top"
            onError={() => setImgError(true)}
            loading="lazy"
          />
        )}

        {/* Overlay name tag at bottom */}
        <div
          className="absolute bottom-0 left-0 right-0 px-6 py-5"
          style={{ background: "linear-gradient(to top, rgba(0,0,0,0.55), transparent)" }}
        >
          <p className="font-serif text-white text-xl font-bold">
            {coupleConfig.bride.name} &amp; {coupleConfig.groom.name}
          </p>
          <p className="font-sans text-white/70 text-xs tracking-wider">July 2026 · Trichy &amp; Hyderabad</p>
        </div>
      </div>

      {/* Floating badge */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
        className="absolute -bottom-5 -right-5 rounded-2xl px-4 py-3 shadow-gold"
        style={{ background: "linear-gradient(135deg, #C9963A, #F5C842)", color: "#3D0010" }}
      >
        <p className="font-sans text-xs font-bold tracking-wide">Getting Married! 🎉</p>
        <p className="font-sans text-[10px] opacity-70 mt-0.5">16 July 2026</p>
      </motion.div>
    </div>
  );
}

export default function WelcomeSection() {
  return (
    <section id="story" className="relative py-24 sm:py-32 overflow-hidden"
      style={{ background: "linear-gradient(180deg, #FFFBF7 0%, #FFF5F0 100%)" }}>

      {/* Background blobs */}
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(244,193,202,0.18) 0%, transparent 70%)", transform: "translate(30%,-30%)" }}
        aria-hidden="true" />
      <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(201,150,58,0.10) 0%, transparent 70%)", transform: "translate(-30%,30%)" }}
        aria-hidden="true" />

      <div className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-10 relative">
        {/* Main content — photo + story */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center mt-4">

          {/* Photo */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <CouplePhoto />
          </motion.div>

          {/* Story + invite */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="flex flex-col gap-6 justify-center"
          >
            <div>
              <p className="font-sans text-base sm:text-lg text-ink-muted leading-relaxed">
                We found each other across cities, timezones, and cultures — and somehow it just made sense.
                What started as long calls and late nights turned into a love neither of us saw coming, but both of us
                were absolutely certain about. Tamil Nadu meets Punjab, and it's everything.
              </p>
            </div>

            <div className="h-px" style={{ background: "linear-gradient(90deg, transparent, #C9963A50, transparent)" }} />

            <div
              className="rounded-2xl p-6"
              style={{
                background: "linear-gradient(135deg, rgba(155,44,69,0.05), rgba(201,150,58,0.08))",
                border: "1.5px solid rgba(155,44,69,0.12)",
              }}
            >
              <p className="font-serif italic text-xl sm:text-2xl text-ink leading-snug mb-3">
                "You've been with us through everything — now come celebrate with us."
              </p>
              <p className="font-sans text-sm text-ink-muted leading-relaxed">
                Eat too much, dance badly, and make memories with us. We wouldn't want it any other way. 🥂
              </p>
            </div>

          </motion.div>
        </div>
      </div>
    </section>
  );
}
