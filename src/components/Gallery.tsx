import React from "react";
import Image, { ImageProps } from "./Image";

export interface GalleryProps {
  type: "gallery";
  heading?: string;
  images: ImageProps[];
}

const Gallery = (props: GalleryProps) => (
  <div>
    {props.heading && <h1>{props.heading}</h1>}
    {props.images.map((image) => (
      <Image {...image} />
    ))}
  </div>
);

export default Gallery;
