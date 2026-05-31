import { lazy, Suspense, type ComponentType, type ReactNode } from 'react';

import { WidgetFallback } from '@/shared/ui/widget-fallback';

type RemoteModule<P extends object> = {
  default: ComponentType<P>;
};

export function createRemoteComponent<P extends object>(
  load: () => Promise<RemoteModule<P>>,
  options?: { fallback?: ReactNode; displayName?: string },
) {
  const LazyComponent = lazy(load);

  function RemoteComponent(props: P) {
    return (
      <Suspense fallback={options?.fallback ?? <WidgetFallback />}>
        <LazyComponent {...props} />
      </Suspense>
    );
  }

  if (options?.displayName) {
    RemoteComponent.displayName = options.displayName;
  }

  return RemoteComponent;
}
