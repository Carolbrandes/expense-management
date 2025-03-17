'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useAuth } from '../hooks/useAuthContext';

interface ProtectedRouteProps {
    children: React.ReactNode;
}

const publicRoutes = ['/login'];

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
    const { isAuthenticated } = useAuth();
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        if (!isAuthenticated && !publicRoutes.includes(pathname)) {
            router.push('/login');
        }
    }, [isAuthenticated, pathname, router]);

    if (!isAuthenticated && !publicRoutes.includes(pathname)) {
        return null;
    }

    return <>{children}</>;
}