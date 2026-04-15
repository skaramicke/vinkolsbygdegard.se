import { useEffect } from "react";

const SITE_NAME = "Vinköls Bygdegårdsförening";
const DEFAULT_IMAGE = "/images/header.png";
const DEFAULT_DESCRIPTION =
  "Vinköls Bygdegårdsförening — bygdens samlingsplats sedan 1923. Evenemang, uthyrning och historia från Vinköl.";

function setMetaName(name: string, content: string) {
  let el = document.querySelector<HTMLMetaElement>(`meta[name="${name}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute("name", name);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function setMetaProperty(property: string, content: string) {
  let el = document.querySelector<HTMLMetaElement>(
    `meta[property="${property}"]`
  );
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute("property", property);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

export function usePageMeta(
  title: string,
  description?: string,
  image?: string
) {
  useEffect(() => {
    const pageTitle = `${title} — ${SITE_NAME}`;
    const pageDesc = description || DEFAULT_DESCRIPTION;
    const pageImage = image || DEFAULT_IMAGE;
    const absoluteImage = pageImage.startsWith("http")
      ? pageImage
      : `${window.location.origin}${pageImage}`;

    document.title = pageTitle;
    setMetaName("description", pageDesc);

    setMetaProperty("og:title", pageTitle);
    setMetaProperty("og:description", pageDesc);
    setMetaProperty("og:image", absoluteImage);
    setMetaProperty("og:type", "website");
    setMetaProperty("og:site_name", SITE_NAME);
    setMetaProperty("og:url", window.location.href);

    setMetaName("twitter:card", "summary_large_image");
    setMetaName("twitter:title", pageTitle);
    setMetaName("twitter:description", pageDesc);
    setMetaName("twitter:image", absoluteImage);
  }, [title, description, image]);
}
