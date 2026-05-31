import { Inject, Injectable } from '@nestjs/common';
import { TournamentRepositoryAbstract } from '@repo/domain';
import type { TournamentData } from '@repo/domain';

@Injectable()
export class TournamentsService {
  constructor(
    @Inject(TournamentRepositoryAbstract)
    private readonly tournamentRepository: TournamentRepositoryAbstract,
  ) {}

  findAll(): Promise<TournamentData[]> {
    return this.tournamentRepository.findAll();
  }

  findById(id: string): Promise<TournamentData | null> {
    return this.tournamentRepository.findById(id);
  }

  findByStatus(status: string[]): Promise<TournamentData[]> {
    return this.tournamentRepository.findByStatus(status);
  }
}
