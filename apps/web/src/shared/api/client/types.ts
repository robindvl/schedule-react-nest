import type {
  ApiClientKey as ApiClientKeyGen,
  GetApiClientType as GetApiClientTypeGen,
  ApiHooks as ApiHooksGen,
} from '../../lib/init-client-api';

import type { ApiClient } from './contracts';

export type ApiClientKey = ApiClientKeyGen<ApiClient>;

export type GetApiClientType<Path extends ApiClientKey> = GetApiClientTypeGen<ApiClient, Path>;

export type ApiHooks = ApiHooksGen<ApiClient>;

