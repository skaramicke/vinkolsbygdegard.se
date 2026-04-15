import React from "react";
import { Link } from "react-router-dom";
import { CmsImage, CmsText } from "../types/cms";
import Content from "./Content";

type FooterProps = {
  items: (CmsText | CmsImage)[];
};

const isImage = (item: CmsText | CmsImage): item is CmsImage =>
  item.type === "image";

const GUTTER = "px-5 md:px-10 lg:px-14";

const Footer: React.FC<FooterProps> = ({ items }) => {
  const logo = items.find(isImage);
  const textBlocks = items.filter((i): i is CmsText => i.type === "text");

  return (
    <footer className="mt-16 md:mt-24 bg-light-secondary text-light-textOnSecondary">
      <div className="border-t border-light-gold/55">
        <div
          className={`container mx-auto max-w-screen-lg ${GUTTER} py-12 md:py-16`}
        >
          <div className="grid gap-12 md:gap-6 md:grid-cols-12">
            <section className="foot-col md:col-span-5">
              <Link to="/" className="inline-block group">
                <div className="foot-eyebrow mb-3">
                  Vinköls · Sedan 1923
                </div>
                <div className="foot-masthead text-4xl md:text-5xl text-light-background">
                  Bygdegårds
                  <span className="italic font-normal text-light-goldLight">
                    förening
                  </span>
                </div>
              </Link>
              {logo && (
                <div className="mt-6 flex items-center gap-4">
                  <img
                    src={logo.image}
                    alt={logo.alt}
                    className="w-24 h-24 object-contain opacity-95"
                  />
                  <p className="font-display italic text-light-background/80 text-sm leading-relaxed max-w-[14rem]">
                    Bygdens samlingspunkt för kalas, möten
                    och vardagsfika.
                  </p>
                </div>
              )}
            </section>

            {textBlocks.slice(0, 2).map((item, i) => (
              <section
                key={i}
                className={`foot-col md:col-span-3 ${
                  i === 0 ? "md:col-start-7" : "md:col-start-10"
                }`}
              >
                <Content data={item} depth={0} onDark />
              </section>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-light-gold/30 bg-black/20">
        <div
          className={`container mx-auto max-w-screen-lg ${GUTTER} py-4 flex flex-col md:flex-row items-center justify-between gap-3`}
        >
          <p className="foot-eyebrow !tracking-[0.22em] opacity-80">
            © {new Date().getFullYear()} Vinköls Bygdegårdsförening
          </p>
          <div className="flex items-center gap-3 text-light-gold/80">
            <span className="h-px w-8 bg-current opacity-60" />
            <svg width="10" height="10" viewBox="0 0 14 14" aria-hidden>
              <path
                d="M7 0 L8.4 5.6 L14 7 L8.4 8.4 L7 14 L5.6 8.4 L0 7 L5.6 5.6 Z"
                fill="currentColor"
              />
            </svg>
            <span className="h-px w-8 bg-current opacity-60" />
          </div>
          <p className="foot-eyebrow !tracking-[0.22em] opacity-80">
            Vinköl · Skara
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
