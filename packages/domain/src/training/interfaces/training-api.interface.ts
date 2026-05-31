import type { TrainingData } from '../entities/training.entity';

export interface TrainingApiResponse {
  data: TrainingData[];
  total?: number;
  page?: number;
  pageSize?: number;
}

export interface TrainingFilterParams {
  directionName?: string;
  studioId?: string;
  dateFrom?: string;
  dateTo?: string;
  trainerId?: string;
}
