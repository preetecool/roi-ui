"use client";

import { Avatar, AvatarImage, AvatarFallback } from "@/registry/brook/ui/avatar/avatar";
import { motion } from "motion/react";

export default function AvatarMotion() {
  return (
    <div>
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.4,
          scale: { type: "spring", visualDuration: 0.2, bounce: 0.5 },
        }}
      >
        <Avatar>
          <AvatarImage src="/preetecool.png" alt="@preetecool" loading="eager" />
          <AvatarFallback>PC</AvatarFallback>
        </Avatar>
      </motion.div>
    </div>
  );
}
