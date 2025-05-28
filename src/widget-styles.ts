import type { Theme } from './types'

export const getWidgetStyles = (theme: Theme): string => `
  :host {
    display: block;
    font-family: sans-serif;
    border: 1px solid #ccc;
    border-radius: 8px;
    padding: 16px;
    margin: 16px 0;
    background-color: ${theme === 'dark' ? '#333' : '#fff'};
    color: ${theme === 'dark' ? '#fff' : '#333'};
    max-width: 400px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  }
  .card-header {
    font-size: 1.2em;
    font-weight: bold;
    margin-bottom: 8px;
  }
  .card-content {
    font-size: 1em;
    margin-bottom: 12px;
    white-space: pre-wrap; /* To respect newlines in content */
  }
  .card-footer {
    font-size: 0.9em;
    color: ${theme === 'dark' ? '#aaa' : '#555'};
  }
  .error {
    color: red;
  }
`
