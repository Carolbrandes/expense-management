'use client';

import { ThemeContextProvider } from '@/app/hooks/useThemeMode';
import { GlobalStyle } from '@/styles/global';
import { usePathname } from 'next/navigation';
import React from 'react';
import ProtectedRoute from './components/ProtectedRoute';
import { Sidebar } from './components/Sidebar';
import { AuthProvider } from './hooks/useAuthContext';
import * as S from './layoutStyle';
import ReactQueryProvider from './providers/react-query-provider';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isLoginPage = pathname === '/login';


  return (
    <html lang="pt">
      <body>
        <ThemeContextProvider>
          <GlobalStyle />
          <AuthProvider>
            <ReactQueryProvider>
              <ProtectedRoute>
                <S.Container isLoginPage={isLoginPage}>
                  {!isLoginPage && <Sidebar />}
                  <S.Main>{children}</S.Main>
                </S.Container>
              </ProtectedRoute>
            </ReactQueryProvider>
          </AuthProvider>
        </ThemeContextProvider>
      </body>
    </html>
  );
}