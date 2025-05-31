import * as React from 'react'

declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      'clippingkk-web-widget': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        'clipping-id'?: number;
        theme?: 'light' | 'dark';
        endpoint?: string;
        // stringified json
        'clipping-data'?: string;
      };
    }
  }
}
