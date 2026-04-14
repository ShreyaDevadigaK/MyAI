import { Activity } from './supabase-client'

async function parseJsonResponse(response: Response) {
  const contentType = response.headers.get('content-type') || ''
  const text = await response.text()

  if (!contentType.includes('application/json')) {
    throw new Error(
      `Unexpected response type ${contentType} from ${response.url}: ${text.slice(0, 250).replace(/\s+/g, ' ')}${
        text.length > 250 ? '...' : ''
      }`
    )
  }

  try {
    return JSON.parse(text)
  } catch (error) {
    throw new Error(`Invalid JSON response from ${response.url}: ${text.slice(0, 250).replace(/\s+/g, ' ')}${
      text.length > 250 ? '...' : ''
    }`)
  }
}

export async function saveActivityToDatabase(userId: string, activity: unknown) {
  try {
    const response = await fetch('/api/sheet/activities-db', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({
        userId,
        activity
      })
    })

    if (!response.ok) {
      const error = await parseJsonResponse(response)
      console.error('Error saving activity:', error)
      return null
    }

    const data = await parseJsonResponse(response)
    return data.data
  } catch (err: unknown) {
    console.error('Failed to save activity to database:', err)
    return null
  }
}

export async function fetchUserActivities(userId: string): Promise<Activity[]> {
  try {
    const response = await fetch(`/api/sheet/activities-db?userId=${encodeURIComponent(userId)}`, {
      headers: {
        Accept: 'application/json'
      }
    })

    if (!response.ok) {
      const error = await parseJsonResponse(response)
      const message = error?.error || error?.message || JSON.stringify(error) || 'Failed to fetch activities'
      console.error('Error fetching activities:', message, error)
      return []
    }

    const data = await parseJsonResponse(response)
    return data.data || []
  } catch (err: unknown) {
    console.error('Failed to fetch activities from database:', err)
    return []
  }
}
