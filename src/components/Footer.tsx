import React from "react";
import { CmsImage, CmsText } from "../types/cms";
import Content from "./Content";

type FooterProps = {
  items: (CmsText | CmsImage)[];
};

const Footer: React.FC<FooterProps> = ({ items }) => (
  <footer className="container px-8 mx-auto xl:px-5  max-w-screen-lg py-5 lg:py-8 bg-lime-100 border-l border-r">
    <div className="flex flex-wrap justify-between gap-1">
      {items.map((item, i) => (
        <Content key={i} data={item} depth={0} />
      ))}
    </div>
  </footer>
);

export default Footer;
