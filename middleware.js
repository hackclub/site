import { NextResponse } from 'next/server'
// This is using the country-list-js package instead of country-list to access continient data.
import country from 'country-list-js'

export function middleware(request) {
  let continent = country.findByIso2(request.geo.country || 'AU').continent
  if (continent === 'Oceania') {
    continent = 'Australia'
  }
  const response = NextResponse.next()
  response.cookies.set('continent', continent || '')
}

export const config = {
  matchers: ['/slack/']
}
