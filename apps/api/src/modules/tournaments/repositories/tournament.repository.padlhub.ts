import {
  Injectable,
  InternalServerErrorException,
  NotImplementedException,
} from '@nestjs/common';
import { TournamentRepositoryAbstract } from '@repo/domain';
import type { TournamentData } from '@repo/domain';

import {
  getTournamentById,
  listTournaments,
} from '../../../external-api/padlhub/@generated';
import { mapPadlhubTournament } from '../../../external-api/padlhub/map-padlhub-tournament';

@Injectable()
export class TournamentRepositoryPadlhub extends TournamentRepositoryAbstract {
  async findAll(date: string): Promise<TournamentData[]> {
    const { data, error, response } = await listTournaments({
      query: { date },
    });

    if (error || !response?.ok) {
      throw new InternalServerErrorException(
        `Padlhub listTournaments failed with status ${response?.status ?? 'unknown'}`,
      );
    }

    return (data ?? []).map(mapPadlhubTournament);
  }

  async findById(id: string): Promise<TournamentData | null> {
    const { data, error, response } = await getTournamentById({
      path: { tournamentId: id },
    });

    if (response?.status === 404) {
      return null;
    }

    if (error || !response?.ok || !data) {
      throw new InternalServerErrorException(
        `Padlhub getTournamentById failed with status ${response?.status ?? 'unknown'}`,
      );
    }

    return mapPadlhubTournament(data);
  }

  async findByStatus(
    date: string,
    status: string[],
  ): Promise<TournamentData[]> {
    const tournaments = await this.findAll(date);

    return tournaments.filter((tournament) =>
      status.includes(tournament.status),
    );
  }

  create(): Promise<TournamentData> {
    throw new NotImplementedException('Padlhub repository is read-only');
  }

  update(): Promise<TournamentData | null> {
    throw new NotImplementedException('Padlhub repository is read-only');
  }

  delete(): Promise<boolean> {
    throw new NotImplementedException('Padlhub repository is read-only');
  }
}
