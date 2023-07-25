import React from "react";
import Content from "./Content";

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
    <h1 className="mt-2 mb-3 text-3xl font-semibold tracking-tight text-center lg:leading-snug text-brand-primary lg:text-4xl">
      {title}
    </h1>
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
