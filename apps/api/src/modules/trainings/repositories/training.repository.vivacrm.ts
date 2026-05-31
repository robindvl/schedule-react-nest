import {
  Injectable,
  InternalServerErrorException,
  NotImplementedException,
} from '@nestjs/common';
import {
  TRAINING_DIRECTION_NAMES,
  TrainingRepositoryAbstract,
} from '@repo/domain';
import type { TrainingData } from '@repo/domain';

import {
  getExerciseById,
  listExercises,
} from '../../../external-api/vivacrm/@generated';
import type { Exercise } from '../../../external-api/vivacrm/@generated';

function toTrainingData(exercise: Exercise): TrainingData {
  return exercise as TrainingData;
}

@Injectable()
export class TrainingRepositoryVivacrm extends TrainingRepositoryAbstract {
  async findAll(date: string): Promise<TrainingData[]> {
    const { data, error, response } = await listExercises({
      query: { date },
    });

    if (error || !response?.ok) {
      throw new InternalServerErrorException(
        `VivaCRM listExercises failed with status ${response?.status ?? 'unknown'}`,
      );
    }

    return (data ?? []).map(toTrainingData);
  }

  async findById(id: string): Promise<TrainingData | null> {
    const { data, error, response } = await getExerciseById({
      path: { exerciseId: id },
    });

    if (response?.status === 404) {
      return null;
    }

    if (error || !response?.ok || !data) {
      throw new InternalServerErrorException(
        `VivaCRM getExerciseById failed with status ${response?.status ?? 'unknown'}`,
      );
    }

    return toTrainingData(data);
  }

  async findFirstTrainings(date: string): Promise<TrainingData[]> {
    const trainings = await this.findAll(date);

    return trainings.filter(
      (training) =>
        training.direction.name === TRAINING_DIRECTION_NAMES.FIRST_TRAINING,
    );
  }

  create(): Promise<TrainingData> {
    throw new NotImplementedException('VivaCRM repository is read-only');
  }

  update(): Promise<TrainingData | null> {
    throw new NotImplementedException('VivaCRM repository is read-only');
  }

  delete(): Promise<boolean> {
    throw new NotImplementedException('VivaCRM repository is read-only');
  }
}
