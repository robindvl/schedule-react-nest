import type { CreateClientConfig } from './@generated/api/client.gen';
import { getApiBaseUrl } from '@/shared/config/env';

export const createClientConfig: CreateClientConfig = (config) => ({
  ...config,
  baseUrl: getApiBaseUrl(),
});
