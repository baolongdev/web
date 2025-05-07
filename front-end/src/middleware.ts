import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Các route cần phân quyền kèm quyền cho phép
const protectedRoutes = [
    // DASHBOARD
    { path: '/dashboard', allowedRoles: ['user', 'admin'] },
    { path: '/dashboard/edit', allowedRoles: ['admin'] },
    { path: '/dashboard/delete-info', allowedRoles: ['user'] },
    { path: '/dashboard/change-password', allowedRoles: ['user'] },
    { path: '/dashboard/history', allowedRoles: ['user'] },
    { path: '/dashboard/personal-info', allowedRoles: ['user', 'admin'] },

    // EVENTS
    { path: '/events/create', allowedRoles: ['admin'] },
    { path: '/events/edit', allowedRoles: ['admin'] },
    { path: '/events/trash', allowedRoles: ['admin'] },
    { path: '/events/[scraperId]/delete', allowedRoles: ['admin'] },
    { path: '/events/[scraperId]/restore', allowedRoles: ['admin'] },

    // SURVEY
    { path: '/survey/history', allowedRoles: ['user', 'admin'] },
    { path: '/survey/manage-questions', allowedRoles: ['user', 'admin'] },
    { path: '/survey/results', allowedRoles: ['user', 'admin'] },
    { path: '/survey/take-test', allowedRoles: ['user', 'admin'] },
    { path: '/survey/trash', allowedRoles: ['user', 'admin'] },

    // MAJORS
    { path: '/majors/create', allowedRoles: ['admin'] },
    { path: '/majors/edit', allowedRoles: ['admin'] },
    { path: '/majors/update', allowedRoles: ['admin'] },
    { path: '/majors/delete', allowedRoles: ['admin'] },

    // ENVIRONMENT
    { path: '/environment', allowedRoles: ['user', 'admin'] },
    { path: '/environment/view', allowedRoles: ['user', 'admin'] },
    { path: '/environment/[id]', allowedRoles: ['user', 'admin'] },
    { path: '/environment/view/[id]', allowedRoles: ['user', 'admin'] },

    // AUTH
    { path: '/authentication/logout', allowedRoles: ['user', 'admin'] },
]

export function middleware(request: NextRequest) {
    const url = request.nextUrl.clone()
    const { pathname } = url

    const token = request.cookies.get('token')?.value || ''
    const role = request.cookies.get('role')?.value || ''

    // Nếu đã đăng nhập, không cho vào trang đăng ký
    if (pathname.startsWith('/authentication/register') && token) {
        url.pathname = '/dashboard'
        return NextResponse.redirect(url)
    }

    const matchedRoute = protectedRoutes.find(route =>
        pathname.startsWith(route.path)
    )

    if (matchedRoute) {
        if (!token) {
            // Chưa đăng nhập → chuyển về login
            url.pathname = '/authentication/login'
            return NextResponse.redirect(url)
        }

        if (!matchedRoute.allowedRoles.includes(role)) {
            // Không có quyền truy cập
            url.pathname = '/dashboard'
            return NextResponse.redirect(url)
        }
    }

    return NextResponse.next()
}

export const config = {
    matcher: [
        '/dashboard/:path*',
        '/events/:path*',
        '/survey/:path*',
        '/majors/:path*',
        '/environment/:path*',
        '/authentication/logout',
    ],
}
