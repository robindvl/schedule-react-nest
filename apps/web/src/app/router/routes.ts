import { createRootRoute, createRoute, redirect } from '@tanstack/react-router';

import { TrainingsPage } from '@/pages/trainings';
import { TournamentsPage } from '@/pages/tournaments';
import { AppLayout } from '@/widgets/layout';

export const rootRoute = createRootRoute({
  component: AppLayout,
});

export const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  beforeLoad: () => {
    throw redirect({ to: '/trainings' });
  },
});

export const trainingsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/trainings',
  component: TrainingsPage,
});

export const tournamentsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/tournaments',
  component: TournamentsPage,
});
