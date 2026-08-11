import React from "react";
import { motion } from "framer-motion";

type Props = React.PropsWithChildren<{
  delay?: number;
  y?: number;
  className?: string;
}>;

export default function Reveal({ children, delay = 0, y = 24, className = "" }: Props) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.75, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}