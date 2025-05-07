import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Các route cần phân quyền kèm quyền cho phép
const protectedRoutes = [
    { path: '/dashboard/edit', allowedRoles: ['admin'] },
    { path: '/events/edit', allowedRoles: ['user'] },
    { path: '/dashboard/delete-info', allowedRoles: ['user'] },
    { path: '/dashboard/change-password', allowedRoles: ['user'] },
    { path: '/dashboard/history', allowedRoles: ['user'] },
    { path: '/environment', allowedRoles: ['user', 'admin'] },
    { path: '/survey/result', allowedRoles: ['user', 'admin'] },
    { path: '/survey/history', allowedRoles: ['user', 'admin'] },
    { path: '/survey/manage-questions', allowedRoles: ['user', 'admin'] },
    { path: '/survey/trash', allowedRoles: ['user', 'admin'] },
    { path: '/dashboard', allowedRoles: ['user', 'admin'] },
    { path: '/authentication/logout', allowedRoles: ['user', 'admin'] },
]

export function middleware(request: NextRequest) {
    const url = request.nextUrl.clone()
    const { pathname } = url

    const token = request.cookies.get('token')?.value || ''
    const role = request.cookies.get('role')?.value || ''

    // Không cho người đã đăng nhập vào trang đăng ký
    if (pathname.startsWith('/authentication/register') && token) {
        url.pathname = '/dashboard'
        return NextResponse.redirect(url)
    }

    const matchedRoute = protectedRoutes.find(route => pathname.startsWith(route.path))

    if (matchedRoute) {
        if (!token) {
            // Chưa đăng nhập
            url.pathname = '/authentication/login'
            return NextResponse.redirect(url)
        }

        if (!matchedRoute.allowedRoles.includes(role)) {
            // Đã đăng nhập nhưng không đủ quyền
            url.pathname = '/dashboard'
            return NextResponse.redirect(url)
        }
    }

    return NextResponse.next()
}

export const config = {
    matcher: [
        '/dashboard/:path*',
        '/survey/:path*',
        '/events/edit',
        '/authentication/:path*',
        '/environment',
    ],
}
