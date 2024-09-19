import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const defaultInitState = {
  key: "",
  username: ""
}

export const createAuthStore = (initState = defaultInitState) => {
  return create(
    persist(
      (set) => ({
        ...initState,
        setAuth: (info) => set((state) => ({ key: info.key, username: info.username })),
        resetStore: () => set(defaultInitState),
      }),
      {
        "name": "user-storage"
      }
    )
  )
}
