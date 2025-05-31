import './clippingkk-web-widget' // Import the component
import type { Meta, StoryObj } from '@storybook/web-components-vite'

import { http, HttpResponse } from 'msw'
import type { ClippingData } from './types'
const testingData = {
  data: {
    "clipping": {
      "id": 20420,
      "bookID": "1856494",
      "title": "卡拉马佐夫兄弟",
      "content": "我在想：“什么是地狱？”我认为，地狱就是“再也不能爱”这样的痛苦",
      "createdAt": "2021-12-13T14:01:17Z",
      "pageAt": "#6436-6437",
      "visible": true,
      "reactions": [],
      "creator": {
        "id": 1,
        "name": "AnnatarHe",
        "avatar": "https://avatars.githubusercontent.com/u/8704175?v=4"
      }
    }
  }
}

// Define the component's metadata
const meta: Meta = {
  title: 'ClippingkkWebWidget',
  component: 'clippingkk-web-widget',
  argTypes: {
    clippingid: { control: 'number' },
    theme: {
      control: { type: 'select' },
      options: ['light', 'dark'],
    },
  },
  parameters: {
    msw: {
      handlers: [
        http.post('https://clippingkk.annatarhe.com/api/v2/graphql', () => {
          return HttpResponse.json(
            testingData,
            {
              status: 200,
            },
          )
        }),
      ],
    }
  },
  render: (args) => `<clippingkk-web-widget clippingid=${args.clippingid} theme=${args.theme} endpoint=${args.endpoint} clippingdata=${args.clippingdata}></clippingkk-web-widget>`,
}

export default meta

type Story = StoryObj;

// Default story: Light theme with a clipping ID
export const Default: Story = {
  args: {
    'clippingid': 8848,
    theme: 'light',
  },
}

// Dark theme story
export const DarkTheme: Story = {
  args: {
    'clippingid': 8848,
    theme: 'dark',
  },
}

// Story for when no clipping ID is provided
export const NoClippingId: Story = {
  args: {
    'clippingid': '', // or null, depending on how you want to test. The component handles empty string.
    theme: 'light',
  },
}

// Story to demonstrate an error (e.g., if clippingId is invalid or fetch fails)
// For a true error state from fetch, you'd typically mock the ClippingService
// This example will show the component's internal error for a missing clippingId if it's not handled before fetch
export const ErrorState: Story = {
  args: {
    'clippingid': 'trigger-error-id', // Assuming this ID will cause a fetch error or is invalid
    theme: 'light',
  },
  // You might need to add a mock for ClippingService.fetchClippingData here
  // to reliably show a specific error message from the service.
  // For now, it will show 'Loading...' and then potentially an error if 'trigger-error-id' is bad.
}

export const HadClippingData: Story = {
  args: {
    'clippingid': 8848,
    theme: 'light',
    'clippingdata': JSON.stringify({
      id: '8848',
      content: 'test',
      book: 'test',
      author: 'test',
      location: 'test',
      createdAt: 'test',
      creator: {
        id: 'test',
        name: 'test',
        avatar: 'test',
      },
    } as ClippingData),
  },
}