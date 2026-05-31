import type { TrainingData, TournamentData } from '@repo/domain';

import type { ApiMethod } from './method-api';

export interface ITrainingsApi {
  findAll: ApiMethod<() => Promise<TrainingData[]>>;
  findFirst: ApiMethod<() => Promise<TrainingData[]>>;
  findById: ApiMethod<(args: { id: string }) => Promise<TrainingData>>;
}

export interface ITournamentsApi {
  findAll: ApiMethod<
    (args?: { status?: string }) => Promise<TournamentData[]>
  >;
  findById: ApiMethod<(args: { id: string }) => Promise<TournamentData>>;
}

export interface ApiClient {
  trainings: ITrainingsApi;
  tournaments: ITournamentsApi;
}
