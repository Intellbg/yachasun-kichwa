import { create } from 'zustand'


const defaultInitState = {
  key: "",
  username: ""
}

export const createAuthStore = (initState = defaultInitState) => {
  return create((set) => ({
    ...initState,
    setAuth: (info) => set((state) => ({ key: info.key, username: info.username })),
  }))
}
