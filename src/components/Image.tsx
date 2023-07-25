import React from "react";
import { CmsImage } from "../types/cms";

const Image = ({ heading, image, alt, caption }: CmsImage) => {
  return (
    <div>
      {heading && <h1>{heading}</h1>}
      <img src={image} alt={alt} />
      <p>{caption}</p>
    </div>
  );
};

export default Image;
