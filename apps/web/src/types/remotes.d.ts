declare module 'tournamentWidget/TournamentWidget' {
  import type { ComponentType } from 'react';
  import type { TournamentWidgetProps } from '@widget/tournament-widget';

  const Component: ComponentType<TournamentWidgetProps>;
  export default Component;
}
