export function middleware(request) {
    const currentUser = request.cookies.get('bts_token')?.value

    if (currentUser && !request.nextUrl.pathname.startsWith('/dashboard')) {
        return
    }

    if (!currentUser && !request.nextUrl.pathname.startsWith('/login')) {
        return Response.redirect(new URL('/', request.url))
    }
}

export const config = {
    matcher: ['/todo/:path*']
}