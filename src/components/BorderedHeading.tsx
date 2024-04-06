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
    <div
      className={cx(
        " bg-light-accent dark:bg-dark-accent w-full h-0.5 bottom-0",
        large ? "h-1" : "h-0.5"
      )}
    />
  </>
);
