
declare namespace JSX {
  interface IntrinsicElements {
    'spline-viewer': {
      url: string;
      style?: React.CSSProperties;
      loading?: 'lazy' | 'eager';
      'background-color'?: string;
      'background-alpha'?: string;
      children?: React.ReactNode;
      id?: string;
      className?: string;
    };
  }
}

// Make sure TypeScript recognizes the spline-viewer as a valid HTML element
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'spline-viewer': any;
    }
  }
}
