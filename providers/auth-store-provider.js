'use client'

import { createContext, useRef, useContext } from 'react'
import { useStore } from 'zustand'
import { createAuthStore } from '@/stores/auth-store'

export const AuthStoreContext = createContext(undefined)

export const AuthStoreProvider = ({ children }) => {
  const storeRef = useRef()
  if (!storeRef.current) {
    storeRef.current = createAuthStore()
  }

  return (
    <AuthStoreContext.Provider value={storeRef.current}>
      {children}
    </AuthStoreContext.Provider>
  )
}

export const useAuthStore = (selector) => {
  const authStoreContext = useContext(AuthStoreContext)

  if (!authStoreContext) {
    throw new Error('useAuthStore must be used within AuthStoreProvider')
  }

  return useStore(authStoreContext, selector)
}
