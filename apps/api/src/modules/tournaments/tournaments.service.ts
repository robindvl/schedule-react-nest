import { Inject, Injectable } from '@nestjs/common';
import { TournamentRepositoryAbstract } from '@repo/domain';
import type { TournamentData } from '@repo/domain';

@Injectable()
export class TournamentsService {
  constructor(
    @Inject(TournamentRepositoryAbstract)
    private readonly tournamentRepository: TournamentRepositoryAbstract,
  ) {}

  findAll(date: string): Promise<TournamentData[]> {
    return this.tournamentRepository.findAll(date);
  }

  findById(id: string): Promise<TournamentData | null> {
    return this.tournamentRepository.findById(id);
  }

  findByStatus(date: string, status: string[]): Promise<TournamentData[]> {
    return this.tournamentRepository.findByStatus(date, status);
  }
}
