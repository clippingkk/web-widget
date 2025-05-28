import type { ClippingData, ClippingError, Theme } from './types';
import { ClippingService } from './clipping-service';
import { getWidgetStyles } from './widget-styles';

export class ClippingkkWebWidget extends HTMLElement {
  private _clippingId: string | null = null;
  private _theme: Theme = 'light';
  private _shadowRoot: ShadowRoot;

  constructor() {
    super();
    this._shadowRoot = this.attachShadow({ mode: 'open' });
  }

  static get observedAttributes(): string[] {
    return ['clippingid', 'theme'];
  }

  attributeChangedCallback(name: string, oldValue: string | null, newValue: string | null): void {
    if (oldValue === newValue) return;

    switch (name) {
      case 'clippingid':
        this._clippingId = newValue;
        break;
      case 'theme':
        this._theme = newValue === 'dark' ? 'dark' : 'light';
        break;
    }
    this._render();
  }

  connectedCallback(): void {
    // Initialize properties from attributes if they are set on connection
    if (this.hasAttribute('clippingid')) {
      this._clippingId = this.getAttribute('clippingid');
    }
    if (this.hasAttribute('theme')) {
      const themeAttr = this.getAttribute('theme');
      this._theme = themeAttr === 'dark' ? 'dark' : 'light';
    }
    this._render();
  }

  private async _render(): Promise<void> {
    if (!this._shadowRoot) return;

    const styles = getWidgetStyles(this._theme);
    this._shadowRoot.innerHTML = `<style>${styles}</style><div id="widget-content">Loading...</div>`;

    const contentElement = this._shadowRoot.getElementById('widget-content');
    if (!contentElement) return;

    if (!this._clippingId) {
      contentElement.innerHTML = '<p class="error">Error: clippingId attribute is required.</p>';
      return;
    }

    const data = await ClippingService.fetchClippingData(this._clippingId);

    if ((data as ClippingError).error) {
      contentElement.innerHTML = `<p class="error">Error: ${(data as ClippingError).error}</p>`;
    } else {
      const clipping = data as ClippingData;
      contentElement.innerHTML = `
        <div class="card-header">${clipping.book}</div>
        <div class="card-content">${clipping.content}</div>
        <div class="card-footer">
          <span>By ${clipping.author}</span> |
          <span>Location: ${clipping.location}</span> |
          <span>Added: ${clipping.createdAt}</span>
        </div>
      `;
    }
  }
}

if (!customElements.get('clippingkk-web-widget')) {
  customElements.define('clippingkk-web-widget', ClippingkkWebWidget);
}
