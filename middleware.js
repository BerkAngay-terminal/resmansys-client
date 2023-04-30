import { checkCookies } from 'cookies-next'
import { NextResponse } from 'next/server'

export function middleware(req, res) {
    const tokenCookie = checkCookies('token', { req, res });
    const { pathname, origin } = req.nextUrl;

    // if (
    //     !tokenCookie
    //     && pathname !== '/signIn'
    // ) {
    //     return NextResponse.redirect(`${origin}/signIn`, 302);
    // }

    // if (tokenCookie && pathname === ' /signIn') {
    //     return NextResponse.redirect('/', 302);
    // }
}