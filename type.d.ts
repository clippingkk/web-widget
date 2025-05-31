import * as React from 'react'
import type { ClippingData } from './dist/clippingkk-web-widget'
import { register, widgetName } from './dist/clippingkk-web-widget'

declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      'clippingkk-web-widget': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        'clippingid'?: number;
        theme?: 'light' | 'dark';
        endpoint?: `http${'s' | ''}://${string}`;
        /** ClippingData */
        'clippingdata'?: string;
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
