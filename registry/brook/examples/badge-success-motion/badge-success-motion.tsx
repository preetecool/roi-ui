"use client";

import { Badge, BadgeIcon } from "@/registry/brook/ui/badge/badge";
import { motion } from "motion/react";

const bounceVariants = {
  bounce: {
    scale: [0.8, 1.05, 1],
  },
};

const bounceTransition = {
  duration: 0.4,
};

const checkVariants = {
  hidden: {
    pathLength: 0,
    opacity: 0,
  },
  visible: {
    pathLength: 1,
    opacity: 1,
  },
};

const checkTransition = {
  duration: 0.4,
  ease: "easeInOut" as const,
};

export default function BadgeSuccessFramerMotion() {
  return (
    <motion.div variants={bounceVariants} animate="bounce" transition={bounceTransition}>
      <Badge variant="success" size="lg">
        <BadgeIcon>
          <motion.svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial="hidden"
            animate="visible"
          >
            <motion.path d="m3 8 3 3 7-7" variants={checkVariants} transition={checkTransition} />
          </motion.svg>
        </BadgeIcon>
        Success
      </Badge>
    </motion.div>
  );
}
