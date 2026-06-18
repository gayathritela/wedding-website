import { motion } from "framer-motion";
import { PlayCircle, Radio, CalendarClock } from "lucide-react";
import type { CSSProperties } from "react";
import { livestreamConfig, weddingEvents } from "../data/weddingData";

const PLACEHOLDER_URLS = ["YOUTUBE_LIVE_URL", "ZOOM_OR_STREAM_URL", ""];

function isValidUrl(url: string): boolean {
  return !PLACEHOLDER_URLS.includes(url) && url.startsWith("http");
}

export default function LivestreamSection() {
  const wedding = weddingEvents.find((e) => e.id === "wedding")!;
  const ytActive = isValidUrl(livestreamConfig.youtubeUrl);

  return (
    <section
      id="livestream"
      className="relative overflow-hidden"
      style={{ padding: "clamp(140px, 18vw, 220px) 0" }}
    >
      {/* Background image — no dark overlay */}
      <div
        className="responsive-art-bg absolute inset-0 z-0"
        aria-hidden="true"
        style={{
          "--bg-mobile": "url('/assets/background/live.png')",
          "--bg-desktop": "url('/assets/background/live.png')",
          "--bg-mobile-position": "center center",
          "--bg-desktop-position": "center center",
          "--bg-desktop-size": "cover",
        } as CSSProperties}
      />
      {/* Fade top */}
      <div className="absolute top-0 left-0 right-0 h-16 z-[1] pointer-events-none"
        style={{ background: "linear-gradient(to bottom, #FAF7F4, transparent)" }} />
      {/* Fade bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-16 z-[1] pointer-events-none"
        style={{ background: "linear-gradient(to top, #FAF7F4, transparent)" }} />

      <div className="max-w-2xl mx-auto px-5 sm:px-8 relative z-[2]">
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-3 mb-3" style={{ transform: "translateY(-60px)" }}>
            <div className="h-px w-6 bg-maroon/40" />
            <p className="text-[11px] tracking-[0.22em] uppercase font-semibold text-maroon">Watch Live</p>
            <div className="h-px w-6 bg-maroon/40" />
          </div>
          <h2 className="font-serif font-bold leading-tight text-maroon" style={{ fontSize: "clamp(2rem, 5vw, 3.2rem)" }}>
            Join Us From Anywhere
          </h2>
          <p className="mt-3 font-sans text-base leading-relaxed max-w-xl mx-auto" style={{ color: "#6B5A4E" }}>
            Can't make it in person? We'd still love for you to celebrate with us. Save this page and join us from wherever you are!
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
        >
          {/* Gradient border wrapper */}
          <div
            className="rounded-3xl p-px"
            style={{
              background: "linear-gradient(135deg, rgba(212,163,115,0.9) 0%, rgba(190,120,100,0.5) 50%, rgba(212,163,115,0.9) 100%)",
            }}
          >
            <div
              className="rounded-3xl overflow-hidden"
              style={{ background: "rgba(255,248,242,0.97)" }}
            >
              <div className="px-6 py-6 sm:px-8 sm:py-8">

                {/* Icon + title row */}
                <div className="flex items-start gap-4 mb-5">
                  <div
                    className="flex-shrink-0 w-11 h-11 rounded-xl flex items-center justify-center text-2xl mt-0.5"
                    style={{
                      background: "linear-gradient(135deg, #fff0e6 0%, #fde4d0 100%)",
                      border: "1px solid rgba(210,150,100,0.2)",
                    }}
                  >
                    {wedding.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <h3 className="font-serif text-xl font-bold leading-tight" style={{ color: "#2d1a12" }}>
                        Wedding Ceremony
                      </h3>
                      {ytActive ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold text-white"
                          style={{ background: "linear-gradient(90deg, #e53e3e, #fc8181)" }}>
                          <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                          LIVE
                        </span>
                      ) : (
                        <span
                          className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold"
                          style={{
                            background: "rgba(160,105,74,0.1)",
                            color: "#a0694a",
                            border: "1px solid rgba(160,105,74,0.22)",
                          }}
                        >
                          <Radio size={10} />
                          Soon
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-1.5">
                      <CalendarClock size={12} style={{ color: "#a0694a" }} />
                      <p className="text-xs font-medium" style={{ color: "#a0694a" }}>
                        Thursday, July 16, 2026
                      </p>
                    </div>
                    <p className="text-xs font-medium mt-0.5 pl-[17px]" style={{ color: "#a0694a" }}>
                      8:50 AM – 10:20 AM IST
                    </p>
                  </div>
                </div>

                {/* Divider */}
                <div style={{ height: "1px", background: "rgba(200,150,100,0.15)", marginBottom: "20px" }} />

                {/* CTA */}
                {ytActive ? (
                  <a
                    href={livestreamConfig.youtubeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full py-3 rounded-xl font-semibold text-sm text-white transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-red-400"
                    style={{ background: "linear-gradient(90deg, #e53e3e 0%, #fc8181 100%)" }}
                  >
                    <PlayCircle size={16} />
                    Watch Live on YouTube
                  </a>
                ) : (
                  <div
                    className="flex items-center justify-center gap-2 w-full py-3 rounded-xl text-sm font-medium"
                    style={{
                      background: "rgba(160,105,74,0.06)",
                      border: "1.5px dashed rgba(160,105,74,0.25)",
                      color: "#b07850",
                    }}
                  >
                    <PlayCircle size={16} />
                    Link goes live on the day
                  </div>
                )}

              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
