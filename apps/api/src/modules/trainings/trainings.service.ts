import { Inject, Injectable } from '@nestjs/common';
import { TrainingRepositoryAbstract } from '@repo/domain';
import type { TrainingData } from '@repo/domain';

@Injectable()
export class TrainingsService {
  constructor(
    @Inject(TrainingRepositoryAbstract)
    private readonly trainingRepository: TrainingRepositoryAbstract,
  ) {}

  findAll(date: string): Promise<TrainingData[]> {
    return this.trainingRepository.findAll(date);
  }

  findFirstTrainings(date: string): Promise<TrainingData[]> {
    return this.trainingRepository.findFirstTrainings(date);
  }

  findById(id: string): Promise<TrainingData | null> {
    return this.trainingRepository.findById(id);
  }
}
