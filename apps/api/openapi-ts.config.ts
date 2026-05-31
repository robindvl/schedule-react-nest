import { defineConfig } from '@hey-api/openapi-ts';

export default defineConfig({
  input: 'src/external-api/vivacrm/vivacrm.opanapi.yaml',
  output: 'src/external-api/vivacrm/@generated',
  plugins: [
    '@hey-api/typescript',
    {
      name: '@hey-api/client-fetch',
      runtimeConfigPath: './src/external-api/vivacrm/vivacrm-api-client.config',
    },
    '@hey-api/sdk',
  ],
});
