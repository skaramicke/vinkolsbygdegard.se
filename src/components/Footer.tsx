import React, { useEffect } from "react";
import { CmsImage, CmsText } from "../types/cms";
import Content from "./Content";

type FooterProps = {
  items: (CmsText | CmsImage)[];
};

const Footer: React.FC<FooterProps> = ({ items }) => {
  const [gridStyle, setGridStyle] = React.useState({} as any);

  useEffect(() => {
    if (!items.length || items.length < 1) return;
    switch (items.length) {
      case 1:
        setGridStyle("grid grid-cols-1");
        break;

      case 2:
        setGridStyle("grid grid-cols-1 lg:grid-cols-2 lg:gap-4");
        break;

      case 3:
        setGridStyle("grid grid-cols-1 lg:grid-cols-3 lg:gap-4");
        break;

      case 4:
        setGridStyle("grid grid-cols-1 lg:grid-cols-4 lg:gap-4");
        break;

      case 5:
        setGridStyle("grid grid-cols-1 lg:grid-cols-3 lg:gap-4");
        break;
      default:
        break;
    }
  }, [items.length]);

  if (!items.length || items.length < 1) return null;

  return (
    <footer className="container px-8 mx-auto xl:px-5  max-w-screen-lg py-5 lg:py-8 bg-lime-100 border-l border-r">
      <div className={gridStyle}>
        {items.map((item, i) => (
          <Content key={i} data={item} depth={0} />
        ))}
      </div>
    </footer>
  );
};

export default Footer;
