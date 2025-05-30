declare module 'react' {
    namespace JSX {
      interface IntrinsicElements {
        'clippingkk-web-widget': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
          clippingId?: number;
          theme?: 'light' | 'dark';
          endpoint?: string;
        };
      }
    }
}