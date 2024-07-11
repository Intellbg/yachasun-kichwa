'use server'
 
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
 
export async function handleLogin(encryptedSessionData) {
  cookies().set('session', encryptedSessionData, {
    httpOnly: true,
    secure: true,
    maxAge: 60 * 60 * 24,
    path: '/',
  })
  redirect('/courses')
}