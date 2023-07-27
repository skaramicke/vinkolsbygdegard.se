import React from "react";
import Content from "./Content";
import { BorderedHeading } from "./BorderedHeading";

type PagePropsType = {
  title: string;
  subtitle?: string;
  body: any;
  children?: React.ReactNode;
};

const Page = ({
  title,
  subtitle = undefined,
  body,
  children,
}: PagePropsType) => (
  <div>
    <BorderedHeading>
      <h1 className="py-2 w-full md:w-auto text-3xl font-semibold text-light-text dark:text-dark-primary lg:text-4xl">
        {title}
      </h1>
    </BorderedHeading>
    {subtitle && (
      <div className="text-center">
        <p className="text-lg">{subtitle}</p>
      </div>
    )}
    <Content data={body} depth={0} />
    {children}
  </div>
);

export default Page;
