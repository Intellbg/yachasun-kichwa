import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const defaultInitState = {
  key: "",
  username: "",
  level: 0
}

export const createAuthStore = (initState = defaultInitState) => {
  return create(
    persist(
      (set) => ({
        ...initState,
        setAuth: (info) => set((state) => ({ key: info.key, username: info.username })),
        addLevel: () => set((state) => ({ level: state.level + 1 })),
        resetStore: () => set(defaultInitState),
      }),
      {
        "name": "user-storage"
      }
    )
  )
}
