import type { PropsWithChildren } from 'react';

import { ApiClientProvider } from './api-client-provider';
import { QueryProvider } from './query.provider';
import { RouterAppProvider } from './router.provider';

export function AppProviders({ children }: PropsWithChildren) {
  return (
    <QueryProvider>
      <ApiClientProvider>
        {children ?? <RouterAppProvider />}
      </ApiClientProvider>
    </QueryProvider>
  );
}
