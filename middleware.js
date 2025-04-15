import { NextResponse } from 'next/server'
import acceptLanguage from 'accept-language'

acceptLanguage.languages(['he', 'en'])

export function middleware(request) {
  const { nextUrl, headers } = request
  const locale = nextUrl.pathname.split('/')[1]

  if (['he', 'en'].includes(locale)) {
    return NextResponse.next()
  }

  const preferredLocale = acceptLanguage.get(headers.get('accept-language')) || 'he'
  return NextResponse.redirect(new URL(`/${preferredLocale}${nextUrl.pathname}`, request.url))
}

export const config = {
  matcher: ['/((?!_next|favicon.ico).*)'],
}
