"use client";

import { useEffect } from "react";
import { CheckCircle2, X, AlertCircle, Info } from "lucide-react";
import { cn } from "@/lib/utils";

type ToastVariant = "success" | "error" | "info";

interface ToastProps {
  message: string;
  visible: boolean;
  onClose: () => void;
  duration?: number;
  variant?: ToastVariant;
}

const variantConfig: Record<
  ToastVariant,
  { Icon: typeof CheckCircle2; iconClass: string; cardClass: string }
> = {
  success: {
    Icon: CheckCircle2,
    iconClass: "text-green-400",
    cardClass:
      "border-green-500/50 shadow-[0_0_0_1px_rgba(16,184,110,0.4),_0_0_24px_rgba(16,184,110,0.25)]",
  },
  error: {
    Icon: AlertCircle,
    iconClass: "text-live-red",
    cardClass:
      "border-live-red/50 shadow-[0_0_0_1px_rgba(255,59,59,0.4),_0_0_24px_var(--live-red-glow)]",
  },
  info: {
    Icon: Info,
    iconClass: "text-yellow-400",
    cardClass:
      "border-yellow-500/50 shadow-[0_0_0_1px_var(--yellow-500),_0_0_24px_var(--yellow-glow)]",
  },
};

/**
 * Top-anchored toast notification — bet365 dark style with glowing border.
 */
export function Toast({
  message,
  visible,
  onClose,
  duration = 3000,
  variant = "success",
}: ToastProps) {
  const { Icon, iconClass, cardClass } = variantConfig[variant];

  useEffect(() => {
    if (visible) {
      const timer = setTimeout(onClose, duration);
      return () => clearTimeout(timer);
    }
  }, [visible, duration, onClose]);

  return (
    <div
      className={cn(
        "fixed top-24 left-1/2 -translate-x-1/2 z-[100]",
        "flex items-center gap-3 px-4 py-3",
        "bg-surface-1 border rounded-[var(--radius-md)]",
        "backdrop-blur-md",
        "transition-all duration-300 ease-out",
        cardClass,
        visible
          ? "opacity-100 translate-y-0 scale-100"
          : "opacity-0 -translate-y-3 scale-95 pointer-events-none"
      )}
      role="status"
      aria-live="polite"
    >
      <Icon className={cn("w-4 h-4 shrink-0", iconClass)} strokeWidth={2.4} />
      <span className="font-display font-bold text-[12px] uppercase tracking-[0.4px] text-text-primary pr-1">
        {message}
      </span>
      <button
        onClick={onClose}
        className="p-0.5 rounded text-text-tertiary hover:text-text-primary hover:bg-surface-2 transition-colors cursor-pointer"
        aria-label="Bezárás"
      >
        <X className="w-3.5 h-3.5" strokeWidth={2.4} />
      </button>
    </div>
  );
}
