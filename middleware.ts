import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl
  if (pathname.startsWith("/admin") && pathname !== "/admin/login") {
    const cookie = req.cookies.get("admin_session")?.value
    if (!cookie) {
      const loginUrl = req.nextUrl.clone()
      loginUrl.pathname = "/admin/login"
      loginUrl.searchParams.set("from", pathname)
      return NextResponse.redirect(loginUrl)
    }
  }
  const res = NextResponse.next()
  // Security headers básicos
  res.headers.set("X-Frame-Options", "DENY")
  res.headers.set("X-Content-Type-Options", "nosniff")
  res.headers.set("Referrer-Policy", "strict-origin-when-cross-origin")
  // CSP mínima (ajuste conforme usar imagens/scripts externos)
  const isProd = process.env.NODE_ENV === 'production'
  // Em produção, remover 'unsafe-inline' e usar nonce básico para scripts do Next (injetado no SSR automaticamente).
  // Em dev, permitir 'unsafe-eval' para React Refresh e ws para HMR.
  const scriptSrc = isProd ? "script-src 'self'" : "script-src 'self' 'unsafe-inline' 'unsafe-eval'"
  const csp = [
    "default-src 'self'",
    "img-src 'self' data: https:",
    scriptSrc,
    "style-src 'self' 'unsafe-inline'",
    `connect-src 'self' https://*.googleapis.com https://*.firebaseio.com https://*.firebaseapp.com${isProd ? '' : ' ws: wss: http://localhost:3000'}`,
  ].join('; ')
  res.headers.set('Content-Security-Policy', csp)
  return res
}

export const config = {
  matcher: ["/admin", "/admin/:path*"],
}

