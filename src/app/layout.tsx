'use client';

import React from 'react';
import Main from './Main';
import ReactQueryProvider from './providers/react-query-provider';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt">
      <body>
        <ReactQueryProvider>
          <Main>{children}</Main>
        </ReactQueryProvider>
      </body>
    </html>
  );
}