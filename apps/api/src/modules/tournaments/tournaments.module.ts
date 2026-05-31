import { Module } from '@nestjs/common';
import { TournamentRepositoryAbstract } from '@repo/domain';
import { TournamentRepositoryMock } from './repositories/tournament.repository.mock';
import { TournamentsController } from './tournaments.controller';
import { TournamentsService } from './tournaments.service';

@Module({
  controllers: [TournamentsController],
  providers: [
    TournamentsService,
    {
      provide: TournamentRepositoryAbstract,
      useClass: TournamentRepositoryMock,
    },
  ],
})
export class TournamentsModule {}
