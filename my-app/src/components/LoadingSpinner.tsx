import { motion } from "framer-motion";

export default function LoadingSpinner() {
  return (
    <motion.div
      animate={{ rotate: 360 }}
      transition={{
        repeat: Infinity,
        duration: 1,
        ease: "linear"
      }}
      className="w-12 h-12 rounded-full border-4 border-t-transparent"
      style={{
        background: "conic-gradient(from 0deg, #818cf8, #38bdf8, #818cf8)",
        mask: "radial-gradient(farthest-side, transparent calc(100% - 4px), black calc(100% - 3px))",
        WebkitMask: "radial-gradient(farthest-side, transparent calc(100% - 4px), black calc(100% - 3px))"
      }}
    />
  );
}
