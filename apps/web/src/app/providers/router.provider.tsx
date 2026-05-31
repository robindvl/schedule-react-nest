import { RouterProvider } from '@tanstack/react-router';

import { router } from '@/app/router';

export function RouterAppProvider() {
  return <RouterProvider router={router} />;
}
