'use-client'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import Cookies from 'js-cookie';

const defaultInitState = {
  key: "",
  username: "",
  level: 0,
  name: "",
  id: ""
}

export const createAuthStore = (initState = defaultInitState) => {
  return create(
    persist(
      (set) => ({
        ...initState,
        setAuth: (info) => {
          set((state) => ({ key: info.key, username: info.username, level: info.level, id: info.id, name: info.name }))
          Cookies.set('authToken', info.key, { expires: 1 });
        },
        addLevel: () => set((state) => ({ level: state.level + 1 })),
        resetStore: () => {
          set(defaultInitState)
          Cookies.remove('authToken');
        },
      }),
      {
        "name": "user-storage",
      }
    )
  )
}
