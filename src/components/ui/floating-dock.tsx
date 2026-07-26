"use client";

import { cn } from "@/lib/utils";
import { useTheme } from "@/context/ThemeContext";
import {
  AnimatePresence,
  MotionValue,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { useRef, useState } from "react";
import { LayoutGrid } from "lucide-react";

export const FloatingDock = ({
  items,
  desktopClassName,
  mobileClassName,
}: {
  items: { title: string; icon: React.ReactNode; href: string }[];
  desktopClassName?: string;
  mobileClassName?: string;
}) => {
  return (
    <div className="w-full flex items-center justify-center">
      <FloatingDockDesktop items={items} className={desktopClassName} />
      <FloatingDockMobile items={items} className={mobileClassName} />
    </div>
  );
};

const FloatingDockMobile = ({
  items,
  className,
}: {
  items: { title: string; icon: React.ReactNode; href: string }[];
  className?: string;
}) => {
  const [open, setOpen] = useState(false);
  const { theme } = useTheme();

  return (
    <div className={cn("relative block md:hidden", className)}>
      <AnimatePresence>
        {open && (
          <motion.div
            layoutId="nav"
            className="absolute inset-x-0 bottom-full mb-3 flex flex-row flex-wrap gap-2.5 items-center justify-center z-50 p-3 rounded-2xl border backdrop-blur-xl shadow-2xl"
            style={{
              backgroundColor: theme === 'dark' ? 'rgba(3, 7, 18, 0.95)' : 'rgba(255, 255, 255, 0.95)',
              borderColor: theme === 'dark' ? 'rgba(147, 51, 234, 0.4)' : 'rgba(233, 213, 255, 1)',
            }}
          >
            {items.map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 10 }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                exit={{
                  opacity: 0,
                  y: 10,
                  transition: {
                    delay: idx * 0.03,
                  },
                }}
                transition={{ delay: (items.length - 1 - idx) * 0.03 }}
              >
                <a
                  href={item.href}
                  key={item.title}
                  className={`flex h-10 w-10 items-center justify-center rounded-full border shadow-md transition-all ${
                    theme === 'dark'
                      ? 'bg-slate-900 border-purple-900/50 text-purple-400 hover:text-white hover:border-purple-400'
                      : 'bg-purple-50 border-purple-200 text-purple-700 hover:bg-purple-100 hover:text-purple-900'
                  }`}
                  title={item.title}
                >
                  <div className="h-4.5 w-4.5 flex items-center justify-center">{item.icon}</div>
                </a>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
      <button
        onClick={() => setOpen(!open)}
        className={`flex h-11 w-11 items-center justify-center rounded-full border shadow-xl backdrop-blur-xl hover:scale-105 transition-all cursor-pointer ${
          theme === 'dark'
            ? 'bg-slate-950 border-purple-500/40 text-purple-400'
            : 'bg-white border-purple-300 text-purple-700'
        }`}
        aria-label="Floating Quick Navigation Dock"
      >
        <LayoutGrid className="h-5 w-5" />
      </button>
    </div>
  );
};

const FloatingDockDesktop = ({
  items,
  className,
}: {
  items: { title: string; icon: React.ReactNode; href: string }[];
  className?: string;
}) => {
  let mouseX = useMotionValue(Infinity);
  const { theme } = useTheme();

  return (
    <motion.div
      onMouseMove={(e) => mouseX.set(e.pageX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      className={cn(
        "mx-auto hidden h-16 items-end gap-3.5 rounded-2xl border px-4 pb-3 md:flex backdrop-blur-xl transition-colors duration-300",
        theme === 'dark'
          ? 'bg-slate-950/85 border-purple-900/40 shadow-2xl'
          : 'bg-white/90 border-purple-200 shadow-xl shadow-purple-500/10',
        className,
      )}
    >
      {items.map((item) => (
        <IconContainer mouseX={mouseX} key={item.title} {...item} />
      ))}
    </motion.div>
  );
};

function IconContainer({
  mouseX,
  title,
  icon,
  href,
}: {
  mouseX: MotionValue;
  title: string;
  icon: React.ReactNode;
  href: string;
}) {
  let ref = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();

  let distance = useTransform(mouseX, (val) => {
    let bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };

    return val - bounds.x - bounds.width / 2;
  });

  let widthTransform = useTransform(distance, [-150, 0, 150], [40, 72, 40]);
  let heightTransform = useTransform(distance, [-150, 0, 150], [40, 72, 40]);

  let widthTransformIcon = useTransform(distance, [-150, 0, 150], [20, 36, 20]);
  let heightTransformIcon = useTransform(
    distance,
    [-150, 0, 150],
    [20, 36, 20],
  );

  let width = useSpring(widthTransform, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });
  let height = useSpring(heightTransform, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  let widthIcon = useSpring(widthTransformIcon, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });
  let heightIcon = useSpring(heightTransformIcon, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  const [hovered, setHovered] = useState(false);

  return (
    <a href={href}>
      <motion.div
        ref={ref}
        style={{ width, height }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className={`relative flex aspect-square items-center justify-center rounded-full border shadow-md transition-colors ${
          theme === 'dark'
            ? 'bg-slate-900 border-purple-900/50 text-purple-400 hover:text-white hover:border-purple-400'
            : 'bg-purple-50/80 border-purple-200 text-purple-700 hover:bg-purple-100 hover:text-purple-950 hover:border-purple-300'
        }`}
      >
        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0, y: 10, x: "-50%" }}
              animate={{ opacity: 1, y: 0, x: "-50%" }}
              exit={{ opacity: 0, y: 2, x: "-50%" }}
              className={`absolute -top-9 left-1/2 w-fit rounded-lg border px-2.5 py-1 text-xs font-mono font-bold whitespace-pre shadow-xl ${
                theme === 'dark'
                  ? 'border-purple-900/50 bg-slate-950 text-purple-300'
                  : 'border-purple-200 bg-white text-purple-900 shadow-purple-500/10'
              }`}
            >
              {title}
            </motion.div>
          )}
        </AnimatePresence>
        <motion.div
          style={{ width: widthIcon, height: heightIcon }}
          className="flex items-center justify-center"
        >
          {icon}
        </motion.div>
      </motion.div>
    </a>
  );
}
