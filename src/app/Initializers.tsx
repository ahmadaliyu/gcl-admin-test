'use client';
import React, { ReactNode, useState } from 'react';
import { usePathname } from 'next/navigation';
import NextTopLoader from 'nextjs-toploader';
import Navbar from '@/components/layout/main/navbar';
import Footer from '@/components/layout/main/footer';
import { Toaster } from '@/components/ui/sonner';
import { AppThemeProvider } from '@/providers/theme-provider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from '@/store/store';

function Initializers({ children }: { children: ReactNode }) {
  const isAuthPage = (usePathname() || '')?.startsWith('/auth/');
  const isUserPage = (usePathname() || '')?.startsWith('/user/');
  const hideFooter = isAuthPage || isUserPage ? true : false;

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000, // 1 minute
        refetchOnWindowFocus: false,
        // networkMode:'online'
      },
    },
  });

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <QueryClientProvider client={queryClient}>
          <AppThemeProvider>
            <NextTopLoader color="#000000" height={3} />
            <Navbar fixed={isUserPage ? false : true} />
            {children}
            {/* {hideFooter ? null : <Footer />} */}
            <Toaster richColors />
          </AppThemeProvider>
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </PersistGate>
    </Provider>
  );
}

export default Initializers;
