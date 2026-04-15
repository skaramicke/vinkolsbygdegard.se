import cx from "classnames";
import React from "react";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import { Link } from "react-router-dom";
import remarkGfm from "remark-gfm";
import { BorderedHeading } from "./BorderedHeading";

type StyledMarkdownProps = {
  children: string;
  onDark?: boolean;
};

const StyledMarkdown: React.FC<StyledMarkdownProps> = ({
  children,
  onDark = false,
}) => {
  const textClassName = onDark ? "text-light-background" : "text-light-text";
  const linkClassName = onDark
    ? "text-light-goldLight hover:text-white"
    : "text-light-primary hover:text-light-primaryDark";
  const headingFont = "font-display";

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
                "underline decoration-light-gold/60 underline-offset-4 hover:decoration-current"
              )}
              {...props}
              {...extraProps}
            >
              {props.children}
            </Element>
          );
        },

        h1: ({ node, ...props }) => (
          <BorderedHeading large>
            <h2
              className={cx(
                textClassName,
                headingFont,
                "section-heading text-3xl md:text-4xl mt-8"
              )}
              {...props}
            >
              {props.children}
            </h2>
          </BorderedHeading>
        ),

        h2: ({ node, ...props }) => (
          <BorderedHeading>
            <h3
              className={cx(
                textClassName,
                headingFont,
                "section-heading text-2xl md:text-3xl mt-8"
              )}
              {...props}
            >
              {props.children}
            </h3>
          </BorderedHeading>
        ),

        h3: ({ node, ...props }) => (
          <h4
            className={cx(
              textClassName,
              headingFont,
              "text-xl md:text-2xl mt-6 mb-1"
            )}
            {...props}
          >
            {props.children}
          </h4>
        ),

        h4: ({ node, ...props }) => (
          <h5
            className={cx(
              textClassName,
              headingFont,
              "text-lg mt-5 mb-1 italic"
            )}
            {...props}
          >
            {props.children}
          </h5>
        ),

        h5: ({ node, ...props }) => (
          <h6
            className={cx(
              textClassName,
              "eyebrow mt-4",
              onDark ? "text-light-goldLight" : "text-light-primary"
            )}
            {...props}
          >
            {props.children}
          </h6>
        ),

        h6: ({ node, ...props }) => (
          <h6
            className={cx(
              textClassName,
              "eyebrow mt-3",
              onDark ? "text-light-goldLight" : "text-light-primary"
            )}
            {...props}
          >
            {props.children}
          </h6>
        ),

        p: ({ node, ...props }) => (
          <p
            className={cx(
              textClassName,
              "my-3 leading-relaxed"
            )}
            {...props}
          >
            {props.children}
          </p>
        ),

        ul: ({ node, ...props }) => (
          <ul
            className={cx(
              textClassName,
              "list-none ml-0 my-3 space-y-1.5"
            )}
            {...props}
          >
            {React.Children.map(props.children, (child) =>
              typeof child === "object" && child !== null ? (
                <li className="pl-5 relative">
                  <span
                    aria-hidden
                    className={cx(
                      "absolute left-0 top-[0.62em] text-xs",
                      onDark ? "text-light-goldLight" : "text-light-gold"
                    )}
                  >
                    ◆
                  </span>
                  {(child as any).props?.children ?? child}
                </li>
              ) : (
                child
              )
            )}
          </ul>
        ),

        ol: ({ node, ...props }) => (
          <ol
            className={cx(textClassName, "list-decimal ml-5 my-3 space-y-1.5")}
            {...props}
          >
            {props.children}
          </ol>
        ),

        blockquote: ({ node, ...props }) => (
          <blockquote
            className={cx(
              "border-l-2 border-light-gold pl-4 my-4 italic font-display text-lg",
              onDark ? "text-light-background/90" : "text-light-muted"
            )}
            {...props}
          >
            {props.children}
          </blockquote>
        ),

        strong: ({ node, ...props }) => (
          <strong
            className={cx(
              "font-semibold",
              onDark ? "text-white" : "text-light-text"
            )}
            {...props}
          >
            {props.children}
          </strong>
        ),
      }}
    >
      {children}
    </ReactMarkdown>
  );
};

export default StyledMarkdown;
