"use client";

import { useState, useEffect } from "react";

const TARGET = new Date("2026-06-11T21:00:00+02:00");

function calcTimeLeft() {
  const diff = TARGET.getTime() - Date.now();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0 };
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
  };
}

export function Countdown() {
  const [time, setTime] = useState(calcTimeLeft);

  useEffect(() => {
    const timer = setInterval(() => setTime(calcTimeLeft()), 60_000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex items-center gap-4 justify-center">
      {[
        { value: time.days, label: "nap" },
        { value: time.hours, label: "óra" },
        { value: time.minutes, label: "perc" },
      ].map(({ value, label }) => (
        <div key={label} className="flex flex-col items-center">
          <span className="font-mono font-bold text-[28px] text-brand-gold leading-none">
            {String(value).padStart(2, "0")}
          </span>
          <span className="text-[11px] text-text-tertiary font-medium mt-1">{label}</span>
        </div>
      ))}
    </div>
  );
}
