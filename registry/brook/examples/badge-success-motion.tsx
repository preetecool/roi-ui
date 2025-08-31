"use client";

import { Badge, BadgeIcon } from "@/registry/brook/ui/badge/badge";
import { motion } from "motion/react";

export default function BadgeSuccessFramerMotion() {
  return (
    <motion.div animate={{ scale: [0.8, 1.05, 1] }} transition={{ duration: 0.4 }}>
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
            <motion.path
              d="m3 8 3 3 7-7"
              variants={{
                hidden: { pathLength: 0, opacity: 0 },
                visible: { pathLength: 1, opacity: 1 },
              }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
            />
          </motion.svg>
        </BadgeIcon>
        Success
      </Badge>
    </motion.div>
  );
}
