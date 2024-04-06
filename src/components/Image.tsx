import React from "react";
import { CmsImage } from "../types/cms";

type ImageProps = CmsImage & {
  onDark?: boolean;
};

const Image = ({
  heading,
  image,
  alt,
  caption,
  onDark = false,
}: ImageProps) => {
  return (
    <div>
      {heading && <h1>{heading}</h1>}
      <img src={image} alt={alt} />
      <p>{caption}</p>
    </div>
  );
};

export default Image;
