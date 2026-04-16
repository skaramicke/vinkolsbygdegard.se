import React from "react";
import { Brush, Flame, Heart, Star, BookOpen, Sparkles, type LucideIcon } from "lucide-react";

export type EventCategory =
  | "vårstäd"
  | "grillkväll"
  | "våffla"
  | "tomte"
  | "historia"
  | "städ";

type CategoryConfig = {
  Icon: LucideIcon;
  bg: string;
  fg: string;
  label: string;
};

const CONFIGS: Record<EventCategory, CategoryConfig> = {
  "vårstäd": {
    Icon: Brush,
    bg: "#587818",
    fg: "#f5efea",
    label: "Vårstäd",
  },
  "grillkväll": {
    Icon: Flame,
    bg: "#091733",
    fg: "#c9a866",
    label: "Grill",
  },
  "våffla": {
    Icon: Heart,
    bg: "#a07a30",
    fg: "#f5efea",
    label: "Våffla",
  },
  "tomte": {
    Icon: Star,
    bg: "#091733",
    fg: "#f5efea",
    label: "Tomte",
  },
  "historia": {
    Icon: BookOpen,
    bg: "#7d1818",
    fg: "#f5efea",
    label: "Historia",
  },
  "städ": {
    Icon: Sparkles,
    bg: "#5a4a3a",
    fg: "#f5efea",
    label: "Städ",
  },
};

const CategorySeal: React.FC<{ category: EventCategory }> = ({ category }) => {
  const cfg = CONFIGS[category];
  if (!cfg) return null;
  const { Icon, bg, fg, label } = cfg;

  return (
    <div
      className="flex flex-col items-center"
      style={{ marginTop: "0.75rem" }}
      aria-label={label}
    >
      {/* Thin divider above seal */}
      <div
        style={{
          width: "100%",
          height: 1,
          background:
            "linear-gradient(to right, transparent, rgba(160,122,48,0.45) 50%, transparent)",
          marginBottom: "0.6rem",
        }}
      />
      {/* Seal circle */}
      <div
        style={{
          position: "relative",
          width: 52,
          height: 52,
          borderRadius: "50%",
          background: bg,
          border: "1.5px solid rgba(160,122,48,0.7)",
          boxShadow:
            "inset 0 1px 0 rgba(245,239,234,0.15), inset 0 -1px 0 rgba(0,0,0,0.25), 0 4px 12px -6px rgba(26,18,8,0.4)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        {/* Dotted inner ring — wax seal rim */}
        <svg
          aria-hidden="true"
          viewBox="0 0 52 52"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            pointerEvents: "none",
          }}
        >
          <circle
            cx="26"
            cy="26"
            r="20"
            fill="none"
            stroke={fg}
            strokeWidth="0.75"
            strokeOpacity="0.3"
            strokeDasharray="2.2 3"
          />
        </svg>
        <Icon size={22} color={fg} strokeWidth={1.6} />
      </div>
      {/* Category label */}
      <span
        style={{
          fontFamily: '"Fraunces", Georgia, serif',
          fontVariationSettings: '"opsz" 9',
          fontSize: "0.57rem",
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          marginTop: "0.35rem",
          color: "var(--ink-muted)",
          display: "block",
          textAlign: "center",
          opacity: 0.75,
        }}
      >
        {label}
      </span>
    </div>
  );
};

export default CategorySeal;
