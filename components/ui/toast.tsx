"use client";

import { useEffect, useState } from "react";
import { CheckCircle, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface ToastProps {
  message: string;
  visible: boolean;
  onClose: () => void;
  duration?: number;
}

export function Toast({ message, visible, onClose, duration = 3000 }: ToastProps) {
  useEffect(() => {
    if (visible) {
      const timer = setTimeout(onClose, duration);
      return () => clearTimeout(timer);
    }
  }, [visible, duration, onClose]);

  return (
    <div
      className={cn(
        "fixed top-20 left-1/2 -translate-x-1/2 z-[100] flex items-center gap-2.5 bg-success text-white px-4 py-3 rounded-[var(--radius-md)] shadow-elevated transition-all duration-300",
        visible
          ? "opacity-100 translate-y-0"
          : "opacity-0 -translate-y-2 pointer-events-none"
      )}
    >
      <CheckCircle className="w-4 h-4 shrink-0" />
      <span className="text-[13px] font-medium">{message}</span>
      <button onClick={onClose} className="ml-1 cursor-pointer">
        <X className="w-3.5 h-3.5 opacity-70 hover:opacity-100 transition-opacity" />
      </button>
    </div>
  );
}
