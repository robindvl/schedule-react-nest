'use client';

import { createContext, useContext } from 'react';

export const ApiClientContext = createContext<unknown>(null);

export function useApiClientContext(): unknown {
  const ctx = useContext(ApiClientContext);
  if (ctx == null) throw new Error('ApiClientProvider not mounted');
  return ctx;
}

