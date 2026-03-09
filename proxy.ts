import { NextResponse, NextRequest } from 'next/server'
import country from 'country-list-js'

export const config = {
  matcher: '/slack/:path*'
}

export function proxy(request: NextRequest) {
  const countryCode = request.headers.get('x-vercel-ip-country') || 'AU'
  let continent = country.findByIso2(countryCode).continent
  if (continent === 'Oceania') {
    continent = 'Australia'
  }
  const response = NextResponse.next()
  response.cookies.set('continent', continent || '')
  return response
}
