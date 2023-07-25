/**
 * This file contains the types for the CMS blocks.
 */

import Alignable from "./alignable";

export type CmsBlock = CmsText | CmsImage | CmsColumns | CmsGallery;

export type CmsText = {
  heading: string;
  type: "text";
  body: string;
};

export type CmsImage = {
  heading: string;
  type: "image";
  image: string;
  alt: string;
  caption: string;
};

export type CmsColumns = {
  heading: string;
  type: "columns";
  leftAlign?: Alignable["align"];
  left: (CmsText | CmsImage)[];
  rightAlign?: Alignable["align"];
  right: (CmsText | CmsImage)[];
};

export type CmsGallery = {
  heading: string;
  type: "gallery";
  images: CmsImage[];
};

export type CmsPage = {
  slug: string;
  order: number;
  title: string;
  showInMenu: boolean;
  body: CmsBlock[];
};

export type CmsEvent = {
  slug: string;
  title: string;
  date: string;
  thumbnail?: string | null | undefined;
  body: CmsBlock[];
};

export type CmsNewsArticle = {
  slug: string;
  title: string;
  date: string;
  thumbnail?: string | null | undefined;
  body: CmsBlock[];
};

export type CmsSettings = {
  slug: string;
  title: string;
  banner?: CmsImage | undefined;
  startPage: string;
  eventsPage: string;
  newsPage: string;
  footer: (CmsText | CmsImage)[];
};
