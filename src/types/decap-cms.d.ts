declare module 'decap-cms-lib-util/src/stega' {
  import { Map, List } from 'immutable';
  
  export function stegaEncode(content: any, data: any): string;
  export function stegaDecode(content: string): any;
  export const isImmutableMap: (obj: any) => boolean;
  export const isImmutableList: (obj: any) => boolean;
}

declare module 'decap-cms-core' {
  export interface CmsField {
    name: string;
    label: string;
    widget: string;
    [key: string]: any;
  }
}

declare module 'immutable' {
  export interface Map<K, V> {
    get<T>(key: K): T;
    set<T>(key: K, value: T): Map<K, V>;
    // Add other methods as needed
  }
  
  export interface List<T> {
    get(index: number): T;
    // Add other methods as needed
  }
}