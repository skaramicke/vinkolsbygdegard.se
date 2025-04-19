/// <reference types="react-scripts" />

// Decap CMS modules
declare module "decap-cms-lib-util/src/stega" {
  export function stegaEncode(content: any, data: any): string;
  export function stegaDecode(content: string): any;
  export const isImmutableMap: (obj: any) => boolean;
  export const isImmutableList: (obj: any) => boolean;
}

declare module "decap-cms-core" {
  export interface CmsField {
    name: string;
    label: string;
    widget: string;
    [key: string]: any;
  }
}

// Make sure immutable is declared
declare module "immutable" {
  export type Map<K, V> = any;
  export type List<T> = any;
}