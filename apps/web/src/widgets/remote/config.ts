export const REMOTES = {
  tournamentWidget: {
    name: 'tournamentWidget',
    modules: {
      TournamentWidget: 'tournamentWidget/TournamentWidget',
    },
  },
} as const;

export type RemoteModulePath =
  (typeof REMOTES)[keyof typeof REMOTES]['modules'][keyof (typeof REMOTES)['tournamentWidget']['modules']];
