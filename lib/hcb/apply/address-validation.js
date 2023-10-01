async function getOrRefreshToken() {
  // Get the token from localStorage
  const token = JSON.parse(localStorage.getItem('mapkit-token'))
  if (token) {
    // If the token is still valid, return it
    if (Date.now() < token.refreshBefore) return token.accessToken
  } else {
    // The token is invalid or doesn't exist, so get a new one

    // This is a MapKit master token, restricted to https://hackclub.com
    const master =
      'eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IkNSQkg2S1VLTEIifQ.eyJpc3MiOiJQNlBWMlI5NDQzIiwiaWF0IjoxNjc5NjY3NjIyLCJleHAiOjE3MTEyMzg0MDB9.E6g9QPdbEWLgF6tdcL0YfX8NescYnwKhQpXdiyRitNm7-Oot-3VH0ze9xUd8xkOzuS_-7KeWy4bfYTD-2yX7Sg'

    // Get a MapKit server token
    const res = await fetch('https://maps-api.apple.com/v1/token', {
      headers: { Authorization: `Bearer ${master}` }
    })
    const resJson = await res.json()

    // Set the token's expiration time to 10 seconds before the actual expiration time
    resJson.refreshBefore =
      Date.now() + resJson.expiresInSeconds * 1_000 - 10_000

    // Save the token to localStorage
    localStorage.setItem('mapkit-token', JSON.stringify(resJson))

    return resJson.accessToken
  }
}

//TODO: Limit the number of retries

export async function search(query) {
  if (!query || !query.trim()) return

  const token = await getOrRefreshToken()

  const res = await fetch(`https://maps-api.apple.com/v1/search?q=${query}`, {
    headers: { Authorization: `Bearer ${token}` }
  })
  const resJson = await res.json()

  if (resJson.error) {
    if (resJson.error.message === 'Not Authorized') {
      // The token is invalid, so remove it from localStorage
      localStorage.removeItem('mapkit-token')

      // Try again
      console.warn('MapKit token expired, refreshing')
      return search(query)
    } else {
      throw new Error(resJson.error.message)
    }
  }

  return resJson
}

export async function geocode(query) {
  if (!query || !query.trim()) return

  const token = await getOrRefreshToken()

  const res = await fetch(`https://maps-api.apple.com/v1/geocode?q=${query}`, {
    headers: { Authorization: `Bearer ${token}` }
  })
  const resJson = await res.json()

  if (resJson.error) {
    if (resJson.error.message === 'Not Authorized') {
      // The token is invalid, so remove it from localStorage
      localStorage.removeItem('mapkit-token')

      // Try again
      console.warn('MapKit token expired, refreshing')
      return geocode(query)
    } else {
      throw new Error(resJson.error.message)
    }
  }

  return resJson
}
