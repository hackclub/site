import { NextResponse } from 'next/server'
import country from 'country-list-js';

export function middleware(req) {
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
