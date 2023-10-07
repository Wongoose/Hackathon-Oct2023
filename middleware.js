
import { NextResponse } from 'next/server'

function isAuthenticated(req) {
    return req.cookies.has('access_token');
}

export function middleware(request, res) {
    if (request.nextUrl.pathname == '/api/auth' ||
        request.nextUrl.pathname == '/api/return' ||
        request.nextUrl.pathname.startsWith('/_next')) {
        return;
    }
    
    if (!isAuthenticated(request) && request.nextUrl.pathname != '/') {
        if (request.nextUrl.pathname.startsWith('/api/')) {
            return Response.json({'success':false, message: 'denied'}, {status: 401});
        }
        request.nextUrl.pathname = '/';
        return NextResponse.redirect(request.nextUrl);
    }

    if (isAuthenticated(request) && request.nextUrl.pathname == '/') {
        request.nextUrl.pathname = '/events';
        return NextResponse.redirect(request.nextUrl);
    }
}

// export const config = {
//     matcher: '/api/:path*',
// }