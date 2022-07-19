import type { NextRequest } from 'next/server'
const partners = ['gb_help_desk']

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith('/bank')) {
    const url = req.nextUrl.clone()
    if (url.pathname === '/bank/') {
      if (partners.includes(url.searchParams.get('ref'))) {
        url.pathname = '/bank/partner'
      } else {
        url.pathname = '/bank/index'
      }

      return NextResponse.rewrite(url)
    }
  }
  if (request.nextUrl.pathname.startsWith('/slack')) {
    let url = req.nextUrl
    if(!url.searchParams.get("continent")){
      let continent = country.findByIso2(req.geo.country || "AU").continent
      if(continent == "Oceania"){
        continent = "Australia"
      }
      url.searchParams.set("continent", continent)
      return NextResponse.redirect(url)
    }
  }
}
