"use client";

import { motion } from "motion/react";
import { Badge, BadgeIcon } from "@/registry/brook/ui/badge/badge";

const shakeVariants = {
  shake: {
    // biome-ignore lint/style/noMagicNumbers: animation keyframe sequence
    x: [-4, 4, 0, -4, 0],
  },
};

const shakeTransition = {
  duration: 0.3,
};

const iconVariants = {
  hidden: {
    pathLength: 0,
    opacity: 0,
  },
  visible: {
    pathLength: 1,
    opacity: 1,
  },
};

const iconTransition = {
  duration: 0.4,
  ease: "easeIn" as const,
};

export default function BadgeErrorFramerMotion() {
  return (
    <motion.div
      animate="shake"
      transition={shakeTransition}
      variants={shakeVariants}
    >
      <Badge size="lg" variant="destructive">
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
            viewBox="0 0 24 24"
            width="16"
          >
            <motion.circle cx="12" cy="12" r="10" />
            <motion.path
              d="m4.9 4.9 14.2 14.2"
              transition={iconTransition}
              variants={iconVariants}
            />
          </motion.svg>
        </BadgeIcon>
        Error
      </Badge>
    </motion.div>
  );
}
