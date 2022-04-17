import { NextResponse } from 'next/server'

const partners = ['gb_help_desk']

export function middleware(req) {
  console.log(req.geo)
}
