"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface FlipCountdownProps {
  target: Date | string;
  className?: string;
  showSeconds?: boolean;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function calcTimeLeft(target: Date): TimeLeft {
  const diff = target.getTime() - Date.now();
  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

const LABELS = ["NAP", "ÓRA", "PERC", "MP"];

interface DigitBoxProps {
  value: number;
  label: string;
}

function DigitBox({ value, label }: DigitBoxProps) {
  const padded = String(value).padStart(2, "0");
  return (
    <div className="flex flex-col items-center gap-2">
      <div
        key={padded}
        className={cn(
          "relative min-w-[72px] sm:min-w-[84px]",
          "bg-surface-0 border border-border-default rounded-[var(--radius-md)]",
          "px-4 py-3 sm:px-5 sm:py-4",
          "font-mono font-extrabold tabular-nums",
          "text-[40px] sm:text-[48px] leading-none",
          "text-yellow-400 text-center",
          "[text-shadow:0_0_24px_var(--yellow-glow)]",
          "animate-flip-in",
          "before:content-[''] before:absolute before:left-0 before:right-0 before:top-1/2 before:h-[1px] before:bg-border-default"
        )}
      >
        {padded}
      </div>
      <span className="text-[10px] font-bold uppercase tracking-[1px] text-text-tertiary">
        {label}
      </span>
    </div>
  );
}

/**
 * Flip-clock style countdown used in the dashboard hero and landing page.
 * The DigitBox remounts on every value change (key={padded}), triggering the
 * CSS flip-in animation. SSR safe: shows zeros until hydrated.
 */
export function FlipCountdown({
  target,
  className,
  showSeconds = true,
}: FlipCountdownProps) {
  const targetDate = typeof target === "string" ? new Date(target) : target;
  const [time, setTime] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setTime(calcTimeLeft(targetDate));
    const interval = showSeconds ? 1000 : 60_000;
    const timer = setInterval(() => setTime(calcTimeLeft(targetDate)), interval);
    return () => clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [targetDate.getTime(), showSeconds]);

  const values = [time.days, time.hours, time.minutes, time.seconds];
  const labels = LABELS;
  const cells = showSeconds ? 4 : 3;

  return (
    <div
      className={cn(
        "flex items-end justify-center gap-2 sm:gap-3",
        !mounted && "opacity-70",
        className
      )}
      aria-live="polite"
    >
      {values.slice(0, cells).map((v, i) => (
        <DigitBox key={labels[i]} value={v} label={labels[i]} />
      ))}
    </div>
  );
}
