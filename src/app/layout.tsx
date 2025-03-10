"use client";

import { ThemeContextProvider } from "@/app/hooks/useThemeMode";
import { GlobalStyle } from "@/styles/global";
import { AuthProvider } from "./hooks/useAuthContext";
import ReactQueryProvider from "./providers/react-query-provider";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt">
      <body>
        <ThemeContextProvider>
          <GlobalStyle />
          <AuthProvider>
            <ReactQueryProvider>
              {children}
            </ReactQueryProvider>
          </AuthProvider>
        </ThemeContextProvider>
      </body>
    </html>
  );
}