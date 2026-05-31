import {
  indexRoute,
  rootRoute,
  tournamentsRoute,
  trainingsRoute,
} from './routes';

export const routeTree = rootRoute.addChildren([
  indexRoute,
  trainingsRoute,
  tournamentsRoute,
]);
