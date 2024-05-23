import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const regExpForBuggyUrls = /^\/(en|de|fr)\/(en|de|fr)\/.*/i;

export function middleware(request: NextRequest) {
  /**
   * If an URL has double langs in the URL it leads to 500 error,
   * e.g.: /fr/de/outil-de-valorisation/fr-discover-how-essential-it-is-to-present-your-business-in-a-compelling-manda-equity-story/
   *
   * It is a known bug:
   * https://github.com/vercel/next.js/issues/52314
   * https://github.com/vercel/next.js/issues/52316
   */
  const pathname = new URL(request.url).pathname;
  const result = pathname.match(regExpForBuggyUrls);

  if (result !== null) {
    return NextResponse.redirect(new URL('/not-found', request.nextUrl))
  }

  return NextResponse.next();
}
