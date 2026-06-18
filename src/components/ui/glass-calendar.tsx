"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  format,
  addMonths,
  subMonths,
  isSameDay,
  isToday,
  getDate,
  getDay,
  getDaysInMonth,
  startOfMonth,
  startOfDay,
  isBefore,
  isAfter,
} from "date-fns";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface DateRange {
  from?: Date;
  to?: Date;
}

interface GlassCalendarProps {
  value?: DateRange;
  onChange?: (range: DateRange) => void;
  className?: string;
}

const WEEKDAYS = ["S", "M", "T", "W", "T", "F", "S"];

/**
 * Travel-date range picker — full month grid (all 30/31 days visible).
 * Tap a start date, then an end date; the days in between are highlighted.
 * Past dates are disabled.
 */
export const GlassCalendar = React.forwardRef<HTMLDivElement, GlassCalendarProps>(
  ({ className, value, onChange }, ref) => {
    const today = React.useMemo(() => startOfDay(new Date()), []);
    const from = value?.from;
    const to = value?.to;

    const [currentMonth, setCurrentMonth] = React.useState<Date>(
      from ?? new Date()
    );

    const { days, leadingBlanks } = React.useMemo(() => {
      const start = startOfMonth(currentMonth);
      const total = getDaysInMonth(currentMonth);
      return {
        leadingBlanks: getDay(start), // 0 (Sun) .. 6 (Sat)
        days: Array.from(
          { length: total },
          (_, i) => new Date(start.getFullYear(), start.getMonth(), i + 1)
        ),
      };
    }, [currentMonth]);

    const handleClick = (date: Date) => {
      if (isBefore(date, today)) return;
      if (!from || (from && to)) {
        onChange?.({ from: date, to: undefined });
      } else if (from && !to) {
        if (isBefore(date, from) || isSameDay(date, from))
          onChange?.({ from: date, to: undefined });
        else onChange?.({ from, to: date });
      }
    };

    const isEndpoint = (d: Date) =>
      (from && isSameDay(d, from)) || (to && isSameDay(d, to));
    const isBetween = (d: Date) =>
      from && to && isAfter(d, from) && isBefore(d, to);

    return (
      <div
        ref={ref}
        className={cn(
          "w-full max-w-[360px] overflow-hidden rounded-3xl border border-white/10 bg-black p-5 text-white shadow-2xl",
          className
        )}
      >
        {/* Month + navigation */}
        <div className="flex items-center justify-between">
          <motion.p
            key={format(currentMonth, "MMMM-yyyy")}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="font-display text-2xl font-semibold tracking-tight"
          >
            {format(currentMonth, "MMMM")}
            <span className="ml-2 text-base font-normal text-white/50">
              {format(currentMonth, "yyyy")}
            </span>
          </motion.p>
          <div className="flex items-center gap-1">
            <button
              type="button"
              aria-label="Previous month"
              onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
              className="grid h-9 w-9 place-items-center rounded-full text-white/70 transition-colors hover:bg-white/10 hover:text-white"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              aria-label="Next month"
              onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
              className="grid h-9 w-9 place-items-center rounded-full text-white/70 transition-colors hover:bg-white/10 hover:text-white"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Weekday labels */}
        <div className="mt-5 grid grid-cols-7 gap-1 text-center">
          {WEEKDAYS.map((w, i) => (
            <span
              key={i}
              className="py-1 text-[11px] font-semibold uppercase text-white/40"
            >
              {w}
            </span>
          ))}
        </div>

        {/* Day grid — all days of the month */}
        <div className="mt-1 grid grid-cols-7 gap-y-1">
          {Array.from({ length: leadingBlanks }).map((_, i) => (
            <span key={`blank-${i}`} />
          ))}
          {days.map((day) => {
            const past = isBefore(day, today);
            const endpoint = isEndpoint(day);
            const between = isBetween(day);
            return (
              <div key={format(day, "yyyy-MM-dd")} className="flex justify-center">
                <button
                  type="button"
                  disabled={past}
                  onClick={() => handleClick(day)}
                  className={cn(
                    "relative flex h-9 w-9 items-center justify-center rounded-full text-sm font-semibold transition-all duration-200",
                    past && "cursor-not-allowed text-white/20",
                    !past && !endpoint && !between && "text-white hover:bg-white/15",
                    between && "bg-accent/25 text-white",
                    endpoint &&
                      "bg-accent text-black shadow-[0_6px_16px_-4px_var(--color-accent)]"
                  )}
                >
                  {isToday(day) && !endpoint && (
                    <span className="absolute bottom-1 h-1 w-1 rounded-full bg-accent" />
                  )}
                  {getDate(day)}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
);

GlassCalendar.displayName = "GlassCalendar";
