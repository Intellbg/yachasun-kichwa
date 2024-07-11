'use server'
 
import { cookies } from 'next/headers'
 
export async function handleLogin(encryptedSessionData) {
  cookies().set('session', encryptedSessionData, {
    httpOnly: true,
    secure: true,
    maxAge: 60 * 60 * 24,
    path: '/',
  })
}