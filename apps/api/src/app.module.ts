import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TrainingsModule } from './modules/trainings/trainings.module';
import { TournamentsModule } from './modules/tournaments/tournaments.module';

@Module({
  imports: [TrainingsModule, TournamentsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
