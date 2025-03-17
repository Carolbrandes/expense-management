'use client';
import { ThemeContextProvider } from "@/app/hooks/useThemeMode";
import { GlobalStyle } from "@/styles/global";
import React from 'react';
import { Sidebar } from './components/Sidebar';
import { AuthProvider } from "./hooks/useAuthContext";
import * as S from './layoutStyle';
import ReactQueryProvider from "./providers/react-query-provider";


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt">
      <body>
        <ThemeContextProvider>
          <GlobalStyle />
          <AuthProvider>
            <ReactQueryProvider>
              <S.Container>
                <Sidebar />

                <S.Main>
                  {children}
                </S.Main>

              </S.Container>
            </ReactQueryProvider>
          </AuthProvider>
        </ThemeContextProvider>
      </body>
    </html>
  );
}