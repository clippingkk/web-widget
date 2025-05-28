# web-widget
clippingkk web widget for all framework

clippingkk is a kindle clippings manager, it can help you to manage your kindle clippings.

this `@annatarhe/clippingkk-widget` is a web widget for clippingkk, it can be used in any framework(since it built on top of web components). when integrate it into your app, you can use it as a normal web component.

just simply add a clippingId, it will fetch the clippings from clippingkk and show them in a beautiful card.

```html
<clippingkk-web-widget clippingId="your-clipping-id"></clippingkk-web-widget>
```

## Props

- clippingId: string
- theme: string (light | dark)
