import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";
import { createPortal } from "react-dom";
import SectionTitle from "./SectionTitle";
import { FloralDivider } from "./Decorations";
import { galleryImages, GALLERY_CATEGORIES, type GalleryCategory } from "../data/weddingData";

// ── Image with graceful fallback ─────────────────────────────
function GalleryImage({
  src,
  alt,
  onClick,
  index,
}: {
  src: string;
  alt: string;
  onClick: () => void;
  index: number;
}) {
  const [loaded,   setLoaded]   = useState(false);
  const [imgError, setImgError] = useState(false);

  // Stagger effect: vary top padding to simulate masonry heights
  const paddings = ["pt-0", "pt-4", "pt-8", "pt-2", "pt-6", "pt-3"];
  const pad = paddings[index % paddings.length];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: (index % 4) * 0.08 }}
      className={`break-inside-avoid mb-4 ${pad}`}
    >
      <div
        className="relative group cursor-pointer rounded-xl overflow-hidden shadow-md hover:shadow-gold transition-shadow duration-300"
        onClick={onClick}
        role="button"
        tabIndex={0}
        aria-label={`View image: ${alt}`}
        onKeyDown={(e) => e.key === "Enter" && onClick()}
      >
        {/* Skeleton loader */}
        {!loaded && !imgError && (
          <div
            className="w-full rounded-xl bg-gradient-to-br from-gold-50 to-amber-100 animate-pulse"
            style={{ paddingBottom: "75%" }}
            aria-hidden="true"
          />
        )}

        {/* Actual image */}
        {!imgError ? (
          <img
            src={src}
            alt={alt}
            loading="lazy"
            className={`w-full h-auto block rounded-xl object-cover transition-all duration-500 group-hover:scale-105 ${
              loaded ? "opacity-100" : "opacity-0 absolute inset-0"
            }`}
            onLoad={() => setLoaded(true)}
            onError={() => setImgError(true)}
          />
        ) : (
          // Placeholder when image is missing
          <div
            className="w-full flex flex-col items-center justify-center rounded-xl"
            style={{
              paddingBottom: "75%",
              background: "linear-gradient(135deg, #FFF5E0, #FDF0D5, #FAE8C8)",
              position: "relative",
            }}
            aria-label={alt}
          >
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
              <span className="text-3xl opacity-30">🌸</span>
              <span className="font-sans text-xs text-gold-400/60 italic">Photo coming soon</span>
            </div>
          </div>
        )}

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/35 transition-colors duration-300 rounded-xl flex items-center justify-center">
          <ZoomIn
            size={28}
            className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 drop-shadow-lg"
          />
        </div>
      </div>
    </motion.div>
  );
}

// ── Lightbox ──────────────────────────────────────────────────
function Lightbox({
  images,
  currentIndex,
  onClose,
  onPrev,
  onNext,
}: {
  images: typeof galleryImages;
  currentIndex: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  const [imgError, setImgError] = useState(false);
  const img = images[currentIndex];

  // Reset error state when navigating
  useEffect(() => setImgError(false), [currentIndex]);

  // Keyboard navigation
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft")  onPrev();
      if (e.key === "ArrowRight") onNext();
      if (e.key === "Escape")     onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose, onPrev, onNext]);

  return createPortal(
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-[200] flex items-center justify-center bg-black/92 backdrop-blur-sm p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Image lightbox"
    >
      {/* Close */}
      <button
        className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-400"
        onClick={onClose}
        aria-label="Close lightbox"
      >
        <X size={20} />
      </button>

      {/* Counter */}
      <p className="absolute top-4 left-1/2 -translate-x-1/2 font-sans text-xs text-white/50 tracking-widest">
        {currentIndex + 1} / {images.length}
      </p>

      {/* Prev */}
      <button
        className="absolute left-3 sm:left-6 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-400"
        onClick={(e) => { e.stopPropagation(); onPrev(); }}
        aria-label="Previous image"
      >
        <ChevronLeft size={20} />
      </button>

      {/* Image */}
      <motion.div
        key={currentIndex}
        initial={{ opacity: 0, scale: 0.94 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.96 }}
        transition={{ duration: 0.25 }}
        className="max-w-4xl max-h-[85vh] mx-12 sm:mx-20"
        onClick={(e) => e.stopPropagation()}
      >
        {imgError ? (
          <div className="flex flex-col items-center justify-center w-80 h-60 rounded-xl bg-white/5 border border-white/10 gap-3">
            <span className="text-4xl">🌸</span>
            <p className="font-sans text-sm text-white/50 italic">Image not yet available</p>
          </div>
        ) : (
          <img
            src={img.src}
            alt={img.alt}
            className="max-w-full max-h-[85vh] rounded-xl shadow-2xl object-contain"
            onError={() => setImgError(true)}
          />
        )}
        <p className="text-center font-sans text-xs text-white/40 mt-2">{img.alt}</p>
      </motion.div>

      {/* Next */}
      <button
        className="absolute right-3 sm:right-6 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-400"
        onClick={(e) => { e.stopPropagation(); onNext(); }}
        aria-label="Next image"
      >
        <ChevronRight size={20} />
      </button>
    </motion.div>,
    document.body
  );
}

// ── Main Gallery component ────────────────────────────────────
export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState<GalleryCategory>("All");
  const [lightboxIndex,  setLightboxIndex]  = useState<number | null>(null);

  const filtered =
    activeCategory === "All"
      ? galleryImages
      : galleryImages.filter((img) => img.category === activeCategory);

  const openLightbox = (globalIndex: number) => setLightboxIndex(globalIndex);
  const closeLightbox = useCallback(() => setLightboxIndex(null), []);

  const goPrev = useCallback(() => {
    setLightboxIndex((i) => (i === null ? null : (i - 1 + filtered.length) % filtered.length));
  }, [filtered.length]);

  const goNext = useCallback(() => {
    setLightboxIndex((i) => (i === null ? null : (i + 1) % filtered.length));
  }, [filtered.length]);

  return (
    <section id="gallery" className="relative py-20 sm:py-28 bg-ivory overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          eyebrow="Memories"
          title="Our Gallery"
          subtitle="A collection of moments, emotions, and the beautiful story of two families becoming one."
        />

        <FloralDivider className="w-64 mx-auto mb-10 text-gold-400" />

        {/* Category filter pills */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {GALLERY_CATEGORIES.map((cat) => (
            <motion.button
              key={cat}
              whileTap={{ scale: 0.96 }}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-full font-sans text-sm font-medium border transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-400 ${
                activeCategory === cat
                  ? "bg-gold-500 border-gold-500 text-white shadow-gold"
                  : "bg-white border-gold-200 text-gray-600 hover:border-gold-400 hover:text-maroon"
              }`}
            >
              {cat}
            </motion.button>
          ))}
        </div>

        {/* Masonry grid using CSS columns */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="columns-2 sm:columns-3 lg:columns-4 gap-4"
          >
            {filtered.map((img, idx) => (
              <GalleryImage
                key={img.id}
                src={img.src}
                alt={img.alt}
                onClick={() => openLightbox(idx)}
                index={idx}
              />
            ))}
          </motion.div>
        </AnimatePresence>

        {filtered.length === 0 && (
          <div className="text-center py-16 text-gray-400 font-sans text-sm italic">
            No photos in this category yet — check back soon! 🌸
          </div>
        )}
      </div>

      {/* Lightbox portal */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <Lightbox
            images={filtered}
            currentIndex={lightboxIndex}
            onClose={closeLightbox}
            onPrev={goPrev}
            onNext={goNext}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
