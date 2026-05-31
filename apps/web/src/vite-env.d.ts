/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Nest API origin, e.g. https://schedule-api.example.com */
  readonly VITE_API_BASE_URL?: string;
  /** Module Federation remoteEntry URL (build-time). */
  readonly VITE_TOURNAMENT_WIDGET_REMOTE?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare module '@widget/tournament-widget/styles';
