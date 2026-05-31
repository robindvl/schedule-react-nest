import { Injectable } from '@nestjs/common';
import { TournamentRepositoryAbstract } from '@repo/domain';
import type { TournamentData } from '@repo/domain';
import { mockTournaments } from '../mocks/tournaments.mock';

@Injectable()
export class TournamentRepositoryMock extends TournamentRepositoryAbstract {
  private tournaments: TournamentData[] = [...mockTournaments];

  findAll(): Promise<TournamentData[]> {
    return Promise.resolve(this.tournaments);
  }

  findById(id: string): Promise<TournamentData | null> {
    return Promise.resolve(
      this.tournaments.find((tournament) => tournament.id === id) ?? null,
    );
  }

  findByStatus(status: string[]): Promise<TournamentData[]> {
    return Promise.resolve(
      this.tournaments.filter((tournament) =>
        status.includes(tournament.status),
      ),
    );
  }

  create(tournament: Omit<TournamentData, 'id'>): Promise<TournamentData> {
    const newTournament = {
      ...tournament,
      id: crypto.randomUUID(),
    } as TournamentData;

    this.tournaments.push(newTournament);
    return Promise.resolve(newTournament);
  }

  update(
    id: string,
    tournament: Partial<TournamentData>,
  ): Promise<TournamentData | null> {
    const index = this.tournaments.findIndex((item) => item.id === id);
    if (index === -1) {
      return Promise.resolve(null);
    }

    this.tournaments[index] = { ...this.tournaments[index], ...tournament };
    return Promise.resolve(this.tournaments[index]);
  }

  delete(id: string): Promise<boolean> {
    const index = this.tournaments.findIndex((item) => item.id === id);
    if (index === -1) {
      return Promise.resolve(false);
    }

    this.tournaments.splice(index, 1);
    return Promise.resolve(true);
  }
}
