import { NextResponse } from 'next/server'
import country from 'country-list-js';
const partners = ['gb_help_desk']

export function middleware(request) {
  if (request.nextUrl.pathname.startsWith('/bank')) {
    const url = request.nextUrl.clone()
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
    let url = request.nextUrl
    if(!url.searchParams.get("continent")){
      let continent = country.findByIso2(request.geo.country || "AU").continent
      if(continent == "Oceania"){
        continent = "Australia"
      }
      url.searchParams.set("continent", continent)
      return NextResponse.redirect(url)
    }
  }
}
