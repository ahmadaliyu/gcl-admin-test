'use client';

import { useAuthContext } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // const router = useRouter();
  // const { accessToken, user } = useAuthContext();

  // useEffect(() => {
  //   if (!accessToken) router.push('/');
  // }, [accessToken, user]);

  return <>{children}</>;
}
