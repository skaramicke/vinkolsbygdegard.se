import React from "react";
import TextBlock, { TextBlockProps } from "./TextBlock";
import Image, { ImageProps } from "./Image";
import Gallery, { GalleryProps } from "./Gallery";

export type ContentData =
  | TextBlockProps
  | ImageProps
  | GalleryProps
  | (TextBlockProps | ImageProps | GalleryProps)[];

interface ContentProps {
  data: ContentData;
}

const Content = (props: ContentProps) => {
  if (Array.isArray(props.data)) {
    return (
      <div>
        {props.data.map((content) => (
          <Content data={content} />
        ))}
      </div>
    );
  }

  switch (props.data.type) {
    case "text":
      return <TextBlock {...props.data} />;
    case "image":
      return <Image {...props.data} />;
    case "gallery":
      return <Gallery {...props.data} />;
  }
};

export default Content;
