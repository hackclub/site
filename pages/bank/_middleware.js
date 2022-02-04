import { NextResponse } from 'next/server'

const partners = ['gb_help_desk']

export function middleware(req) {
  const url = req.nextUrl
  if (
    url.pathname == '/bank/' &&
    partners.includes(url.searchParams.get('ref'))
  ) {
    let res = NextResponse.rewrite('/bank/partner')
    return res
  } else if (url.pathname == '/bank/') {
    let res = NextResponse.rewrite('/bank/index')
    return res
  }
}
