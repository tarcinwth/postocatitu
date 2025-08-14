"use client"
import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/use-toast"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { auth } from "@/lib/firebase"
import { signInWithEmailAndPassword, setPersistence, browserLocalPersistence, onAuthStateChanged } from "firebase/auth"

export default function AdminLogin() {
  const [loading, setLoading] = useState(false)
  const [user, setUser] = useState("")
  const [pass, setPass] = useState("")
  const router = useRouter()
  const sp = useSearchParams()

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (fbUser) => {
      if (!fbUser) return
      try {
        const idToken = await fbUser.getIdToken()
        await fetch('/api/auth/session', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ idToken }) })
      } catch {}
      router.replace("/admin")
    })
    return () => unsub()
  }, [router])

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    try {
      await setPersistence(auth, browserLocalPersistence)
      const cred = await signInWithEmailAndPassword(auth, user, pass)
      const idToken = await cred.user.getIdToken()
      await fetch('/api/auth/session', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ idToken }) })
      toast({ title: "Login realizado com sucesso!" })
      const from = sp.get("from") || "/admin"
      router.replace(from)
    } catch (err: any) {
      const code = err?.code || 'auth/error'
      const message = code === 'auth/invalid-credential' || code === 'auth/invalid-login-credentials'
        ? 'Credenciais inválidas'
        : 'Não foi possível entrar'
      toast({ title: message, description: code, variant: "destructive" })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-sm border-0 shadow-lg">
        <CardContent className="p-6">
          <h1 className="text-2xl font-bold mb-2 text-center">Login Admin</h1>
          <p className="text-sm text-gray-600 text-center mb-6">Acesse o painel administrativo</p>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <Input
                type="email"
                placeholder="Email"
                value={user}
                onChange={(e) => setUser(e.target.value)}
                required
              />
            </div>
            <div>
              <Input
                type="password"
                placeholder="Senha"
                value={pass}
                onChange={(e) => setPass(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Entrando..." : "Entrar"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}