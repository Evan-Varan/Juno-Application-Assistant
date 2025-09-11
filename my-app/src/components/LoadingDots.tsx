import { motion } from "framer-motion";

export default function LoadingDots() {
  return (
    <div className="flex gap-2">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="w-3 h-3 mt-4 rounded-full bg-gradient-to-r from-indigo-400 to-sky-400"
          animate={{ scale: [1, 1.3, 1] }}
  transition={{
    duration: 0.6,
    repeat: Infinity,
    ease: "easeInOut",
    delay: i * 0.2
  }}
/>
      ))}
    </div>
  );
}
