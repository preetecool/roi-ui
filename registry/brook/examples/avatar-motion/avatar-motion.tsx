"use client";

import { Avatar, AvatarImage, AvatarFallback } from "@/registry/brook/ui/avatar/avatar";
import { motion } from "motion/react";

const avatarVariants = {
  hidden: {
    opacity: 0,
    scale: 0,
  },
  visible: {
    opacity: 1,
    scale: 1,
  },
};

const avatarTransition = {
  duration: 0.4,
  scale: {
    type: "spring" as const,
    visualDuration: 0.2,
    bounce: 0.5,
  },
};

export default function AvatarMotion() {
  return (
    <div>
      <motion.div variants={avatarVariants} initial="hidden" animate="visible" transition={avatarTransition}>
        <Avatar>
          <AvatarImage src="/preetecool.png" alt="@preetecool" loading="eager" />
          <AvatarFallback>PC</AvatarFallback>
        </Avatar>
      </motion.div>
    </div>
  );
}
