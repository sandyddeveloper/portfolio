"use client";

import { cn } from "@/lib/utils";
import { useTheme } from "@/context/ThemeContext";
import { useBodyScrollLock } from "@/hooks/useBodyScrollLock";
import { AnimatePresence, motion } from "framer-motion";
import { useState, useEffect } from "react";
import { X, Sparkles } from "lucide-react";

const CheckIcon = ({ className }: { className?: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      className={cn("w-5 h-5 shrink-0", className)}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
    </svg>
  );
};

const CheckFilled = ({ className }: { className?: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={cn("w-5 h-5 shrink-0", className)}
    >
      <path
        fillRule="evenodd"
        d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
        clipRule="evenodd"
      />
    </svg>
  );
};

type LoadingState = {
  text: string;
};

const LoaderCore = ({
  loadingStates,
  value = 0,
}: {
  loadingStates: LoadingState[];
  value?: number;
}) => {
  const { theme } = useTheme();

  return (
    <div className="flex relative justify-start w-full flex-col space-y-3">
      {loadingStates.map((loadingState, index) => {
        const distance = Math.abs(index - value);
        const opacity = Math.max(1 - distance * 0.25, 0.2);

        return (
          <motion.div
            key={index}
            className="text-left flex items-center gap-3"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: opacity, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div>
              {index > value && (
                <CheckIcon className={theme === 'dark' ? 'text-slate-600' : 'text-slate-300'} />
              )}
              {index <= value && (
                <CheckFilled
                  className={cn(
                    theme === 'dark' ? 'text-purple-400' : 'text-purple-600',
                    value === index &&
                      (theme === 'dark' ? 'text-emerald-400 animate-pulse' : 'text-emerald-600 animate-pulse')
                  )}
                />
              )}
            </div>
            <span
              className={cn(
                "font-mono text-xs sm:text-sm font-semibold transition-colors duration-200",
                theme === 'dark' ? 'text-slate-300' : 'text-slate-700',
                value === index &&
                  (theme === 'dark'
                    ? 'text-emerald-400 font-extrabold scale-[1.02]'
                    : 'text-emerald-700 font-extrabold scale-[1.02]'),
                index > value && (theme === 'dark' ? 'text-slate-500' : 'text-slate-400')
              )}
            >
              {loadingState.text}
            </span>
          </motion.div>
        );
      })}
    </div>
  );
};

export const MultiStepLoader = ({
  loadingStates,
  loading,
  duration = 1200,
  loop = false,
  onClose,
}: {
  loadingStates: LoadingState[];
  loading?: boolean;
  duration?: number;
  loop?: boolean;
  onClose?: () => void;
}) => {
  const [currentState, setCurrentState] = useState(0);
  const { theme } = useTheme();

  useBodyScrollLock(!!loading);

  useEffect(() => {
    if (!loading) {
      setCurrentState(0);
      return;
    }
    const timeout = setTimeout(() => {
      setCurrentState((prevState) =>
        loop
          ? prevState === loadingStates.length - 1
            ? 0
            : prevState + 1
          : Math.min(prevState + 1, loadingStates.length - 1)
      );
    }, duration);

    return () => clearTimeout(timeout);
  }, [currentState, loading, loop, loadingStates.length, duration]);

  return (
    <AnimatePresence mode="wait">
      {loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[140] flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md"
        >
          {/* Compact Theme-Aware Card Modal */}
          <motion.div
            data-lenis-prevent
            initial={{ scale: 0.9, opacity: 0, y: 15 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 15 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className={cn(
              "relative w-full max-w-md rounded-3xl border p-6 sm:p-7 shadow-2xl backdrop-blur-2xl transition-colors duration-300",
              theme === "dark"
                ? "border-purple-900/40 bg-slate-950/95 text-slate-100 shadow-[0_0_50px_rgba(147,51,234,0.25)]"
                : "border-purple-200 bg-white/95 text-slate-950 shadow-2xl shadow-purple-500/15"
            )}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b pb-4 mb-5 border-purple-500/20">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-purple-500/10 border border-purple-500/30 text-purple-600 dark:text-purple-400">
                  <Sparkles className="h-4 w-4 animate-spin" />
                </div>
                <div>
                  <h4 className="text-sm sm:text-base font-extrabold tracking-tight">
                    Secure Dispatch Pipeline
                  </h4>
                  <span className="text-[10px] font-mono font-bold text-purple-600 dark:text-purple-400 uppercase tracking-wider block">
                    Telemetry Relay Active
                  </span>
                </div>
              </div>

              {onClose && (
                <button
                  onClick={onClose}
                  className={cn(
                    "rounded-full p-1.5 border transition-colors cursor-pointer",
                    theme === "dark"
                      ? "border-purple-900/40 bg-slate-900 text-slate-400 hover:text-white"
                      : "border-purple-200 bg-purple-50 text-slate-600 hover:bg-purple-100"
                  )}
                  title="Cancel Loader"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>

            {/* Core Animated Steps */}
            <LoaderCore value={currentState} loadingStates={loadingStates} />

            {/* Bottom Progress Bar */}
            <div className="mt-6 pt-4 border-t border-purple-500/20">
              <div className="w-full h-1.5 rounded-full bg-slate-200 dark:bg-slate-900 overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-purple-600 via-indigo-500 to-emerald-400"
                  initial={{ width: "0%" }}
                  animate={{
                    width: `${((currentState + 1) / loadingStates.length) * 100}%`,
                  }}
                  transition={{ duration: 0.4 }}
                />
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
