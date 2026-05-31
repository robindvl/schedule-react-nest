import path from 'node:path';

import react from '@vitejs/plugin-react';
import { federation } from '@module-federation/vite';
import { defineConfig } from 'vite';

const tournamentWidgetRemote =
  process.env.VITE_TOURNAMENT_WIDGET_REMOTE ??
  'http://localhost:5001/remoteEntry.js';

// https://vite.dev/config/
export default defineConfig({
    plugins: [
      react(),
      federation({
        name: 'web',
        dts: false,
        remotes: {
          tournamentWidget: {
            type: 'module',
            name: 'tournamentWidget',
            entry: tournamentWidgetRemote,
          },
        },
        shared: {
          react: {
            singleton: true,
            requiredVersion: '^19.0.0',
          },
          'react-dom': {
            singleton: true,
            requiredVersion: '^19.0.0',
          },
        },
      }),
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    build: {
      target: 'esnext',
      minify: false,
      cssCodeSplit: false,
    },
    server: {
      proxy: {
        '/api': 'http://localhost:5000',
      },
    },
});
