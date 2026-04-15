import React from "react";
import { CmsGallery } from "../types/cms";

const Gallery = ({ heading, images }: CmsGallery) => (
  <div className="my-6">
    {heading && (
      <h3 className="font-display text-xl mb-3 text-light-text">{heading}</h3>
    )}
    <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
      {images.map((image, i) => (
        <figure
          key={`${i} ${image.image}`}
          className={`border border-light-stone/60 bg-white/40 p-1 shadow-paper ${
            i % 3 === 1 ? "md:translate-y-3" : ""
          }`}
        >
          <img
            src={image.image}
            alt={image.alt}
            className="w-full block aspect-[4/3] object-cover"
          />
          {image.caption && (
            <figcaption className="mt-1.5 text-center italic font-display text-xs text-light-muted px-1">
              {image.caption}
            </figcaption>
          )}
        </figure>
      ))}
    </div>
  </div>
);

export default Gallery;
