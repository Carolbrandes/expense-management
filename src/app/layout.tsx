'use client';

import React from 'react';
import Main from './Main';
import ReactQueryProvider from './providers/react-query-provider';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt">
      <body>
        <ReactQueryProvider> {/* ReactQueryProvider at the top level */}
          <Main>{children}</Main> {/* Wrap children with the Main component */}
        </ReactQueryProvider>
      </body>
    </html>
  );
}