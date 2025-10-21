"use client";

import { motion } from "motion/react";
import { Badge, BadgeIcon } from "@/registry/brook/ui/badge/badge";

const bounceVariants = {
  bounce: {
    // biome-ignore lint/style/noMagicNumbers: animation keyframe sequence
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
    <motion.div
      animate="bounce"
      transition={bounceTransition}
      variants={bounceVariants}
    >
      <Badge size="lg" variant="success">
        <BadgeIcon>
          <motion.svg
            animate="visible"
            aria-hidden="true"
            fill="none"
            height="16"
            initial="hidden"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 16 16"
            width="16"
          >
            <motion.path
              d="m3 8 3 3 7-7"
              transition={checkTransition}
              variants={checkVariants}
            />
          </motion.svg>
        </BadgeIcon>
        Success
      </Badge>
    </motion.div>
  );
}
