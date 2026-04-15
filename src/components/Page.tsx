import React from "react";
import Content from "./Content";
import { usePageMeta } from "../hooks/usePageMeta";
import { CmsBlock, CmsText } from "../types/cms";

type PagePropsType = {
  title: string;
  subtitle?: string;
  body: any;
  description?: string;
  image?: string;
  children?: React.ReactNode;
};

function extractDescription(body: CmsBlock[]): string | undefined {
  const firstText = body?.find((b): b is CmsText => b.type === "text");
  if (!firstText?.body) return undefined;
  const stripped = firstText.body
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/[*_#`~>]/g, "")
    .replace(/\s+/g, " ")
    .trim();
  return stripped.slice(0, 200) || undefined;
}

function PageMeta({ title, description, image, body }: PagePropsType) {
  usePageMeta(title, description ?? extractDescription(body), image);
  return null;
}

const Page = ({
  title,
  subtitle = undefined,
  body,
  description,
  image,
  children,
}: PagePropsType) => (
  <>
    <PageMeta title={title} description={description} image={image} body={body} />
    <article className="fade-in-up">
    <header className="text-center mt-2 mb-8 md:mb-10">
      <div className="ornament-divider mb-5 text-light-gold">
        <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden>
          <path
            d="M7 0 L8.4 5.6 L14 7 L8.4 8.4 L7 14 L5.6 8.4 L0 7 L5.6 5.6 Z"
            fill="currentColor"
          />
        </svg>
      </div>
      <h1 className="masthead-title text-light-text text-4xl md:text-6xl">
        {title}
      </h1>
      {subtitle && (
        <p className="font-display italic text-light-muted mt-3 text-lg">
          {subtitle}
        </p>
      )}
      <div className="ornament-divider mt-6 text-light-gold">
        <svg
          width="60"
          height="14"
          viewBox="0 0 60 14"
          aria-hidden
        >
          <path
            d="M0 7 L18 7 M30 1 L33 7 L30 13 L27 7 Z M42 7 L60 7"
            stroke="currentColor"
            strokeWidth="1"
            fill="currentColor"
          />
        </svg>
      </div>
    </header>
    <div className="prose-vbg">
      <Content data={body} depth={0} />
    </div>
      {children}
    </article>
  </>
);

export default Page;
