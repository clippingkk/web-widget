import './clippingkk-web-widget' // Import the component
import type { Meta, StoryObj } from '@storybook/web-components-vite'

// Define the component's metadata
const meta: Meta = {
  title: 'ClippingkkWebWidget',
  component: 'clippingkk-web-widget',
  argTypes: {
    clippingid: { control: 'text' },
    theme: {
      control: { type: 'select' },
      options: ['light', 'dark'],
    },
  },
  render: (args) => `<clippingkk-web-widget clippingid=${args.clippingid} theme=${args.theme}></clippingkk-web-widget>`,
}

export default meta

type Story = StoryObj;

// Default story: Light theme with a clipping ID
export const Default: Story = {
  args: {
    clippingid: 'test-clipping-id-123',
    theme: 'light',
  },
}

// Dark theme story
export const DarkTheme: Story = {
  args: {
    clippingid: 'test-clipping-id-456',
    theme: 'dark',
  },
}

// Story for when no clipping ID is provided
export const NoClippingId: Story = {
  args: {
    clippingid: '', // or null, depending on how you want to test. The component handles empty string.
    theme: 'light',
  },
}

// Story to demonstrate an error (e.g., if clippingId is invalid or fetch fails)
// For a true error state from fetch, you'd typically mock the ClippingService
// This example will show the component's internal error for a missing clippingId if it's not handled before fetch
export const ErrorState: Story = {
  args: {
    clippingid: 'trigger-error-id', // Assuming this ID will cause a fetch error or is invalid
    theme: 'light',
  },
  // You might need to add a mock for ClippingService.fetchClippingData here
  // to reliably show a specific error message from the service.
  // For now, it will show 'Loading...' and then potentially an error if 'trigger-error-id' is bad.
}
