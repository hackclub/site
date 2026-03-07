import { NextResponse, NextRequest } from 'next/server'
import country from 'country-list-js'

export const config = {
  matcher: '/slack/:path*'
}

export function middleware(request: NextRequest) {
  let continent = country.findByIso2(request.geo.country || 'AU').continent
  if (continent === 'Oceania') {
    continent = 'Australia'
  }
  const response = NextResponse.next()
  response.cookies.set('continent', continent || '')
  return response
}
