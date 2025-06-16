import type { Metadata } from 'next';
import Initializers from './Initializers';

import './globals.css';

export const metadata: Metadata = {
  title: 'GCL',
  description: 'Global Corporate Logistics',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Initializers>{children}</Initializers>
      </body>
    </html>
  );
}
