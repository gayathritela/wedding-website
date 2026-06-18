import { motion } from "framer-motion";
import { Mail, MessageCircle, ClipboardList, Heart } from "lucide-react";
import SectionTitle from "./SectionTitle";
import { FloralDivider } from "./Decorations";
import { rsvpConfig, coupleConfig } from "../data/weddingData";

export default function RSVPSection() {
  const whatsappHref = `https://wa.me/${rsvpConfig.whatsappNumber.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(rsvpConfig.whatsappMessage)}`;
  const mailtoHref   = `mailto:${rsvpConfig.email}?subject=RSVP for ${coupleConfig.bride.name} %26 ${coupleConfig.groom.name}%27s Wedding&body=Hi! I'd like to confirm my attendance.`;
  const formActive   = rsvpConfig.googleFormUrl !== "GOOGLE_FORM_RSVP_URL";

  return (
    <section
      id="rsvp"
      className="relative py-20 sm:py-28 overflow-hidden"
      style={{
        background: "linear-gradient(160deg, #FFFAF0 0%, #FFF5E0 50%, #FDF0D5 100%)",
      }}
    >
      {/* Decorative large rings */}
      <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full border border-gold-200/30 pointer-events-none" aria-hidden="true" />
      <div className="absolute -bottom-32 -right-32 w-80 h-80 rounded-full border border-gold-200/30 pointer-events-none" aria-hidden="true" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full border border-gold-100/20 pointer-events-none" aria-hidden="true" />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 relative text-center">
        <SectionTitle
          eyebrow="You're Invited"
          title="Kindly RSVP"
          subtitle={`Please let us know if you'll be joining us by ${rsvpConfig.deadline}. We can't wait to celebrate with you!`}
        />

        <FloralDivider className="w-64 mx-auto mb-12 text-gold-400" />

        {/* Primary CTA — Google Form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-2xl shadow-gold border border-gold-100 p-8 sm:p-10 mb-8"
        >
          <div className="flex justify-center mb-5">
            <div className="w-16 h-16 rounded-full bg-maroon/10 flex items-center justify-center">
              <ClipboardList size={28} className="text-maroon" />
            </div>
          </div>

          <h3 className="font-serif text-2xl font-bold text-maroon mb-3">
            RSVP via Google Form
          </h3>
          <p className="font-sans text-sm text-gray-500 mb-7 leading-relaxed">
            The easiest way to confirm your attendance, dietary preferences, and any special requirements for your party.
          </p>

          {formActive ? (
            <a
              href={rsvpConfig.googleFormUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-maroon text-white font-semibold text-base shadow-maroon hover:bg-red-900 hover:-translate-y-0.5 hover:shadow-lg transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-maroon"
            >
              <Heart size={17} className="fill-current" />
              RSVP Now
            </a>
          ) : (
            <div className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gray-100 text-gray-400 font-semibold text-base cursor-not-allowed border border-gray-200">
              <ClipboardList size={17} />
              RSVP Form — Coming Soon
            </div>
          )}

          {!formActive && (
            <p className="font-sans text-xs text-gray-400 mt-3 italic">
              The form link will be shared closer to the event. In the meantime, reach out via the options below.
            </p>
          )}
        </motion.div>

        {/* Alternative contact options */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="font-sans text-sm text-gray-400 mb-5 uppercase tracking-widest"
        >
          Or reach us directly
        </motion.p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Email */}
          <motion.a
            href={mailtoHref}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.25 }}
            className="group flex items-center gap-4 p-5 rounded-xl bg-white border border-gold-100 hover:border-gold-300 hover:shadow-warm transition-all duration-200 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-400"
          >
            <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center shrink-0 group-hover:bg-blue-100 transition-colors">
              <Mail size={18} className="text-blue-500" />
            </div>
            <div>
              <p className="font-sans text-xs text-gray-400 uppercase tracking-wider mb-0.5">Email Us</p>
              <p className="font-sans text-sm font-medium text-gray-700 break-all">{rsvpConfig.email}</p>
            </div>
          </motion.a>

          {/* WhatsApp */}
          <motion.a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.32 }}
            className="group flex items-center gap-4 p-5 rounded-xl bg-white border border-gold-100 hover:border-green-300 hover:shadow-warm transition-all duration-200 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-green-400"
          >
            <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center shrink-0 group-hover:bg-green-100 transition-colors">
              <MessageCircle size={18} className="text-green-500" />
            </div>
            <div>
              <p className="font-sans text-xs text-gray-400 uppercase tracking-wider mb-0.5">WhatsApp</p>
              <p className="font-sans text-sm font-medium text-gray-700">{rsvpConfig.whatsappNumber}</p>
            </div>
          </motion.a>
        </div>

        {/* Warm note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="font-serif italic text-maroon/50 text-base mt-10"
        >
          Every seat filled by a loved one makes this day more beautiful. 🌸
        </motion.p>
      </div>
    </section>
  );
}
