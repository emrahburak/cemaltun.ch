import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const accept = request.headers.get('accept') || '';
  const url = request.nextUrl;

  if (url.pathname === '/' && accept.includes('text/markdown')) {
    return NextResponse.rewrite(new URL('/api/markdown-home', request.url));
  }

  if (accept.includes('text/markdown') && url.pathname !== '/' && !url.pathname.startsWith('/api') && !url.pathname.includes('.')) {
    return NextResponse.rewrite(new URL(`/api/not-found?path=${encodeURIComponent(url.pathname.slice(1))}`, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/((?!_next|api|.*\\..*).*)'],
};
