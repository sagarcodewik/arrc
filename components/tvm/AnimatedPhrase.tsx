import { motion, AnimatePresence } from "framer-motion";

export default function AnimatedPhrase({ text }: { text: string }) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={text}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.4 }}
        className="
          max-w-3xl
          px-6
          text-center
          text-sky-700
          font-semibold
          text-base
          sm:text-lg
          md:text-xl
          leading-snug
          break-words
          whitespace-normal
        "
      >
        {text}
      </motion.div>
    </AnimatePresence>
  );
}
