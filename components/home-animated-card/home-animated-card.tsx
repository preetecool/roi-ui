"use client";

import { motion } from "motion/react";
import { useEffect, useState } from "react";

const cardData = {
  title: "Art Brook",
  description: "Beautiful landscape photography",
  longDescription: "Discover This stunning landscape captures the essence of tranquility.",
  image: "/art-brook.png",
};

export const HomeAnimatedCard = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setOpen(true);
    }, 800);
  }, []);

  return (
    <>
      {open && (
        <motion.div
          layoutId="card"
          style={{
            backgroundColor: "color-mix(in oklch, var(--card) 33%, var(--background))",
            borderRadius: "24px",
            padding: "12px",
            width: "300px",
            overflow: "hidden",
          }}
        >
          <motion.img
            layoutId="image"
            alt={cardData.title}
            src={cardData.image}
            style={{
              width: "100%",
              height: "200px",
              borderRadius: "12px",
              objectFit: "cover",
              marginBottom: "12px",
            }}
          />
          <div>
            <motion.h2 layoutId="title" style={{ fontSize: "20px", fontWeight: "600", marginBottom: "2px" }}>
              {cardData.title}
            </motion.h2>
            <motion.p
              layoutId="description"
              style={{ fontSize: "12px", color: "var(--foreground)", opacity: 0.7 }}
            >
              {cardData.description}
            </motion.p>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{ fontSize: "14px", lineHeight: "1.6", marginTop: "12px" }}
            >
              {cardData.longDescription}
            </motion.p>
          </div>
        </motion.div>
      )}

      {!open && (
        <motion.div
          layoutId="card"
          style={{
            backgroundColor: "color-mix(in oklch, var(--card) 33%, var(--background))",
            borderRadius: "20px",
            width: "300px",
            overflow: "hidden",
            display: "flex",
            alignItems: "center",
            gap: "16px",
            padding: "12px",
          }}
        >
          <motion.img
            layoutId="image"
            alt={cardData.title}
            src={cardData.image}
            style={{
              width: "60px",
              height: "60px",
              borderRadius: "10px",
            }}
          />
          <motion.div
            style={{
              display: "flex",
              flexDirection: "column",
              flex: 1,
              paddingRight: "12px",
            }}
          >
            <motion.h2 layoutId="title" style={{ fontSize: "14px", fontWeight: "500", margin: 0 }}>
              {cardData.title}
            </motion.h2>
            <motion.p
              layoutId="description"
              style={{ fontSize: "14px", color: "var(--foreground)", opacity: 0.6, margin: 0 }}
            >
              {cardData.description}
            </motion.p>
          </motion.div>
        </motion.div>
      )}
    </>
  );
};
