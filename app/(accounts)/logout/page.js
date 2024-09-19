'use client'
import { useAuthStore } from '@/providers/auth-store-provider.js'
import { useRouter } from 'next/navigation'

export default function Logout() {
    const router = useRouter()
    const { resetStore } = useAuthStore(
        (state) => state,
    )
    resetStore()
    router.push('/login')
}
