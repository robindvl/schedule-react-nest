import type { CreateClientConfig } from './@generated/client.gen';

export const createClientConfig: CreateClientConfig = (config) => ({
  ...config,
  baseUrl: 'https://api.vivacrm.ru/end-user/api/v1/iSkq6G',
  headers: {
    ...config?.headers,
    Accept: 'application/json',
    'User-Agent': 'schedule-react-nest/1.0',
  },
});
