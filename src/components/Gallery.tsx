import React from "react";
import Image from "./Image";
import { CmsGallery } from "../types/cms";

const Gallery = ({ heading, images }: CmsGallery) => (
  <div>
    {heading && <h2>{heading}</h2>}
    <div className="flex justify-between flex-wrap max-w-l gap-2">
      {images.map((image, i) => (
        <Image key={`${i} ${image.image}`} {...image} />
      ))}
    </div>
  </div>
);

export default Gallery;
