import { defineConfig } from '@hey-api/openapi-ts';

export default defineConfig({
  input: '../api/openapi.json',
  output: 'src/app/@generated/api',
  plugins: [
    '@hey-api/typescript',
    {
      name: '@hey-api/client-fetch',
      runtimeConfigPath: './src/app/api-client.config.ts',
    },
    '@hey-api/sdk',
  ],
});
