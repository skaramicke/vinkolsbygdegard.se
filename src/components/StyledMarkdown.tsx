import React from "react";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import { Link } from "react-router-dom";
import { BorderedHeading } from "./BorderedHeading";
import remarkGfm from "remark-gfm";
import cx from "classnames";
import { link } from "fs";

type StyledMarkdownProps = {
  children: string;
  onDark?: boolean;
};

const StyledMarkdown: React.FC<StyledMarkdownProps> = ({
  children,
  onDark = false,
}) => {
  const textClassName = onDark ? "text-light-background" : "text-light-text";
  const linkClassName = onDark ? "text-light-accent" : "text-light-secondary";
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      remarkRehypeOptions={{ passThrough: ["link"] }}
      components={{
        a: ({ node, ...props }) => {
          let Element: string | React.ComponentType<any> = "a";
          let extraProps = {};
          if (props.href?.startsWith("/")) {
            Element = Link;
            extraProps = { to: props.href };
          }
          return (
            <Element
              className={cx(
                linkClassName,
                "text-light-accent dark:text-dark-accent hover:underline"
              )}
              {...props}
              {...extraProps}
            >
              {props.children}
            </Element>
          );
        },

        h1: ({ node, ...props }) => (
          <BorderedHeading>
            <h2
              className={cx(textClassName, "text-2xl font-semibold mt-4")}
              {...props}
            >
              {props.children}
            </h2>
          </BorderedHeading>
        ),

        h2: ({ node, ...props }) => (
          <BorderedHeading>
            <h3
              className={cx(textClassName, "text-xl font-semibold mt-4")}
              {...props}
            >
              {props.children}
            </h3>
          </BorderedHeading>
        ),

        h3: ({ node, ...props }) => (
          <BorderedHeading>
            <h4
              className={cx(textClassName, "text-lg font-semibold mt-4")}
              {...props}
            >
              {props.children}
            </h4>
          </BorderedHeading>
        ),

        h4: ({ node, ...props }) => (
          <BorderedHeading>
            <h5
              className={cx(textClassName, "text-base font-semibold mt-4")}
              {...props}
            >
              {props.children}
            </h5>
          </BorderedHeading>
        ),

        h5: ({ node, ...props }) => (
          <BorderedHeading>
            <h6
              className={cx(textClassName, "text-base font-semibold mt-4")}
              {...props}
            >
              {props.children}
            </h6>
          </BorderedHeading>
        ),

        h6: ({ node, ...props }) => (
          <BorderedHeading>
            <h6
              className={cx(textClassName, "text-base font-semibold mt-4")}
              {...props}
            >
              {props.children}
            </h6>
          </BorderedHeading>
        ),

        p: ({ node, ...props }) => (
          <p className={cx(textClassName, "my-3")} {...props}>
            {props.children}
          </p>
        ),

        ul: ({ node, ...props }) => (
          <ul
            className={cx(textClassName, "list-disc ml-3 list-inside")}
            {...props}
          >
            {props.children}
          </ul>
        ),

        ol: ({ node, ...props }) => (
          <ol
            className={cx(textClassName, "list-decimal ml-3 list-inside")}
            {...props}
          >
            {props.children}
          </ol>
        ),
      }}
    >
      {children}
    </ReactMarkdown>
  );
};

export default StyledMarkdown;
