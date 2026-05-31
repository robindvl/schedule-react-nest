import { Module } from '@nestjs/common';
import { TournamentRepositoryAbstract } from '@repo/domain';
import { TournamentRepositoryPadlhub } from './repositories/tournament.repository.padlhub';
import { TournamentsController } from './tournaments.controller';
import { TournamentsService } from './tournaments.service';

@Module({
  controllers: [TournamentsController],
  providers: [
    TournamentsService,
    {
      provide: TournamentRepositoryAbstract,
      useClass: TournamentRepositoryPadlhub,
    },
  ],
})
export class TournamentsModule {}
