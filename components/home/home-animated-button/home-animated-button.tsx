"use client";

import { motion } from "motion/react";
import { useState } from "react";
import styles from "./home-animated-button.module.css";

const menuItems = [
  {
    label: "Blank",
    icon: (
      <svg className={styles.menuIcon} fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path
          d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    label: "Template",
    icon: (
      <svg className={styles.menuIcon} fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path
          d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    label: "Import",
    icon: (
      <svg className={styles.menuIcon} fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path
          d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
];

export const HomeAnimatedButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={styles.container}>
      <motion.div
        animate={{
          borderRadius: isOpen ? 16 : 10,
        }}
        className={styles.wrapper}
        layout
        transition={{
          duration: 0.4,
          ease: [0.77, 0, 0.175, 1],
        }}
      >
        <motion.div
          className={styles.background}
          layout
          transition={{
            duration: 0.4,
            ease: [0.77, 0, 0.175, 1],
          }}
        />

        <button className={styles.trigger} onClick={() => setIsOpen(!isOpen)} type="button">
          <span className={styles.triggerText}>New file</span>
          <motion.span
            animate={{ rotate: isOpen ? 45 : 0 }}
            className={styles.triggerIcon}
            transition={{
              duration: 0.4,
              ease: [0.77, 0, 0.175, 1],
            }}
          >
            <svg
              className={styles.plusIcon}
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path d="M12 5v14m7-7H5" />
            </svg>
          </motion.span>
        </button>

        <motion.div
          animate={{
            height: isOpen ? "auto" : 0,
            opacity: isOpen ? 1 : 0,
          }}
          className={styles.menuWrapper}
          initial={false}
          transition={{
            duration: 0.4,
            ease: [0.77, 0, 0.175, 1],
          }}
        >
          <div className={styles.menu}>
            {menuItems.map((item) => (
              <button className={styles.menuItem} key={item.label} type="button">
                <span className={styles.menuItemIcon}>{item.icon}</span>
                <span className={styles.menuItemLabel}>{item.label}</span>
              </button>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};
