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
        setGridStyle("grid grid-cols-1 place-items-center items-start");
        break;

      case 2:
        setGridStyle(
          "grid grid-cols-1 place-items-center items-start md:grid-cols-2 md:gap-4"
        );
        break;

      case 3:
        setGridStyle(
          "grid grid-cols-1 place-items-center items-start md:grid-cols-3 md:gap-4"
        );
        break;

      case 4:
        setGridStyle(
          "grid grid-cols-1 place-items-center items-start md:grid-cols-4 md:gap-4"
        );
        break;

      case 5:
        setGridStyle(
          "grid grid-cols-1 place-items-center items-start md:grid-cols-3 md:gap-4"
        );
        break;
      default:
        break;
    }
  }, [items.length]);

  if (!items.length || items.length < 1) return null;

  return (
    <footer className="container px-8 mx-auto xl:px-5  max-w-screen-lg py-5 md:py-8 bg-light-secondary dark:bg-dark-secondary">
      <div className={gridStyle}>
        {items.map((item, i) => (
          <Content key={i} data={item} depth={0} onDark />
        ))}
      </div>
    </footer>
  );
};

export default Footer;
