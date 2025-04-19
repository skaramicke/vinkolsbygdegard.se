declare module 'decap-cms-lib-util/src/stega' {
  import { Map as ImmutableMap, List } from 'immutable';
  import { CmsField } from 'decap-cms-core';
  
  // Add other exported functions/objects from the module here
  export function stegaEncode(content: any, data: any): string;
  export function stegaDecode(content: string): any;
}