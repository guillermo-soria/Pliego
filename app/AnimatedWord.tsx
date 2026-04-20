"use client";

import { useEffect, useState } from "react";

const WORDS = ["stickers", "remeras", "muebles", "servicios"];
const INTERVAL = 2200;
const TRANSITION = 300;

export default function AnimatedWord() {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setIndex((i) => (i + 1) % WORDS.length);
        setVisible(true);
      }, TRANSITION);
    }, INTERVAL);
    return () => clearInterval(timer);
  }, []);

  return (
    <span
      style={{
        display: "inline-block",
        color: "#f97316",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(-8px)",
        transition: `opacity ${TRANSITION}ms ease, transform ${TRANSITION}ms ease`,
      }}
    >
      {WORDS[index]}
    </span>
  );
}
