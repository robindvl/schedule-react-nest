import {
  findAllTrainings,
  findFirstTrainings,
  findTrainingById,
} from '@/app/@generated/api';
import { getSdkUrl } from '@/app/@generated/api/sdk-urls.gen';
import type { ApiClient } from '@/shared/api/client';
import { methodApi } from '@/shared/api/client';

export const trainingsApi: ApiClient['trainings'] = {
  findAll: methodApi(async () => {
    const { data } = await findAllTrainings();
    return data ?? [];
  }, getSdkUrl(findAllTrainings)),

  findFirst: methodApi(async () => {
    const { data } = await findFirstTrainings();
    return data ?? [];
  }, getSdkUrl(findFirstTrainings)),

  findById: methodApi(async ({ id }) => {
    const { data } = await findTrainingById({ path: { id } });
    if (!data) {
      throw new Error(`Training with id "${id}" not found`);
    }
    return data;
  }, getSdkUrl(findTrainingById)),
};
