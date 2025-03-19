'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useAuth } from '../hooks/useAuthContext';
import { useUserQuery } from '../hooks/useUserQuery';

interface ProtectedRouteProps {
    children: React.ReactNode;
}

const publicRoutes = ['/login'];

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
    const { isAuthenticated, isLoading } = useAuth();
    const { user } = useUserQuery()
    console.log("🚀 ~ ProtectedRoute ~ isAuthenticated:", isAuthenticated)
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        if (!isLoading && !isAuthenticated || !user.email && !publicRoutes.includes(pathname)) {
            router.push('/login');
        }
    }, [isAuthenticated, isLoading, pathname, router, user]);

    // Show loading state until auth check is complete
    if (isLoading) {
        return <p>Loading...</p>;  // You can replace this with a spinner
    }

    if (!isAuthenticated && !publicRoutes.includes(pathname)) {
        return null;
    }

    return <>{children}</>;
}