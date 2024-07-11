import { cookies } from 'next/headers'
import {jwtDecode} from 'jwt-decode';

export async function getSessionData() {
    const encryptedSessionData = cookies().get('session')?.value
    return encryptedSessionData ? jwtDecode(encryptedSessionData) : null
}