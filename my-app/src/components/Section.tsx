import { motion } from "framer-motion"

type sectionProps = {
  children: React.ReactNode,
  className?: string,
  noMinWidth?: boolean
}

export function Section({ children, className, noMinWidth }: sectionProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.2 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className= {`flex max-w-6xl ${noMinWidth ? "w-full" : "min-w-[65vw]"} justify-center mx-auto min-h-[60vh] px-4 py-4 relative rounded-3xl ${className}`}
    >
      {children}
    </motion.section>
  )
}
