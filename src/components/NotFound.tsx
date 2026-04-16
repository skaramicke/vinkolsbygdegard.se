import React from "react";
import { Link } from "react-router-dom";

const NotFound: React.FC = () => (
  <article className="fade-in-up text-center py-10 md:py-16">
    {/* Notice-board top ornament */}
    <div className="ornament-divider mb-8 text-light-gold">
      <svg width="14" height="14" viewBox="0 0 16 16" aria-hidden>
        <path
          d="M8 1 L9.6 6.4 L15 8 L9.6 9.6 L8 15 L6.4 9.6 L1 8 L6.4 6.4 Z"
          fill="currentColor"
        />
      </svg>
    </div>

    {/* Printed notice frame */}
    <div
      className="inline-block relative mx-auto"
      style={{
        border: "1px solid rgba(160,122,48,0.45)",
        boxShadow:
          "inset 0 0 0 4px rgba(245,239,234,0.9), inset 0 0 0 5px rgba(160,122,48,0.22), 0 2px 24px -8px rgba(26,18,8,0.18)",
        padding: "2.5rem 3rem 2rem",
        maxWidth: "36rem",
        background:
          "linear-gradient(160deg, rgba(255,255,255,0.35) 0%, rgba(245,239,234,0) 60%)",
      }}
    >
      {/* Inner double rule top */}
      <div
        className="rule-double mb-6 opacity-30"
        style={{ color: "var(--gold)" }}
      />

      <p className="masthead-eyebrow text-light-primary mb-5 tracking-widest">
        Meddelande
      </p>

      <div
        className="masthead-title text-light-text"
        style={{
          fontFamily: '"Fraunces", Georgia, serif',
          fontVariationSettings: '"opsz" 144, "SOFT" 20, "WONK" 0',
          fontWeight: 600,
          fontSize: "clamp(6rem, 18vw, 10rem)",
          lineHeight: 0.88,
          letterSpacing: "-0.02em",
          color: "var(--ink)",
        }}
        aria-label="404 — sidan hittades inte"
      >
        <span style={{ color: "var(--gold)", opacity: 0.7 }}>4</span>
        <span
          style={{
            color: "var(--falu)",
            fontStyle: "italic",
            fontWeight: 400,
            fontSize: "0.78em",
          }}
        >
          0
        </span>
        <span style={{ color: "var(--gold)", opacity: 0.7 }}>4</span>
      </div>

      <div className="ornament-divider my-6 text-light-gold">
        <svg width="56" height="14" viewBox="0 0 56 14" aria-hidden>
          <path
            d="M0 7 L18 7 M28 1 L31 7 L28 13 L25 7 Z M38 7 L56 7"
            stroke="currentColor"
            strokeWidth="1"
            fill="currentColor"
          />
        </svg>
      </div>

      <p
        className="font-display italic text-light-muted"
        style={{ fontSize: "1.35rem", lineHeight: 1.45, marginBottom: "0.5rem" }}
      >
        Denna sida finns inte
      </p>

      {/* Inner double rule bottom */}
      <div
        className="rule-double mt-6 opacity-30"
        style={{ color: "var(--gold)" }}
      />
    </div>

    {/* Body text */}
    <p
      className="text-light-muted mt-8 mx-auto"
      style={{
        fontFamily: '"Source Serif 4", Georgia, serif',
        fontSize: "1.05rem",
        lineHeight: 1.75,
        maxWidth: "28rem",
      }}
    >
      Den sida du sökte tycks ha tagit en annan väg. Kanske är den borttagen,
      eller så har länken förirrat sig bland bygdens gångstigar.
    </p>

    {/* Home link */}
    <div className="mt-10">
      <Link to="/" className="see-all-link">
        <svg
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
          aria-hidden
          style={{ transform: "rotate(180deg)" }}
        >
          <path
            d="M2 7h10M8 3l4 4-4 4"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        Till startsidan
      </Link>
    </div>

    {/* Bottom ornament */}
    <div className="ornament-divider mt-12 text-light-gold">
      <svg width="14" height="14" viewBox="0 0 16 16" aria-hidden>
        <path
          d="M8 1 L9.6 6.4 L15 8 L9.6 9.6 L8 15 L6.4 9.6 L1 8 L6.4 6.4 Z"
          fill="currentColor"
        />
      </svg>
    </div>
  </article>
);

export default NotFound;
