"use client";
import React from "react";
import clsx from "clsx";
import { Play, Pause, RotateCcw } from "react-feather";
import { motion } from "framer-motion";

import Card from "@/components/Card";
import VisuallyHidden from "@/components/VisuallyHidden";

import styles from "./CircularColorsDemo.module.css";

const COLORS = [
  { label: "red", value: "hsl(348deg 100% 60%)" },
  { label: "yellow", value: "hsl(50deg 100% 55%)" },
  { label: "blue", value: "hsl(235deg 100% 65%)" },
];

function CircularColorsDemo() {
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [timeElapsed, setTimeElapsed] = React.useState(0);
  const id = React.useId();

  function handleToggle() {
    setIsPlaying(!isPlaying);
  }

  function getColor(timeElapsed) {
    const colorIndex = Math.floor(timeElapsed) % COLORS.length;
    return COLORS[colorIndex];
  }

  React.useEffect(() => {
    if (isPlaying === false) {
      return;
    }

    const timeIntervalId = window.setInterval(() => {
      setTimeElapsed((current) => current + 0.1);
    }, 100);

    return () => {
      window.clearInterval(timeIntervalId);
    };
  }, [isPlaying]);

  const selectedColor = getColor(timeElapsed);

  return (
    <Card as="section" className={styles.wrapper}>
      <ul className={styles.colorsWrapper}>
        {COLORS.map((color, index) => {
          const isSelected = color.value === selectedColor.value;

          return (
            <li className={styles.color} key={index}>
              {isSelected && (
                <motion.div
                  layoutId={`${id}-selected-outline`}
                  className={styles.selectedColorOutline}
                />
              )}
              <div
                className={clsx(
                  styles.colorBox,
                  isSelected && styles.selectedColorBox
                )}
                style={{
                  backgroundColor: color.value,
                }}
              >
                <VisuallyHidden>{color.label}</VisuallyHidden>
              </div>
            </li>
          );
        })}
      </ul>

      <div className={styles.timeWrapper}>
        <dl className={styles.timeDisplay}>
          <dt>Time Elapsed</dt>
          <dd>{Math.floor(timeElapsed)}</dd>
        </dl>
        <div className={styles.actions}>
          <button onClick={handleToggle}>
            {isPlaying ? <Pause /> : <Play />}
            <VisuallyHidden>{isPlaying ? "Pause" : "Play"}</VisuallyHidden>
          </button>
          <button
            onClick={() => {
              setIsPlaying(false);
              setTimeElapsed(0);
            }}
          >
            <RotateCcw />
            <VisuallyHidden>Reset</VisuallyHidden>
          </button>
        </div>
      </div>
    </Card>
  );
}

export default CircularColorsDemo;
