import type { TournamentWidgetProps } from '@widget/tournament-widget';

import { createRemoteComponent } from '@/shared/lib/module-federation';

// Path must match REMOTES.tournamentWidget.modules.TournamentWidget in ../config.ts
export const TournamentWidget = createRemoteComponent<TournamentWidgetProps>(
  () => import('tournamentWidget/TournamentWidget'),
  { displayName: 'TournamentWidget' },
);
