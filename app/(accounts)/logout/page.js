'use client'
import { useAuthStore } from '@/providers/auth-store-provider.js'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react';

export default function Logout() {
    const router = useRouter()
    const { resetStore } = useAuthStore(
        (state) => state,
    )

    useEffect(() => {
        resetStore()
        router.push('/login')
    }, []);

    return <></>
}
