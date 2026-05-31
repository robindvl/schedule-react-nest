import { Module } from '@nestjs/common';
import { TrainingRepositoryAbstract } from '@repo/domain';
import { TrainingRepositoryMock } from './repositories/training.repository.mock';
import { TrainingsController } from './trainings.controller';
import { TrainingsService } from './trainings.service';

@Module({
  controllers: [TrainingsController],
  providers: [
    TrainingsService,
    {
      provide: TrainingRepositoryAbstract,
      useClass: TrainingRepositoryMock,
    },
  ],
})
export class TrainingsModule {}
