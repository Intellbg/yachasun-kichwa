'use client'
import { useAuthStore } from '@/providers/auth-store-provider.js'
import { useRouter } from 'next/navigation'
import Cookies from 'js-cookie';

export default function Logout() {
    const router = useRouter()
    const { resetStore } = useAuthStore(
        (state) => state,
    )
    resetStore()
    Cookies.remove('authToken');
    router.push('/login')
}
