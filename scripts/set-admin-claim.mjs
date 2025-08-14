// Carrega variáveis de ambiente. Primeiro .env.local, depois .env
import { config as loadEnv } from 'dotenv'
loadEnv({ path: '.env.local' })
loadEnv()

import { getApps, initializeApp, applicationDefault, cert } from 'firebase-admin/app'
import { getAuth } from 'firebase-admin/auth'

const projectId = process.env.FIREBASE_PROJECT_ID || process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID
const clientEmail = process.env.FIREBASE_CLIENT_EMAIL
const privateKey = process.env.FIREBASE_PRIVATE_KEY ? process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n') : undefined

if (!getApps().length) {
  if (clientEmail && privateKey) {
    initializeApp({ credential: cert({ projectId, clientEmail, privateKey }) })
  } else {
    initializeApp({ credential: applicationDefault() })
  }
}

const uid = process.argv[2]
if (!uid) {
  console.error('Uso: node scripts/set-admin-claim.mjs <UID>')
  process.exit(1)
}

const auth = getAuth()

try {
  await auth.setCustomUserClaims(uid, { admin: true })
  await auth.revokeRefreshTokens(uid)
  console.log(`Claim admin atribuída ao UID: ${uid}`)
  process.exit(0)
} catch (e) {
  console.error('Falha ao atribuir claim admin:', e)
  process.exit(1)
}

