"use client";
import React, { ReactNode, useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import NextTopLoader from "nextjs-toploader";
import Navbar from "@/components/layout/main/navbar";
import Footer from "@/components/layout/main/footer";
import { Toaster } from "@/components/ui/sonner";
import { AppThemeProvider } from "@/providers/theme-provider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "@/store/store";
import Cookies from "js-cookie";
import { AlertProvider } from "@/components/reuseables/Alert/alert-context";

function Initializers({ children }: { children: ReactNode }) {
  const pathname = usePathname() || "";
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  const isAuthPage = pathname.startsWith("/");
  const isPublicPage = pathname.startsWith("/public/");
  const isRootPage = pathname === "/";
  const isProtectedRoute = !(isAuthPage || isPublicPage || isRootPage);

  const hideFooter = isAuthPage || pathname.startsWith("/user/");

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
        refetchOnWindowFocus: false,
      },
    },
  });

  useEffect(() => {
    const token = Cookies.get("token");
    const hasVisited = localStorage.getItem("hasVisited");

    if (!hasVisited) {
      localStorage.setItem("hasVisited", "true");
      // First-time user, redirect to home
      if (!token && isProtectedRoute) {
        router.replace("/");
        return;
      }
    } else {
      // Returning user
      if (!token && isProtectedRoute) {
        router.replace("/");
        return;
      }
    }

    setIsLoading(false);
  }, [pathname, isProtectedRoute, router]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <QueryClientProvider client={queryClient}>
          <AppThemeProvider>
            <AlertProvider>
              <NextTopLoader color="#000000" height={3} />
              <Navbar fixed={!pathname.startsWith("/user/")} />
              {children}
              {!hideFooter && <Footer />}
              <Toaster richColors />
            </AlertProvider>
          </AppThemeProvider>
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </PersistGate>
    </Provider>
  );
}

export default Initializers;
