'use client'
import { useEffect } from 'react';
import { handleLogout } from './actions';

export default function Logout() {
    useEffect(() => {
        const logout = async () => {
            await handleLogout();
        };
        logout();
    }, []);

    return null;
}
