import { Module } from '@nestjs/common';
import { TrainingRepositoryAbstract } from '@repo/domain';
import { TrainingRepositoryVivacrm } from './repositories/training.repository.vivacrm';
import { TrainingsController } from './trainings.controller';
import { TrainingsService } from './trainings.service';

@Module({
  controllers: [TrainingsController],
  providers: [
    TrainingsService,
    {
      provide: TrainingRepositoryAbstract,
      useClass: TrainingRepositoryVivacrm,
    },
  ],
})
export class TrainingsModule {}
