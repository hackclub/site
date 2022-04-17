import { NextResponse } from 'next/server'
import country from 'country-list-js';

export function middleware(req) {
  let url = req.nextUrl
  if(!url.searchParams.get("continent")){
    let continent = country.findByIso2(req.geo.country || "US").continent
    url.searchParams.set("continent", continent)
    return NextResponse.redirect(url)
  }
}
