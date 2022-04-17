import { NextResponse } from 'next/server'
import country from 'country-list-js';

export function middleware(req) {
  let continent = country.findByIso2(req.geo.country || "US").continent
  console.log(continent)
  let url = req.nextUrl
  let originalURL = req.nextUrl
  url.searchParams.set("continent", continent)
  if(url != originalURL){
    return NextResponse.redirect(url)
  }
}
