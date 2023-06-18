import React from "react";

export interface ImageProps {
  type: "image";
  heading?: string;
  image: string; // URL
  altText: string;
  caption: string;
}

const Image = (props: ImageProps) => (
  <div>
    {props.heading && <h1>{props.heading}</h1>}
    <img src={props.image} alt={props.altText} />
    <p>{props.caption}</p>
  </div>
);

export default Image;
