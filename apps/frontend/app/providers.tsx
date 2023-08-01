"use client";

import { ReactNode, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";

const client = new QueryClient();

export function Providers({ children }: { children: ReactNode }) {
  const [stableClient] = useState(client);

  return (
    <QueryClientProvider client={stableClient}>
      {children}
      <Toaster />
    </QueryClientProvider>
  );
}
