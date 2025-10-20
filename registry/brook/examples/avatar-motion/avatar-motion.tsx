"use client";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/registry/brook/ui/avatar/avatar";
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
      <motion.div
        animate="visible"
        initial="hidden"
        transition={avatarTransition}
        variants={avatarVariants}
      >
        <Avatar>
          <AvatarImage
            alt="@preetecool"
            loading="eager"
            src="/preetecool.png"
          />
          <AvatarFallback>PC</AvatarFallback>
        </Avatar>
      </motion.div>
    </div>
  );
}
