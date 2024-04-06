import React, { ReactNode } from "react";
import Image from "./Image";
import Gallery from "./Gallery";
import { CmsBlock } from "../types/cms";
import StyledMarkdown from "./StyledMarkdown";
import cx from "classnames";
import Alignable from "../types/alignable";
import { BorderedHeading } from "./BorderedHeading";

type ContentPropsType = {
  data: CmsBlock | CmsBlock[];
  depth: number | undefined;
  onDark?: boolean;
};

const Content: React.FC<ContentPropsType & Alignable> = ({
  data,
  depth = 0,
  align,
  onDark = false,
}) => {
  const alignClass = align ? `align-${align}` : "align-left";

  if (Array.isArray(data)) {
    return data.map((content, i) => (
      <Content
        key={`content row ${i}`}
        data={content}
        depth={depth}
        align={align}
        onDark={onDark}
      />
    ));
  }

  let heading: ReactNode = null;

  if (data.heading) {
    switch (depth) {
      case 0:
        heading = (
          <h2
            className={`text-2xl font-semibold ${
              onDark ? "text-light-background" : "text-light-text"
            }`}
          >
            {data.heading}
          </h2>
        );
        break;
      case 1:
        heading = (
          <h3
            className={`text-xl font-semibold ${
              onDark ? "text-light-background" : "text-light-text"
            }`}
          >
            {data.heading}
          </h3>
        );
        break;
      case 2:
        heading = (
          <h4
            className={`text-lg font-semibold ${
              onDark ? "text-light-background" : "text-light-text"
            }`}
          >
            {data.heading}
          </h4>
        );
        break;
      default:
        heading = (
          <h5
            className={`text-base font-semibold ${
              onDark ? "text-light-background" : "text-light-text"
            }`}
          >
            {data.heading}
          </h5>
        );
        break;
    }
  }

  switch (data.type) {
    case "text":
      return (
        <section className={cx("my-5 w-full", alignClass)} data-comment="text">
          {heading && <BorderedHeading>{heading}</BorderedHeading>}
          <StyledMarkdown onDark={onDark}>{data.body}</StyledMarkdown>
        </section>
      );
    case "image":
      return (
        <section className={cx("my-5", alignClass)} data-comment="image">
          {heading && <BorderedHeading>{heading}</BorderedHeading>}
          <Image {...data} />
        </section>
      );
    case "gallery":
      return (
        <section
          className={cx("my-5 w-full", alignClass)}
          data-comment="gallery"
        >
          {heading && <BorderedHeading>{heading}</BorderedHeading>}
          <Gallery {...data} />
        </section>
      );
    case "columns":
      const alignLeftClass = data.leftAlign
        ? `align-${data.leftAlign}`
        : "align-left";
      const alignRightClass = data.rightAlign
        ? `align-${data.rightAlign}`
        : "align-left";
      return (
        <section
          className={cx("my-5 w-full", alignClass)}
          data-comment="columns"
        >
          {heading && <BorderedHeading>{heading}</BorderedHeading>}
          <div className="flex gap-10">
            <div className={cx("w-1/2", alignLeftClass)}>
              <Content
                data={data.left}
                depth={depth + 1}
                align={data.leftAlign}
              />
            </div>
            <div className={cx("w-1/2", alignRightClass)}>
              <Content
                data={data.right}
                depth={depth + 1}
                align={data.rightAlign}
              />
            </div>
          </div>
        </section>
      );
    default:
      console.log(
        "Content.tsx, data.type",
        (data as CmsBlock).type,
        "not implemented"
      );
      return null;
  }
};

export default Content;
