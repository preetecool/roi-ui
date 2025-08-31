"use client";

import { Avatar, AvatarImage, AvatarFallback } from "@/registry/brook/ui/avatar/avatar";
import { motion } from "motion/react";

export default function AvatarFramerMotion() {
  return (
    <div>
      <motion.div animate={{ scale: [1.4, 0.9, 1] }} transition={{ duration: 0.4 }}>
        <Avatar>
          <AvatarImage src="/preetecool.png" alt="@preetecool" />
          <AvatarFallback>AD</AvatarFallback>
        </Avatar>
      </motion.div>
    </div>
  );
}
