import { findAllTournaments, findTournamentById } from '@/app/@generated/api';
import { getSdkUrl } from '@/app/@generated/api/sdk-urls.gen';
import type { ApiClient } from '@/shared/api/client';
import { methodApi } from '@/shared/api/client';

export const tournamentsApi: ApiClient['tournaments'] = {
  findAll: methodApi(async (args) => {
    const { data } = await findAllTournaments({
      query: args?.status ? { status: args.status } : undefined,
    });
    return data ?? [];
  }, getSdkUrl(findAllTournaments)),

  findById: methodApi(async ({ id }) => {
    const { data } = await findTournamentById({ path: { id } });
    if (!data) {
      throw new Error(`Tournament with id "${id}" not found`);
    }
    return data;
  }, getSdkUrl(findTournamentById)),
};
