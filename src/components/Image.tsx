import React from "react";
import { CmsImage } from "../types/cms";

type ImageProps = CmsImage & {
  onDark?: boolean;
};

const Image = ({ heading, image, alt, caption, onDark = false }: ImageProps) => {
  return (
    <figure className="my-4">
      {heading && (
        <h3
          className={`font-display text-xl mb-2 ${
            onDark ? "text-light-background" : "text-light-text"
          }`}
        >
          {heading}
        </h3>
      )}
      <div className="border border-light-stone/60 bg-white/40 p-1 shadow-paper">
        <img src={image} alt={alt} className="w-full block" />
      </div>
      {caption && (
        <figcaption
          className={`mt-2 italic font-display text-sm text-center ${
            onDark ? "text-light-background/80" : "text-light-muted"
          }`}
        >
          {caption}
        </figcaption>
      )}
    </figure>
  );
};

export default Image;
