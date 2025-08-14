import { NextResponse } from "next/server"
import { getAdminAuth } from "@/lib/firebase-admin"

const COOKIE_NAME = "admin_session"
const ONE_DAY = 60 * 60 * 24

export const runtime = "nodejs"

export async function POST(req: Request) {
  try {
    const { idToken } = await req.json()
    if (!idToken) return NextResponse.json({ message: "Missing token" }, { status: 400 })

    const adminAuth = getAdminAuth()
    const decoded = await adminAuth.verifyIdToken(idToken)
    // Exigir claim admin para emitir sessão
    if (!decoded.admin) {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 })
    }
    // Criar Session Cookie oficial do Firebase
    const expiresIn = ONE_DAY * 1000 // ms
    const sessionCookie = await adminAuth.createSessionCookie(idToken, { expiresIn })

    const isProd = process.env.NODE_ENV === "production"
    const res = NextResponse.json({ ok: true })
    res.cookies.set(COOKIE_NAME, sessionCookie, {
      httpOnly: true,
      secure: isProd,
      sameSite: "strict",
      maxAge: ONE_DAY,
      path: "/",
    })
    // também manter cookie leve para middleware backward-compat se quiser
    res.cookies.set("admin_auth", "1", { path: "/", maxAge: ONE_DAY, sameSite: "strict", secure: isProd })
    return res
  } catch (e) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
  }
}

export async function DELETE() {
  const isProd = process.env.NODE_ENV === "production"
  const res = NextResponse.json({ ok: true })
  res.cookies.set(COOKIE_NAME, "", { httpOnly: true, secure: isProd, sameSite: "strict", maxAge: 0, path: "/" })
  res.cookies.set("admin_auth", "", { maxAge: 0, path: "/", sameSite: "strict", secure: isProd })
  return res
}

