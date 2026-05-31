import type { ApiClient } from './contracts';
import { methodApi } from './method-api';
import { stubErr } from './stub-err';

export const STUB_API_CLIENT: ApiClient = {
  trainings: {
    findAll: methodApi(async () => [], '/api/trainings'),
    findFirst: methodApi(async () => [], '/api/trainings/first'),
    findById: methodApi(stubErr, '/api/trainings/{id}'),
  },
  tournaments: {
    findAll: methodApi(async () => [], '/api/tournaments'),
    findById: methodApi(stubErr, '/api/tournaments/{id}'),
  },
};
