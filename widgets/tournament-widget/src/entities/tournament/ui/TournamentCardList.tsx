import type { TournamentSignupCard } from '../model/types';

import { TournamentCard } from './TournamentCard';

interface TournamentCardListProps {
  tournaments: TournamentSignupCard[];
  onOpenTournament?: (tournamentId: string) => void;
}

export function TournamentCardList({
  tournaments,
  onOpenTournament,
}: TournamentCardListProps) {
  return (
    <div className="tournament-signup-list">
      {tournaments.map((tournament) => (
        <TournamentCard
          key={tournament.id}
          tournament={tournament}
          onOpen={onOpenTournament}
        />
      ))}
    </div>
  );
}
