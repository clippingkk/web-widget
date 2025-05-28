export interface ClippingData {
  id: string;
  content: string;
  book: string;
  author: string;
  location: string;
  createdAt: string; // Or Date, if you prefer to handle date objects
}

export interface ClippingError {
  error: string;
}

export type Theme = 'light' | 'dark';
