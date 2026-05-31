/** Origin Nest API (без `/api` и без завершающего `/`). Пусто — запросы на тот же origin (dev: Vite proxy `/api`). */
export function getApiBaseUrl(): string {
  const raw = import.meta.env.VITE_API_BASE_URL?.trim() ?? '';
  return raw.replace(/\/+$/, '');
}
