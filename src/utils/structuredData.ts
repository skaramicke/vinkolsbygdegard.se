import { CmsBlock, CmsEvent, CmsNewsArticle, CmsText } from "../types/cms";

const BASE_URL = "https://vinkolsbygdegard.se";
const ORG_NAME = "Vinköls Bygdegårdsförening";

export function extractTextDescription(body: CmsBlock[]): string | undefined {
  const firstText = body?.find((b): b is CmsText => b.type === "text");
  if (!firstText?.body) return undefined;
  const stripped = firstText.body
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/[*_#`~>]/g, "")
    .replace(/\s+/g, " ")
    .trim();
  return stripped.slice(0, 200) || undefined;
}

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: ORG_NAME,
    url: BASE_URL,
    logo: `${BASE_URL}/logo192.png`,
    foundingDate: "1923",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Vinköl",
      addressRegion: "Västra Götaland",
      addressCountry: "SE",
    },
  };
}

export function eventListSchema(events: CmsEvent[]) {
  if (events.length === 0) return null;
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: events.map((e, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Event",
        name: e.title,
        startDate: e.date,
        ...(e.endDate ? { endDate: e.endDate } : {}),
        location: {
          "@type": "Place",
          name: ORG_NAME,
          address: {
            "@type": "PostalAddress",
            addressLocality: "Vinköl",
            addressCountry: "SE",
          },
        },
        organizer: {
          "@type": "Organization",
          name: e.organizerName ?? ORG_NAME,
          ...(e.organizerName ? {} : { url: BASE_URL }),
        },
        url: `${BASE_URL}/evenemang`,
      },
    })),
  };
}

export function newsArticleSchema(news: CmsNewsArticle, body: CmsBlock[]) {
  const description = extractTextDescription(body) ?? news.title;
  return {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: news.title,
    datePublished: news.date,
    description,
    publisher: {
      "@type": "Organization",
      name: ORG_NAME,
      url: BASE_URL,
    },
    url: `${BASE_URL}/nyheter/${news.slug}`,
    ...(news.thumbnail
      ? {
          image: news.thumbnail.startsWith("http")
            ? news.thumbnail
            : `${BASE_URL}${news.thumbnail}`,
        }
      : {}),
  };
}
