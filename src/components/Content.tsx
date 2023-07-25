import React, { ReactNode } from "react";
import Image from "./Image";
import Gallery from "./Gallery";
import { CmsBlock } from "../types/cms";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import cx from "classnames";
import Alignable from "../types/alignable";

type ContentPropsType = {
  data: CmsBlock | CmsBlock[];
  depth: number | undefined;
};

const Content: React.FC<ContentPropsType & Alignable> = ({
  data,
  depth = 0,
  align,
}) => {
  const alignClass = align ? `align-${align}` : "align-left";

  if (Array.isArray(data)) {
    return data.map((content, i) => (
      <Content
        key={`content row ${i}`}
        data={content}
        depth={depth}
        align={align}
      />
    ));
  }

  let heading: ReactNode = null;

  if (data.heading) {
    switch (depth) {
      case 0:
        heading = <h2 className="text-2xl font-semibold">{data.heading}</h2>;
        break;
      case 1:
        heading = <h3 className="text-xl font-semibold">{data.heading}</h3>;
        break;
      case 2:
        heading = <h4 className="text-lg font-semibold">{data.heading}</h4>;
        break;
      default:
        heading = <h5 className="text-base font-semibold">{data.heading}</h5>;
        break;
    }
  }

  switch (data.type) {
    case "text":
      return (
        <section className={cx("my-5", alignClass)} data-comment="text">
          {heading}
          <ReactMarkdown>{data.body}</ReactMarkdown>
        </section>
      );
    case "image":
      return (
        <section className={cx("my-5", alignClass)} data-comment="image">
          {heading}
          <Image {...data} />
        </section>
      );
    case "gallery":
      return (
        <section className={cx("my-5", alignClass)} data-comment="gallery">
          {heading}
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
        <section className={cx("my-5", alignClass)} data-comment="columns">
          {heading}
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
