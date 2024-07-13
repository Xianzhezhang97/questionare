import React, { useEffect } from "react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useInView } from "react-intersection-observer";

export default function Num({ n, d, o }) {
  // Ensure that n is treated as a string
  const stringValue = n.toString();

  // Extract the numeric part from the string
  const numberValue = parseFloat(stringValue.replace(/[^\d.]/g, "")) || 0;

  const count = useMotionValue(0);
  const rounded = useTransform(count, Math.round);
  const [ref, inView] = useInView({
    triggerOnce: o ? o : false,
  });

  useEffect(() => {
    if (inView) {
      const animation = animate(count, numberValue, {
        duration: d && d > 0 ? d : 2,
        ease: [0.455, 0.03, 0.515, 0.955],
      });
      return animation.stop;
    }
  }, [inView, numberValue, d]);

  return <motion.div ref={ref}>{rounded}</motion.div>;
}
