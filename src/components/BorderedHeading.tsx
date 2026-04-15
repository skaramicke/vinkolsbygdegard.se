import React from "react";
import cx from "classnames";

type BorderedHeadingProps = {
  children: React.ReactNode;
  large?: boolean;
};
export const BorderedHeading: React.FC<BorderedHeadingProps> = ({
  children,
  large,
}) => (
  <>
    {children}
    {large ? (
      <div className="flex items-center gap-3 mt-2 mb-4 text-light-gold">
        <span className="h-px flex-1 bg-current opacity-60" />
        <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden>
          <path d="M7 0 L8.4 5.6 L14 7 L8.4 8.4 L7 14 L5.6 8.4 L0 7 L5.6 5.6 Z" fill="currentColor" />
        </svg>
        <span className="h-px flex-1 bg-current opacity-60" />
      </div>
    ) : (
      <div
        className={cx(
          "rule-double text-light-gold mt-1 mb-3 w-full"
        )}
      />
    )}
  </>
);
