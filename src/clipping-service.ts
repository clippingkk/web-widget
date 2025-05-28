import type { ClippingData, ClippingError, CreatorData } from './types'

const API_ENDPOINT = 'https://clippingkk.annatarhe.cn/graphql' // Adjust if your GraphQL endpoint is different

// Raw types from the API response (based on old api.ts)
interface ApiCreator {
  id: number;
  name: string;
  avatar: string;
}

interface ApiClipping {
  id: number;
  bookID: string; // Not directly used in ClippingData, but part of API response
  title: string;    // This maps to 'book' in ClippingData
  content: string;
  createdAt: string; // API returns a string that can be parsed into a Date
  pageAt: string;   // This maps to 'location' in ClippingData
  visible: boolean; // Not directly used
  creator: ApiCreator;
}

interface FetchClippingGQLResponse {
  data?: {
    clipping: ApiClipping;
  };
  errors?: Array<{ message: string }>; // Handle GraphQL errors
}

const FETCH_CLIPPING_QUERY = `
  query fetchClipping($id: Int!) {
    clipping(id: $id) {
      id
      bookID
      title
      content
      createdAt
      pageAt
      visible
      reactions {
        id
        symbol
        creator {
          id
          avatar
          name
        }
        createdAt
      }
      creator {
        id
        name
        avatar
      }
    }
  }
`

export class ClippingService {
  public static async fetchClippingData(clippingId: string): Promise<ClippingData | ClippingError> {
    if (!clippingId) {
      return { error: 'Clipping ID is required.' }
    }

    const numericId = parseInt(clippingId, 10)
    if (isNaN(numericId)) {
      return { error: 'Invalid Clipping ID format.' }
    }

    try {
      const response = await fetch(API_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          operationName: 'fetchClipping',
          query: FETCH_CLIPPING_QUERY,
          variables: {
            id: numericId,
          },
        }),
      })

      if (!response.ok) {
        return { error: `API request failed: ${response.status} ${response.statusText}` }
      }

      const result: FetchClippingGQLResponse = await response.json()

      if (result.errors && result.errors.length > 0) {
        return { error: `GraphQL Error: ${result.errors.map(e => e.message).join(', ')}` }
      }

      if (!result.data || !result.data.clipping) {
        return { error: 'Clipping data not found in API response.' }
      }

      const apiClipping = result.data.clipping

      const creatorData: CreatorData = {
        id: apiClipping.creator.id.toString(),
        name: apiClipping.creator.name,
        avatar: apiClipping.creator.avatar,
      }

      const clippingData: ClippingData = {
        id: apiClipping.id.toString(),
        content: apiClipping.content,
        book: apiClipping.title, 
        author: 'Unknown Author', // Placeholder: API doesn't provide book author directly in this query
        location: apiClipping.pageAt,
        createdAt: new Date(apiClipping.createdAt).toISOString(), // Standardize to ISO string
        creator: creatorData,
      }

      return clippingData
    } catch (err) {
      console.error('Error fetching or processing clipping data:', err)
      if (err instanceof Error) {
        return { error: `Failed to fetch clipping data: ${err.message}` }
      }
      return { error: 'An unknown error occurred while fetching clipping data.' }
    }
  }
}
