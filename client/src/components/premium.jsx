/**
 * Premium UI Components
 * 
 * A collection of beautifully designed, animated UI components.
 * - Select: Custom dropdown select with smooth animations
 * - Badge: Color-coded tag/label component
 * - Dropdown / MenuItem: Vertical navigation menu with check marks
 */

import * as React from "react";
import { useState, useRef, useEffect, createContext, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Check } from "lucide-react";
import { cn } from "@/lib/utils";

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// SELECT
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const SelectContext = createContext(null);

/**
 * Select – A custom dropdown select with smooth open/close animations.
 *
 * @param {string}   value          - Currently selected value
 * @param {Function} onValueChange  - Callback when value changes
 * @param {React.ReactNode} children - SelectTrigger + SelectContent
 */
function Select({ value, onValueChange, children }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  // Close on outside click
  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Resolve display label from children
  const [label, setLabel] = useState("");

  return (
    <SelectContext.Provider value={{ value, onValueChange, open, setOpen, label, setLabel }}>
      <div ref={ref} className="relative inline-block w-full">
        {children}
      </div>
    </SelectContext.Provider>
  );
}

/**
 * SelectTrigger – The clickable trigger button.
 * @param {string} placeholder - Placeholder text when nothing is selected
 */
function SelectTrigger({ placeholder, className, children }) {
  const ctx = useContext(SelectContext);
  const displayText = ctx.label || placeholder || "Select…";

  return (
    <button
      type="button"
      onClick={() => ctx.setOpen(!ctx.open)}
      className={cn(
        "flex w-full items-center justify-between gap-2 rounded-xl border border-input bg-background/60 backdrop-blur-sm px-4 py-2.5 text-sm font-medium text-foreground",
        "transition-all duration-200 ease-out",
        "hover:border-primary/40 hover:shadow-[0_0_0_3px_rgba(var(--primary-rgb,99,102,241),0.08)]",
        "focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50",
        "disabled:cursor-not-allowed disabled:opacity-50",
        ctx.open && "border-primary/50 ring-2 ring-primary/20 shadow-lg",
        className
      )}
    >
      <span className={cn("truncate", !ctx.label && "text-muted-foreground")}>
        {displayText}
      </span>
      <motion.span
        animate={{ rotate: ctx.open ? 180 : 0 }}
        transition={{ duration: 0.25, ease: "easeInOut" }}
      >
        <ChevronDown className="h-4 w-4 text-muted-foreground" />
      </motion.span>
      {children}
    </button>
  );
}

/**
 * SelectContent – The dropdown panel with animation.
 */
function SelectContent({ children, className }) {
  const ctx = useContext(SelectContext);

  return (
    <AnimatePresence>
      {ctx.open && (
        <motion.div
          initial={{ opacity: 0, y: -8, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -8, scale: 0.96 }}
          transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className={cn(
            "absolute z-50 mt-2 w-full min-w-[8rem] overflow-hidden rounded-xl",
            "bg-background/90 backdrop-blur-xl border border-border/60",
            "shadow-[0_10px_40px_-10px_rgba(0,0,0,0.15)] ring-1 ring-black/5",
            "p-1.5",
            className
          )}
        >
          <div className="max-h-60 overflow-y-auto">
            {children}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/**
 * SelectItem – An individual option inside the dropdown.
 * @param {string} value - The item's value
 * @param {number} index - The item's index (for tracking)
 */
function SelectItem({ value: itemValue, index, children, className }) {
  const ctx = useContext(SelectContext);
  const isSelected = ctx.value === itemValue;

  const handleSelect = () => {
    ctx.onValueChange?.(itemValue);
    // Resolve display text
    if (typeof children === "string") {
      ctx.setLabel(children);
    }
    ctx.setOpen(false);
  };

  // Set initial label if this item matches the current value
  useEffect(() => {
    if (isSelected && typeof children === "string") {
      ctx.setLabel(children);
    }
  }, [isSelected, children]);

  return (
    <motion.button
      type="button"
      onClick={handleSelect}
      whileHover={{ x: 2 }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        "relative flex w-full items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm font-medium",
        "transition-colors duration-150 cursor-pointer select-none",
        "focus:outline-none",
        isSelected
          ? "bg-primary/10 text-primary"
          : "text-foreground hover:bg-accent/60",
        className
      )}
    >
      <span className="flex-1 text-left">{children}</span>
      <AnimatePresence>
        {isSelected && (
          <motion.span
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.15 }}
          >
            <Check className="h-4 w-4 text-primary" />
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// BADGE
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const badgeColorMap = {
  violet:  "bg-violet-100 text-violet-700 border-violet-200 dark:bg-violet-500/20 dark:text-violet-300 dark:border-violet-500/30",
  amber:   "bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-500/20 dark:text-amber-300 dark:border-amber-500/30",
  green:   "bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-500/20 dark:text-emerald-300 dark:border-emerald-500/30",
  blue:    "bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-500/20 dark:text-blue-300 dark:border-blue-500/30",
  rose:    "bg-rose-100 text-rose-700 border-rose-200 dark:bg-rose-500/20 dark:text-rose-300 dark:border-rose-500/30",
  red:     "bg-red-100 text-red-700 border-red-200 dark:bg-red-500/20 dark:text-red-300 dark:border-red-500/30",
  orange:  "bg-orange-100 text-orange-700 border-orange-200 dark:bg-orange-500/20 dark:text-orange-300 dark:border-orange-500/30",
  yellow:  "bg-yellow-100 text-yellow-700 border-yellow-200 dark:bg-yellow-500/20 dark:text-yellow-300 dark:border-yellow-500/30",
  lime:    "bg-lime-100 text-lime-700 border-lime-200 dark:bg-lime-500/20 dark:text-lime-300 dark:border-lime-500/30",
  teal:    "bg-teal-100 text-teal-700 border-teal-200 dark:bg-teal-500/20 dark:text-teal-300 dark:border-teal-500/30",
  cyan:    "bg-cyan-100 text-cyan-700 border-cyan-200 dark:bg-cyan-500/20 dark:text-cyan-300 dark:border-cyan-500/30",
  indigo:  "bg-indigo-100 text-indigo-700 border-indigo-200 dark:bg-indigo-500/20 dark:text-indigo-300 dark:border-indigo-500/30",
  pink:    "bg-pink-100 text-pink-700 border-pink-200 dark:bg-pink-500/20 dark:text-pink-300 dark:border-pink-500/30",
  slate:   "bg-slate-100 text-slate-700 border-slate-200 dark:bg-slate-500/20 dark:text-slate-300 dark:border-slate-500/30",
  gray:    "bg-gray-100 text-gray-700 border-gray-200 dark:bg-gray-500/20 dark:text-gray-300 dark:border-gray-500/30",
};

/**
 * Badge – A compact, color-coded label component.
 *
 * @param {string} color - One of: violet, amber, green, blue, rose, red, orange, yellow, lime, teal, cyan, indigo, pink, slate, gray
 */
function Badge({ color = "slate", className, children }) {
  const colors = badgeColorMap[color] || badgeColorMap.slate;

  return (
    <motion.span
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className={cn(
        "inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5",
        "text-xs font-semibold whitespace-nowrap select-none",
        "transition-all duration-200",
        colors,
        className
      )}
    >
      {children}
    </motion.span>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// DROPDOWN / MENU ITEM
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

/**
 * Dropdown – A vertical navigation menu with optional check marks.
 *
 * @param {number} checkedIndex - Currently checked item index (or undefined)
 * @param {React.ReactNode} children - MenuItem components
 */
function Dropdown({ checkedIndex, className, children }) {
  return (
    <div
      className={cn(
        "flex flex-col gap-0.5 p-1.5 rounded-2xl",
        "bg-background/80 backdrop-blur-xl border border-border/60",
        "shadow-[0_4px_20px_-4px_rgba(0,0,0,0.08)] ring-1 ring-black/[0.03]",
        className
      )}
    >
      {children}
    </div>
  );
}

/**
 * MenuItem – An individual menu entry with icon, label, and optional check.
 *
 * @param {number}  index   - Item index
 * @param {React.ElementType} icon - Lucide icon component
 * @param {string}  label   - Display text
 * @param {boolean} checked - Whether this item is checked
 * @param {Function} onSelect - Callback when item is clicked
 */
function MenuItem({ index, icon: Icon, label, checked, onSelect, className }) {
  return (
    <motion.button
      type="button"
      onClick={onSelect}
      whileHover={{ x: 3 }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        "group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium w-full text-left",
        "transition-colors duration-150 cursor-pointer select-none",
        "focus:outline-none",
        checked
          ? "bg-primary/10 text-primary"
          : "text-foreground/80 hover:bg-accent/60 hover:text-foreground",
        className
      )}
    >
      {Icon && (
        <Icon
          className={cn(
            "h-4 w-4 flex-shrink-0 transition-colors duration-150",
            checked ? "text-primary" : "text-muted-foreground group-hover:text-foreground/70"
          )}
        />
      )}
      <span className="flex-1">{label}</span>
      <AnimatePresence>
        {checked && (
          <motion.span
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
          >
            <Check className="h-4 w-4 text-primary" />
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// EXPORTS
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export {
  // Select
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  // Badge
  Badge,
  // Dropdown
  Dropdown,
  MenuItem,
};