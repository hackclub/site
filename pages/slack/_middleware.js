import { NextResponse } from 'next/server'

import country from 'country-list-js';

export function middleware(req) {
  let continent = country.findByIso2(req.geo.country || "US").continent
  console.log(continent)
}
