import { getApps, cert, initializeApp, applicationDefault } from "firebase-admin/app"
import { getAuth } from "firebase-admin/auth"

const projectId = process.env.FIREBASE_PROJECT_ID || process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID

function initAdmin() {
  if (!getApps().length) {
    const clientEmail = process.env.FIREBASE_CLIENT_EMAIL
    const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n")
    if (clientEmail && privateKey) {
      initializeApp({
        credential: cert({ projectId, clientEmail, privateKey }),
      })
    } else {
      initializeApp({ credential: applicationDefault() })
    }
  }
}

export function getAdminAuth() {
  initAdmin()
  return getAuth()
}

