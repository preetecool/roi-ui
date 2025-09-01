"use client";

import { Badge, BadgeIcon } from "@/registry/brook/ui/badge/badge";
import { motion } from "motion/react";

const shakeVariants = {
  shake: {
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
    <motion.div variants={shakeVariants} animate="shake" transition={shakeTransition}>
      <Badge variant="destructive" size="lg">
        <BadgeIcon>
          <motion.svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial="hidden"
            animate="visible"
          >
            <motion.circle cx="12" cy="12" r="10" />
            <motion.path d="m4.9 4.9 14.2 14.2" variants={iconVariants} transition={iconTransition} />
          </motion.svg>
        </BadgeIcon>
        Error
      </Badge>
    </motion.div>
  );
}
