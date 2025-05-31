import * as React from 'react'
import type { ClippingData } from './dist/clippingkk-web-widget'
import { register, widgetName } from './dist/clippingkk-web-widget'

declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      'clippingkk-web-widget': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        'clipping-id'?: number;
        theme?: 'light' | 'dark';
        endpoint?: string;
        /** ClippingData */
        'clipping-data'?: string;
      };
    }
  }
}

export {
  register,
  widgetName,
}

export type {
  ClippingData,
}
