import { useEffect } from "react";

const SITE_NAME = "Vinköls Bygdegårdsförening";
const DEFAULT_IMAGE = "/images/header.png";
let siteDescription =
  "Vinköls Bygdegårdsförening — bygdens samlingsplats sedan 1923. Evenemang, uthyrning och historia från Vinköl.";

export function setSiteDescription(desc: string) {
  siteDescription = desc;
}

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

function setLinkCanonical(url: string) {
  let el = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", "canonical");
    document.head.appendChild(el);
  }
  el.setAttribute("href", url);
}

function setJsonLd(schema: object) {
  let el = document.querySelector<HTMLScriptElement>(
    'script[type="application/ld+json"][data-page]'
  );
  if (!el) {
    el = document.createElement("script");
    el.setAttribute("type", "application/ld+json");
    el.setAttribute("data-page", "1");
    document.head.appendChild(el);
  }
  el.textContent = JSON.stringify(schema);
}

export function usePageMeta(
  title: string,
  description?: string,
  image?: string,
  schema?: object
) {
  useEffect(() => {
    const pageTitle = `${title} — ${SITE_NAME}`;
    const pageDesc = description || siteDescription;
    const pageImage = image || DEFAULT_IMAGE;
    const absoluteImage = pageImage.startsWith("http")
      ? pageImage
      : `${window.location.origin}${pageImage}`;
    const canonicalUrl =
      window.location.origin + window.location.pathname;

    document.title = pageTitle;
    setMetaName("description", pageDesc);
    setLinkCanonical(canonicalUrl);

    setMetaProperty("og:title", pageTitle);
    setMetaProperty("og:description", pageDesc);
    setMetaProperty("og:image", absoluteImage);
    setMetaProperty("og:type", "website");
    setMetaProperty("og:site_name", SITE_NAME);
    setMetaProperty("og:url", canonicalUrl);

    setMetaName("twitter:card", "summary_large_image");
    setMetaName("twitter:title", pageTitle);
    setMetaName("twitter:description", pageDesc);
    setMetaName("twitter:image", absoluteImage);

    if (schema) {
      setJsonLd(schema);
    }
  }, [title, description, image, schema]);
}
