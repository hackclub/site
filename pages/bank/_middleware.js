import { NextResponse } from 'next/server'

const partners = ['gb_help_desk']

export function middleware(req) {
  const url = req.nextUrl.clone()

  if (
    url.pathname === '/bank/' &&
    partners.includes(url.searchParams.get('ref'))
  ) {
    url.pathname = '/bank/partner'
  } else if (url.pathname === '/bank/') {
    url.pathname = '/bank/index'
  }

  return NextResponse.rewrite(url)
}
