import type { ClippingData, ClippingError, Theme, CreatorData } from './types'
import { ClippingService } from './clipping-service'
import { getWidgetStyles } from './widget-styles'

const CDN_PREFIX = 'https://ck-cdn.annatarhe.com/media/clippingkk'
const LOGO_URL = 'https://ck-cdn.annatarhe.cn/logo-small.png'
const WEBSITE_ENDPOINT = 'https://clippingkk.annatarhe.com'

class ClippingkkWebWidget extends HTMLElement {
  private _clippingId: string | null = null
  private _theme: Theme = 'light'
  private _endpoint: URL = new URL('https://clippingkk.annatarhe.com/api/v2/graphql')
  private _clippingData: ClippingData | null = null
  private _shadowRoot: ShadowRoot
  private _clickHandler: (() => void) | null = null

  constructor() {
    super()
    this._shadowRoot = this.attachShadow({ mode: 'open' })
  }

  static get observedAttributes(): string[] {
    return ['clippingid', 'theme', 'endpoint', 'clippingdata']
  }

  attributeChangedCallback(name: string, oldValue: string | null, newValue: string | null): void {
    if (oldValue === newValue) return

    switch (name) {
      case 'clippingId':
        this._clippingId = newValue
        break
      case 'theme':
        this._theme = newValue === 'dark' ? 'dark' : 'light'
        break
      case 'endpoint':
        if (newValue) {
          this._endpoint = new URL(newValue)
        }
        break
      case 'clippingData':
        if (newValue) {
          this._clippingData = JSON.parse(newValue)
        }
        break
    }
    this._render()
  }

  connectedCallback(): void {
    this.style.cursor = 'pointer' // Set cursor to pointer as the whole card is clickable
    // Initialize properties from attributes if they are set on connection
    if (this.hasAttribute('clippingid')) {
      this._clippingId = this.getAttribute('clippingid')
    }
    if (this.hasAttribute('theme')) {
      const themeAttr = this.getAttribute('theme')
      this._theme = themeAttr === 'dark' ? 'dark' : 'light'
    }
    if (this.hasAttribute('endpoint')) {
      const endpointAttr = this.getAttribute('endpoint')
      if (endpointAttr && endpointAttr.startsWith('http')) {
        this._endpoint = new URL(endpointAttr)
      }
    }
    if (this.hasAttribute('clippingdata')) {
      const clippingDataAttr = this.getAttribute('clippingdata')
      if (clippingDataAttr && clippingDataAttr.startsWith('{') && clippingDataAttr.endsWith('}')) {
        this._clippingData = JSON.parse(clippingDataAttr)
      }
    }
    this._render()
  }

  disconnectedCallback(): void {
    if (this._clickHandler) {
      this.removeEventListener('click', this._clickHandler)
      this._clickHandler = null
    }
  }

  private async _render(): Promise<void> {
    if (!this._shadowRoot) return

    const styles = getWidgetStyles(this._theme)
    this._shadowRoot.innerHTML = `<style>${styles}</style><div id="widget-content">Loading...</div>`

    const contentElement = this._shadowRoot.getElementById('widget-content')
    if (!contentElement) return

    if (!this._clippingId) {
      contentElement.innerHTML = '<p class="error">Error: clippingId attribute is required.</p>'
      return
    }

    const data = this._clippingData || await ClippingService.fetchClippingData(this._endpoint, this._clippingId)

    if ((data as ClippingError).error) {
      contentElement.innerHTML = `<p class="error">Error: ${(data as ClippingError).error}</p>`
      // Remove previous click listener if an error occurs
      if (this._clickHandler) {
        this.removeEventListener('click', this._clickHandler)
        this._clickHandler = null
      }
    } else {
      const clipping = data as ClippingData

      // Ensure creator data is present (service needs to provide this)
      const creator = clipping.creator || { id: 'unknown', name: 'Unknown User', avatar: '' } as CreatorData
      const avatarUrl = creator.avatar && creator.avatar.startsWith('http') 
        ? creator.avatar 
        : (creator.avatar ? `${CDN_PREFIX}/${creator.avatar}` : '') // Handle empty avatar string

      contentElement.innerHTML = `
        <header class='ck-header'>
          <div class='ck-profile'>
            ${avatarUrl ? `<img src='${avatarUrl}' class='ck-avatar' alt="${creator.name}'s avatar" />` : ''}
            <div class='ck-profile-id'>
              <span>${creator.name}</span>
            </div>
          </div>
          <img src='${LOGO_URL}' class='ck-logo' alt='ClippingKK Logo' />
        </header>
        <div class='ck-content'>${clipping.content}</div>
        <div class='ck-author'>${clipping.book} by ${clipping.author}</div>
        <div class='ck-info'>
          <span>Location: ${clipping.location}</span><br/>
          <span>Added: ${new Date(clipping.createdAt).toLocaleDateString()}</span>
        </div>
      `

      const href = `${WEBSITE_ENDPOINT}/dash/${creator.id}/clippings/${clipping.id}?iac=1`

      if (this._clickHandler) {
        this.removeEventListener('click', this._clickHandler)
      }
      this._clickHandler = () => {
        window.open(href, '_blank')
      }
      this.addEventListener('click', this._clickHandler)
    }
  }
}

const widgetName = 'clippingkk-web-widget'

function register() {
  if (customElements.get(widgetName)) {
    return
  }
  customElements.define(widgetName, ClippingkkWebWidget)
}

export {
  register,
  widgetName,
}

export type {
  ClippingData,
}