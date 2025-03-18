'use client';

import { useUserQuery } from '@/app/hooks/useUserQuery'; // Import the hook to fetch user data
import { GlobalStyle } from '@/styles/global';
import { usePathname } from 'next/navigation';
import React from 'react';
import { ThemeProvider } from 'styled-components';
import { darkTheme, lightTheme } from '../styles/theme';
import ProtectedRoute from './components/ProtectedRoute';
import { Sidebar } from './components/Sidebar';
import { AuthProvider } from './hooks/useAuthContext';
import * as S from './layoutStyle';

export default function Main({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const isLoginPage = pathname === '/login';

    // Fetch the user's selectedTheme
    const { user } = useUserQuery();
    const theme = user?.selectedTheme || 'light'; // Default to 'light' if user or selectedTheme is not available

    return (
        <AuthProvider>
            <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
                <GlobalStyle theme={theme === 'light' ? lightTheme : darkTheme} />
                <ProtectedRoute>
                    <S.Container isLoginPage={isLoginPage}>
                        {!isLoginPage && <Sidebar />}
                        <S.Main>{children}</S.Main>
                    </S.Container>
                </ProtectedRoute>
            </ThemeProvider>
        </AuthProvider>
    );
}