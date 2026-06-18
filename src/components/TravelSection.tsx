import { motion } from "framer-motion";
import { Plane, Navigation } from "lucide-react";
import { venueConfig } from "../data/weddingData";

export default function TravelSection() {
  return (
    <section id="travel" className="relative pt-6 pb-14 sm:pt-8 sm:pb-20 overflow-hidden">
      <div className="max-w-lg mx-auto px-5 sm:px-8 relative">

        <p className="text-center text-xs font-semibold tracking-widest uppercase mb-6" style={{ color: "#a0694a" }}>
          Coming to Celebrate?
        </p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-2xl overflow-hidden"
          style={{ border: "1.5px solid rgba(201,150,58,0.2)", boxShadow: "0 4px 24px rgba(0,0,0,0.05)" }}
        >
          {/* Venue */}
          <div className="px-5 py-5">
            <p className="text-[10px] tracking-widest uppercase font-semibold mb-1" style={{ color: "#a0694a" }}>The Venue</p>
            <h3 className="font-serif text-lg font-bold mb-0.5" style={{ color: "#2d1a12" }}>{venueConfig.name}</h3>
            <p className="text-xs mb-4" style={{ color: "#7a5c42" }}>{venueConfig.address}</p>

            <div className="flex flex-wrap gap-2">
              <a
                href={venueConfig.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-white text-xs font-semibold transition-all duration-200 hover:-translate-y-px"
                style={{ background: "#6B2737" }}
              >
                <Navigation size={11} />Open in Maps
              </a>
              <div className="inline-flex items-center gap-1.5 px-3 py-2 rounded-full text-xs bg-sky-50 border border-sky-100">
                <Plane size={11} className="text-sky-500" />
                <span style={{ color: "#7a5c42" }}>{venueConfig.nearestAirport}</span>
              </div>
            </div>
          </div>

          <div className="mx-5" style={{ height: "1px", background: "rgba(201,150,58,0.18)" }} />

          {/* Hotels */}
          <div className="px-5 py-5">
            <p className="text-[10px] tracking-widest uppercase font-semibold mb-3" style={{ color: "#a0694a" }}>Where to Stay</p>
            <div className="grid grid-cols-2 gap-2">
              {venueConfig.hotels.map((hotel, i) => (
                <motion.div
                  key={hotel.name}
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                  className="flex items-center justify-between px-3 py-2.5 rounded-xl"
                  style={{ background: "#FAF7F4", border: "1px solid rgba(201,150,58,0.12)" }}
                >
                  <p className="text-xs font-medium truncate" style={{ color: "#2d1a12" }}>{hotel.name}</p>
                  {hotel.website !== "#" ? (
                    <a
                      href={hotel.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-semibold ml-2 flex-shrink-0 hover:underline"
                      style={{ color: "#D4637A" }}
                    >
                      →
                    </a>
                  ) : (
                    <span className="text-xs ml-2 flex-shrink-0">😄</span>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
