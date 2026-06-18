import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import SectionTitle from "./SectionTitle";
import { faqItems } from "../data/weddingData";

function FAQItem({ question, answer, index }: { question: string; answer: string; index: number }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.45, delay: index * 0.07 }}
      className={`rounded-2xl overflow-hidden border transition-all duration-200 ${
        isOpen ? "border-rose-200 shadow-glow" : "border-gray-100 hover:border-gray-200"
      } bg-white`}
    >
      <button
        onClick={() => setIsOpen((o) => !o)}
        className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-400 focus-visible:ring-inset"
        aria-expanded={isOpen}
      >
        <span className="font-serif text-base sm:text-lg font-semibold text-ink leading-snug">
          {question}
        </span>
        <span
          className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 ${
            isOpen ? "bg-rose-500 text-white rotate-0" : "bg-cream text-ink-muted"
          }`}
          aria-hidden="true"
        >
          {isOpen ? <Minus size={15} /> : <Plus size={15} />}
        </span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.26, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-5 border-t border-rose-50">
              <p className="font-sans text-sm sm:text-base text-ink-muted leading-relaxed pt-4">
                {answer}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQ() {
  return (
    <section id="faq" className="relative py-24 sm:py-32 bg-cream overflow-hidden">
      {/* Soft blush blob */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 50% 40% at 50% 100%, rgba(212,99,122,0.05) 0%, transparent 65%)" }}
        aria-hidden="true"
      />

      <div className="max-w-2xl mx-auto px-5 sm:px-8 relative">
        <SectionTitle
          eyebrow="Questions?"
          title="Good to Know"
          subtitle="Everything you need before the celebrations begin."
        />

        <div className="flex flex-col gap-3">
          {faqItems.map((item, i) => (
            <FAQItem key={i} question={item.question} answer={item.answer} index={i} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-10 text-center p-7 rounded-3xl bg-white shadow-card border border-gray-50"
        >
          <p className="font-sans text-sm text-ink-subtle mb-1">Still have questions?</p>
          <p className="font-serif text-xl font-semibold text-ink">We're always happy to hear from you 💛</p>
          <a
            href="mailto:gayathritela99@gmail.com"
            className="inline-block mt-4 font-sans text-sm font-medium text-rose-500 hover:text-rose-600 transition-colors"
          >
            gayathritela99@gmail.com
          </a>
        </motion.div>
      </div>
    </section>
  );
}
