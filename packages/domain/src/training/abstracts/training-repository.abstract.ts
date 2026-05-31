import type { TrainingData } from '../entities/training.entity';

export abstract class TrainingRepositoryAbstract {
  abstract findAll(date: string): Promise<TrainingData[]>;
  abstract findById(id: string): Promise<TrainingData | null>;
  abstract findFirstTrainings(date: string): Promise<TrainingData[]>;
  abstract create(training: Omit<TrainingData, 'id'>): Promise<TrainingData>;
  abstract update(
    id: string,
    training: Partial<TrainingData>,
  ): Promise<TrainingData | null>;
  abstract delete(id: string): Promise<boolean>;
}
