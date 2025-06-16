"use client";

import {
  // QueryCache,
  QueryClient,
  QueryClientProvider as QueryProvider,
} from "@tanstack/react-query";
import React, { ReactNode, useState } from "react";

export default function QueryClientProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000,
          },
        },
        // queryCache: queryCache
      })
  );
  return <QueryProvider client={queryClient}>{children}</QueryProvider>;
}
