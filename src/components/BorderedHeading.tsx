import React from "react";

type BorderedHeadingProps = {
  children: React.ReactNode;
};
export const BorderedHeading: React.FC<BorderedHeadingProps> = ({
  children,
}) => (
  <>
    {children}
    <div className=" bg-light-accent dark:bg-dark-accent w-full h-1 bottom-0" />
  </>
);
