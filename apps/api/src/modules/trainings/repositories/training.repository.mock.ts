import { Injectable } from '@nestjs/common';
import {
  TrainingRepositoryAbstract,
  TRAINING_DIRECTION_NAMES,
} from '@repo/domain';
import type { TrainingData } from '@repo/domain';
import { mockTrainings } from '../mocks/trainings.mock';

@Injectable()
export class TrainingRepositoryMock extends TrainingRepositoryAbstract {
  private trainings: TrainingData[] = [...mockTrainings];

  findAll(date: string): Promise<TrainingData[]> {
    return Promise.resolve(this.filterByDate(this.trainings, date));
  }

  findById(id: string): Promise<TrainingData | null> {
    return Promise.resolve(
      this.trainings.find((training) => training.id === id) ?? null,
    );
  }

  findFirstTrainings(date: string): Promise<TrainingData[]> {
    return Promise.resolve(
      this.filterByDate(this.trainings, date).filter(
        (training) =>
          training.direction.name === TRAINING_DIRECTION_NAMES.FIRST_TRAINING,
      ),
    );
  }

  private filterByDate(trainings: TrainingData[], date: string): TrainingData[] {
    return trainings.filter((training) => training.timeFrom.startsWith(date));
  }

  create(training: Omit<TrainingData, 'id'>): Promise<TrainingData> {
    const newTraining = {
      ...training,
      id: crypto.randomUUID(),
    } as TrainingData;

    this.trainings.push(newTraining);
    return Promise.resolve(newTraining);
  }

  update(
    id: string,
    training: Partial<TrainingData>,
  ): Promise<TrainingData | null> {
    const index = this.trainings.findIndex((item) => item.id === id);
    if (index === -1) {
      return Promise.resolve(null);
    }

    this.trainings[index] = { ...this.trainings[index], ...training };
    return Promise.resolve(this.trainings[index]);
  }

  delete(id: string): Promise<boolean> {
    const index = this.trainings.findIndex((item) => item.id === id);
    if (index === -1) {
      return Promise.resolve(false);
    }

    this.trainings.splice(index, 1);
    return Promise.resolve(true);
  }
}
