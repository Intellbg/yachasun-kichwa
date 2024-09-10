import { getSessionData } from "./app/lib/getSession"

export async function middleware(request) {
    const data = await getSessionData(request)
    if (!data) {
        return Response.redirect(new URL('/login', request.url));
    }
}

export const config = {
    matcher: ['/courses','/lectures/:path*'],
}