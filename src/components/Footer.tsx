import { Heart } from "lucide-react";
import { coupleConfig } from "../data/weddingData";

const quickLinks = [
  { label: "Events",     href: "#events"     },
  { label: "Livestream", href: "#livestream" },
  { label: "Travel",     href: "#travel"     },
];

export default function Footer() {
  const handleNav = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer
      className="relative overflow-hidden"
      style={{ background: "linear-gradient(170deg, #F7EDD8 0%, #EFE0C4 100%)" }}
    >
      <div className="h-1 w-full" style={{ background: "linear-gradient(90deg, #C9963A40, #C9963A, #E8850A, #C9963A, #C9963A40)" }} />

      <div className="max-w-lg mx-auto px-5 py-8 flex flex-col items-center text-center gap-4">

        {/* Garland */}
        <div className="flex items-center gap-2" aria-hidden="true">
          <div className="h-px w-12" style={{ background: "linear-gradient(90deg, transparent, #C9963A50)" }} />
          {[0,1,2,3,4].map((i) => (
            <span key={i} style={{ color: i === 2 ? "#E8850A" : "#F5A623", opacity: i === 2 ? 1 : 0.55 }}>✿</span>
          ))}
          <div className="h-px w-12" style={{ background: "linear-gradient(90deg, #C9963A50, transparent)" }} />
        </div>

        {/* Names */}
        <div>
          <h2 className="font-serif font-bold" style={{ fontSize: "clamp(1.6rem, 4vw, 2.4rem)", color: "#6B2737" }}>
            {coupleConfig.bride.name}
            <span className="mx-2 font-sans font-light italic" style={{ fontSize: "0.5em", color: "#C9963A" }}>&</span>
            {coupleConfig.groom.name}
          </h2>
          <p className="font-sans text-xs tracking-[0.2em] uppercase mt-0.5" style={{ color: "#8B5E28" }}>
            Wedding · July 2026
          </p>
        </div>

        {/* Tagline */}
        <p className="font-serif italic text-sm flex items-center gap-1.5" style={{ color: "#8B5E28" }}>
          Made with <Heart size={11} className="fill-current" style={{ color: "#D4637A" }} /> for our families and friends
        </p>

        {/* Nav */}
        <nav className="flex gap-6" aria-label="Footer navigation">
          {quickLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => { e.preventDefault(); handleNav(link.href); }}
              className="font-sans text-xs font-medium hover:underline"
              style={{ color: "#8B5E28" }}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Hashtags */}
        <div className="flex flex-wrap justify-center gap-2">
          {[coupleConfig.hashtag, coupleConfig.hashtag2].map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 rounded-full font-sans text-xs font-semibold"
              style={{ background: "rgba(107,39,55,0.08)", border: "1.5px solid rgba(107,39,55,0.18)", color: "#6B2737" }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Simba */}
        <div
          className="flex items-center gap-3 rounded-xl px-4 py-3 w-full max-w-xs"
          style={{ background: "rgba(201,150,58,0.10)", border: "1.5px solid rgba(201,150,58,0.25)" }}
        >
          <span className="text-3xl flex-shrink-0">🐕</span>
          <div className="text-left">
            <p className="font-serif italic text-xs leading-snug" style={{ color: "#6B2737" }}>
              "Can't wait to see all of you! Don't forget my treats."
            </p>
            <p className="font-sans text-[10px] font-semibold mt-0.5" style={{ color: "#8B5E28" }}>
              — Simba, official party greeter 🐾
            </p>
          </div>
        </div>

      </div>
    </footer>
  );
}
