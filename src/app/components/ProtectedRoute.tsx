'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useAuth } from '../hooks/useAuthContext';

interface ProtectedRouteProps {
    children: React.ReactNode;
}

const publicRoutes = ['/login'];

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
    const { isAuthenticated, isLoading } = useAuth();
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        if (!isLoading && !isAuthenticated && !publicRoutes.includes(pathname)) {
            router.push('/login');
        }
    }, [isAuthenticated, isLoading, pathname, router]);

    // Show loading state until auth check is complete
    if (isLoading) {
        return <p>Loading...</p>;  // You can replace this with a spinner
    }

    if (!isAuthenticated && !publicRoutes.includes(pathname)) {
        return null;
    }

    return <>{children}</>;
}