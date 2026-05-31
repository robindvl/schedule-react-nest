import type { TournamentData } from '../entities/tournament.entity';

export abstract class TournamentRepositoryAbstract {
  abstract findAll(): Promise<TournamentData[]>;
  abstract findById(id: string): Promise<TournamentData | null>;
  abstract findByStatus(status: string[]): Promise<TournamentData[]>;
  abstract create(
    tournament: Omit<TournamentData, 'id'>,
  ): Promise<TournamentData>;
  abstract update(
    id: string,
    tournament: Partial<TournamentData>,
  ): Promise<TournamentData | null>;
  abstract delete(id: string): Promise<boolean>;
}
