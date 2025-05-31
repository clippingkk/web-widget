# @annatarhe/clippingkk-widget

`@annatarhe/clippingkk-widget` is a web component designed to display Kindle clippings from [ClippingKK](https://clippingkk.annatarhe.com). Built with Web Components technology, it can be easily integrated into any web framework (React, Vue, Angular, Svelte, or plain HTML/JS).

ClippingKK is a manager for your Kindle highlights and notes. This widget allows you to embed individual clippings into your website or application, displaying them in a visually appealing card format.

## Features

-   Display Kindle clippings by providing a `clippingId`.
-   Support for light and dark themes.
-   Option to provide clipping data directly to bypass fetching.
-   Customizable API endpoint.
-   Responsive design.

## Installation

You can install the widget using npm, yarn, or pnpm:

### npm
```bash
npm install @annatarhe/clippingkk-widget
```

### yarn
```bash
yarn add @annatarhe/clippingkk-widget
```

### pnpm
```bash
pnpm add @annatarhe/clippingkk-widget
```

## Usage

### 1. Import the Component

First, you need to import the component in your project's main JavaScript or TypeScript file. This registers the `<clippingkk-web-widget>` custom element, making it available for use in your HTML.

```typescript
// e.g., in main.js or app.ts
import { register } from '@annatarhe/clippingkk-widget';
register()
```

### 2. Use in Your HTML/Template

Once imported, you can use the `<clippingkk-web-widget>` tag like any other HTML element.

**Example 1: Basic Usage (Fetch by ID)**

Provide a `clippingid` to fetch and display a specific clipping. You can also specify a `theme`.

```html
<!-- Default (light) theme, using an example ID -->
<clippingkk-web-widget clippingid="20420"></clippingkk-web-widget>

<!-- Dark theme, using another example ID -->
<clippingkk-web-widget clippingid="8848" theme="dark"></clippingkk-web-widget>
```

**Example 2: Usage with Pre-loaded Data**

If you already have the clipping data (e.g., from your own backend or another API call), you can pass it directly using the `clippingdata` attribute. This avoids an additional network request by the widget. The data must be a valid JSON string.

```html
<clippingkk-web-widget
  clippingdata='{
    "id": "8848",
    "content": "This is a pre-loaded clipping content. It demonstrates how data can be passed directly.",
    "book": "The Art of Pre-loading",
    "author": "Data Master",
    "location": "#123-456",
    "createdAt": "2024-01-15T10:00:00Z",
    "creator": {
      "id": "1",
      "name": "AnnatarHe",
      "avatar": "https://avatars.githubusercontent.com/u/8704175?v=4"
    }
  }'
  theme="light"
></clippingkk-web-widget>
```

## Props

The component accepts the following attributes:

-   `clippingid` (string): The ID of the clipping to display. If `clippingdata` is not provided, the widget will fetch data using this ID.
-   `theme` (string, optional): Sets the theme for the widget.
    -   Available options: `"light"` (default), `"dark"`.
-   `endpoint` (string, optional): The GraphQL API endpoint to fetch clipping data from.
    -   Defaults to `https://clippingkk.annatarhe.cn/graphql`.
-   `clippingdata` (string, optional): A JSON string representing the clipping data. If provided, the widget will use this data directly instead of fetching it based on `clippingid`.

    Example `clippingdata` JSON string structure:
    ```json
    {
      "id": "CLIPPING_ID",
      "content": "The actual text of the clipping.",
      "book": "Name of the Book",
      "author": "Author of the Book",
      "location": "Page number or location range (e.g., #123-125)",
      "createdAt": "YYYY-MM-DDTHH:mm:ssZ",
      "creator": {
        "id": "USER_ID",
        "name": "Creator's Name",
        "avatar": "URL_TO_CREATOR_AVATAR"
      }
    }
    ```

## Development & Storybook

To see the component in action or contribute to its development:

1.  Clone the repository.
2.  Install dependencies: `npm install` (or `yarn install` / `pnpm install`).
3.  Run Storybook: `npm run storybook`.

This will open Storybook in your browser, where you can interact with different stories showcasing the widget's functionality and appearance.

## Contributing

Contributions are welcome! Please feel free to submit issues or pull requests to the [GitHub repository](https://github.com/clippingkk/web-widget).

## License

This project is licensed under the MIT License.

