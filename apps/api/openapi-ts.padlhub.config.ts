import { defineConfig } from '@hey-api/openapi-ts';

export default defineConfig({
  input: 'src/external-api/padlhub/opanapi.yaml',
  output: 'src/external-api/padlhub/@generated',
  plugins: [
    '@hey-api/typescript',
    {
      name: '@hey-api/client-fetch',
      runtimeConfigPath: './src/external-api/padlhub/padlhub-api-client.config',
    },
    '@hey-api/sdk',
  ],
});
